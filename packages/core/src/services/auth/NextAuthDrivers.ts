import { IAuthService } from './AuthService.interface'
import { AuthSession } from './types'
import { signIn, signOut, getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from './NextAuthOptions'
import NextAuth from 'next-auth'

/**
 * Driver cliente (Client-side) que conecta o contrato IAuthService ao Next-Auth.
 */
export class NextAuthClientService<TSession = AuthSession> implements IAuthService<TSession> {
  /**
   * Dispara o fluxo de login no cliente.
   */
  async login(provider = 'keycloak', options?: Record<string, any>): Promise<void> {
    try {
      const res = await signIn(provider, {
        redirect: false,
        callbackUrl: '/',
        ...options,
      })

      if (res?.error) {
        throw new Error(res.error)
      }
    } catch (error) {
      console.error('[AuthClientService] Falha ao realizar login:', error)
      throw error
    }
  }

  /**
   * Finaliza a sessão ativa no cliente.
   */
  async logout(options?: Record<string, any>): Promise<void> {
    try {
      await signOut({
        redirect: true,
        callbackUrl: '/login',
        ...options,
      })
    } catch (error) {
      console.error('[AuthClientService] Falha ao encerrar sessão:', error)
      throw error
    }
  }

  /**
   * Recupera a sessão atual do cliente.
   */
  async getSession(): Promise<TSession | null> {
    try {
      const session = await getSession()
      return session as TSession | null
    } catch (error) {
      console.error('[AuthClientService] Falha ao obter sessão do cliente:', error)
      return null
    }
  }

  /**
   * Recupera o usuário atual do cliente.
   */
  async getUser(): Promise<any | null> {
    const session = await this.getSession()
    return (session as any)?.user || null
  }
}

/**
 * Driver servidor (Server-side) que conecta o contrato IAuthService ao Next-Auth para Server Components e API Routes.
 */
export class NextAuthServerService<TSession = AuthSession> implements IAuthService<TSession> {
  /**
   * Métodos de login/logout lançam erros no servidor já que são operações client-side.
   */
  async login(): Promise<void> {
    throw new Error('[AuthServerService] O método login só pode ser invocado no Client-side.')
  }

  async logout(): Promise<void> {
    throw new Error('[AuthServerService] O método logout só pode ser invocado no Client-side.')
  }

  /**
   * Recupera a sessão atual no lado do servidor.
   */
  async getSession(): Promise<TSession | null> {
    try {
      const session = await getServerSession(authOptions)
      return session as TSession | null
    } catch (error) {
      console.error('[AuthServerService] Falha ao obter sessão no servidor:', error)
      return null
    }
  }

  /**
   * Recupera o usuário atual no lado do servidor.
   */
  async getUser(): Promise<any | null> {
    const session = await this.getSession()
    return (session as any)?.user || null
  }
}

export const authClientService = new NextAuthClientService()
export const authServerService = new NextAuthServerService()

// API Handler unificado para API Routes / [...nextauth]
export const nextAuthHandler = NextAuth(authOptions)
export { getSession as getNextAuthClientSession }
