'use client'

import { useState } from 'react'
import { FaHome, FaEdit, FaFileAlt, FaCog, FaUser, FaImage, FaVideo, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaChevronDown } from 'react-icons/fa'

export default function Home() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const selectPostType = (type: string) => {
    setSelectedType(type)
  }

  return (
    <div className="bg-gray-50 h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md relative">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-custom-primary">Post handle</h1>
        </div>

        <nav className="mt-6">
          <a href="#" className="sidebar-item flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200">
            <FaHome className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="sidebar-item active flex items-center px-6 py-3 text-gray-700 bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600">
            <FaEdit className="mr-3 h-5 w-5" />
            <span>Create post</span>
          </a>
          <a href="#" className="sidebar-item flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200">
            <FaFileAlt className="mr-3 h-5 w-5" />
            <span>Posts</span>
          </a>
          <a href="#" className="sidebar-item flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200">
            <FaCog className="mr-3 h-5 w-5" />
            <span>Configuration</span>
          </a>
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <FaUser />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
            <FaChevronDown className="ml-auto text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
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
      </div>
    </div>
  )
}
