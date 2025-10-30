export const runtime = 'edge'; 

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const state = searchParams.get('state')

  console.log("youtube callback search params:", state, code, error)

  if (error) {
    // console.error('YouTube OAuth error:', error)
    return NextResponse.redirect(new URL('/connect/youtube?error=oauth_failed', request.url))
  }

  if (!code) {
    // console.error('No code received from YouTube')
    return NextResponse.redirect(new URL('/connect/youtube?error=no_code', request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URI!,
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
    //   console.error('Failed to exchange code for token:', errorText)
      return NextResponse.redirect(new URL('/connect/youtube?error=token_exchange_failed', request.url))
    }

    const tokenData = await tokenResponse.json()
    const { access_token, refresh_token, expires_in } = tokenData

    // console.log('YouTube access token obtained')

    // Get user info from YouTube API
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    })

    let youtubeUserId = null
    let youtubeEmail = null

    if (userResponse.ok) {
      const userData = await userResponse.json()
      youtubeUserId = userData.id
      youtubeEmail = userData.email
    //   console.log('YouTube user info obtained:', youtubeUserId, youtubeEmail)
    }

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

    // console.log('User found in database:', user)

    if (userError || !user) {
    //   console.error('No authenticated user found')
      return NextResponse.redirect(new URL('/connect/youtube?error=no_user', request.url))
    }

    // Use uid from state to find the user in the database
    const uid = state // state contains the uid
    if (!uid) {
    //   console.error('No uid found in state')
      return NextResponse.redirect(new URL('/connect/youtube?error=no_uid', request.url))
    }

    // First, select the user from the users table using the uid
    const { data: dbUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', uid)
      .single()

    if (selectError || !dbUser) {
    //   console.error('User not found in database for uid:', uid, selectError)
      return NextResponse.redirect(new URL('/connect/youtube?error=user_not_found', request.url))
    }

    // console.log('User found in database:', dbUser.uid)

    // Update user with YouTube info
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        youtube_user_id: youtubeUserId,
        youtube_email: youtubeEmail,
        youtube_access_token: access_token,
        youtube_refresh_token: refresh_token,
        youtube_token_expires_at: expires_in ? new Date(Date.now() + expires_in * 1000).toISOString() : null,
        youtube_connected_at: new Date().toISOString(),
      })
      .eq('uid', dbUser.uid)

    if (updateUserError) {
    //   console.error('Failed to update user with YouTube info:', updateUserError)
      return NextResponse.redirect(new URL('/connect/youtube?error=storage_failed', request.url))
    } else {
    //   console.log('User updated with YouTube info')
    }

    // console.log('YouTube connection stored successfully')
    // Redirect to success page
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/connect/youtube?success=true`, request.url))
  } catch (err) {
    console.error('Error in Instagram callback:', err)
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/connect/youtube?error=unknown`, request.url))
  }
}