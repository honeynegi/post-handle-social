'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/Button'
import { FaInstagram } from 'react-icons/fa'
import { connectInstagramUser } from '@/utils/connect/instagramConnect'

function ConnectInstagramContent() {
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
      const connectedUser = await connectInstagramUser(uid)
      setUser(connectedUser)

      // Build Instagram OAuth URL directly
      const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID
      const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI

      if (!clientId) {
        throw new Error('Instagram client not configured')
      }

      const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=833513479113970&redirect_uri=https://post-handle-social.pages.dev/connect/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`

    //   console.log('Redirecting to Instagram OAuth:', instagramAuthUrl)
      window.location.href = instagramAuthUrl
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
            <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaInstagram className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Connection Successful!
            </h2>
            <p className="text-gray-600">
              Your Instagram account has been successfully connected. You can now close this webview.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (errorParam) {
    const errorMessages: { [key: string]: string } = {
      oauth_failed: 'Instagram authorization failed. Please try again.',
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
              <FaInstagram className="h-12 w-12 text-red-600" />
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
          <div className="mx-auto h-20 w-20 bg-custom-secondary/10 rounded-full flex items-center justify-center mb-4">
            <FaInstagram className="h-12 w-12 text-custom-secondary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Connect your Instagram account
          </h2>

          <div className="text-left bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Login with Instagram
            </h3>
            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mb-3">
              Recommended
            </span>
            <p className="text-gray-600 mb-4">
              The simplest way to directly link your Instagram Business or Creator account.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Requires Instagram Business or Creator profile. <a href="https://help.instagram.com/502981923235522" target="_blank" rel="noopener noreferrer" className="text-custom-secondary hover:underline">(How to set up?)</a></li>
              <li>• To add another account, log out/switch on instagram.com first.</li>
            </ul>
          </div>

          <Button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full"
          >
            {connecting ? 'Connecting...' : 'Connect Instagram Account'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ConnectInstagram() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConnectInstagramContent />
    </Suspense>
  )
}