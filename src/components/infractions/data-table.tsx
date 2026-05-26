'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Input } from '@/components/UI/input'
import { ReusableDataTable } from '@/components/UI/reusable-data-table'
import { Calendar, Search } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setDate: (event: string) => void
  setAi: (event: string) => void
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setDate,
  setAi,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  return (
    <ReusableDataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyStateTitle="Nenhuma infração encontrada"
      emptyStateDescription="Experimente limpar os filtros ou selecionar outra data para ver os registros."
      footerCounterLabel="Total de autos"
      filters={() => (
        <>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Filtrar por Data"
              className="pl-9 w-44 bg-white dark:bg-zinc-950"
              type="date"
              onBlur={(event) => setDate(event.target.value)}
            />
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="N° Auto de Infração"
              onChange={(event) => setAi(event.target.value)}
              className="pl-9 w-52 bg-white dark:bg-zinc-950"
            />
          </div>
        </>
      )}
    />
  )
}
