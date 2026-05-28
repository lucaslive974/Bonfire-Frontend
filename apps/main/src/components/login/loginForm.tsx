'use client'

import { useLoginViewModel } from '@/hooks/useLoginViewModel'
import {
  Button,
  IconInput,
  FormSubmitButton,
  UserSessionCard,
  SignOutButton,
  FormError
} from '@bonfire/ui'
import { LogIn, LayoutDashboard, User, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export function SignOutBtn() {
  const { logout } = useLoginViewModel()
  return (
    <SignOutButton onClick={() => logout({ redirect: false })} />
  )
}

export default function LoginForm() {
  const {
    session,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    errorMessage,
    handleSubmit,
  } = useLoginViewModel()

  if (session) {
    return (
      <div className="flex flex-col items-center gap-6 w-full animate-in fade-in duration-300">
        
        {/* Abstracted User Card */}
        <UserSessionCard
          name={session.user?.name || ''}
          email={session.user?.email || ''}
        />

        {/* Dashboard Access & Sign Out Actions */}
        <div className="w-full flex flex-col gap-2">
          <Link href="/" className="w-full">
            <Button className="w-full flex items-center justify-center gap-2 font-bold py-6 text-sm bg-zinc-900 dark:bg-zinc-100 rounded-xl hover:bg-zinc-850 dark:hover:bg-zinc-50 transition-all duration-200 border-none">
              <LayoutDashboard size={16} className="text-white dark:text-zinc-900" />
              <span className="text-white dark:text-zinc-900">Acessar Painel Principal</span>
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

      {/* Abstracted Form Error Banner */}
      {errorMessage && <FormError message={errorMessage} />}

      {/* Abstracted Username Input Field */}
      <IconInput
        type="text"
        required
        label="Usuário / E-mail"
        placeholder="Seu usuário ou e-mail"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        icon={User}
      />

      {/* Abstracted Password Input Field */}
      <IconInput
        type={showPassword ? 'text' : 'password'}
        required
        label="Senha"
        placeholder="Sua senha de acesso"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        icon={Lock}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors h-4 flex items-center justify-center"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      {/* Abstracted Submit Action Button */}
      <FormSubmitButton
        isLoading={isLoading}
        loadingText="Autenticando..."
        icon={LogIn}
      >
        Entrar no Sistema
      </FormSubmitButton>
    </form>
  )
}
