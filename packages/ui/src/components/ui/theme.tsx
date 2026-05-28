'use client'

import { useTheme as nextUseTheme, ThemeProvider } from 'next-themes'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'

export function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  )
}

export function useTheme() {
  return nextUseTheme()
}

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Hydration safety: set mounted to true after component renders in browser
  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && theme === 'light'
  const isDark = mounted && theme === 'dark'
  const isSystem = mounted && theme === 'system'

  return (
    <div className="flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md transition-colors ${isLight ? 'bg-white dark:bg-zinc-800 text-amber-500' : 'text-zinc-400'}`}
        title="Light Mode"
      >
        <Sun size={13} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md transition-colors ${isDark ? 'bg-white dark:bg-zinc-800 text-amber-500' : 'text-zinc-400'}`}
        title="Dark Mode"
      >
        <Moon size={13} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md transition-colors ${isSystem ? 'bg-white dark:bg-zinc-800 text-amber-500' : 'text-zinc-400'}`}
        title="System Default"
      >
        <Monitor size={13} />
      </button>
    </div>
  )
}
