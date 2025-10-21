'use client'

import { useRouter } from 'next/navigation'
import ProfileCard from '../../../components/ProfileCard'
import AccountCard from '../../../components/AccountCard'
import { useUser } from '../../../contexts/UserContext'

export default function Settings() {
  const { user, loading } = useUser()
  const router = useRouter()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

        <div className="space-y-8">
          <ProfileCard user={user} />
          <AccountCard />
        </div>
      </div>
    </div>
  )
}