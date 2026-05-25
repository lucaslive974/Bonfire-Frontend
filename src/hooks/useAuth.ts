'use client'

import { useSession } from 'next-auth/react'
import { authClientService } from '@/services/auth/NextAuthClientService'
import { AuthSession, UserSession } from '@/services/auth/types'

/**
 * Hook customizado cliente que expõe o estado de autenticação e ações associadas.
 * Isola completamente a dependência direta do next-auth do restante dos componentes React.
 */
export function useAuth() {
  const { data: session, status } = useSession()

  // Converte a tipagem do next-auth para os nossos contratos de tipos limpos
  const user: UserSession | null = session?.user || null
  const authSession: AuthSession | null = session
    ? {
        user: session.user,
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
