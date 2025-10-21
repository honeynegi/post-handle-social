'use client'

import { useState } from 'react'
import { FaFileAlt, FaImage, FaVideo, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

export default function CreatePost() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const selectPostType = (type: string) => {
    setSelectedType(type)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Create a new post</h2>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Text Post Card */}
        <div
          className={`post-card bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 ${
            selectedType === 'text' ? 'border-indigo-500 shadow-md' : 'border-gray-200'
          }`}
          onClick={() => selectPostType('text')}
        >
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedType === 'text' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
            }`}>
              <FaFileAlt className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Text Post</h3>

            <div className="flex mt-4 space-x-2">
              <FaFacebookF className="text-blue-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaTwitter className="text-blue-400 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaInstagram className="text-pink-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaLinkedin className="text-blue-700 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaYoutube className="text-red-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>

        {/* Image Post Card */}
        <div
          className={`post-card bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 ${
            selectedType === 'image' ? 'border-indigo-500 shadow-md' : 'border-gray-200'
          }`}
          onClick={() => selectPostType('image')}
        >
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedType === 'image' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
            }`}>
              <FaImage className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Image Post</h3>

            <div className="flex mt-4 space-x-2">
              <FaFacebookF className="text-blue-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaTwitter className="text-blue-400 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaInstagram className="text-pink-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaLinkedin className="text-blue-700 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaYoutube className="text-red-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>

        {/* Video Post Card */}
        <div
          className={`post-card bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 ${
            selectedType === 'video' ? 'border-indigo-500 shadow-md' : 'border-gray-200'
          }`}
          onClick={() => selectPostType('video')}
        >
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedType === 'video' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
            }`}>
              <FaVideo className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Video Post</h3>

            <div className="flex mt-4 space-x-2">
              <FaFacebookF className="text-blue-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaTwitter className="text-blue-400 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaInstagram className="text-pink-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaLinkedin className="text-blue-700 opacity-60 hover:opacity-100 transition-opacity duration-200" />
              <FaYoutube className="text-red-600 opacity-60 hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Connect your social media accounts</h3>
            <p className="text-sm text-gray-500 mt-1">Link your accounts to start posting across platforms</p>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
            Connect Accounts
          </button>
        </div>
      </div>
    </div>
  )
}