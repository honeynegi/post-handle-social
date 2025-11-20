export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface YouTubePostData {
  user_id: string;
  title: string;
  description?: string;
  content?: string;
  platforms?: string[];
  scheduled_at: string; // ISO timestamp
  video_url: string;
  privacy_status?: 'private' | 'unlisted' | 'public';
  category_id?: number;
  tags?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const postData: YouTubePostData = await request.json();
    console.log('YouTube post creation request:', postData);

    // Validate required fields
    if (!postData.user_id || !postData.title || !postData.scheduled_at || !postData.video_url) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id, title, scheduled_at, video_url' },
        { status: 400 }
      );
    }

    // Validate privacy_status
    const validPrivacyStatuses = ['private', 'unlisted', 'public'];
    if (postData.privacy_status && !validPrivacyStatuses.includes(postData.privacy_status)) {
      return NextResponse.json(
        { error: 'Invalid privacy_status. Must be one of: private, unlisted, public' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = await createClient();

    // Insert post into youtube_posts table
    const { data, error } = await supabase
      .from('youtube_posts')
      .insert({
        user_id: postData.user_id,
        title: postData.title,
        description: postData.description || null,
        content: postData.content || null,
        platforms: postData.platforms || ['youtube'],
        scheduled_at: postData.scheduled_at,
        video_url: postData.video_url,
        privacy_status: postData.privacy_status || 'private',
        category_id: postData.category_id || 22,
        tags: postData.tags || [],
        upload_state: {},
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting YouTube post:', error);
      return NextResponse.json({ error: 'Failed to create YouTube post' }, { status: 500 });
    }

    console.log('YouTube post created successfully:', data.id);

    // The after_insert trigger will automatically enqueue the post for processing
    return NextResponse.json({
      success: true,
      post: data
    });

  } catch (error) {
    console.error('Error in YouTube post creation:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}