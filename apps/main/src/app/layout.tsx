import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ThemeWrapper, Toaster } from '@bonfire/ui'
import { AuthProvider } from '@bonfire/core'
import './globals.css'

export const metadata: Metadata = {
  title: 'BonFire',
  description: 'Processamento de autos de infração',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="h-screen w-screen">
        <ThemeWrapper>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThemeWrapper>
      </body>
    </html>
  )
}
