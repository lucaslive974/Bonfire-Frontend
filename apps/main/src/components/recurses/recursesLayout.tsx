'use client'

import { useRecursesViewModel } from '@/hooks/useRecursesViewModel'
import { Scale } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { PageHeader } from '@bonfire/ui'

enum InstancesE {
  primeira = 1,
  segunda = 2,
}
interface RecursesLayoutProps {
  instance?: InstancesE
}

export function RecursesLayout({ instance = InstancesE.primeira }: RecursesLayoutProps) {
  const { recursos, setDate, setAta, isLoading } = useRecursesViewModel(instance)

  const isFirstInstance = instance === InstancesE.primeira
  const title = isFirstInstance ? "Recursos em 1ª Instância" : "Recursos em 2ª Instância"
  const description = isFirstInstance
    ? "Acompanhamento e julgamento de recursos na Junta Administrativa de Recursos de Infrações (JARI)."
    : "Acompanhamento e julgamento de recursos em segunda instância administrativa no SETRA / SUMOB."

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300 gap-6">
      <PageHeader
        icon={<Scale className="h-6 w-6" />}
        iconClassName="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-900/50 animate-pulse-subtle"
        title={title}
        description={description}
        badgeText={isFirstInstance ? 'JARI Ativa' : 'SETRA / SUMOB Ativo'}
        badgeColor="bg-indigo-500"
      />

      <DataTable
        columns={columns}
        data={recursos}
        setDate={setDate}
        setAta={setAta}
        isLoading={isLoading}
      />
    </div>
  )
}
