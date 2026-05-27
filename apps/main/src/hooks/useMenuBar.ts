'use client'

import { usePathname } from "next/navigation"
import { useAuth } from '@/hooks/useAuth'

export function useMenuBar() {
  const pathname = usePathname()
  const { session, login, logout } = useAuth()

  const handleSignIn = () => login('keycloak')
  const handleSignOut = () => logout()

  const isActive = (path: string) => 
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  return {
    pathname,
    session,
    handleSignIn,
    handleSignOut,
    isActive,
  }
}
