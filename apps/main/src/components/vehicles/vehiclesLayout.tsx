'use client'

import { VehicleContext } from '@/contexts/vehicleContext'
import { useContext } from 'react'
import { Car } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { PageHeader } from '@bonfire/ui'

export function VehiclesLayout() {
  const { data } = useContext(VehicleContext)

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300 gap-6">
      <PageHeader
        icon={<Car className="h-6 w-6" />}
        iconClassName="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/50"
        title="Cadastro de Veículos"
        description="Gerencie a frota de veículos associada, cadastrando novos automóveis e editando informações."
        badgeText="Frota Ativa"
        badgeColor="bg-blue-500"
      />

      <DataTable columns={columns} data={data || []} />
    </div>
  )
}
