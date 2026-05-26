import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import CredentialsProvider from 'next-auth/providers/credentials'
import Keycloak from 'next-auth/providers/keycloak'

import { getServerSession, type NextAuthOptions } from 'next-auth'
import { env } from './env'

import { tokenDecoder } from './auth/tokenDecoder'

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      roleCnName?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const tokenUrl = `${env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`
          const params = new URLSearchParams()
          params.append('grant_type', 'password')
          params.append('client_id', env.BONFIRE_ID)
          params.append('client_secret', env.BONFIRE_CLIENT_SECRET)
          params.append('username', credentials.username)
          params.append('password', credentials.password)
          params.append('scope', 'openid')

          const tokenRes = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
          })

          if (!tokenRes.ok) {
            console.error('[NextAuth authorize] Keycloak token request failed:', await tokenRes.text())
            return null
          }

          const tokenData = await tokenRes.json()
          const accessToken = tokenData.access_token

          if (!accessToken) {
            return null
          }

          const userinfoUrl = `${env.KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`
          const userinfoRes = await fetch(userinfoUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })

          if (!userinfoRes.ok) {
            console.error('[NextAuth authorize] Keycloak userinfo request failed:', await userinfoRes.text())
            return null
          }

          const userinfoData = await userinfoRes.json()

          return {
            id: userinfoData.sub,
            name: userinfoData.name || userinfoData.preferred_username || credentials.username,
            email: userinfoData.email || null,
            accessToken: accessToken,
          }
        } catch (error) {
          console.error('[NextAuth authorize] Error during Keycloak direct grant auth:', error)
          return null
        }
      }
    }),
    Keycloak({
      clientId: env.BONFIRE_ID,
      clientSecret: env.BONFIRE_CLIENT_SECRET,
      issuer: env.KEYCLOAK_ISSUER,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.accessToken = (user as any).accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      if (token.accessToken) {
        const decoded = tokenDecoder.decode<{ role_cn_name?: string }>(token.accessToken)
        if (decoded?.role_cn_name) {
          session.user = {
            ...session.user,
            roleCnName: decoded.role_cn_name,
          }
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
} satisfies NextAuthOptions

// Server Contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}
