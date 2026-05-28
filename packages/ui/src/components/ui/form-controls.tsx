'use client'

import * as React from 'react'
import { Button } from './button'
import { Loader2, LucideIcon, LogOut } from 'lucide-react'
import { cn } from '../../lib/utils'

// --- 1. ICON INPUT COMPONENT ---
export interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: LucideIcon
  rightElement?: React.ReactNode
}

export const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, type, label, icon: Icon, rightElement, ...props }, ref) => {
    return (
      <div className="space-y-1.5 text-left w-full">
        {label && (
          <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 ml-1">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-3 h-4 w-4 text-zinc-400 pointer-events-none" />
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:ring-orange-500/20 dark:focus:border-orange-500 disabled:opacity-50 text-zinc-800 dark:text-zinc-100",
              Icon ? "pl-10" : "pl-4",
              rightElement ? "pr-10" : "pr-4",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    )
  }
)
IconInput.displayName = 'IconInput'

// --- 2. FORM SUBMIT BUTTON ---
export interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  icon?: LucideIcon
  children: React.ReactNode
}

export function FormSubmitButton({
  isLoading,
  loadingText,
  icon: Icon,
  className,
  children,
  ...props
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        "w-full flex items-center justify-center gap-2 font-bold py-6 text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-md transition-all duration-200 mt-2 disabled:opacity-75 border-none",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon size={16} />
      )}
      <span>{isLoading ? loadingText || 'Autenticando...' : children}</span>
    </Button>
  )
}

// --- 3. USER SESSION CARD ---
export interface UserSessionCardProps {
  name: string
  email?: string
}

export function UserSessionCard({ name, email }: UserSessionCardProps) {
  const initial = name ? name.charAt(0).toUpperCase() : 'U'
  return (
    <div className="w-full p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
        {initial}
      </div>
      <div className="flex-1 text-left min-w-0">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
          {name || 'Usuário Autenticado'}
        </h3>
        <p className="text-xs text-zinc-500 truncate mt-0.5">
          {email || 'Sem e-mail cadastrado'}
        </p>
      </div>
    </div>
  )
}

// --- 4. SIGN OUT BUTTON ---
export interface SignOutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full flex items-center justify-center gap-2 font-bold py-5 text-xs text-red-500 border-red-200 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 dark:border-red-900/50 rounded-xl transition-all duration-200",
        className
      )}
      {...props}
    >
      <LogOut size={14} />
      <span>Sair da Conta</span>
    </Button>
  )
}

// --- 5. FORM ERROR BANNER ---
export interface FormErrorProps {
  message: string
}

export function FormError({ message }: FormErrorProps) {
  return (
    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl text-center animate-in shake duration-200 w-full">
      {message}
    </div>
  )
}
