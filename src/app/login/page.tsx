'use client'

import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import { FaArrowLeft, FaComment } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Button from '../../components/Button'

export default function Login() {
  const [activeTab, setActiveTab] = useState('signin')
  const [usePassword, setUsePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-xl p-12 bg-white rounded-lg">
        {/* Home Button */}
        <div className="flex justify-start mb-12 -ml-12">
          <Button
            size='lg'
            variant="text"
            className="text-gray-600 hover:text-gray-800 p-0 h-auto"
            onClick={() => router.push('/')}
          >
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Home</span>
          </Button>
        </div>

        {/* Sign In/Sign Up Toggle */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'signin' ? 'primary' : 'ghost'}
            className={`flex-1 ${activeTab === 'signin' ? 'bg-custom-secondary hover:bg-custom-secondary/90 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </Button>
          <Button
            variant={activeTab === 'signup' ? 'primary' : 'ghost'}
            className={`flex-1 ${activeTab === 'signup' ? 'bg-custom-secondary hover:bg-custom-secondary/90 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </Button>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === 'signin' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-gray-600 mt-2">
            {activeTab === 'signin' ? 'Sign in to your account' : 'Join us today and start managing your social media'}
          </p>
        </div>

        {/* Google Sign In Button */}
        <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors mb-6">
          <FcGoogle className="w-5 h-5 mr-3" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        {/* OR Separator */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-300"
          />
        </div>

        {/* Username Input - Only show for sign up */}
        {activeTab === 'signup' && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-300"
            />
          </div>
        )}

        {/* Password Input - Always show for sign up, conditionally for sign in */}
        {(activeTab === 'signup' || usePassword) && (
          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-300"
            />
          </div>
        )}

        {/* Cloudflare Verification */}
        <div className="mb-8">
          <label className="flex items-start cursor-pointer">
            <input type="checkbox" className="mt-1 mr-3" defaultChecked />
            <span className="text-sm text-gray-600">
              I'm human, not a robot. This site is protected by reCAPTCHA and the Google
              <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a> and
              <a href="#" className="text-blue-600 hover:underline"> Terms of Service</a> apply.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        {activeTab === 'signup' ? (
          <>
            <Button
              variant="primary"
              fullWidth
              className="text-white mb-6 font-semibold"
              onClick={() => {}}
            >
              Create account
            </Button>
            <div className="text-center text-sm text-gray-600 mb-0">
              Already have an account?
              <Button
                variant="link"
                className="text-custom-secondary hover:text-custom-secondary/80 p-0 h-auto font-medium"
                onClick={() => setActiveTab('signin')}
              >
                Sign in
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              fullWidth
              className="text-white mb-6 font-semibold"
              onClick={() => setUsePassword(false)}
            >
              {usePassword ? 'Sign In' : 'Send Magic Link'}
            </Button>
            <Button
              variant="outline"
              fullWidth
              className="bg-white border-none hover:bg-custom-secondary text-gray-700 mb-6 font-semibold"
              onClick={() => setUsePassword(v => !v)}
            >
              {usePassword ? 'Send Magic Link' : 'Use password'}
            </Button>
          </>
        )}

        {/* Alternative Options */}
        <div className="flex justify-center items-center text-sm">
          <Button variant="link" className="text-gray-600 p-0 h-auto">
            Forgot your password?
          </Button>
        </div>
      </div>
    </div>
  )
}