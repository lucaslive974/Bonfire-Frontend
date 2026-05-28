import { IAuthService, AuthSession } from './types'

import NextAuth, { type NextAuthConfig, type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Keycloak from 'next-auth/providers/keycloak'

import { } from 'next-auth/jwt'
import { Base64TokenDecoder } from './codec'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      roleCnName?: string | null
    } & DefaultSession['user']
  }
  interface User {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}

const configs: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        try {
          const keycloakIssuer = process.env.KEYCLOAK_ISSUER
          const bonfireId = process.env.BONFIRE_ID
          const bonfireClientSecret = process.env.BONFIRE_CLIENT_SECRET

          if (!keycloakIssuer || !bonfireId || !bonfireClientSecret) return null

          const tokenUrl = `${keycloakIssuer}/protocol/openid-connect/token`
          const params = new URLSearchParams()
          params.append('grant_type', 'password')
          params.append('client_id', bonfireId)
          params.append('client_secret', bonfireClientSecret)
          params.append('username', String(credentials.username))
          params.append('password', String(credentials.password))
          params.append('scope', 'openid')

          const tokenRes = await fetch(tokenUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
          })

          if (!tokenRes.ok) return null

          const tokenData = await tokenRes.json()
          const accessToken = tokenData.access_token

          if (!accessToken) return null

          const userinfoUrl = `${keycloakIssuer}/protocol/openid-connect/userinfo`
          const userinfoRes = await fetch(userinfoUrl, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
          })

          if (!userinfoRes.ok) return null

          const userinfoData = await userinfoRes.json()

          return {
            id: userinfoData.sub,
            name: userinfoData.name || userinfoData.preferred_username || String(credentials.username),
            email: userinfoData.email || null,
            accessToken: accessToken,
          }
        } catch (error) {
          console.error('[NextAuth] Error during Keycloak auth:', error)
          return null
        }
      },
    }),
    Keycloak({
      clientId: process.env.BONFIRE_ID || '',
      clientSecret: process.env.BONFIRE_CLIENT_SECRET || '',
      issuer: process.env.KEYCLOAK_ISSUER || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.access_token) token.accessToken = account.access_token
      if (user?.accessToken) token.accessToken = user.accessToken
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined
      if (token.accessToken) {
        const decoded = Base64TokenDecoder.decode<{ role_cn_name?: string }>(token.accessToken as string)
        if (decoded?.role_cn_name) {
          session.user.roleCnName = decoded.role_cn_name
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
}

const { auth, handlers } = NextAuth(configs)

/**
 * Driver servidor (Node/Edge) - Usa a função nativa auth() do NextAuth v5
 */
const NextAuthServerService: IAuthService = {
  async login(): Promise<void> {
    throw new Error('[AuthServerService]::login::(Cant be called on server side)')
  },
  async logout(): Promise<void> {
    throw new Error('[AuthServerService]::logout::(Cant be called on server side)')
  },
  async getSession(): Promise<AuthSession | null> {
    try {
      const session = await auth()
      return session as AuthSession | null
    } catch (error) {
      console.error('[AuthServerService] Falha ao obter sessão no servidor:', error)
      return null
    }
  },
  async getUser(): Promise<any | null> {
    const session = await this.getSession()
    return (session as any)?.user || null
  },
}

import { signIn, signOut, getSession } from "next-auth/react"

/**
  * Driver de cliente
  */
const NextAuthClientService: IAuthService = {
  async login(provider = 'keycloak', options?: Record<string, any>): Promise<void> {
    try {
      const res = await signIn(provider, {
        redirect: false,
        callbackUrl: '/',
        ...options,
      })

      if (res?.error) throw new Error(res.error)
    } catch (error) {
      console.error('[AuthClientService] Falha ao realizar login:', error)
      throw error
    }
  },

  async logout(options?: Record<string, any>): Promise<void> {
    try {
      await signOut({
        redirect: true,
        redirectTo: '/login',
        ...options,
      })
    } catch (error) {
      console.error('[AuthClientService] Falha ao encerrar sessão:', error)
      throw error
    }
  },

  async getSession(): Promise<AuthSession | null> {
    try {
      const session = getSession()
      return session as AuthSession | null
    } catch (error) {
      console.error('[AuthClientService] Falha ao obter sessão do cliente:', error)
      return null
    }
  },

  async getUser(): Promise<any | null> {
    const session = await this.getSession()
    return (session as any)?.user || null
  },
} 

export { NextAuthServerService, NextAuthClientService, auth, handlers }
