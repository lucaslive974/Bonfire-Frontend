'use client'

import { AlignJustify, Flame } from 'lucide-react'
import { useAuth } from '@bonfire/core'
import { useNotifications } from '@/hooks/useNotifications'
import { BrandLogo } from '@bonfire/ui'
import Link from 'next/link'

import { NotificationBar, ThemeSelector } from '@bonfire/ui'

type HeaderProps = {
  toggleSideBar: () => void
}

interface AppUser {
  name?: string | null
  email?: string | null
  image?: string | null
  roleCnName?: string | null
}

export function Header({ toggleSideBar }: HeaderProps) {
  const { session } = useAuth<AppUser>()
  const notificationsProps = useNotifications()

  return (
    <>
      {/* spacer for fixed header */}
      <div className="h-12" />

      <header className="fixed top-0 left-0 z-20 flex h-12 w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 backdrop-blur-md px-4 dark:border-zinc-800/80 dark:bg-zinc-950/80 shadow-sm transition-all duration-200">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSideBar}
            aria-label="Toggle sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            <AlignJustify size={18} />
          </button>

          <BrandLogo />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-l border-zinc-200 dark:border-zinc-800 pl-3 hidden sm:inline-block">
            Infrações e Multas
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <ThemeSelector />
          {session?.user?.name && (
            <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
          )}

          {session?.user?.name && (
            <div className="hidden sm:flex flex-col items-end mr-1 leading-none gap-0.5">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                {session.user.name}
              </span>
              <span className="text-[10px] capitalize text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider">
                {session.user.roleCnName || 'Operador'}
              </span>
            </div>
          )}

          <NotificationBar {...notificationsProps} />
        </div>

      </header>
    </>
  )
}

