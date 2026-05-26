'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Input, Label, ReusableDataTable } from '@bonfire/ui'
import { Calendar, Search } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setDate: (event: string) => void
  setAta: (event: string) => void
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setDate,
  setAta,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  return (
    <ReusableDataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyStateTitle="Nenhum recurso encontrado"
      emptyStateDescription="Experimente alterar a data de publicação ou filtrar por outro número de ata."
      footerCounterLabel="Total de autos"
      filters={() => (
        <>
          <Label className="flex items-center gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Data da Publicação:
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                placeholder="Data Publicação"
                className="pl-9 w-44 bg-white dark:bg-zinc-950 font-normal"
                type="date"
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
          </Label>
          
          <Label className="flex items-center gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            N° Ata:
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                placeholder="Filtrar por N° Ata"
                onChange={(event) => setAta(event.target.value)}
                className="pl-9 w-44 bg-white dark:bg-zinc-950 font-normal"
              />
            </div>
          </Label>
        </>
      )}
    />
  )
}
