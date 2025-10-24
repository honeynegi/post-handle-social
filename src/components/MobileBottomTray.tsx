'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TbMenu2 } from "react-icons/tb";
import { GoTasklist } from "react-icons/go";
import { HiOutlinePlus } from "react-icons/hi2";
import { PiUsersThreeLight } from 'react-icons/pi';
import { FiCalendar } from 'react-icons/fi';



interface MobileBottomTrayProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function MobileBottomTray({ isSidebarOpen, onToggleSidebar }: MobileBottomTrayProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around md:hidden z-40 h-20">
      <button onClick={onToggleSidebar} className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-800">
        <TbMenu2 className="text-xl" />
        <span className="text-xs">Menu</span>
      </button>
      <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-800">
        <GoTasklist className={`text-xl ${isActive('/dashboard') ? 'text-custom-secondary' : ''}`} />
        <span className="text-xs">Posts</span>
      </Link>
      <Link href="/dashboard/create" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-800">
        <HiOutlinePlus className={`text-xl ${isActive('/dashboard/create') ? 'text-custom-secondary' : ''}`} />
        <span className="text-xs">Create</span>
      </Link>
      <Link href="/dashboard/settings" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-800">
        <PiUsersThreeLight className={`text-xl ${isActive('/dashboard/settings') ? 'text-custom-secondary' : ''}`} />
        <span className="text-xs">Connect</span>
      </Link>
      <Link href="/dashboard/calendar" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-800">
        <FiCalendar className={`text-xl ${isActive('/dashboard/calendar') ? 'text-custom-secondary' : ''}`} />
        <span className="text-xs">Calendar</span>
      </Link>
    </div>
  )
}