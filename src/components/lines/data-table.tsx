'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/UI/table'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/UI/dialog'
import { DialogInsertLine } from '@/components/lines/dialogLines'

import {
  TableWrapper,
  TableWrapperFilters,
  TableWrapperBody,
  TableWrapperFooter
} from '@/components/UI/tableWrappers'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
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

  return (
    <TableWrapper>
      <TableWrapperFilters>
        <Input
          placeholder="Linha"
          value={
            (table.getColumn('COD_LINH')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('COD_LINH')?.setFilterValue(event.target.value)
          }
          className="w-36"
        />
        <Dialog>
          <DialogTrigger className="min-w-20 rounded-md p-2 font-medium">
            <Button>Incluir</Button>
          </DialogTrigger>
          <div className="hidden">
            <DialogInsertLine
              line={{
                COD_LINH: '',
                COMPARTILHADA: false,
                ID_OPERADORA: 0,
                LINH_ATIV_EMPR: false,
              }}
            ></DialogInsertLine>
          </div>
        </Dialog>
      </TableWrapperFilters>
      <TableWrapperBody>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableWrapperBody>
      <TableWrapperFooter>
        <div>
          {`Total de linhas:  ${table.getRowCount()}`}
        </div>
        <div>
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} veiculo(s)
            selecionados.
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </TableWrapperFooter>
    </TableWrapper>
  )
}
