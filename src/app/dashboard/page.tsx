'use client'

import { useState } from 'react'
import { FaFileAlt, FaEdit, FaCog } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Button from '../../components/Button'

export default function Home() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  const selectPostType = (type: string) => {
    setSelectedType(type)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Create Post Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/create')}>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <FaEdit className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Create New Post</h3>
            <p className="text-sm text-gray-500">Start creating content for your social media</p>
          </div>
        </div>

        {/* Posts Overview Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <FaFileAlt className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Your Posts</h3>
            <p className="text-sm text-gray-500">View and manage your published content</p>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/settings')}>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <FaCog className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Settings</h3>
            <p className="text-sm text-gray-500">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      <div className="bg-[#E8E8E8] rounded-lg p-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="text-center md:text-left">
            <h3 className="text-md text-gray-800">Connect your social media accounts</h3>
            <p className="text-sm text-gray-500 mt-1">Link your accounts to start posting across platforms</p>
          </div>
          <Button onClick={() => router.push('/dashboard/connections')} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors w-full md:w-auto">
            Connect Accounts
          </Button>
        </div>
      </div>
    </div>
  )
}
