'use client'

import { UploadCloud } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

type Props = {
  accept: string
  onFileSelect: (file: File) => void
}

export function FileUpload({ accept, onFileSelect }: Props) {
  const onDrop = useCallback((files: File[]) => {
    if (!files[0]) return
    onFileSelect(files[0])
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-sm
      transition-all duration-200 ease-out transform
      ${isDragActive
        ? 'scale-[1.03] border-blue-500 bg-blue-50 shadow-md dark:bg-blue-950/30'
        : 'scale-100 border-zinc-300 dark:border-zinc-700'
      }`}
    >
      <input {...getInputProps()} accept={accept} />

      <UploadCloud
        size={28}
        className={`transition-all duration-200 ${
          isDragActive ? 'scale-110 text-blue-500' : 'text-sky-500'
        }`}
      />

      <p className="h-5 w-48 max-sm:w-fit text-center transition-colors">
        {isDragActive
          ? 'Solte o arquivo aqui'
          : 'Arraste um arquivo ou clique'}
      </p>
    </div>
  )
}
