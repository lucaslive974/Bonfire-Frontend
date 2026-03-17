'use client'

import { useInfractions } from '@/hooks/useInfractions'
import { useRecurses } from '@/hooks/useRecurses'
import { Loader2, ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../UI/button'
import { FileUpload } from '../ui/file-upload'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';

import { formatFileSize } from '@/lib/utils'

type ImportType = 'infraction' | 'recurse-first' | 'recurse-second'

const importOptions = {
  'infraction': {
    title: 'Infrações',
    accept: '.csv',
  },
  'recurse-first': {
    title: 'Recurso — Primeira Instância',
    accept: '.docx',
  },
  'recurse-second': {
    title: 'Recurso — Segunda Instância',
    accept: '.docx',
  },
}


export function ImportForm() {
  const [type, setType] = useState<ImportType>('infraction')
  const [file, setFile] = useState<File | null>(null)

  const { importing, HandleImportAutoInfractions } = useInfractions()
  const { importingFirst, importingSecond, HandleImport } = useRecurses()

  const current = importOptions[type]

  const loading =
    type === 'infraction'
      ? importing
      : type === 'recurse-first'
        ? importingFirst
        : importingSecond

  async function handleImport() {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    if (type === 'infraction') return HandleImportAutoInfractions({ file })
    if (type === 'recurse-first') return HandleImport({ file }, 1)
    if (type === 'recurse-second') return HandleImport({ file }, 2)
  }

  return (
    <div className="space-y-6 rounded-md p-8 min-w-28">
      <h2 className="text-center font-semibold">Importação de arquivos</h2>

      {/* Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex w-full items-center justify-between group">
            {current.title}
            <ChevronDown
              size={16}
              className="opacity-70 transition-transform group-data-[state=open]:rotate-180"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-72 z-50 rounded-xl border p-2 shadow-lg bg-popover text-popover-foreground animate-in fade-in zoom-in-95">
          <div
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium popover-option"
            onClick={() => setType('infraction')}>
            Auto de Infração
          </div>

          <div
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium popover-option"
            onClick={() => setType('recurse-first')}>
            Recurso — Primeira Instância
          </div>

          <div
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium popover-option"
            onClick={() => setType('recurse-second')}>
            Recurso — Segunda Instância
          </div>
        </PopoverContent>
      </Popover>

      {/* Upload */}
      {file ? (
        <div className="flex items-center justify-between rounded-lg border p-3 text-sm dark:border-zinc-700">
          <div className="flex flex-col">
            <span className="font-medium">{file.name}</span>
            <span className="text-xs text-zinc-500">
              {formatFileSize(file.size)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-red-500 hover:underline"
          >
            Remover
          </button>
        </div>
      ) : (
        <FileUpload accept={current.accept} onFileSelect={setFile} />
      )}

      {/* Submit */}
      <Button onClick={handleImport} disabled={loading || !file}>
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <div className="text-background dark:text-background">Importando...</div>
          </span>
        ) : (
          'Importar'
        )}
      </Button>
    </div>
  )
}
