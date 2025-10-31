'use client'

import { useState } from 'react'
import Tab from './components/Tab'
import FlowDiagram from './components/FlowDiagram'
import DatabaseSchema from './components/DatabaseSchema'
import DataFlowArchitecture from './components/DataFlowArchitecture'
import { PLATFORMS } from './data/flowConfig'

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('youtube')
  const platformKeys = Object.keys(PLATFORMS)
  const currentPlatform = PLATFORMS[activeTab]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-custom-primary dark:text-white mb-4">
              How Connection Works
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Understand the complete flow of how we connect your Instagram and YouTube accounts
              securely. Learn what data we store and how your information is protected.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="mb-12">
          <Tab
            platforms={platformKeys}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Platform Info */}
        <div className="grid gap-12">
          {/* Flow Diagram Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{currentPlatform.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold text-custom-primary dark:text-white">
                    {currentPlatform.name} Connection Flow
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Step-by-step process of connecting your account securely
                  </p>
                </div>
              </div>
            </div>

            {/* Animated Flow Diagram */}
            <FlowDiagram platform={activeTab} />
          </div>

          {/* Data Storage Section - Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-custom-primary dark:text-white mb-6">
              Data We Store
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Here's exactly what information we store when you connect your {currentPlatform.name}{' '}
              account and how we protect it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPlatform.storedFields.map((field) => (
                <div
                  key={field.field}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {field.field}
                    </h4>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        field.sensitivity === 'encrypted'
                          ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                          : field.sensitivity === 'sensitive'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      }`}
                    >
                      {field.sensitivity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {field.description}
                  </p>
                  {field.example && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                      Example: {field.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security & Privacy Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-custom-primary dark:text-white mb-6">
              Security & Privacy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  🔐 Data Encryption
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Sensitive tokens are encrypted at rest in our Supabase database. All data transfers
                  use HTTPS/TLS encryption.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  ✅ OAuth 2.0 Standard
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  We use industry-standard OAuth 2.0 protocol with state parameter protection against
                  CSRF attacks.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  🔑 Token Management
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Refresh tokens are securely stored. Access tokens are kept on server-side only. Tokens
                  are never exposed to the client.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  🚫 Minimal Permissions
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  We request only the minimum permissions necessary to publish and manage your content on
                  both platforms.
                </p>
              </div>
            </div>
          </div>

          {/* Database Schema Section */}
          <DatabaseSchema />

          {/* Data Flow Architecture Section */}
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-12">
            <DataFlowArchitecture />
          </div>
        </div>
      </div>
    </div>
  )
}
