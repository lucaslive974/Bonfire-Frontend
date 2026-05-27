'use client'

import { X, ChevronRight, LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { BrandLogo } from './brandLogo'
import Link from 'next/link'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

interface SideBarProps {
  sidebarOpen: boolean
  toggleSideBar: () => void
  children?: ReactNode
}

export function SideBar({ sidebarOpen, toggleSideBar, children }: SideBarProps) {
  return (
    <>
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
        <div className="flex items-center justify-between mb-8">
          <BrandLogo />
          <button
            onClick={toggleSideBar}
            aria-label="Close sidebar"
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-250 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar -mx-2 px-2">
          {children}
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={toggleSideBar}
          className="fixed inset-0 z-30 bg-zinc-950/30 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
        />
      )}
    </>
  )
}

// --- SIDEBAR UTILITY STYLES ---
const sidebarItemStyles = {
  link: (active: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300 ease-in-out ${
      active
        ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 shadow-sm border-l-2 border-orange-500 rounded-l-none pl-2.5'
        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-100 hover:translate-x-1'
    }`,
  trigger: (active: boolean) =>
    `flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300 ease-in-out ${
      active
        ? 'bg-orange-50/50 dark:bg-orange-950/10 text-orange-600 dark:text-orange-400 border-l-2 border-orange-500/50 rounded-l-none pl-2.5'
        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-100 hover:translate-x-1'
    }`,
  subLink: (active: boolean) =>
    `flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-300 ease-in-out ${
      active
        ? 'text-orange-600 dark:text-orange-400 font-extrabold bg-orange-50/30 dark:bg-orange-950/10 pl-4'
        : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20 hover:translate-x-1'
    }`,
}

// --- SIDEBAR LINK ---
export interface SideBarLinkProps {
  href: string
  isActive: boolean
  icon: LucideIcon
  children: ReactNode
}

export function SideBarLink({ href, isActive, icon: Icon, children }: SideBarLinkProps) {
  return (
    <Link href={href} className={sidebarItemStyles.link(isActive)}>
      <Icon size={17} className={`shrink-0 transition-colors ${isActive ? '!text-orange-600 dark:!text-orange-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
      <span className={isActive ? '!text-orange-600 dark:!text-orange-400' : ''}>{children}</span>
    </Link>
  )
}

// --- SIDEBAR COLLAPSIBLE MODULE ---
export interface SideBarCollapsibleProps {
  isActive: boolean
  defaultOpen: boolean
  icon: LucideIcon
  title: string
  children: ReactNode
}

export function SideBarCollapsible({ isActive, defaultOpen, icon: Icon, title, children }: SideBarCollapsibleProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <button className={sidebarItemStyles.trigger(isActive)}>
          <Icon size={17} className={`shrink-0 transition-colors ${isActive ? '!text-orange-600 dark:!text-orange-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
          <span className={`flex-1 text-left ${isActive ? '!text-orange-600 dark:!text-orange-400' : ''}`}>{title}</span>
          <ChevronRight size={15} className={`transition-transform duration-200 group-data-[state=open]:rotate-90 shrink-0 ${isActive ? '!text-orange-600 dark:!text-orange-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pr-2 py-1 flex flex-col gap-1 border-l border-zinc-100 dark:border-zinc-900 ml-[17px] mt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

// --- SIDEBAR SUB-LINK ---
export interface SideBarSubLinkProps {
  href: string
  isActive: boolean
  children: ReactNode
}

export function SideBarSubLink({ href, isActive, children }: SideBarSubLinkProps) {
  return (
    <Link href={href} className={sidebarItemStyles.subLink(isActive)}>
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-250 ${isActive ? 'bg-orange-500 scale-125' : 'bg-current'}`} />
      <span className={isActive ? '!text-orange-600 dark:!text-orange-400' : ''}>{children}</span>
    </Link>
  )
}

// --- SIDEBAR SECTION HEADER ---
export interface SideBarSectionProps {
  title: string
}

export function SideBarSection({ title }: SideBarSectionProps) {
  return (
    <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 mt-4 mb-1.5 select-none">
      {title}
    </div>
  )
}
