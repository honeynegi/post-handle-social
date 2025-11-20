export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface PostData {
  user_id: string;
  title: string;
  description: string;
  video_url: string;
  tags?: string[];
  privacy?: 'public' | 'private' | 'unlisted';
}

export async function POST(request: NextRequest) {
  try {
    const postData: PostData = await request.json();
    console.log("youtube-upload request data:", postData);

    // Initialize Supabase client
    const supabase = await createClient();

    // Fetch user YouTube tokens
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('youtube_access_token, youtube_refresh_token, youtube_token_expires_at')
      .eq('uid', postData.user_id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'Failed to fetch user tokens' }, { status: 400 });
    }

    let accessToken = userData.youtube_access_token;

    // Check if token is expired and refresh if needed
    const now = new Date();
    const expiresAt = new Date(userData.youtube_token_expires_at);
    if (now >= expiresAt) {
      // Refresh token logic
      const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID!,
          client_secret: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET!,
          refresh_token: userData.youtube_refresh_token,
          grant_type: 'refresh_token',
        }),
      });

      const refreshData = await refreshResponse.json();
      if (!refreshResponse.ok) {
        return NextResponse.json({ error: 'Failed to refresh token' }, { status: 400 });
      }

      accessToken = refreshData.access_token;

      // Update user tokens in database
      const newExpiresAt = new Date(now.getTime() + refreshData.expires_in * 1000);
      await supabase
        .from('users')
        .update({
          youtube_access_token: accessToken,
          youtube_token_expires_at: newExpiresAt.toISOString(),
        })
        .eq('uid', postData.user_id);
    }

    // Download video file
    const videoResponse = await fetch(postData.video_url);
    if (!videoResponse.ok) {
      return NextResponse.json({ error: 'Failed to download video file' }, { status: 400 });
    }
    const videoBuffer = await videoResponse.arrayBuffer();

    // YouTube Resumable Upload Protocol
    // Step 1: Initiate upload
    const initiateResponse = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': 'video/mp4',
        'X-Upload-Content-Length': videoBuffer.byteLength.toString(),
      },
      body: JSON.stringify({
        snippet: {
          title: postData.title,
          description: postData.description,
          tags: postData.tags || [],
        },
        status: {
          privacyStatus: postData.privacy || 'private',
        },
      }),
    });

    if (!initiateResponse.ok) {
      const errorText = await initiateResponse.text();
      console.error('Initiate upload failed:', errorText);
      return NextResponse.json({ error: 'Failed to initiate YouTube upload' }, { status: 400 });
    }

    const uploadUrl = initiateResponse.headers.get('Location');
    if (!uploadUrl) {
      return NextResponse.json({ error: 'No upload URL received from YouTube' }, { status: 400 });
    }

    // Step 2: Upload video data
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Length': videoBuffer.byteLength.toString(),
      },
      body: videoBuffer,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Video upload failed:', errorText);
      return NextResponse.json({ error: `YouTube upload failed: ${errorText}` }, { status: 400 });
    }

    const uploadResult = await uploadResponse.json();
    const videoId = uploadResult.id;

    return NextResponse.json({
      success: true,
      videoId: videoId
    });

  } catch (error) {
    console.error('Error in youtube-upload API route:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}