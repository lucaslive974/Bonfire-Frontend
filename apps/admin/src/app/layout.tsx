import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionWrapper } from '../components/sessionWrapper'
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
        <ThemeProvider attribute="class">
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
