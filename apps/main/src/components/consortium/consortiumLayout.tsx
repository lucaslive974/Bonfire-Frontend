'use client'

import { GetConsortiums } from '@/services/consortium'
import { Building } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { PageHeader } from '@bonfire/ui'

export function ConsortiumLayout() {
  const { data } = GetConsortiums()

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300 gap-6">
      <PageHeader
        icon={<Building className="h-6 w-6" />}
        iconClassName="bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50"
        title="Consórcios Cadastrados"
        description="Gerencie os consórcios e empresas de transporte operando no sistema do município."
        badgeText="Operação Unificada"
        badgeColor="bg-purple-500"
      />

      <DataTable columns={columns} data={data || []} />
    </div>
  )
}
