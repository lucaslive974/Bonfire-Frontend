'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { notify } from '@/lib/utils'
import { Logo } from '../UI/logo'
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
    <div className="flex flex-col items-center gap-16">
      <div className="scale-150">
        <Logo></Logo>
      </div>
      <LoginBtn></LoginBtn>
    </div>
  )
}

export function LoginMenu() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginMenuContent />
    </Suspense>
  )
}
