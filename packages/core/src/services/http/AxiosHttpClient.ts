import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { IHttpClient, HttpRequestConfig, HttpResponse, HttpError } from './HttpClient.interface'
import { authClientService } from '../auth/NextAuthDrivers'

export interface AxiosHttpClientConfig {
  baseURL?: string
  headers?: Record<string, string>
  onUnauthorized?: () => void | Promise<void>
}

export class AxiosHttpClient implements IHttpClient {
  private instance: AxiosInstance

  constructor(config?: AxiosHttpClientConfig) {
    this.instance = axios.create({
      baseURL: config?.baseURL,
      headers: {
        'X-Custom-Header': 'foobar',
        ...config?.headers,
      },
    })

    // Request interceptor: add next-auth session access token to headers
    this.instance.interceptors.request.use(async (axiosConfig: InternalAxiosRequestConfig) => {
      const session = await authClientService.getSession()
      if (session?.accessToken) {
        axiosConfig.headers.Authorization = `Bearer ${session.accessToken}`
      }
      return axiosConfig
    })

    // Response interceptor: automatically detect 401 Unauthorized and redirect to login
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Prevent multiple concurrent signouts / toasts by checking if already redirecting
          if (typeof window !== 'undefined' && !window.location.search.includes('expired=true')) {
            if (config?.onUnauthorized) {
              await config.onUnauthorized()
            }
            
            // Clean local session (cookies/tokens) and redirect graciosamente
            await authClientService.logout({ redirect: true, callbackUrl: '/login?expired=true' })
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        error.response?.data?.message || error.message,
        error.response?.status,
        error.response?.data
      )
    }
    throw error
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response = await this.instance.get<T>(url, config)
      return { data: response.data, status: response.status }
    } catch (error) {
      this.handleError(error)
    }
  }

  async post<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response = await this.instance.post<T>(url, data, config)
      return { data: response.data, status: response.status }
    } catch (error) {
      this.handleError(error)
    }
  }

  async patch<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response = await this.instance.patch<T>(url, data, config)
      return { data: response.data, status: response.status }
    } catch (error) {
      this.handleError(error)
    }
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response = await this.instance.delete<T>(url, config)
      return { data: response.data, status: response.status }
    } catch (error) {
      this.handleError(error)
    }
  }
}
