'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DATABASE_SCHEMA } from '../data/flowConfig'

export default function DatabaseSchemaSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-custom-primary dark:text-white mb-2 flex items-center gap-2">
          💾 Database Schema
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Understand how user data and connection tokens are stored in our PostgreSQL database
        </p>
      </div>

      {/* Table Overview */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Table Name
            </h4>
            <p className="text-lg font-mono font-bold text-custom-primary dark:text-custom-secondary">
              {DATABASE_SCHEMA.tableName}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Primary Key
            </h4>
            <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
              {DATABASE_SCHEMA.primaryKey}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Total Columns
            </h4>
            <p className="text-lg font-mono font-bold text-green-600 dark:text-green-400">
              {DATABASE_SCHEMA.columns.length}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {DATABASE_SCHEMA.description}
        </p>
      </div>

      {/* Column Details - Expandable */}
      <div className="mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        >
          <span className="font-semibold text-blue-900 dark:text-blue-300">
            Column Details & Types
          </span>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </button>

        {/* Expanded Column Table */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isExpanded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    Column Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    Data Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    Nullable
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {DATABASE_SCHEMA.columns.map((column, idx) => (
                  <motion.tr
                    key={column.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * idx }}
                    className="border-b border-gray-700 bg-gray-800 dark:bg-gray-800 hover:bg-gray-750 dark:hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <code className="font-mono font-semibold text-custom-secondary text-xs">
                        {column.name}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-gray-300 text-xs bg-gray-700 px-2 py-1 rounded">
                        {column.type}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          column.nullable
                            ? 'bg-yellow-900/40 text-yellow-300'
                            : 'bg-green-900/40 text-green-300'
                        }`}
                      >
                        {column.nullable ? 'YES' : 'NO'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {column.description}
                      {column.default && (
                        <div className="text-xs text-gray-400 mt-1">
                          Default: <code className="bg-gray-700 px-1 rounded">{column.default}</code>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Column Grouping */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Core Columns */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            🔑 Core Columns
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li className="font-mono">uid</li>
            <li className="font-mono">created_at</li>
          </ul>
        </div>

        {/* Instagram Columns */}
        <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
          <h4 className="font-semibold text-pink-900 dark:text-pink-300 mb-3">
            📸 Instagram Fields
          </h4>
          <ul className="text-sm text-pink-800 dark:text-pink-400 space-y-2">
            <li className="font-mono text-xs">instagram_user_id</li>
            <li className="font-mono text-xs">instagram_access_token</li>
            <li className="font-mono text-xs">instagram_connected_at</li>
            <li className="font-mono text-xs">instagram_expires_in</li>
          </ul>
        </div>

        {/* YouTube Columns */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h4 className="font-semibold text-red-900 dark:text-red-300 mb-3">
            📺 YouTube Fields
          </h4>
          <ul className="text-sm text-red-800 dark:text-red-400 space-y-2">
            <li className="font-mono text-xs">youtube_access_token</li>
            <li className="font-mono text-xs">youtube_refresh_token</li>
            <li className="font-mono text-xs">youtube_token_expires_at</li>
            <li className="font-mono text-xs">youtube_connected_at</li>
          </ul>
        </div>
      </div>

      {/* SQL Definition */}
      <div className="mt-8 bg-gray-900 dark:bg-gray-950 rounded-lg p-6 overflow-x-auto">
        <h4 className="text-sm font-semibold text-gray-300 mb-4">PostgreSQL Definition</h4>
        <pre className="text-xs text-green-400 font-mono leading-relaxed whitespace-pre-wrap break-words">
          {`CREATE TABLE public.users (
  uid text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  instagram_user_id text NULL,
  instagram_access_token character varying NULL,
  instagram_connected_at timestamp without time zone NULL,
  instagram_expires_in numeric NULL,
  youtube_access_token text NULL,
  youtube_refresh_token text NULL,
  youtube_token_expires_at timestamp with time zone NULL,
  youtube_connected_at timestamp with time zone NULL,
  CONSTRAINT users_pkey PRIMARY KEY (uid),
  CONSTRAINT users_uid_key UNIQUE (uid)
) TABLESPACE pg_default;`}
        </pre>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
          🔒 Security Notes
        </h4>
        <ul className="text-sm text-purple-800 dark:text-purple-400 space-y-2">
          <li>
            • <strong>Tokens are encrypted</strong> at rest using Supabase encryption features
          </li>
          <li>
            • <strong>UID is immutable</strong> and serves as the unique identifier for users across both platforms
          </li>
          <li>
            • <strong>All timestamp fields</strong> use UTC timezone for consistency
          </li>
          <li>
            • <strong>Instagram tokens</strong> are long-lived (can persist for extended periods)
          </li>
          <li>
            • <strong>YouTube tokens</strong> require refresh mechanism (access tokens expire in ~1 hour)
          </li>
        </ul>
      </div>
    </motion.div>
  )
}
