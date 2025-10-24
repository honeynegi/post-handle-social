'use client'

import { useState } from 'react'
import { FaFileAlt, FaImage, FaVideo, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import Button from '../../../components/Button'

export default function CreatePost() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const selectPostType = (type: string) => {
    setSelectedType(type)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Create a new post</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Text Post Card */}
        <div
          className={`post-card bg-white rounded-2xl shadow-sm border-2 p-3 md:p-6 cursor-pointer hover:border-custom-secondary hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full min-h-48 md:min-h-72 ${
            selectedType === 'text' ? 'border-solid border-custom-secondary shadow-md' : 'border-dashed border-gray-200'
          }`}
          onClick={() => selectPostType('text')}
        >
          <div className="flex flex-col items-center h-full">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-200 ${
              selectedType === 'text' ? 'bg-custom-secondary/10 text-custom-secondary' : 'bg-gray-100 text-gray-600 hover:bg-custom-secondary/10 hover:text-custom-secondary'
            }`}>
              <FaFileAlt className="text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Text Post</h3>

            <div className="flex flex-wrap gap-2 self-start mt-auto">
              <FaFacebookF className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'text' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaTwitter className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'text' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaInstagram className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'text' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaLinkedin className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'text' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaYoutube className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'text' ? 'text-custom-secondary' : 'text-gray-600'}`} />
            </div>
          </div>
        </div>

        {/* Image Post Card */}
        <div
          className={`post-card bg-white rounded-2xl shadow-sm border-2 p-3 md:p-6 cursor-pointer hover:border-custom-secondary hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full min-h-48 md:min-h-72 ${
            selectedType === 'image' ? 'border-solid border-custom-secondary shadow-md' : 'border-dashed border-gray-200'
          }`}
          onClick={() => selectPostType('image')}
        >
          <div className="flex flex-col items-center h-full">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-200 ${
              selectedType === 'image' ? 'bg-custom-secondary/10 text-custom-secondary' : 'bg-gray-100 text-gray-600 hover:bg-custom-secondary/10 hover:text-custom-secondary'
            }`}>
              <FaImage className="text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Image Post</h3>

            <div className="flex flex-wrap gap-2 self-start mt-auto">
              <FaFacebookF className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'image' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaTwitter className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'image' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaInstagram className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'image' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaLinkedin className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'image' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaYoutube className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'image' ? 'text-custom-secondary' : 'text-gray-600'}`} />
            </div>
          </div>
        </div>

        {/* Video Post Card */}
        <div
          className={`post-card bg-white rounded-2xl shadow-sm border-2 p-3 md:p-6 cursor-pointer hover:border-custom-secondary hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full min-h-48 md:min-h-72 ${
            selectedType === 'video' ? 'border-solid border-custom-secondary shadow-md' : 'border-dashed border-gray-200'
          }`}
          onClick={() => selectPostType('video')}
        >
          <div className="flex flex-col items-center h-full">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-200 ${
              selectedType === 'video' ? 'bg-custom-secondary/10 text-custom-secondary' : 'bg-gray-100 text-gray-600 hover:bg-custom-secondary/10 hover:text-custom-secondary'
            }`}>
              <FaVideo className="text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Video Post</h3>

            <div className="flex flex-wrap gap-2 self-start mt-auto">
              <FaFacebookF className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'video' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaTwitter className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'video' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaInstagram className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'video' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaLinkedin className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'video' ? 'text-custom-secondary' : 'text-gray-600'}`} />
              <FaYoutube className={`text-lg opacity-60 hover:opacity-100 transition-opacity duration-200 hover:text-custom-secondary ${selectedType === 'video' ? 'text-custom-secondary' : 'text-gray-600'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E8E8E8] rounded-lg p-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="text-center md:text-left">
            <h3 className="text-md text-gray-800">Connect your social media accounts</h3>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors w-full md:w-auto">
            Connect Accounts
          </Button>
        </div>
      </div>
    </div>
  )
}