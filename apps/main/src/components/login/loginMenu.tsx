'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import LoginForm from './loginForm'
import { notify } from '@/lib/utils'
import { ShieldCheck } from 'lucide-react'
import { BrandLogoFull } from '@bonfire/ui'

function LoginMenuContent() {
  const searchParams = useSearchParams()
  const expired = searchParams.get('expired')

  useEffect(() => {
    if (expired === 'true') {
      const timer = setTimeout(() => {
        notify.error('Sessão expirada. Por favor, faça login novamente.')
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [expired])

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">

      <BrandLogoFull />
      <div className="w-full border-t border-zinc-100 dark:border-zinc-900" />

      {/* Button and Status */}
      <div className="w-full">
        <LoginForm />
      </div>

      {/* Security badge at bottom */}
      <div className="flex items-center gap-1.5 justify-center text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Autenticação Segura via Keycloak</span>
      </div>
    </div>
  )
}

export function LoginMenu() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center gap-3">
        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Carregando formulário...</span>
      </div>
    }>
      <LoginMenuContent />
    </Suspense>
  )
}
