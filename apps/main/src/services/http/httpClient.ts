import { AxiosHttpClient } from '@bonfire/core'
import { notify } from '@/lib/utils'

/**
 * Instanciação concreta do HttpClient utilizando a implementação centralizada
 * do AxiosHttpClient presente no @bonfire/core, passando os callbacks de UI apropriados.
 */
export const httpClient = new AxiosHttpClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`,
  onUnauthorized: () => {
    notify.error('Sessão expirada. Redirecionando...')
  }
})
