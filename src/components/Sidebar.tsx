'use client'

import { useState, useEffect, useRef } from 'react'
import { FaHome, FaEdit, FaFileAlt, FaCog, FaUser, FaChevronDown, FaQuestionCircle } from 'react-icons/fa'
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from './Button';
import { useUser } from '../contexts/UserContext';


interface SidebarProps {
  onSettings?: () => void
  onSupport?: () => void
}

export default function Sidebar({ onSettings, onSupport }: SidebarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useUser()

  const handleSettings = () => {
    if (onSettings) {
      onSettings()
    } else {
      console.log('Settings clicked - implement navigation')
    }
  }

  const handleSupport = () => {
    if (onSupport) {
      onSupport()
    } else {
      console.log('Support clicked - implement navigation')
    }
  }

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard'
    }
    if (path === '/dashboard/create') {
      return pathname === '/dashboard/create'
    }
    if (path === '/dashboard/settings') {
      return pathname === '/dashboard/settings'
    }
    return false
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-64 bg-white shadow-md relative">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-custom-primary">Post handle</h1>
      </div>

      <nav className="mt-6">
        <Link href="/dashboard" className={`sidebar-item flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200 ${isActive('/dashboard') ? 'active bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''}`}>
          <FaHome className="mr-3 h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/create" className={`sidebar-item flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200 ${isActive('/dashboard/create') ? 'active bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''}`}>
          <FaEdit className="mr-3 h-5 w-5" />
          <span>Create post</span>
        </Link>
        <a href="#" className="sidebar-item flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200">
          <FaFileAlt className="mr-3 h-5 w-5" />
          <span>Posts</span>
        </a>
        <a href="#" className="sidebar-item flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200">
          <FaCog className="mr-3 h-5 w-5" />
          <span>Configuration</span>
        </a>
      </nav>

      <div className="absolute bottom-0 w-64 p-6 border-t">
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center hover:bg-gray-50 rounded-lg p-2 transition-colors"
            disabled={loading}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
              {loading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-custom-secondary flex items-center justify-center text-white">
                  <FaUser />
                </div>
              )}
            </div>
            <div className="ml-3 flex-1 text-left">
              <p className="text-sm font-medium text-gray-700">
                {loading ? 'Loading...' : user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'}
              </p>
            </div>
            <FaChevronDown className={`text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 px-2">
              {/* <div className="p-4 border-b">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 mr-3">
                    {user?.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        <FaUser className="text-xs" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {loading ? 'Loading...' : user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {loading ? '' : user?.email || ''}
                    </p>
                  </div>
                </div>
              </div> */}
              <div className="py-2">
                <Button
                  variant="ghost"
                  onClick={handleSettings}
                  className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <IoSettingsOutline className="mr-3 h-4 w-4" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSupport}
                  className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <BiSupport className="mr-3 h-4 w-4" />
                  <span>Support</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-custom-error/20 transition-colors"
                >
                  <MdLogout className="mr-3 h-4 w-4" color='#FF5861'/>
                  <span className='text-custom-error'>Logout</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}