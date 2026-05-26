import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock environment variables to bypass Zod validation in test environment.
// vi.mock is hoisted, so this runs before any imports are evaluated.
vi.mock('@/services/env', () => ({
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost',
    NEXT_PUBLIC_API_PORT: '4000',
    NEXTAUTH_SECRET: 'super-secret',
    NEXTAUTH_URL: 'http://localhost:3000',
    BONFIRE_ID: 'bonfire-client',
    BONFIRE_CLIENT_SECRET: 'client-secret',
    KEYCLOAK_ISSUER: 'http://localhost:8080/realms/bonfire',
  }
}))

import { NextAuthClientService } from '@/services/auth/NextAuthClientService'
import { NextAuthServerService } from '@/services/auth/NextAuthServerService'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'

// Mock next-auth client side
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  getSession: vi.fn()
}))

// Mock next-auth server side
vi.mock('next-auth', () => ({
  getServerSession: vi.fn()
}))

describe('Auth Services (Unit Tests)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('NextAuthClientService (Client-Side Driver)', () => {
    const service = new NextAuthClientService()

    it('deve retornar a sessão mapeada quando o usuário estiver autenticado', async () => {
      const mockSession = {
        user: { name: 'Lucas', email: 'lucas@example.com' },
        accessToken: 'client-token-123',
        expires: '2026-05-25T22:45:37-03:00'
      }
      vi.mocked(getSession).mockResolvedValue(mockSession)

      const result = await service.getSession()

      expect(getSession).toHaveBeenCalled()
      expect(result).toMatchObject({
        user: { name: 'Lucas', email: 'lucas@example.com' },
        accessToken: 'client-token-123'
      })
    })

    it('deve retornar null para getSession e getUser quando o acesso NÃO for autenticado', async () => {
      vi.mocked(getSession).mockResolvedValue(null) // Simula unauthenticated

      const sessionResult = await service.getSession()
      const userResult = await service.getUser()

      expect(sessionResult).toBeNull()
      expect(userResult).toBeNull()
    })
  })

  describe('NextAuthServerService (Server-Side Driver)', () => {
    const service = new NextAuthServerService()

    it('deve retornar a sessão do servidor mapeada quando o usuário estiver autenticado', async () => {
      const mockSession = {
        user: { name: 'Admin', email: 'admin@example.com' },
        accessToken: 'server-token-999',
        expires: '2026-05-25T22:45:37-03:00'
      }
      vi.mocked(getServerSession).mockResolvedValue(mockSession)

      const result = await service.getSession()

      expect(getServerSession).toHaveBeenCalled()
      expect(result).toMatchObject({
        user: { name: 'Admin', email: 'admin@example.com' },
        accessToken: 'server-token-999'
      })
    })

    it('deve retornar null para getSession e getUser quando o acesso NÃO for autenticado no servidor', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null) // Simula unauthenticated no servidor

      const sessionResult = await service.getSession()
      const userResult = await service.getUser()

      expect(sessionResult).toBeNull()
      expect(userResult).toBeNull()
    })
  })
})
