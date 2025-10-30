'use client'

import React from 'react'

import { useState, useEffect, useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { PiBookOpenTextLight, PiUsersThreeLight, PiMagicWand } from "react-icons/pi";
import { LuKey, LuCalendarClock, LuFilePlus } from "react-icons/lu";
import { HiMiniChevronDown, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { FiCalendar } from "react-icons/fi";
import { GoTasklist, GoStack } from "react-icons/go";
import { RxPencil2 } from "react-icons/rx";
import { HiOutlineHome } from "react-icons/hi";
import { IoDocumentTextOutline, IoGiftOutline, IoSettingsOutline } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { CiChat1 } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from './Button';
import { useUser } from '../contexts/UserContext';


interface SidebarProps {
  onSettings?: () => void
  onSupport?: () => void
  onClose?: () => void
}

const Sidebar = ({ onSettings, onSupport, onClose }: SidebarProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [isPostsOpen, setIsPostsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
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

  const handleLogout = async () => {
    await logout()
    onClose?.()
  }

  const isActive = (path: string) => pathname === path

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
    <div className="w-60 bg-white shadow-md relative p-2 h-full">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-custom-primary">Post handle</h1>
      </div>

      <nav className="h-[calc(100%-130px)] overflow-y-auto">
        <Link href="/dashboard" onClick={onClose} className={`sidebar-item flex rounded-md items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
          <HiOutlineHome className={`mr-3 h-4 w-4 ${isActive('/dashboard') ? 'active text-custom-secondary' : ''}`} />
          <span className='text-sm font-medium'>Dashboard</span>
        </Link>
        <div>
          <button
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="sidebar-item flex items-center rounded-md justify-between w-full px-4 py-2 text-gray-700/70 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          >
            <div className="flex text-sm font-medium items-center">
              <span>Create</span>
            </div>
            <HiMiniChevronDown className={`text-gray-400 transition-transform ${isCreateOpen ? 'rotate-180' : ''}`} />
          </button>
          {isCreateOpen && (
            <div className="text-sm px-2">
              <Link href="/dashboard/create" onClick={onClose} className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 transition-all duration-200 ${isActive('/dashboard/create') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <LuFilePlus className={`mr-3 h-4 w-4 ${isActive('/dashboard/create') ? 'active text-custom-secondary' : ''}`} />
                <span>New post</span>
              </Link>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/studio') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <PiMagicWand className={`mr-3 h-4 w-4 ${isActive('/dashboard/studio') ? 'active text-custom-secondary' : ''}`} />
                <span>Studio</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/tools') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <GoStack className={`mr-3 h-4 w-4 ${isActive('/dashboard/tools') ? 'active text-custom-secondary' : ''}`} />
                <span>Bulk tools</span>
              </a>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setIsPostsOpen(!isPostsOpen)}
            className="sidebar-item flex items-center rounded-md justify-between w-full px-4 py-2 text-gray-700/70 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          >
            <div className="flex text-sm font-medium items-center">
              <span>Posts</span>
            </div>
            <HiMiniChevronDown className={`text-gray-400 transition-transform ${isPostsOpen ? 'rotate-180' : ''}`} />
          </button>
          {isPostsOpen && (
            <div className="text-sm px-2">
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/calendar') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <FiCalendar className={`mr-3 h-4 w-4 ${isActive('/dashboard/calendar') ? 'active text-custom-secondary' : ''}`} />
                <span>Calendar</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/all') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <GoTasklist className={`mr-3 h-4 w-4 ${isActive('/dashboard/all') ? 'active text-custom-secondary' : ''}`} />
                <span>All</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/scheduled') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <LuCalendarClock className={`mr-3 h-4 w-4 ${isActive('/dashboard/scheduled') ? 'active text-custom-secondary' : ''}`} />
                <span>Scheduled</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/posted') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <HiOutlineClipboardDocumentCheck className={`mr-3 h-4 w-4 ${isActive('/dashboard/posted') ? 'active text-custom-secondary' : ''}`} />
                <span>Posted</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/drafts') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <RxPencil2 className={`mr-3 h-4 w-4 ${isActive('/dashboard/drafts') ? 'active text-custom-secondary' : ''}`} />
                <span>Drafts</span>
              </a>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            className="sidebar-item flex items-center rounded-md justify-between w-full px-4 py-2 text-gray-700/70 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          >
            <div className="flex text-sm font-medium items-center">
              <span>Configuration</span>
            </div>
            <HiMiniChevronDown className={`text-gray-400 transition-transform ${isConfigOpen ? 'rotate-180' : ''}`} />
          </button>
          {isConfigOpen && (
            <div className="text-sm px-2">
              <Link href="/dashboard/connections" onClick={onClose} className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 transition-all duration-200 ${isActive('/dashboard/connections') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <PiUsersThreeLight className={`mr-3 h-4 w-4 ${isActive('/dashboard/connections') ? 'active text-custom-secondary' : ''}`} />
                <span>Connections</span>
              </Link>
              <Link href="/dashboard/settings" onClick={onClose} className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 transition-all duration-200 ${isActive('/dashboard/settings') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <IoSettingsOutline className={`mr-3 h-4 w-4 ${isActive('/dashboard/settings') ? 'active text-custom-secondary' : ''}`} />
                <span>Settings</span>
              </Link>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/api-keys') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <LuKey className={`mr-3 h-4 w-4 ${isActive('/dashboard/api-keys') ? 'active text-custom-secondary' : ''}`} />
                <span>API Keys</span>
              </a>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setIsSupportOpen(!isSupportOpen)}
            className="sidebar-item flex items-center rounded-md justify-between w-full px-4 py-2 text-gray-700/70 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          >
            <div className="flex text-sm font-medium items-center">
              <span>Support</span>
            </div>
            <HiMiniChevronDown className={`text-gray-400 transition-transform ${isSupportOpen ? 'rotate-180' : ''}`} />
          </button>
          {isSupportOpen && (
            <div className="text-sm px-2">
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/feedback') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <CiChat1 className={`mr-3 h-4 w-4 ${isActive('/dashboard/feedback') ? 'active text-custom-secondary' : ''}`} />
                <span>Share feedback</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/growth-guide') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <PiBookOpenTextLight className={`mr-3 h-4 w-4 ${isActive('/dashboard/growth-guide') ? 'active text-custom-secondary' : ''}`} />
                <span>Growth guide</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/docs') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <IoDocumentTextOutline className={`mr-3 h-4 w-4 ${isActive('/dashboard/docs') ? 'active text-custom-secondary' : ''}`} />
                <span>Docs</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/stay-updated') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <RiTwitterXFill className={`mr-3 h-4 w-4 ${isActive('/dashboard/stay-updated') ? 'active text-custom-secondary' : ''}`} />
                <span>Stay updated</span>
              </a>
              <a href="#" className={`sidebar-item rounded-md flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${isActive('/dashboard/earn-referral') ? 'active bg-custom-secondary/10' : 'hover:bg-gray-100'}`}>
                <IoGiftOutline className={`mr-3 h-4 w-4 ${isActive('/dashboard/earn-referral') ? 'active text-custom-secondary' : ''}`} />
                <span>Earn 30% referral</span>
              </a>
            </div>
          )}
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 w-60 p-4 border-t h-20">
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center hover:bg-gray-100 rounded-lg p-0 transition-colors"
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
            <HiMiniChevronDown className={`text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 px-2">
              <div className="py-2">
                <Button
                  variant="ghost"
                  onClick={() => { handleSettings(); onClose?.(); }}
                  className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <IoSettingsOutline className="mr-3 h-4 w-4" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => { handleSupport(); onClose?.(); }}
                  className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <BiSupport className="mr-3 h-4 w-4" />
                  <span>Support</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
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

export default React.memo(Sidebar)