import { SessionWrapper } from '@/components/ui/sessionWrapper'
import { Toaster } from '@bonfire/ui'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
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
        <ThemeProvider attribute="class">
          <SessionWrapper>{children}</SessionWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
