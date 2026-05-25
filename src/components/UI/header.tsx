'use client'

import { AlignJustify } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

import { NotificationBar } from './notificationBar'
import { ThemeBtn } from './themeBtn'

type HeaderProps = {
  toggleSideBar: () => void
}

export function Header({ toggleSideBar }: HeaderProps) {
  const { session } = useAuth()

  return (
    <>
      {/* spacer for fixed header */}
      <div className="h-12" />

      <header className="fixed top-0 left-0 z-20 flex h-12 w-full items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSideBar}
            aria-label="Toggle sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <AlignJustify size={18} />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {session?.user?.name && (
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {session.user.name}
            </span>
          )}

          <ThemeBtn />
          <NotificationBar />
        </div>

      </header>
    </>
  )
}

