'use client'

import { useSession } from 'next-auth/react'
import { authClientService } from './NextAuthDrivers'
import { AuthSession, UserSession } from './types'

/**
 * Hook customizado cliente genérico que expõe o estado de autenticação e ações associadas.
 * Isola completamente a dependência direta do next-auth das aplicações.
 * 
 * Permite que a aplicação consumidora injete propriedades estendidas via Generics.
 */
export function useAuth<TUser = UserSession>() {
  const { data: session, status } = useSession()

  // Converte a tipagem do next-auth para os nossos tipos limpos
  const user = (session?.user as TUser) || null
  const authSession: AuthSession<TUser> | null = session
    ? {
        user: session.user as TUser,
        accessToken: session.accessToken,
      }
    : null

  /**
   * Realiza login no cliente através do driver apropriado.
   */
  const login = async (provider?: string, options?: Record<string, any>) => {
    return authClientService.login(provider, options)
  }

  /**
   * Realiza logout no cliente através do driver apropriado.
   */
  const logout = async (options?: Record<string, any>) => {
    return authClientService.logout(options)
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
