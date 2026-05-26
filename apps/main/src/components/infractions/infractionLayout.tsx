'use client'

import { useInfractionsViewModel } from '@/hooks/useInfractionsViewModel'
import { ShieldAlert } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'

export function InfractionLayout() {
  const { infracoes, setDate, setAi, isLoading } = useInfractionsViewModel()

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-100 dark:border-amber-900/50 animate-pulse-subtle">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Gestão de Infrações
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Consulte, filtre e analise os autos de infração de trânsito em tempo real.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            Sincronizado
          </span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={infracoes}
        setDate={setDate}
        setAi={setAi}
        isLoading={isLoading}
      />
    </div>
  )
}
