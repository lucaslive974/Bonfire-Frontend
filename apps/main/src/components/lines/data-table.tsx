'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button, Input, Dialog, DialogTrigger, ReusableDataTable } from '@bonfire/ui'
import { DialogInsertLine } from '@/components/lines/dialogLines'
import { Search, Plus } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  return (
    <ReusableDataTable
      columns={columns}
      data={data}
      emptyStateTitle="Nenhuma linha encontrada"
      emptyStateDescription="Experimente digitar outro código ou incluir uma nova linha para começar."
      footerCounterLabel="Total de linhas"
      filters={(table) => (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Filtrar por Linha"
              value={
                (table.getColumn('COD_LINH')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('COD_LINH')?.setFilterValue(event.target.value)
              }
              className="pl-9 w-44 bg-white dark:bg-zinc-950"
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1.5 font-semibold ml-auto">
                <Plus size={15} />
                Incluir Linha
              </Button>
            </DialogTrigger>
            <DialogInsertLine
              line={{
                COD_LINH: '',
                COMPARTILHADA: false,
                ID_OPERADORA: 0,
                LINH_ATIV_EMPR: false,
              }}
            />
          </Dialog>
        </>
      )}
    />
  )
}
