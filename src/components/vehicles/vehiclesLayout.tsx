'use client'

import { VehicleContext } from '@/contexts/vehicleContext'
import { useContext } from 'react'
import { Car } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'

export function VehiclesLayout() {
  const { data } = useContext(VehicleContext)

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/50">
            <Car className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Cadastro de Veículos
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Gerencie a frota de veículos associada, cadastrando novos automóveis e editando informações.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            Frota Ativa
          </span>
        </div>
      </div>

      <DataTable columns={columns} data={data || []} />
    </div>
  )
}
