'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu'
import { Sun, Moon, Monitor, Check } from 'lucide-react'
import { Button } from '@bonfire/ui'

export function ThemeBtn() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 animate-pulse" />
    )
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={18} className="text-zinc-600 dark:text-zinc-300" />
      case 'dark':
        return <Moon size={18} className="text-zinc-600 dark:text-zinc-300" />
      default:
        return <Monitor size={18} className="text-zinc-600 dark:text-zinc-300" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          aria-label="Selecionar tema"
          className="h-9 w-9 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors focus-visible:ring-2"
        >
          {getThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-36 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1.5 shadow-lg"
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className="flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-2">
            <Sun size={14} className="text-zinc-500" />
            Claro
          </span>
          {theme === 'light' && <Check size={12} className="text-zinc-500" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className="flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-2">
            <Moon size={14} className="text-zinc-500" />
            Escuro
          </span>
          {theme === 'dark' && <Check size={12} className="text-zinc-500" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className="flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-2">
            <Monitor size={14} className="text-zinc-500" />
            Sistema
          </span>
          {theme === 'system' && <Check size={12} className="text-zinc-500" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
