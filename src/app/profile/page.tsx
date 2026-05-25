import { authServerService } from '@/services/auth/NextAuthServerService'
import { PrimaryLayout } from '@/components/UI/primaryLayout'
import { User, Mail, ShieldAlert, Award } from 'lucide-react'

export const metadata = {
  title: 'Bonfire - Meu Perfil',
}

export default async function ProfilePage() {
  // Get active session strictly on the Server-side using our abstract authServerService facade
  const session = await authServerService.getSession()

  return (
    <PrimaryLayout>
      <div className="w-full max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="border-b pb-6 dark:border-zinc-800">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Meu Perfil</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Esta página foi gerada estritamente no Servidor (Server Component) consumindo nosso novo <code className="font-mono bg-zinc-100 dark:bg-zinc-900 px-1 py-0.5 rounded text-xs">AuthService</code>.
          </p>
        </div>

        {session ? (
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Header / Accent Bar */}
            <div className="h-2 bg-zinc-900 dark:bg-zinc-100" />
            
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar frame */}
                <div className="h-20 w-20 rounded-full bg-zinc-100 dark:bg-zinc-900 border flex items-center justify-center text-zinc-400 dark:text-zinc-500 shadow-inner shrink-0">
                  <User className="h-10 w-10" />
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {session.user?.name || 'Usuário do Bonfire'}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center justify-center sm:justify-start gap-1.5">
                    <Mail className="h-4 w-4 shrink-0 text-zinc-400" />
                    {session.user?.email || 'Sem e-mail registrado'}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6 dark:border-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1 uppercase tracking-wider">
                    <Award className="h-4 w-4 text-indigo-500" />
                    Nível de Acesso
                  </h3>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    Administrador ERP
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1 uppercase tracking-wider">
                    <ShieldAlert className="h-4 w-4 text-emerald-500" />
                    Token Bearer
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate">
                    {session.accessToken ? `Bearer ${session.accessToken}` : 'Nenhum token na sessão'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-dashed rounded-2xl dark:border-zinc-800">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Sem sessão ativa</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-sm mt-1">
              Você precisa estar autenticado para visualizar os dados de perfil de servidor.
            </p>
          </div>
        )}
      </div>
    </PrimaryLayout>
  )
}
