'use client'
import { ReactNode, useState, useRef } from 'react'
import { Header } from './header'
import { SideBar } from './sidebar'
import { Footer } from './footer'

interface Props {
  children?: ReactNode
}

export function PrimaryLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)

  const toggleSideBar = () => setSidebarOpen((prev) => !prev)

  const handleScroll = () => {
    if (mainRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = mainRef.current
      const totalScroll = scrollHeight - clientHeight
      if (totalScroll > 0) {
        setScrollProgress((scrollTop / totalScroll) * 100)
      } else {
        setScrollProgress(0)
      }
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20">
      <Header toggleSideBar={toggleSideBar} />

      {/* Scroll Progress Bar at the top of the screen (under header) */}
      <div className="fixed top-12 left-0 z-30 h-[3px] w-full bg-zinc-100/30 dark:bg-zinc-900/20">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-500 dark:to-orange-400 transition-all duration-100 ease-out shadow-[0_1px_10px_rgba(245,158,11,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <SideBar
        sidebarOpen={sidebarOpen}
        toggleSideBar={toggleSideBar}
      />

      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 w-full overflow-y-auto no-scrollbar bg-zinc-50/30 dark:bg-zinc-950/20 scroll-smooth"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300 flex flex-col min-h-full">
          <div className="flex-1">
            {children}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
