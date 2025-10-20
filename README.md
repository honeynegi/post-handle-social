# Post Handle Social

A social media management platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User authentication with Supabase
- Responsive design with mobile-first approach
- Modern UI components
- Social media management tools

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/honeynegi/post-handle-social.git
cd post-handle-social
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:

   a. Create a new project at [supabase.com](https://supabase.com)

   b. Go to Settings > API to find your project URL and anon key

   c. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Configure Supabase Auth:

   a. Go to Authentication > Settings in your Supabase dashboard

   b. Add your site URL: `http://localhost:3000` (for development)

   c. Configure OAuth providers (Google, etc.) if needed

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication routes
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── Button.tsx         # Button component
│   ├── Header.tsx         # Header component
│   ├── MobileMenu.tsx     # Mobile menu component
│   └── Footer.tsx         # Footer component
└── utils/                 # Utility functions
    └── supabase/          # Supabase configuration
        ├── client.ts      # Browser client
        ├── server.ts      # Server client
        └── middleware.ts  # Auth middleware
```

## Authentication

This project uses Supabase for authentication with support for:

- Email/password authentication
- Magic link authentication
- OAuth providers (Google, etc.)
- User registration and login

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Authentication:** Supabase
- **Icons:** React Icons
- **State Management:** React hooks

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add your Supabase environment variables in Vercel dashboard
3. Update your Supabase site URL to your production domain
4. Deploy!

### Other Platforms

Make sure to set the environment variables and update Supabase configuration for your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.
