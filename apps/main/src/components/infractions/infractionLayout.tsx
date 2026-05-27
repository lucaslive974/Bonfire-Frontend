'use client'

import { useInfractionsViewModel } from '@/hooks/useInfractionsViewModel'
import { ShieldAlert } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { PageHeader } from '@bonfire/ui'

export function InfractionLayout() {
  const { infracoes, setDate, setAi, isLoading } = useInfractionsViewModel()

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300 gap-6">
      <PageHeader
        icon={<ShieldAlert className="h-6 w-6" />}
        iconClassName="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50 animate-pulse-subtle"
        title="Gestão de Infrações"
        description="Consulte, filtre e analise os autos de infração de trânsito em tempo real."
        badgeText="Sincronizado"
        badgeColor="bg-emerald-500"
      />

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
