export interface FlowStep {
  id: string
  title: string
  description: string
  icon: string
  details?: string[]
}

export interface Platform {
  name: string
  icon: string
  color: string
  steps: FlowStep[]
  storedFields: StoredField[]
}

export interface StoredField {
  field: string
  description: string
  sensitivity: 'public' | 'sensitive' | 'encrypted'
  example?: string
}

export interface DatabaseColumn {
  name: string
  type: string
  nullable: boolean
  default?: string
  description: string
}

export interface DatabaseSchema {
  tableName: string
  description: string
  columns: DatabaseColumn[]
  primaryKey: string
  uniqueConstraints: string[]
}

export const DATABASE_SCHEMA: DatabaseSchema = {
  tableName: 'public.users',
  description: 'Stores user account information and connected social media credentials',
  columns: [
    {
      name: 'uid',
      type: 'text',
      nullable: false,
      description: 'Unique identifier for the user (Primary Key)',
    },
    {
      name: 'created_at',
      type: 'timestamp with time zone',
      nullable: false,
      default: 'now()',
      description: 'Timestamp when the user account was created',
    },
    {
      name: 'instagram_user_id',
      type: 'text',
      nullable: true,
      description: 'Instagram Business Account ID (from Instagram Graph API)',
    },
    {
      name: 'instagram_access_token',
      type: 'character varying',
      nullable: true,
      description: 'Long-lived access token for Instagram Graph API (encrypted)',
    },
    {
      name: 'instagram_connected_at',
      type: 'timestamp without time zone',
      nullable: true,
      description: 'Timestamp when Instagram account was connected',
    },
    {
      name: 'instagram_expires_in',
      type: 'numeric',
      nullable: true,
      description: 'Token expiration duration in seconds',
    },
    {
      name: 'youtube_access_token',
      type: 'text',
      nullable: true,
      description: 'Access token for YouTube API (expires in ~1 hour, encrypted)',
    },
    {
      name: 'youtube_refresh_token',
      type: 'text',
      nullable: true,
      description: 'Refresh token for YouTube API (can be used to get new access tokens, encrypted)',
    },
    {
      name: 'youtube_token_expires_at',
      type: 'timestamp with time zone',
      nullable: true,
      description: 'Timestamp when YouTube access token expires',
    },
    {
      name: 'youtube_connected_at',
      type: 'timestamp with time zone',
      nullable: true,
      description: 'Timestamp when YouTube account was connected',
    },
  ],
  primaryKey: 'uid',
  uniqueConstraints: ['uid'],
}

export const PLATFORMS: Record<string, Platform> = {
  youtube: {
    name: 'YouTube',
    icon: '📺',
    color: '#FF0000',
    steps: [
      {
        id: 'user-initiates',
        title: 'User Initiates Connection',
        description: 'User clicks "Connect YouTube Account" from the PostHandle App',
        icon: '👤',
        details: [
          'User clicks "Connect YouTube Account" from the PostHandle app',
          'User gets redirected to the post-handle-social app',
          'User is on the connect page with UID parameter in the URL',
          'UID is passed as a parameter in the URL for the session',
          'State parameter is created to keep the UID persistent during the redirect process for user identity',
        ],
      },
      {
        id: 'oauth-redirect',
        title: 'OAuth Authorization Request',
        description: 'User is redirected to YouTube OAuth consent screen',
        icon: '🔐',
        details: [
          'Redirect to Google OAuth endpoint',
          'Requesting specific scopes for YouTube Data API',
          'State parameter is included for UID persistence',
          'Client ID is sent to Google',
        ],
      },
      {
        id: 'user-consent',
        title: 'User Grants Permission',
        description: 'User reviews and approves access permissions',
        icon: '✅',
        details: [
          'User sees what data we are requesting',
          'User can grant or deny access',
          'If approved, authorization code is generated',
        ],
      },
      {
        id: 'callback',
        title: 'Authorization Code Callback',
        description: 'User is redirected back to our application with authorization code',
        icon: '🔄',
        details: [
          'OAuth provider redirects to callback URL',
          'Authorization code is included in URL',
          'State parameter is validated',
          'Backend receives the code',
        ],
      },
      {
        id: 'token-exchange',
        title: 'Backend: Exchange Code for Token',
        description: 'Our backend exchanges the code for access & refresh tokens',
        icon: '🔑',
        details: [
          'POST request to Google OAuth token endpoint',
          'Include: Client ID, Client Secret, Authorization Code',
          'Receive: Access Token, Refresh Token, Expiry Time',
          'Tokens are kept secure on server-side',
        ],
      },
      {
        id: 'store-data',
        title: 'Backend: Store Data in Database',
        description: 'Save tokens and user info to Supabase securely',
        icon: '💾',
        details: [
          'Store access token',
          'Store refresh token',
          'Record connection timestamp',
          'Track token expiration date',
        ],
      },
      {
        id: 'success',
        title: 'Connection Complete',
        description: 'User is redirected to success page',
        icon: '🎉',
        details: [
          'YouTube account is now connected',
          'User can manage this connection in dashboard',
          'Can publish/schedule content via our platform',
        ],
      },
    ],
    storedFields: [
      {
        field: 'youtube_access_token',
        description: 'Token for API requests (expires in ~1 hour)',
        sensitivity: 'encrypted',
        example: 'ya29.a0AfH6SMBx...',
      },
      {
        field: 'youtube_refresh_token',
        description: 'Token used to refresh access token without re-authentication',
        sensitivity: 'encrypted',
        example: '1//0gI7r...',
      },
      {
        field: 'youtube_token_expires_at',
        description: 'Timestamp when access token expires',
        sensitivity: 'public',
        example: '2024-11-01T12:00:00Z',
      },
      {
        field: 'youtube_connected_at',
        description: 'Timestamp when connection was established',
        sensitivity: 'public',
        example: '2024-10-31T10:30:00Z',
      },
    ],
  },
  instagram: {
    name: 'Instagram',
    icon: '📸',
    color: '#E1306C',
    steps: [
      {
        id: 'user-initiates',
        title: 'User Initiates Connection',
        description: 'User clicks "Connect Instagram Account" from the PostHandle App',
        icon: '👤',
        details: [
          'User clicks "Connect Instagram Account" from the PostHandle app',
          'User gets redirected to the post-handle-social app',
          'User is on the connect page with UID parameter in the URL',
          'UID is passed as a parameter in the URL for the session',
          'State parameter is created to keep the UID persistent during the redirect process for user identity',
        ],
      },
      {
        id: 'oauth-redirect',
        title: 'OAuth Authorization Request',
        description: 'User is redirected to Instagram OAuth consent screen',
        icon: '🔐',
        details: [
          'Redirect to Instagram Graph API OAuth endpoint',
          'Requesting Business Account & Content management scopes',
          'State parameter is included for UID persistence',
          'Client ID is sent to Instagram',
        ],
      },
      {
        id: 'user-consent',
        title: 'User Grants Permission',
        description: 'User reviews and approves access permissions',
        icon: '✅',
        details: [
          'User sees requested scopes (requires Business/Creator account)',
          'Must have Instagram Business or Creator profile',
          'User can grant or deny access',
          'If approved, authorization code is generated',
        ],
      },
      {
        id: 'callback',
        title: 'Authorization Code Callback',
        description: 'User is redirected back to our application with authorization code',
        icon: '🔄',
        details: [
          'OAuth provider redirects to callback URL',
          'Authorization code is included in URL',
          'State parameter is validated',
          'Backend receives the code',
        ],
      },
      {
        id: 'token-exchange',
        title: 'Backend: Exchange Code for Token',
        description: 'Our backend exchanges the code for access & long-lived tokens',
        icon: '🔑',
        details: [
          'POST request to Instagram Graph API token endpoint',
          'Include: Client ID, Client Secret, Authorization Code',
          'Receive: Access Token (long-lived), Instagram User ID',
          'Tokens are kept secure on server-side',
        ],
      },
      {
        id: 'store-data',
        title: 'Backend: Store Data in Database',
        description: 'Save tokens and user info to Supabase securely',
        icon: '💾',
        details: [
          'Store access token (encrypted)',
          'Store user ID',
          'Record connection timestamp',
          'Track token expiration date',
        ],
      },
      {
        id: 'success',
        title: 'Connection Complete',
        description: 'User is redirected to success page',
        icon: '🎉',
        details: [
          'Instagram account is now connected',
          'User can manage this connection in dashboard',
          'Can publish/schedule content via our platform',
        ],
      },
    ],
    storedFields: [
      {
        field: 'instagram_user_id',
        description: 'Unique identifier for the Instagram Business Account',
        sensitivity: 'public',
        example: '17841406338772941',
      },
      {
        field: 'instagram_access_token',
        description: 'Long-lived token for API requests (can last months/years)',
        sensitivity: 'encrypted',
        example: 'IGQVJWaF...',
      },
      {
        field: 'instagram_connected_at',
        description: 'Timestamp when connection was established',
        sensitivity: 'public',
        example: '2024-10-31T10:30:00Z',
      },
      {
        field: 'instagram_expires_in',
        description: 'Duration in seconds until the access token expires',
        sensitivity: 'public',
        example: '5184000',
      },
    ],
  },
}
