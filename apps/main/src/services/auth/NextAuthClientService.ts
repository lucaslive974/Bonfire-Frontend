import { IAuthService, AuthSession, UserSession } from '@bonfire/core'
import { signIn, signOut, getSession } from 'next-auth/react'

/**
 * Driver cliente (Client-side) que conecta o contrato IAuthService ao Next-Auth.
 */
export class NextAuthClientService implements IAuthService {
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
  async getSession(): Promise<AuthSession | null> {
    try {
      const session = await getSession()
      if (!session) return null

      return {
        user: session.user ? {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          roleCnName: session.user.roleCnName || null,
        } : undefined,
        accessToken: session.accessToken,
      }
    } catch (error) {
      console.error('[AuthClientService] Falha ao obter sessão do cliente:', error)
      return null
    }
  }

  /**
   * Recupera o usuário atual do cliente.
   */
  async getUser(): Promise<UserSession | null> {
    const session = await this.getSession()
    return session?.user || null
  }
}

export const authClientService = new NextAuthClientService()
