import { IAuthService } from './AuthService.interface'
import { AuthSession, UserSession } from './types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../authOptions'

/**
 * Driver servidor (Server-side) que conecta o contrato IAuthService ao Next-Auth para Server Components e API Routes.
 */
export class NextAuthServerService implements IAuthService {
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
  async getSession(): Promise<AuthSession | null> {
    try {
      const session = await getServerSession(authOptions)
      if (!session) return null

      return {
        user: session.user,
        accessToken: session.accessToken,
      }
    } catch (error) {
      console.error('[AuthServerService] Falha ao obter sessão no servidor:', error)
      return null
    }
  }

  /**
   * Recupera o usuário atual no lado do servidor.
   */
  async getUser(): Promise<UserSession | null> {
    const session = await this.getSession()
    return session?.user || null
  }
}

export const authServerService = new NextAuthServerService()
