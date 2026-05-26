'use client'

import { ReactNode, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  Table as ReactTable,
} from '@tanstack/react-table'

import { Button } from './button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

import {
  TableWrapper,
  TableWrapperFilters,
  TableWrapperBody,
  TableWrapperFooter
} from './tableWrappers'

import { Ban, ChevronLeft, ChevronRight } from 'lucide-react'

interface ReusableDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  emptyStateTitle?: string
  emptyStateDescription?: string
  footerCounterLabel?: string
  filters?: (table: ReactTable<TData>) => ReactNode
}

export function ReusableDataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  emptyStateTitle = 'Nenhum registro encontrado',
  emptyStateDescription = 'Experimente alterar os filtros para encontrar registros.',
  footerCounterLabel = 'Total de registros',
  filters,
}: ReusableDataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  })

  const hasSelectedRows = table.getFilteredSelectedRowModel().rows.length > 0

  return (
    <TableWrapper>
      {/* FILTER BAR */}
      {filters && (
        <TableWrapperFilters className="flex flex-wrap items-center justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-900/10 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 mb-4">
          {filters(table)}
        </TableWrapperFilters>
      )}

      {/* TABLE BODY CARD WRAPPER */}
      <TableWrapperBody>
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
              {isLoading ? (
                Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex} className="border-b border-zinc-100 dark:border-zinc-900/80 hover:bg-transparent">
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex} className="py-4">
                        <div
                          className={`h-4 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded ${
                            colIndex % 3 === 0 ? 'w-3/4' : colIndex % 3 === 1 ? 'w-1/2' : 'w-2/3'
                          }`}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-900"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 text-zinc-700 dark:text-zinc-300">
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
                        {emptyStateTitle}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {emptyStateDescription}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TableWrapperBody>

      {/* FOOTER PAGINATION */}
      <TableWrapperFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 px-2 py-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          <div>
            {`${footerCounterLabel}: ${table.getRowCount()}`}
          </div>
          {hasSelectedRows && (
            <>
              <div className="text-zinc-400 dark:text-zinc-500 hidden sm:inline">•</div>
              <div className="text-blue-600 dark:text-blue-400 font-medium animate-in fade-in">
                {table.getFilteredSelectedRowModel().rows.length} de{' '}
                {table.getFilteredRowModel().rows.length} item(s) selecionado(s)
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Página anterior"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Próxima página"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </TableWrapperFooter>
    </TableWrapper>
  )
}
