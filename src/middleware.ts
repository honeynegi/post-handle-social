import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY

  if (!supabaseUrl || !supabaseKey) {
    // console.log('Supabase env vars not set, skipping auth')
    return NextResponse.next({
      request,
    })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Sign out existing user for connect routes (except callback)
  if (request.nextUrl.pathname.startsWith('/connect/') && 
      request.nextUrl.pathname !== '/connect/instagram/callback' && 
      request.nextUrl.pathname !== '/connect/youtube/callback' &&
      user) {
    // console.log('Middleware: Signing out existing user for connect route')
    await supabase.auth.signOut()
    // console.log('Middleware: Signed out successfully')
  }

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    !request.nextUrl.pathname.startsWith('/connect/') &&
    !request.nextUrl.pathname.startsWith('/api/') &&
    request.nextUrl.pathname !== '/'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match API request paths and connect routes
     */
    '/api/:path*',
    '/connect/:path*',
    '/haddock-special-presently.ngrok-free.app/connect/:path*',
  ],
}