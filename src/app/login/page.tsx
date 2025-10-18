'use client'

import { useState } from 'react'
import { FaArrowLeft, FaComment } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  const [activeTab, setActiveTab] = useState('signin')

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
        {/* Home Button */}
        <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
          <FaArrowLeft className="mr-2" />
          <span className="font-medium">Home</span>
        </button>

        {/* Tabs */}
        <div className="flex space-x-8">
          <button
            className={`pb-2 px-1 font-medium ${activeTab === 'signin' ? 'tab-active border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700 transition-colors'}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`pb-2 px-1 font-medium ${activeTab === 'signup' ? 'tab-active border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700 transition-colors'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Google Sign In Button */}
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors mb-4">
            <FcGoogle className="w-5 h-5 mr-3" />
            <span className="text-gray-700 font-medium">Sign - In with Google</span>
          </button>

          {/* OR Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              value="tom@cruise.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              readOnly
            />
          </div>

          {/* Cloudflare Verification */}
          <div className="mb-6">
            <label className="flex items-start cursor-pointer">
              <input type="checkbox" className="mt-1 mr-3" defaultChecked />
              <span className="text-sm text-gray-600">
                I'm human, not a robot. This site is protected by reCAPTCHA and the Google
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> apply.
              </span>
            </label>
          </div>

          {/* Send Magic Link Button */}
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4">
            Send Magic Link
          </button>

          {/* Alternative Options */}
          <div className="flex justify-between items-center text-sm">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              Use Password
            </button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              Forgot your password?
            </button>
          </div>
        </div>
      </div>

      {/* Chat Icon */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
          <FaComment className="text-xl" />
        </button>
      </div>
    </div>
  )
}