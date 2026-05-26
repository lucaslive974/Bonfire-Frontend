'use client'

import { ReactNode } from 'react'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/UI/dialog'
import { cn } from '@/lib/utils'

interface ReusableDialogProps {
  icon: ReactNode
  iconClassName?: string
  title: string
  description: string
  children: ReactNode
  footerActions?: ReactNode
  maxWidthClassName?: string
}

export function ReusableDialog({
  icon,
  iconClassName,
  title,
  description,
  children,
  footerActions,
  maxWidthClassName = 'sm:max-w-[425px]',
}: ReusableDialogProps) {
  return (
    <DialogContent className={cn("rounded-3xl p-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl animate-in zoom-in-95 duration-200", maxWidthClassName)}>
      <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
        <div className={cn("p-3 rounded-2xl border shrink-0", iconClassName)}>
          {icon}
        </div>
        <div className="space-y-1 text-left">
          <DialogTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
            {description}
          </DialogDescription>
        </div>
      </DialogHeader>

      <div className="py-4">
        {children}
      </div>

      {footerActions && (
        <DialogFooter className="border-t border-zinc-100 dark:border-zinc-900 pt-4 flex gap-2">
          {footerActions}
        </DialogFooter>
      )}
    </DialogContent>
  )
}
