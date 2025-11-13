export const runtime = 'edge';

import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get uid from URL parameters
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid parameter' }, { status: 400 });
    }

    // Check if user exists in the users table and get access token
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('uid, instagram_access_token')
      .eq('uid', uid)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!userData.instagram_access_token) {
      return NextResponse.json({ error: 'Instagram access token not found for user' }, { status: 400 });
    }

    // Parse the request body
    const body = await request.json();
    const { content, scheduledAt, status = 'pending', caption, imageUrl, videoUrl, altText, userTags, productTags, locationId } = body;

    // Validate required fields
    if (!content || !scheduledAt) {
      return NextResponse.json({ error: 'Missing required fields: content and scheduledAt' }, { status: 400 });
    }

    // Determine media type and URLs
    let finalMediaType: string;
    let finalImageUrl = imageUrl || null;
    let finalVideoUrl = videoUrl || null;

    if (finalVideoUrl) {
      finalMediaType = 'REELS';
      finalImageUrl = null; // Ensure no image_url for video posts
    } else if (finalImageUrl) {
      finalMediaType = 'IMAGE';
      finalVideoUrl = null; // Ensure no video_url for image posts
    } else {
      // Default to IMAGE if no media provided
      finalMediaType = 'IMAGE';
    }

    // Insert the post into the instagram_posts table
    const { data, error } = await supabase
      .from('instagram_posts')
      .insert({
        content,
        caption: caption || content, // Use caption if provided, else content
        scheduled_at: scheduledAt,
        status: status,
        access_token: userData.instagram_access_token,
        media_type: finalMediaType,
        image_url: finalImageUrl,
        video_url: finalVideoUrl,
        alt_text: altText,
        user_tags: userTags || [],
        product_tags: productTags || [],
        location_id: locationId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting post:', error);
      return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}