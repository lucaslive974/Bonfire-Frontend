'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { notify } from '@/lib/utils'
import { Flame, ShieldCheck } from 'lucide-react'
import LoginBtn from './loginBtn'

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
      
      {/* Branding Logo Header */}
      <div className="flex flex-col items-center space-y-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 animate-pulse-subtle">
          <Flame size={32} className="fill-current" />
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent block">
            Bonfire
          </span>
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
            Autos de Infração & Gestão
          </span>
        </div>
      </div>

      <div className="w-full border-t border-zinc-100 dark:border-zinc-900" />

      {/* Button and Status */}
      <div className="w-full">
        <LoginBtn />
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
