import { ReactNode } from 'react'
import { ThemeWrapper } from '@bonfire/ui'
import { AuthProvider } from '@bonfire/core'
import './globals.css'

export const metadata = {
  title: 'Bonfire Admin',
  description: 'Painel de Administração do Bonfire',
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
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeWrapper>
      </body>
    </html>
  )
}
