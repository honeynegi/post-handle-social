export const runtime = 'edge'; 

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const state = searchParams.get('state')

  console.log("instagram callback search params:", state, code, error)

  if (error) {
    console.error('Instagram OAuth error:', error)
    return NextResponse.redirect(new URL('/connect/instagram?error=oauth_failed', request.url))
  }

  if (!code) {
    console.error('No code received from Instagram')
    return NextResponse.redirect(new URL('/connect/instagram?error=no_code', request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI!,
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Failed to exchange code for token:', errorText)
      return NextResponse.redirect(new URL('/connect/instagram?error=token_exchange_failed', request.url))
    }

    const tokenData = await tokenResponse.json()
    let { access_token, user_id } = tokenData

    console.log('Short-lived Instagram access token obtained for user:', user_id)

    // Exchange for long-lived token
    const longLivedTokenResponse = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${access_token}`, {
      method: 'GET',
    })

    let longLivedData: any = {}

    if (!longLivedTokenResponse.ok) {
      const errorText = await longLivedTokenResponse.text()
      console.error('Failed to exchange for long-lived token:', errorText)
      // Continue with short-lived token
    } else {
      longLivedData = await longLivedTokenResponse.json()
      const longLivedToken = longLivedData.access_token
      console.log('Long-lived token obtained')
      // Use long-lived token instead
      access_token = longLivedToken
    }

    console.log('Instagram access token obtained for user:', user_id)

    // Store the access token in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
          // No need to set cookies in callback
        },
      },
    })

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    console.log('User found in database:', user)

    if (userError || !user) {
      console.error('No authenticated user found')
      return NextResponse.redirect(new URL('/connect/instagram?error=no_user', request.url))
    }

    // Use uid from state to find the user in the database
    const uid = state // state contains the uid
    if (!uid) {
      console.error('No uid found in state')
      return NextResponse.redirect(new URL('/connect/instagram?error=no_uid', request.url))
    }

    // First, select the user from the users table using the uid
    const { data: dbUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', uid)
      .single()

    if (selectError || !dbUser) {
      console.error('User not found in database for uid:', uid, selectError)
      return NextResponse.redirect(new URL('/connect/instagram?error=user_not_found', request.url))
    }

    console.log('User found in database:', dbUser.uid)

    // Update user with Instagram info
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        instagram_user_id: user_id,
        access_token: access_token,
        connected_at: new Date().toISOString(),
        expires_in: longLivedTokenResponse.ok ? longLivedData.expires_in : null,
      })
      .eq('uid', dbUser.uid)

    if (updateUserError) {
      console.error('Failed to update user with Instagram info:', updateUserError)
      // Continue anyway, as the connection storage is more important
    } else {
      console.log('User updated with Instagram info')
    }

    // Store Instagram connection in database
    // const { error: insertError } = await supabase
    //   .from('users')
    //   .upsert({
    //     user_uid: dbUser.uid, // Use the database user's id
    //     instagram_user_id: user_id,
    //     access_token: access_token,
    //     connected_at: new Date().toISOString(),
    //   })

    // if (insertError) {
    //   console.error('Failed to store Instagram connection:', insertError)
    //   return NextResponse.redirect(new URL('/connect/instagram?error=storage_failed', request.url))
    // }

    console.log('Instagram connection stored successfully')
    // Redirect to success page
    return NextResponse.redirect(new URL(`/connect/instagram?success=true`, request.url))
  } catch (err) {
    console.error('Error in Instagram callback:', err)
    return NextResponse.redirect(new URL(`/connect/instagram?error=unknown`, request.url))
  }
}