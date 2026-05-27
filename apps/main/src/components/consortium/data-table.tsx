'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Input, ReusableDataTable } from '@bonfire/ui'
import { Search } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  return (
    <ReusableDataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyStateTitle="Nenhum consórcio encontrado"
      emptyStateDescription="Não há registros de consórcios disponíveis para exibição no momento."
      footerCounterLabel="Total de consórcios"
      filters={(table) => (
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                placeholder="Filtrar por Nome"
                value={
                  (table.getColumn('NOME')?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn('NOME')?.setFilterValue(event.target.value)
                }
                className="pl-9 w-52 bg-white dark:bg-zinc-950"
              />
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                placeholder="Filtrar por Código"
                value={
                  (table.getColumn('ID')?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn('ID')?.setFilterValue(event.target.value)
                }
                className="pl-9 w-44 bg-white dark:bg-zinc-950"
              />
            </div>
          </div>
        </div>
      )}
    />
  )
}
