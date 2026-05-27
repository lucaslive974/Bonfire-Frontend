'use client'

import { selectColumn } from '@bonfire/ui'
import { ConsortiumFrameData } from '@/schemas/ConsortiumSchema'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<ConsortiumFrameData>[] = [
  selectColumn,
  {
    accessorKey: 'ID',
    header: () => <div className="text-center font-bold">Código</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('ID')}</div>
    ),
  },
  {
    accessorKey: 'NOME',
    header: () => <div className="text-center font-bold">Nome</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('NOME')}</div>
    ),
  },
  {
    accessorKey: 'CONCESSIONARIA',
    header: () => <div className="text-center font-bold">Concessionaria</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('CONCESSIONARIA')}</div>
    ),
  },
]
