'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu'
import { VehiclesData } from '@/schemas/VechicleSchema'
import { ColumnDef } from '@tanstack/react-table'
import { Edit3, MoreHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../UI/button'
import { Checkbox } from '../UI/checkbox'
import { Dialog, DialogTrigger } from '../UI/dialog'
import { DialogDeleteVehicle, DialogEditVehicle } from './dialogVehicles'

export const columns: ColumnDef<VehiclesData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          table.getIsSomePageRowsSelected() ||
          'indeterminate'
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'NUM_VEIC',
    header: () => <div className="text-center font-bold">Veiculo</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('NUM_VEIC')}</div>
    ),
  },
  {
    accessorKey: 'IDN_PLAC_VEIC',
    header: () => <div className="text-center font-bold">Placa</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('IDN_PLAC_VEIC')}</div>
    ),
  },
  {
    accessorKey: 'VEIC_ATIV_EMPR',
    header: () => <div className="text-center font-bold">Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue('VEIC_ATIV_EMPR')
        ? 'Ativo'
        : 'Inativo'
      return <div className="text-center">{status}</div>
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center font-bold">Ações</div>,
    cell: ({ row }) => {
      const vehicle = row.original
      const [dialogOption, setDialogOption] = useState<'edit' | 'delete'>(
        'edit',
      )

      return (
        <div className="flex justify-center">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center transition-colors focus-visible:ring-1 focus-visible:ring-orange-500"
                >
                  <MoreHorizontal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-2xl p-1.5 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/85 shadow-xl min-w-[130px] animate-in fade-in duration-100"
              >
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => setDialogOption('edit')}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl cursor-pointer text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 focus:bg-zinc-50 dark:focus:bg-zinc-900/60 focus:text-orange-500 dark:focus:text-orange-400 transition-colors select-none"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => setDialogOption('delete')}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl cursor-pointer text-red-650 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 focus:bg-red-50/50 dark:focus:bg-red-950/20 focus:text-red-650 dark:focus:text-red-400 transition-colors select-none"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Excluir
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            {dialogOption === 'edit' && (
              <DialogEditVehicle vehicle={vehicle}></DialogEditVehicle>
            )}
            {dialogOption === 'delete' && (
              <DialogDeleteVehicle vehicle={vehicle}></DialogDeleteVehicle>
            )}
          </Dialog>
        </div>
      )
    },
  },
]
