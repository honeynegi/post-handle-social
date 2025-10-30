'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/Button'
import { FaYoutube } from 'react-icons/fa'
import { connectYoutubeUser } from '@/utils/connect/youtubeConnect'

function ConnectYoutubeContent() {
  const [connecting, setConnecting] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const errorParam = searchParams.get('error')

  const handleConnect = async () => {
    setConnecting(true)
    setError(null)
    try {
      const uid = searchParams.get('uid')
      const connectedUser = await connectYoutubeUser(uid)
      setUser(connectedUser)

      // Build YouTube OAuth URL
      const clientId = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID
      const redirectUri = process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URI

      if (!clientId || !redirectUri) {
        throw new Error('YouTube client not configured')
      }

      const scopes = [
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.readonly'
      ].join(' ')

      const youtubeAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopes)}&state=${uid}&access_type=offline&prompt=consent`

    //   console.log('Redirecting to YouTube OAuth:', youtubeAuthUrl)
      window.location.href = youtubeAuthUrl
    } catch (error) {
    //   console.error('Error connecting:', error)
      setError(error instanceof Error ? error.message : 'Connection failed')
      setConnecting(false)
    }
  }

  if (success === 'true') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaYoutube className="h-12 w-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              Connection Successful!
            </h2>
            <p className="text-gray-600">
              Your YouTube account has been successfully connected. You can now close this webview.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (errorParam) {
    const errorMessages: { [key: string]: string } = {
      oauth_failed: 'YouTube authorization failed. Please try again.',
      no_code: 'No authorization code received. Please try again.',
      token_exchange_failed: 'Failed to obtain access token. Please try again.',
      no_user: 'User authentication failed. Please try again.',
      user_not_found: 'User not found. Please try again.',
      storage_failed: 'Failed to save connection. Please try again.',
      unknown: 'An unknown error occurred. Please try again.',
    }

    const errorMessage = errorMessages[errorParam] || 'An error occurred. Please try again.'

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaYoutube className="h-12 w-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              Connection Failed
            </h2>
            <p className="text-gray-600">
              {errorMessage} You can now close this webview.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Connection Error</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => { setError(null); setUser(null) }} className="w-full">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FaYoutube className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Connect your YouTube account
          </h2>

          <div className="text-left bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Login with YouTube
            </h3>
            <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded mb-3">
              Required for Shorts
            </span>
            <p className="text-gray-600 mb-4">
              Connect your YouTube channel to enable posting shorts directly to your channel.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Requires a YouTube channel with upload permissions.</li>
              <li>• You'll be asked to grant permission to upload videos to your channel.</li>
            </ul>
          </div>

          <Button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full"
          >
            {connecting ? 'Connecting...' : 'Connect YouTube Account'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ConnectYoutube() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConnectYoutubeContent />
    </Suspense>
  )
}