'use client'

import { useState } from 'react'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { createClient } from '../../../utils/supabase/client'
import Button from '../../../components/Button'

interface SocialPlatform {
  name: string
  provider: string
  icon: React.ReactNode
}

const platforms: SocialPlatform[] = [
  { name: 'Twitter', provider: 'twitter', icon: <FaTwitter /> },
  { name: 'Facebook', provider: 'facebook', icon: <FaFacebook /> },
  { name: 'Instagram', provider: 'instagram', icon: <FaInstagram /> },
  { name: 'LinkedIn', provider: 'linkedin', icon: <FaLinkedin /> },
  { name: 'YouTube', provider: 'google', icon: <FaYoutube /> }, // Google for YouTube
]

export default function ConnectionsPage() {
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = async (provider: string) => {
    setConnecting(provider)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/connections`,
        },
      })
      if (error) {
        console.error('Error connecting:', error)
        alert('Failed to connect. Please try again.')
      }
    } catch (err) {
      console.error('Error:', err)
      alert('An error occurred. Please try again.')
    } finally {
      setConnecting(null)
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Connect Social Accounts</h2>
      <p className="text-gray-600 mb-6">
        Link your social media accounts to start posting across platforms from Post Handle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <div key={platform.provider} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-custom-secondary/10 text-custom-secondary flex items-center justify-center mb-4 text-2xl">
                {platform.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{platform.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Connect your {platform.name} account to post content.
              </p>
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleConnect(platform.provider)}
                disabled={connecting === platform.provider}
              >
                {connecting === platform.provider ? 'Connecting...' : `Connect ${platform.name}`}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}