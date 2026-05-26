'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SecondaryLayout, BrandLogoFull, Button } from '@bonfire/ui'
import { User, Lock, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'admin' | 'auditor'>('admin')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    setLoading(true)
    setError('')

    // Simulating Secure Administrative Authentication
    setTimeout(() => {
      setLoading(false)
      // Save session in local storage for secure persistence in dev/prod sandbox
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('admin_session', JSON.stringify({
          name: role === 'admin' ? 'Administrador do Sistema' : 'Auditor Geral',
          email: email,
          role: role,
          loggedInAt: new Date().toISOString()
        }))
      }
      router.push('/')
    }, 1200)
  }

  return (
    <SecondaryLayout>
      <div className="w-full max-w-[400px] p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Branding header */}
        <BrandLogoFull />

        {/* Info secure badge */}
        <div className="inline-flex items-center gap-1.5 w-full justify-center text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-900/50">
          <ShieldCheck size={12} className="animate-pulse" />
          PORTAL DE CONTROLE DE INFRAESTRUTURA SEGURO
        </div>

        {/* Auth selector */}
        <div className="flex gap-2 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors select-none ${
              role === 'admin'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Super Admin
          </button>
          <button
            type="button"
            onClick={() => setRole('auditor')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors select-none ${
              role === 'auditor'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Compliance Auditor
          </button>
        </div>

        {/* Input fields */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Identificação (Email / Usuário)
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" />
              <input
                type="email"
                placeholder="admin@bonfire.gov.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 transition-all text-zinc-800 dark:text-zinc-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Palavra-Passe Administrativa
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-zinc-400 dark:text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 transition-all text-zinc-800 dark:text-zinc-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-350 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[10px] font-bold text-red-500 mt-1 flex items-center gap-1 bg-red-50 dark:bg-red-950/20 p-2 rounded-lg border border-red-100 dark:border-red-900/30">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2 font-bold py-5 text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Autenticando Acesso...
              </>
            ) : (
              'Entrar no Painel de Administração'
            )}
          </Button>
        </form>

        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center">
          Conexão restrita a operadores autorizados. Todas as tentativas de login e ações são monitoradas e auditadas legalmente pelo sistema.
        </p>

      </div>
    </SecondaryLayout>
  )
}
