'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Monitor } from 'lucide-react'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white dark:bg-zinc-800 text-amber-500' : 'text-zinc-400'}`}
        title="Light Mode"
      >
        <Sun size={13} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white dark:bg-zinc-800 text-amber-500' : 'text-zinc-400'}`}
        title="Dark Mode"
      >
        <Moon size={13} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'system' ? 'bg-white dark:bg-zinc-800 text-amber-500' : 'text-zinc-400'}`}
        title="System Default"
      >
        <Monitor size={13} />
      </button>
    </div>
  )
}
