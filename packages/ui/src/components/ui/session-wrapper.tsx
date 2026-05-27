'use client'

import { AuthProvider } from '@bonfire/core'

export function SessionWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
