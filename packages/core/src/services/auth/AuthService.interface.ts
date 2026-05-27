import { AuthSession } from './types'

/**
 * Interface rigorosa de contrato para o serviço de autenticação da aplicação (Facade/Adapter).
 * Qualquer provedor de autenticação (Next-Auth, Firebase, Auth0, etc.) deve implementar este contrato.
 */
export interface IAuthService<TSession = AuthSession> {
  /**
   * Realiza a autenticação do usuário.
   * @param provider Identificador do provedor (ex: 'keycloak')
   * @param options Configurações adicionais de redirecionamento ou fluxo
   */
  login(provider?: string, options?: Record<string, any>): Promise<void>

  /**
   * Encerra a sessão de autenticação ativa localmente e no provedor.
   * @param options Configurações adicionais de logout
   */
  logout(options?: Record<string, any>): Promise<void>

  /**
   * Recupera a sessão atual de autenticação contendo o usuário e tokens.
   */
  getSession(): Promise<TSession | null>

  /**
   * Método de conveniência para extrair apenas os dados do usuário autenticado.
   */
  getUser(): Promise<any | null>
}
