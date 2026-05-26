import { LucideX } from 'lucide-react'
import { MenuBar } from './menubar'
import { BrandLogo } from './brandLogo'

interface SideBarProps {
  sidebarOpen: boolean
  toggleSideBar: () => void
}

export function SideBar({ sidebarOpen, toggleSideBar }: SideBarProps) {
  return (
    <>
      {/* Sidebar Drawer Container */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-full w-64 flex-col
          border-r border-zinc-200/80 bg-white/95 backdrop-blur-md p-6
          dark:border-zinc-800/80 dark:bg-zinc-950/95
          shadow-lg transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          <BrandLogo></BrandLogo>
          <button
            onClick={toggleSideBar}
            aria-label="Close sidebar"
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <LucideX size={16} />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto no-scrollbar -mx-2 px-2">
          <MenuBar />
        </div>
      </aside>

      {/* Backdrop overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSideBar}
          className="fixed inset-0 z-30 bg-zinc-950/30 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
        />
      )}
    </>
  )
}
