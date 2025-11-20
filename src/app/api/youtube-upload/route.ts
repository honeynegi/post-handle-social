export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { google } from 'googleapis';
import { PassThrough } from 'stream';

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

    // Initialize YouTube API client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client,
    });

    // Upload video using YouTube API
    try {
      const response = await youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title: postData.title,
            description: postData.description,
            tags: postData.tags || [],
          },
          status: {
            privacyStatus: postData.privacy || 'private',
          },
        },
        media: {
          body: (() => {
            const stream = new PassThrough();
            stream.end(Buffer.from(videoBuffer));
            return stream;
          })(),
          mimeType: 'video/mp4',
        },
      });

      return NextResponse.json({
        success: true,
        videoId: response.data.id
      });

    } catch (uploadError: any) {
      console.error('YouTube upload error:', uploadError);
      return NextResponse.json({
        error: `YouTube upload failed: ${uploadError.message}`
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in youtube-upload API route:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}