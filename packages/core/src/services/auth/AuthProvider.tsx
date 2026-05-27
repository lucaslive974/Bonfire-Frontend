'use client'

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

export interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provedor de Sessão de Autenticação unificado (Client Component).
 * Encapsula o detalhe de implementação (Next-Auth SessionProvider) para as aplicações consumidoras.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
