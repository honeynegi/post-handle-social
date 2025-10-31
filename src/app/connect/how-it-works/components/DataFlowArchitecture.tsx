'use client'

import { motion } from 'framer-motion'

export default function DataFlowArchitecture() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Overview */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-custom-primary dark:text-white mb-4">
          Complete Data Flow Architecture
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive overview of the connect flow architecture, from user initiation through data storage and retrieval.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            🎯 Key Components
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>• <strong>Frontend</strong>: Next.js (React) Application</li>
            <li>• <strong>Backend</strong>: Next.js API Routes (Server-side)</li>
            <li>• <strong>Database</strong>: Supabase (PostgreSQL)</li>
            <li>• <strong>Authentication</strong>: OAuth 2.0 (Instagram & YouTube)</li>
            <li>• <strong>Session Management</strong>: UID + State Parameters</li>
          </ul>
        </div>
      </motion.div>

      {/* Data Flow Diagram */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-custom-primary dark:text-white mb-6">
          📊 Complete Data Flow
        </h2>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-custom-secondary text-white flex items-center justify-center font-bold mb-4">
                1
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-custom-secondary to-gray-300 dark:to-gray-700" />
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                User Clicks Connect Button (PostHandle App)
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Component:</strong> Frontend (PostHandle App)</p>
                <p><strong>Data:</strong> Generates unique UID (User Identifier)</p>
                <p><strong>Action:</strong> Redirects to post-handle-social app with UID in URL parameter</p>
                <p><strong>URL:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-xs">https://post-handle-social.com/connect/instagram?uid=&lt;UNIQUE_UID&gt;</code></p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-custom-secondary text-white flex items-center justify-center font-bold mb-4">
                2
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-custom-secondary to-gray-300 dark:to-gray-700" />
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Create/Fetch User Record
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Function:</strong> <code className="font-mono text-xs">connectInstagramUser(uid)</code> / <code className="font-mono text-xs">connectYoutubeUser(uid)</code></p>
                <p><strong>Location:</strong> <code className="font-mono text-xs">/src/utils/connect/</code></p>
                <p><strong>Database Query:</strong> Check if user with UID exists in <code className="font-mono text-xs">users</code> table</p>
                <p><strong>If Found:</strong> Return existing user record</p>
                <p><strong>If Not Found:</strong> Create new user record with the UID</p>
                <p><strong>Database:</strong> Supabase PostgreSQL - <code className="font-mono text-xs">users</code> table</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-custom-secondary text-white flex items-center justify-center font-bold mb-4">
                3
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-custom-secondary to-gray-300 dark:to-gray-700" />
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Generate State Parameter & OAuth URL
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Component:</strong> Frontend (Connect Page)</p>
                <p><strong>State Parameter:</strong> UID is stored as state parameter</p>
                <p><strong>Purpose:</strong> Maintain session identity through OAuth redirect</p>
                <p><strong>Security:</strong> CSRF protection - validates state on callback</p>
                <p><strong>URL:</strong> <code className="font-mono text-xs">https://accounts.google.com/oauth?state=&lt;UID&gt;&client_id=...&scope=youtube</code></p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-custom-secondary text-white flex items-center justify-center font-bold mb-4">
                4
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-custom-secondary to-gray-300 dark:to-gray-700" />
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                User Authorization & OAuth Callback
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Provider:</strong> Google (YouTube) / Meta (Instagram)</p>
                <p><strong>User Action:</strong> Logs in and grants permissions</p>
                <p><strong>Callback URL:</strong> <code className="font-mono text-xs">/connect/youtube/callback</code> or <code className="font-mono text-xs">/connect/instagram/callback</code></p>
                <p><strong>Returned Parameters:</strong> Authorization code + state (UID)</p>
                <p><strong>Response:</strong> <code className="font-mono text-xs">?code=&lt;AUTH_CODE&gt;&state=&lt;UID&gt;</code></p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-custom-secondary text-white flex items-center justify-center font-bold mb-4">
                5
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-custom-secondary to-gray-300 dark:to-gray-700" />
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Validate State & Extract UID
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Location:</strong> <code className="font-mono text-xs">/src/app/connect/[platform]/callback/route.ts</code></p>
                <p><strong>Step 1:</strong> Extract state parameter from callback URL</p>
                <p><strong>Step 2:</strong> Validate state equals original UID (CSRF protection)</p>
                <p><strong>Step 3:</strong> Query users table for matching UID</p>
                <p><strong>Error Handling:</strong> Redirect to error page if validation fails</p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-custom-secondary text-white flex items-center justify-center font-bold mb-4">
                6
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-custom-secondary to-gray-300 dark:to-gray-700" />
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Exchange Authorization Code for Tokens
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Endpoint (YouTube):</strong> <code className="font-mono text-xs">https://oauth2.googleapis.com/token</code></p>
                <p><strong>Endpoint (Instagram):</strong> <code className="font-mono text-xs">https://api.instagram.com/oauth/access_token</code></p>
                <p><strong>Request Body:</strong> client_id, client_secret, authorization_code, redirect_uri</p>
                <p><strong>Response:</strong> access_token, refresh_token (YouTube only), expires_in, user_id</p>
                <p><strong>Security:</strong> client_secret never exposed to client - server-side exchange only</p>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-custom-secondary text-white flex items-center justify-center font-bold mb-4">
                7
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-custom-secondary to-gray-300 dark:to-gray-700" />
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Fetch Platform User Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>YouTube:</strong> Query <code className="font-mono text-xs">https://www.googleapis.com/oauth2/v2/userinfo</code></p>
                <p><strong>Instagram:</strong> Query platform API for user profile</p>
                <p><strong>Authentication:</strong> Use access token in Authorization header</p>
                <p><strong>Data Retrieved:</strong> user_id, email (YouTube), username (Instagram)</p>
                <p><strong>Instagram Note:</strong> Exchange short-lived token for long-lived token</p>
              </div>
            </div>
          </div>

          {/* Step 8 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-custom-secondary text-white flex items-center justify-center font-bold mb-4">
                8
              </div>
              <div className="w-1 h-0 bg-gradient-to-b from-custom-secondary to-gray-300 dark:to-gray-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Store Tokens & Connection Data in Database
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Database Operation:</strong> UPDATE users table</p>
                <p><strong>Where Condition:</strong> <code className="font-mono text-xs">uid = &lt;UID_FROM_STATE&gt;</code></p>
                <p><strong>Data Updated:</strong></p>
                <div className="ml-4 mt-2 space-y-1 font-mono text-xs">
                  <p>youtube_access_token (encrypted)</p>
                  <p>youtube_refresh_token (encrypted)</p>
                  <p>youtube_token_expires_at</p>
                  <p>youtube_connected_at</p>
                  <p>instagram_access_token (encrypted)</p>
                  <p>instagram_user_id</p>
                  <p>instagram_connected_at</p>
                  <p>instagram_expires_in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Database Schema in Context */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-custom-primary dark:text-white mb-6">
          💾 Database Schema in Data Flow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Users Table */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              👥 users Table
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Primary Key</p>
                <p className="text-gray-600 dark:text-gray-400"><code className="font-mono">uid</code> (text, NOT NULL)</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Metadata</p>
                <p className="text-gray-600 dark:text-gray-400"><code className="font-mono">created_at</code> - User creation timestamp</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Instagram Connection</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                  <li>• <code className="font-mono">instagram_user_id</code></li>
                  <li>• <code className="font-mono">instagram_access_token</code> 🔒 encrypted</li>
                  <li>• <code className="font-mono">instagram_connected_at</code></li>
                  <li>• <code className="font-mono">instagram_expires_in</code></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">YouTube Connection</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                  <li>• <code className="font-mono">youtube_access_token</code> 🔒 encrypted</li>
                  <li>• <code className="font-mono">youtube_refresh_token</code> 🔒 encrypted</li>
                  <li>• <code className="font-mono">youtube_token_expires_at</code></li>
                  <li>• <code className="font-mono">youtube_connected_at</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Flow Context */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-4">
              🔄 Flow Context Usage
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-300">Step 1-2: User Creation</p>
                <p className="text-blue-800 dark:text-blue-400">UID passed from PostHandle app is used as PRIMARY KEY to create/retrieve user record</p>
              </div>
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-300">Step 3-4: Session Persistence</p>
                <p className="text-blue-800 dark:text-blue-400">UID stored in state parameter maintains connection between OAuth redirects</p>
              </div>
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-300">Step 5: Validation</p>
                <p className="text-blue-800 dark:text-blue-400">State parameter (UID) validated to ensure same user making the connection</p>
              </div>
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-300">Step 8: Storage</p>
                <p className="text-blue-800 dark:text-blue-400">Tokens and connection metadata stored in users table using UID as lookup key</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Function Flow */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-custom-primary dark:text-white mb-6">
          🔧 Code Flow Execution
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Frontend: Connect Page Initialization
            </h3>
            <div className="font-mono text-xs bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded overflow-x-auto">
              <pre>{`// 1. User arrives with UID parameter
// /connect/instagram?uid=abc123

// 2. Call utility function with UID
const user = await connectInstagramUser(uid)

// 3. Generates OAuth URL with state=uid
const instagramAuthUrl = \`
  https://www.instagram.com/oauth/authorize?
  state=\${uid}&
  client_id=xxx&
  redirect_uri=xxx
\`

// 4. Redirect to Instagram OAuth
window.location.href = instagramAuthUrl`}</pre>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Backend: Utility Function - Create/Fetch User
            </h3>
            <div className="font-mono text-xs bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded overflow-x-auto">
              <pre>{`// /utils/connect/instagramConnect.ts

export async function connectInstagramUser(uid) {
  const supabase = createClient()
  
  if (uid) {
    // Try to find existing user
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('uid', uid)
      .single()
    
    if (existingUser) {
      return existingUser  // User exists
    } else {
      // Create new user with UID
      const { data: newUser } = await supabase
        .from('users')
        .insert({ uid: uid })
        .select()
        .single()
      
      return newUser  // User created
    }
  }
}`}</pre>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Backend: OAuth Callback Handler
            </h3>
            <div className="font-mono text-xs bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded overflow-x-auto">
              <pre>{`// /app/connect/instagram/callback/route.ts

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')  // This is the UID
  
  // 1. Validate state (CSRF protection)
  if (!state) return redirect('/error')
  
  // 2. Exchange code for token
  const tokenData = await fetch('...', {
    body: { code, client_id, client_secret }
  })
  
  // 3. Get user info from platform
  const userData = await fetch('...', {
    headers: { Authorization: \`Bearer \${token}\` }
  })
  
  // 4. Find user in database using state (UID)
  const dbUser = await supabase
    .from('users')
    .select('*')
    .eq('uid', state)
    .single()
  
  // 5. Update user with connection data
  await supabase
    .from('users')
    .update({
      instagram_user_id: userData.id,
      instagram_access_token: token,
      instagram_connected_at: now()
    })
    .eq('uid', state)  // Using UID to identify user
}`}</pre>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Concepts */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-custom-primary dark:text-white mb-6">
          🎓 Key Concepts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
              UID (User Identifier)
            </h3>
            <p className="text-sm text-green-800 dark:text-green-400 mb-3">
              Unique identifier generated by PostHandle app to track individual connection sessions
            </p>
            <ul className="text-xs text-green-800 dark:text-green-400 space-y-1">
              <li>• Generated fresh for each connection attempt</li>
              <li>• Used as database Primary Key</li>
              <li>• Stored in OAuth state parameter</li>
              <li>• Links all steps in the connection flow</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
              State Parameter
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-400 mb-3">
              Security mechanism in OAuth 2.0 to prevent CSRF attacks
            </p>
            <ul className="text-xs text-yellow-800 dark:text-yellow-400 space-y-1">
              <li>• Contains UID in our implementation</li>
              <li>• Generated by frontend before redirect</li>
              <li>• Returned by OAuth provider in callback</li>
              <li>• Validated by backend to ensure same user</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-3">
              Token Storage
            </h3>
            <p className="text-sm text-purple-800 dark:text-purple-400 mb-3">
              How sensitive OAuth tokens are managed
            </p>
            <ul className="text-xs text-purple-800 dark:text-purple-400 space-y-1">
              <li>• Never exposed to client/frontend</li>
              <li>• Stored encrypted in Supabase</li>
              <li>• Server-side only in API routes</li>
              <li>• YouTube uses refresh tokens for renewal</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 dark:text-red-300 mb-3">
              Session Persistence
            </h3>
            <p className="text-sm text-red-800 dark:text-red-400 mb-3">
              Maintaining user context through OAuth redirects
            </p>
            <ul className="text-xs text-red-800 dark:text-red-400 space-y-1">
              <li>• URL parameters carry UID through redirects</li>
              <li>• UID persists from frontend to backend</li>
              <li>• No session cookies needed for stateless flow</li>
              <li>• Works across domain boundaries</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* File Structure */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-custom-primary dark:text-white mb-6">
          📁 Relevant Code Files
        </h2>

        <div className="space-y-4">
          <div className="border-l-4 border-custom-secondary p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="font-mono font-semibold text-custom-secondary text-sm mb-2">
              /src/utils/connect/instagramConnect.ts
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Creates or fetches user from database with UID. Entry point for Instagram connection.
            </p>
          </div>

          <div className="border-l-4 border-custom-secondary p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="font-mono font-semibold text-custom-secondary text-sm mb-2">
              /src/utils/connect/youtubeConnect.ts
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Creates or fetches user from database with UID. Entry point for YouTube connection.
            </p>
          </div>

          <div className="border-l-4 border-custom-secondary p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="font-mono font-semibold text-custom-secondary text-sm mb-2">
              /src/app/connect/instagram/callback/route.ts
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Handles Instagram OAuth callback. Exchanges code for tokens and stores in database.
            </p>
          </div>

          <div className="border-l-4 border-custom-secondary p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="font-mono font-semibold text-custom-secondary text-sm mb-2">
              /src/app/connect/youtube/callback/route.ts
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Handles YouTube OAuth callback. Exchanges code for tokens and stores in database.
            </p>
          </div>

          <div className="border-l-4 border-custom-secondary p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="font-mono font-semibold text-custom-secondary text-sm mb-2">
              /src/contexts/UserContext.tsx
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              React Context for managing authenticated user state and session.
            </p>
          </div>

          <div className="border-l-4 border-custom-secondary p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <p className="font-mono font-semibold text-custom-secondary text-sm mb-2">
              /src/app/connect/how-it-works/data/flowConfig.ts
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Documentation of database schema and connection flow steps (this file!).
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
