'use client'

interface TabProps {
  platforms: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Tab({ platforms, activeTab, onTabChange }: TabProps) {
  return (
    <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
      {platforms.map((platform) => (
        <button
          key={platform}
          onClick={() => onTabChange(platform)}
          className={`pb-4 px-2 font-medium transition-all ${
            activeTab === platform
              ? 'text-custom-secondary border-b-2 border-custom-secondary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </button>
      ))}
    </div>
  )
}
