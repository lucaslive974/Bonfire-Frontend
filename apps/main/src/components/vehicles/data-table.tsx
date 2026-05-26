'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Dialog, DialogTrigger, Button, Input, ReusableDataTable } from '@bonfire/ui'
import { DialogIncludeVehicle } from './dialogVehicles'
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
      emptyStateTitle="Nenhum veículo encontrado"
      emptyStateDescription="Experimente digitar outro código, placa ou incluir um novo veículo para começar."
      footerCounterLabel="Total de veículos"
      filters={(table) => (
        <div className='flex w-full justify-between items-center'>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                placeholder="Filtrar por Veículo"
                value={
                  (table.getColumn('NUM_VEIC')?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn('NUM_VEIC')?.setFilterValue(event.target.value)
                }
                className="pl-9 w-44 bg-white dark:bg-zinc-950"
              />
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                placeholder="Filtrar por Placa"
                value={
                  (table.getColumn('IDN_PLAC_VEIC')?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn('IDN_PLAC_VEIC')?.setFilterValue(event.target.value)
                }
                className="pl-9 w-44 bg-white dark:bg-zinc-950"
              />
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1.5 font-semibold ml-auto">
                <Plus size={15}/>
                Incluir Veículo
              </Button>
            </DialogTrigger>
            <DialogIncludeVehicle
              vehicle={{
                IDN_PLAC_VEIC: '',
                NUM_VEIC: '',
                VEIC_ATIV_EMPR: false,
              }}
            />
          </Dialog>
        </div>
      )}
    />
  )
}
