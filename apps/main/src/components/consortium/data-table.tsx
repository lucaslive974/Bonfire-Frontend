'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TableWrapper } from '@/components/ui/tableWrappers'
import { Ban } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableWrapper>
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent bg-zinc-50/50 dark:bg-zinc-900/30">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-zinc-600 dark:text-zinc-400 font-bold py-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-900"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5 text-zinc-700 dark:text-zinc-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Ban className="h-8 w-8 text-zinc-400 dark:text-zinc-500 animate-in fade-in" />
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Nenhum consórcio encontrado
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Não há registros de consórcios disponíveis para exibição no momento.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </TableWrapper>
  )
}
