'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import MobileBottomTray from '../../components/MobileBottomTray'
import { useUser } from '../../contexts/UserContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
      <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'} fixed md:relative inset-y-0 left-0 z-50`}>
        <Sidebar
          onSettings={handleSettings}
          onSupport={handleSupport}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
        {/* Bottom spacer for mobile tray */}
        <div className="h-20 md:hidden"></div>
      </div>

      {/* Bottom Tray for Mobile */}
      <MobileBottomTray
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  )
}