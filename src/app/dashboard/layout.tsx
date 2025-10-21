'use client'

import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import { useUser } from '../../contexts/UserContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  const handleSettings = () => {
    router.push('/dashboard/settings')
  }

  const handleSupport = () => {
    // TODO: Navigate to support page or open support modal
    console.log('Navigate to support')
  }

  return (
    <div className="bg-gray-50 h-screen flex">
      {/* Sidebar */}
      <Sidebar
        onSettings={handleSettings}
        onSupport={handleSupport}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}