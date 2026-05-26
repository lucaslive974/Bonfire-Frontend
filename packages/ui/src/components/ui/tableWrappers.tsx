import { ReactNode } from "react";
import { cn } from '../../lib/utils'

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export function TableWrapper({ children, className }: WrapperProps) {
  return (
    <div className={cn("flex flex-col w-full p-2 caret-sky-500 select-text", className)}>
      {children}
    </div>
  )
}

export function TableWrapperFilters({ children, className }: WrapperProps) {
  return (
    <div className={cn("flex items-center gap-4 p-4 py-4", className)}>
      {children}
    </div>
  )
}

export function TableWrapperBody({ children, className }: WrapperProps) {
  return (
    <div className={cn('flex-1 overflow-auto select-text', className)}>
      {children}
    </div>
  )
}

export function TableWrapperFooter({ children, className }: WrapperProps) {
  return (
    <div className={cn('flex justify-between p-2', className)}>
      {children}
    </div>
  )
}
