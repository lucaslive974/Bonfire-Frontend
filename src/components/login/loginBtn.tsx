'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '../UI/button'
import { LogIn, LogOut, LayoutDashboard, User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function SignOutBtn() {
  const { logout } = useAuth()
  return (
    <Button
      variant="outline"
      onClick={() => logout({ redirect: false })}
      className="w-full flex items-center justify-center gap-2 font-bold py-5 text-xs text-red-500 border-red-200 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 dark:border-red-900/50 rounded-xl transition-all duration-200"
    >
      <LogOut size={14} />
      <span>Sair da Conta</span>
    </Button>
  )
}

export default function LoginBtn() {
  const { session, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      await login('credentials', { username, password })
      window.location.href = '/'
    } catch (err: any) {
      console.error('[Login Form] Auth failed:', err)
      setErrorMessage('Usuário ou senha inválidos.')
    } finally {
      setIsLoading(false)
    }
  }

  if (session) {
    const name = session.user?.name || ''
    const initial = name ? name.charAt(0).toUpperCase() : 'U'

    return (
      <div className="flex flex-col items-center gap-6 w-full animate-in fade-in duration-300">

        {/* User Card */}
        <div className="w-full p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
            {initial}
          </div>
          <div className="flex-1 text-left min-w-0">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {session.user?.name || 'Usuário Autenticado'}
            </h3>
            <p className="text-xs text-zinc-500 truncate mt-0.5">
              {session.user?.email || 'Sem e-mail cadastrado'}
            </p>
          </div>
        </div>

        {/* Dashboard Access & Sign Out Actions */}
        <div className="w-full flex flex-col gap-2">
          <Link href="/" className="w-full">
            <Button className="w-full flex items-center justify-center gap-2 font-bold py-6 text-sm bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl hover:bg-zinc-850 dark:hover:bg-zinc-50 transition-all duration-200">
              <LayoutDashboard size={16} />
              <span>Acessar Painel Principal</span>
            </Button>
          </Link>

          <SignOutBtn />
        </div>

      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full animate-in fade-in duration-300">
      <div className="space-y-1 text-center mb-2">
        <p className="text-sm text-zinc-650 dark:text-zinc-450">
          Seja bem-vindo de volta!
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-xs leading-relaxed mx-auto">
          Insira suas credenciais abaixo para acessar os autos de infração e cadastros municipais.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl text-center animate-in shake duration-200">
          {errorMessage}
        </div>
      )}

      {/* Username Field */}
      <div className="space-y-1.5 text-left">
        <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 ml-1">
          Usuário / E-mail
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            required
            placeholder="Seu usuário ou e-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:ring-orange-500/20 dark:focus:border-orange-500 disabled:opacity-50 text-zinc-800 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5 text-left">
        <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 ml-1">
          Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 pointer-events-none" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Sua senha de acesso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:ring-orange-500/20 dark:focus:border-orange-500 disabled:opacity-50 text-zinc-800 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 font-bold py-6 text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-md transition-all duration-200 mt-2 disabled:opacity-75"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogIn size={16} />
        )}
        <span>{isLoading ? 'Autenticando...' : 'Entrar no Sistema'}</span>
      </Button>
    </form>)
}
