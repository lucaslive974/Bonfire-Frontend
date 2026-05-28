import { ReactNode } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { AuthSession, UserSession } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  return (<SessionProvider>{children}</SessionProvider>)
}

import { AuthClientService } from "./Auth"

export function useAuth<TUser = UserSession>() {
  const { data: session, status } = useSession()

  const user = (session?.user as TUser) || null
  const authSession: AuthSession<TUser> | null = session
    ? {
      user: session.user as TUser,
      accessToken: session.accessToken,
    }
    : null

  const login = async (provider?: string, options?: Record<string, any>) => {
    return AuthClientService.login(provider, options)
  }

  const logout = async (options?: Record<string, any>) => {
    return AuthClientService.logout(options)
  }

  return {
    session: authSession,
    user,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    logout,
  }
}
