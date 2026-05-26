'use client'
import { ReactNode } from 'react'

interface SecondaryLayoutProp {
  children?: ReactNode
}

export function SecondaryLayout({ children }: SecondaryLayoutProp) {
  return (
    <div className="flex h-screen flex-col dark:bg-zinc-950">
      <div className="relative bottom-10 flex flex-1 items-center justify-center">
        {children}
      </div>
    </div>
  )
}
