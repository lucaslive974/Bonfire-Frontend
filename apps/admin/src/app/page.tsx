'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PrimaryLayout, Footer, BrandLogo, SideBar } from '@bonfire/ui'
import { ThemeSelector } from '@bonfire/ui'
import {
  Server,
  Database,
  Cpu,
  History,
  Settings2,
  Activity,
  LogOut,
  CheckCircle2,
  UserCheck,
  Loader2,
  X,
  Sliders
} from 'lucide-react'

// Simple mock logger actions
const initialAuditLogs = [
  { id: '1', operator: 'Lucas Lima', action: 'Fusão Casing Shadcn/ui', app: 'apps/main', status: 'Sucesso', date: '26/05/2026 12:44' },
  { id: '2', operator: 'Guilherme Nogueira', action: 'Deploy de infraestrutura Next.js', app: 'apps/admin', status: 'Sucesso', date: '26/05/2026 12:50' },
  { id: '3', operator: 'Lucas Ribeiro', action: 'Ajuste de caching no Turborepo', app: 'monorepo', status: 'Sucesso', date: '26/05/2026 13:02' },
  { id: '4', operator: 'Lucas Lima', action: 'Refatoração Dockerfile standalone', app: 'monorepo', status: 'Sucesso', date: '26/05/2026 13:08' },
  { id: '5', operator: 'Sistema (Cron)', action: 'Limpeza de logs temporários .next', app: 'apps/main', status: 'Sucesso', date: '26/05/2026 13:10' }
]

export default function AdminDashboard() {
  const router = useRouter()
  const [session, setSession] = useState<{ name: string; email: string; role: string } | null>(null)

  // System Configurations Toggles
  const [maintenance, setMaintenance] = useState(false)
  const [debugLogs, setDebugLogs] = useState(true)
  const [syncInterval, setSyncInterval] = useState(15)
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs)

  // UI states
  const [mounted, setMounted] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'info'>('info')

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('admin_session')
      if (!saved) {
        router.push('/login')
      } else {
        setSession(JSON.parse(saved))
      }
    }
  }, [router])

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('admin_session')
    }
    router.push('/login')
  }

  const addAuditLog = (action: string) => {
    const newLog = {
      id: Math.random().toString(),
      operator: session?.name || 'Super Admin',
      action,
      app: 'apps/admin',
      status: 'Sucesso',
      date: new Date().toLocaleString('pt-BR', { hour12: false }).replace(',', '')
    }
    setAuditLogs([newLog, ...auditLogs])
  }

  const toggleMaintenance = () => {
    const nextState = !maintenance
    setMaintenance(nextState)
    showToast(
      nextState ? 'Modo de Manutenção Ativado Globalmente!' : 'Modo de Manutenção Desativado.',
      nextState ? 'info' : 'success'
    )
    addAuditLog(`${nextState ? 'Ativação' : 'Desativação'} do Modo Manutenção`)
  }

  const toggleDebug = () => {
    const nextState = !debugLogs
    setDebugLogs(nextState)
    showToast(nextState ? 'Depuração Avançada de Logs Ativada.' : 'Depuração de Logs Desativada.')
    addAuditLog(`${nextState ? 'Habilitação' : 'Desabilitação'} do Debug Mode`)
  }

  const handleSyncChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    setSyncInterval(val)
  }

  const handleSyncCommit = () => {
    showToast(`Intervalo de Sincronização ajustado para ${syncInterval} minutos!`)
    addAuditLog(`Ajuste Sync Interval para ${syncInterval}m`)
  }

  if (!mounted || !session) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
      </div>
    )
  }

  // --- MOCK CUSTOM HEADER ---
  const customHeader = ({ toggleSideBar }: { toggleSideBar: () => void }) => (
    <>
      <div className="h-12" />
      <header className="fixed top-0 left-0 z-20 flex h-12 w-full items-center justify-between border-b border-zinc-200/85 bg-white/85 backdrop-blur-md px-4 dark:border-zinc-800/85 dark:bg-zinc-950/85 shadow-sm transition-all duration-200">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSideBar}
            aria-label="Toggle sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400"
          >
            <Activity size={17} className="text-orange-500 animate-pulse" />
          </button>
          <BrandLogo />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-l border-zinc-200 dark:border-zinc-800 pl-3 hidden sm:inline-block">
            Console de Administração
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeSelector />
          <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

          {/* User Profile Info */}
          <div className="hidden sm:flex flex-col items-end leading-none gap-0.5">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{session.name}</span>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {session.role === 'admin' ? 'Super Admin' : 'Compliance Auditor'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition-colors"
            title="Sair do Console"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>
    </>
  )

  // --- MOCK CUSTOM SIDEBAR ---
  const customSidebar = ({ sidebarOpen, toggleSideBar }: { sidebarOpen: boolean; toggleSideBar: () => void }) => (
    <SideBar sidebarOpen={sidebarOpen} toggleSideBar={toggleSideBar}>
      <nav className="flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 mb-2">
          Módulos Administrativos
        </div>
        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 shadow-sm border-l-2 border-orange-500 rounded-l-none pl-2.5"
        >
          <Server size={16} />
          <span>Infraestrutura</span>
        </a>
        <a
          href="#"
          onClick={() => showToast('Módulo de banco de dados restrito.', 'info')}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-905 transition-colors"
        >
          <Database size={16} />
          <span>Banco de Dados</span>
        </a>
        <a
          href="#"
          onClick={() => showToast('Seção de estatísticas e auditorias gerais.', 'info')}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-905 transition-colors"
        >
          <History size={16} />
          <span>Auditoria Geral</span>
        </a>

        <div className="my-3 border-t border-zinc-200 dark:border-zinc-800" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 w-full text-left"
        >
          <LogOut size={16} />
          <span>Encerrar Sessão</span>
        </button>
      </nav>
    </SideBar>
  )

  return (
    <PrimaryLayout header={customHeader} sidebar={customSidebar} footer={<Footer />}>

      {/* Dynamic Toast Feedback Card */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md ${toastType === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/50'
            : 'bg-amber-50 dark:bg-amber-950/90 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/50'
            }`}>
            <CheckCircle2 size={16} className="shrink-0" />
            <span className="text-xs font-bold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Overview Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm mb-8 animate-in fade-in duration-300">
        <div className="flex items-center gap-4 text-left">
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 text-orange-500 rounded-2xl border border-orange-100 dark:border-orange-900/40">
            <Sliders size={22} className="animate-pulse-subtle" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              Console de Infraestrutura e Caching
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Gerenciamento global de namespaces, caches locais e políticas de modo de manutenção do ERP.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Admin Online
          </span>
        </div>
      </div>

      {/* Grid of 4 System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Metric 1: API */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between h-[130px] text-left">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              API Core Link
            </span>
            <Server size={16} className="text-emerald-500" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">99.98%</div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Uptime da API Flask (Porta 5000)</p>
          </div>
        </div>

        {/* Metric 2: DB Connection */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between h-[130px] text-left">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Database Link
            </span>
            <Database size={16} className="text-orange-500" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">Conectado</div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">PostgreSQL Ativo (12 Conexões)</p>
          </div>
        </div>

        {/* Metric 3: Active Operators */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between h-[130px] text-left">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Operadores Ativos
            </span>
            <UserCheck size={16} className="text-amber-500" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">3 Logados</div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Sessões ativas via Keycloak SSO</p>
          </div>
        </div>

        {/* Metric 4: System Load */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between h-[130px] text-left">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              CPU & Latência
            </span>
            <Cpu size={16} className="text-blue-500" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">14 ms</div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Tempo médio de resposta (Monorepo)</p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* Left Column (2/3): Audit Logs Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col text-left space-y-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <History size={16} className="text-orange-500" />
              Auditoria Recente de Operações
            </h2>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              Registro em tempo real das alterações administrativas e manutenções disparadas no monorepo.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-inner">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-150 dark:border-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-bold text-zinc-500 dark:text-zinc-400">Operador</th>
                  <th className="px-4 py-3 font-bold text-zinc-500 dark:text-zinc-400">Operação</th>
                  <th className="px-4 py-3 font-bold text-zinc-500 dark:text-zinc-400">Alvo</th>
                  <th className="px-4 py-3 font-bold text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="px-4 py-3 font-bold text-zinc-500 dark:text-zinc-400">Horário</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-900/50">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 transition-colors">
                    <td className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">{log.operator}</td>
                    <td className="px-4 py-3 text-zinc-650 dark:text-zinc-400">{log.action}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 text-zinc-500 dark:text-zinc-400">
                        {log.app}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold">{log.status}</td>
                    <td className="px-4 py-3 text-zinc-450 dark:text-zinc-500 text-[10px]">{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1/3): System Configurations */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col text-left space-y-5">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <Settings2 size={16} className="text-orange-500" />
              Controle Geral do Sistema
            </h2>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              Habilite switches globais e manipule configurações internas de persistência.
            </p>
          </div>

          <div className="space-y-4">

            {/* Toggle 1: Maintenance Mode */}
            <div
              onClick={toggleMaintenance}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors select-none"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">
                  Modo Manutenção
                </span>
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block leading-tight">
                  Trava acesso de operadores comuns ao dashboard principal.
                </span>
              </div>
              <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${maintenance ? 'bg-orange-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${maintenance ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Toggle 2: Debug Mode */}
            <div
              onClick={toggleDebug}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors select-none"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">
                  Depuração de Logs (Debug)
                </span>
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block leading-tight">
                  Habilita verbosidade estendida nos logs de build do Next.js.
                </span>
              </div>
              <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${debugLogs ? 'bg-orange-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${debugLogs ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Range Slider: Sync Interval */}
            <div className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/20 dark:bg-zinc-900/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250">
                  Intervalo de Sincronização
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                  {syncInterval} min
                </span>
              </div>
              <p className="text-[9px] text-zinc-400 dark:text-zinc-500 leading-tight">
                Tempo limite de expiração de dados locais do cache compartilhado.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={syncInterval}
                  onChange={handleSyncChange}
                  className="flex-1 accent-orange-500 cursor-pointer"
                />
                <button
                  onClick={handleSyncCommit}
                  className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-[10px] font-bold rounded-xl transition-colors shrink-0"
                >
                  Salvar
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </PrimaryLayout>
  )
}
