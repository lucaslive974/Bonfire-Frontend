'use client'

import { ConsortiumFrameData } from '@/schemas/ConsortiumSchema'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<ConsortiumFrameData>[] = [
  {
    accessorKey: 'ID',
    header: 'Código',
  },
  {
    accessorKey: 'NOME',
    header: 'Nome',
  },
  {
    accessorKey: 'CONCESSIONARIA',
    header: 'Concessionaria',
  },
]
