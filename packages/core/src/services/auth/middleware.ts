import { withAuth } from 'next-auth/middleware'

/**
 * Middleware de autenticação unificado e compartilhado para validar tokens de sessão
 * do NextAuth sem expor dependências diretas para as aplicações consumidoras.
 */
export const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})
