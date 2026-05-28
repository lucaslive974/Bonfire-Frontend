import { encode } from "next-auth/jwt"

export interface ITokenEncoder {
  encode(params: {
    token: any
    secret: string
    maxAge?: number
    salt: string
  }): Promise<string>
}

export interface ITokenDecoder {
  decode<T = any>(token: string): T | null
}

export const Base64TokenDecoder: ITokenDecoder = {
  decode<T = any>(token: string): T | null {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        return null
      }

      const base64Url = parts[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

      const jsonPayload = typeof window !== 'undefined'
        ? decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        : Buffer.from(base64, 'base64').toString('utf8')

      return JSON.parse(jsonPayload) as T
    } catch (error) {
      console.error('[Base64TokenDecoder] Failed to decode JWT token:', error)
      return null
    }
  }
}

export const NextAuthTokenEncoder: ITokenEncoder = {
  encode(params: { token: any; secret: string; maxAge?: number; salt: string; }): Promise<string> {
    return encode(params)
  }
}
