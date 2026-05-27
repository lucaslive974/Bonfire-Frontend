'use client'

import { linesContext } from '@/contexts/lineContext'
import { useContext } from 'react'
import { Route } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { PageHeader } from '@bonfire/ui'

export function LinesLayout() {
  const { data } = useContext(linesContext)

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300 gap-6">
      <PageHeader
        icon={<Route className="h-6 w-6" />}
        iconClassName="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/50"
        title="Cadastro de Linhas"
        description="Gerencie as linhas de transporte público, itinerários, trajetos e configurações operacionais."
        badgeText="Rotas Ativas"
        badgeColor="bg-emerald-500"
      />

      <DataTable columns={columns} data={data || []} />
    </div>
  )
}
