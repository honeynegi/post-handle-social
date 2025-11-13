export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')

  if (!uid) {
    return NextResponse.json(
      { error: 'UID parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Create Supabase server client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
          // No need to set cookies in API route
        },
      },
    })

    // Fetch user data from users table using uid
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', uid)
      .single()

    if (userError) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      )
    }

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check social connections
    const connections = {
      instagram: !!userData.instagram_access_token,
      youtube: !!userData.youtube_access_token,
      // Add other social platforms here as needed
      // twitter: !!userData.twitter_access_token,
      // facebook: !!userData.facebook_access_token,
    }

    return NextResponse.json({
      success: true,
      uid: uid,
      connections: connections
    })

  } catch (error) {
    console.error('Error in connect status endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}