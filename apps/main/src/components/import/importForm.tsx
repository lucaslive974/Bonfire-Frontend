'use client'

import { useInfractions } from '@/hooks/useInfractions'
import { useRecurses } from '@/hooks/useRecurses'
import { formatFileSize } from '@/lib/utils'
import {
  Loader2,
  ShieldAlert,
  Scale,
  Gavel,
  UploadCloud,
  FileText,
  Trash2,
  Info,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

type ImportType = 'infraction' | 'recurse-first' | 'recurse-second'

const importOptions = {
  infraction: {
    id: 'infraction',
    title: 'Autos de Infração',
    subtitle: 'Cadastrar novos registros de infrações',
    description: 'Importação em lote de autos de infração municipais de trânsito em formato de planilha padronizada.',
    accept: '.csv',
    acceptLabel: 'CSV (Planilha)',
    guidelines: [
      'O arquivo deve conter as colunas de identificação do auto de infração.',
      'Certifique-se de que os dados de placa, data e horário estejam no formato padrão.',
      'O delimitador do arquivo CSV deve ser vírgula ou ponto e vírgula.',
      'Evite cabeçalhos duplicados ou linhas em branco no meio do arquivo.',
    ],
  },
  'recurse-first': {
    id: 'recurse-first',
    title: 'Recurso — 1ª Instância',
    subtitle: 'Defesas preliminares de trânsito',
    description: 'Envio de processos administrativos de defesa preliminar municipal em formato de documento formatado.',
    accept: '.docx',
    acceptLabel: 'DOCX (Word Document)',
    guidelines: [
      'O arquivo deve ser um documento formatado em formato .docx.',
      'Deve conter a identificação clara do número do processo administrativo.',
      'Certifique-se de que as imagens ou assinaturas anexadas estejam legíveis.',
      'O tamanho do arquivo não deve ultrapassar o limite recomendado de 10MB.',
    ],
  },
  'recurse-second': {
    id: 'recurse-second',
    title: 'Recurso — 2ª Instância',
    subtitle: 'JARI / Segunda Instância recursal',
    description: 'Julgamento e envio de recursos em segunda instância para a junta administrativa de trânsito.',
    accept: '.docx',
    acceptLabel: 'DOCX (Word Document)',
    guidelines: [
      'Documento do tipo .docx com a petição formal de recurso de 2ª instância.',
      'Vinculado ao número da primeira instância e dados cadastrais da autuação original.',
      'Deve seguir a formatação oficial do modelo padrão fornecido pela JARI.',
      'Arquivos protegidos por senha não podem ser processados pelo sistema.',
    ],
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

  // Reset selected file when import type changes to prevent wrong format uploads
  useEffect(() => {
    setFile(null)
  }, [type])

  const onDrop = useCallback((files: File[]) => {
    if (!files[0]) return
    setFile(files[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    // Dynamically match accept attribute
    accept: type === 'infraction' 
      ? { 'text/csv': ['.csv'] } 
      : { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
  })

  async function handleImport() {
    if (!file) return

    if (type === 'infraction') {
      await HandleImportAutoInfractions({ file })
      setFile(null)
    } else if (type === 'recurse-first') {
      await HandleImport({ file }, 1)
      setFile(null)
    } else if (type === 'recurse-second') {
      await HandleImport({ file }, 2)
      setFile(null)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start mt-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
      
      {/* LEFT COLUMN: Data Type Selector */}
      <div className="lg:col-span-5 space-y-4">
        <div className="space-y-1 mb-4 text-left">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Passo 1: Tipo de Dado
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Selecione a categoria de dados que deseja carregar no sistema.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Card 1: Infraction */}
          <div
            onClick={() => !loading && setType('infraction')}
            className={`group p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex gap-4 select-none
              ${
                type === 'infraction'
                  ? 'border-orange-500 dark:border-orange-500/80 bg-orange-50/10 dark:bg-orange-500/5 ring-1 ring-orange-500/20 shadow-orange-500/5 shadow-md'
                  : 'border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 hover:border-zinc-350 dark:hover:border-zinc-700'
              }
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
          >
            <div
              className={`p-3 rounded-xl border shrink-0 transition-colors
                ${
                  type === 'infraction'
                    ? 'bg-orange-100/50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50'
                    : 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-455 dark:text-zinc-400 border-zinc-100 dark:border-zinc-800'
                }
              `}
            >
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-orange-550 dark:group-hover:text-orange-400 transition-colors">
                  Autos de Infração
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200/60 dark:border-zinc-800/60">
                  CSV
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                Importação em lote de autuações de trânsito.
              </p>
            </div>
          </div>

          {/* Card 2: Recurse First Instance */}
          <div
            onClick={() => !loading && setType('recurse-first')}
            className={`group p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex gap-4 select-none
              ${
                type === 'recurse-first'
                  ? 'border-orange-500 dark:border-orange-500/80 bg-orange-50/10 dark:bg-orange-500/5 ring-1 ring-orange-500/20 shadow-orange-500/5 shadow-md'
                  : 'border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 hover:border-zinc-350 dark:hover:border-zinc-700'
              }
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
          >
            <div
              className={`p-3 rounded-xl border shrink-0 transition-colors
                ${
                  type === 'recurse-first'
                    ? 'bg-orange-100/50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50'
                    : 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-455 dark:text-zinc-400 border-zinc-100 dark:border-zinc-800'
                }
              `}
            >
              <Scale className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-orange-550 dark:group-hover:text-orange-400 transition-colors">
                  Recurso — 1ª Instância
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200/60 dark:border-zinc-800/60">
                  DOCX
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                Defesas preliminares enviadas pelos condutores autuados.
              </p>
            </div>
          </div>

          {/* Card 3: Recurse Second Instance */}
          <div
            onClick={() => !loading && setType('recurse-second')}
            className={`group p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex gap-4 select-none
              ${
                type === 'recurse-second'
                  ? 'border-orange-500 dark:border-orange-500/80 bg-orange-50/10 dark:bg-orange-500/5 ring-1 ring-orange-500/20 shadow-orange-500/5 shadow-md'
                  : 'border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 hover:border-zinc-350 dark:hover:border-zinc-700'
              }
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
          >
            <div
              className={`p-3 rounded-xl border shrink-0 transition-colors
                ${
                  type === 'recurse-second'
                    ? 'bg-orange-100/50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50'
                    : 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-455 dark:text-zinc-400 border-zinc-100 dark:border-zinc-800'
                }
              `}
            >
              <Gavel className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-orange-550 dark:group-hover:text-orange-400 transition-colors">
                  Recurso — 2ª Instância
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200/60 dark:border-zinc-800/60">
                  DOCX
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                Processos recursais julgados pela JARI municipal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Upload Zone & Guidelines */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-1 text-left">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Passo 2: Envio de Arquivo ({current.acceptLabel})
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Arraste seu documento para a zona de upload ou clique para selecionar.
          </p>
        </div>

        {/* DRAG & DROP CONTAINER */}
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm space-y-6">
          
          {file ? (
            /* STATE A: File Selected Preview */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-850 rounded-2xl text-left gap-4">
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-500 dark:text-orange-400 rounded-xl border border-orange-100/50 dark:border-orange-900/30 shrink-0">
                  {type === 'infraction' ? (
                    <FileSpreadsheet className="h-6 w-6" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate block">
                    {file.name}
                  </span>
                  <span className="text-xs text-zinc-450 dark:text-zinc-500 block mt-0.5">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  disabled={loading}
                  className="p-2 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-xl border border-transparent hover:border-red-100 dark:hover:border-red-900/30 transition-all shrink-0"
                  title="Remover arquivo"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              {/* Progress Simulation if uploading */}
              {loading && (
                <div className="space-y-2 text-left animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-450">
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="h-3 w-3 animate-spin text-orange-500" />
                      Validando e importando...
                    </span>
                    <span>100%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200/20 dark:border-zinc-800/20">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-pulse-subtle" style={{ width: '100%' }} />
                  </div>
                </div>
              )}

              {/* Action Submit Button */}
              <button
                onClick={handleImport}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-bold py-3.5 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-amber-650 text-white rounded-2xl shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 border border-orange-400/20 dark:border-orange-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-75 disabled:scale-100 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Importando Dados...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Confirmar & Importar Arquivo</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* STATE B: Empty Dropzone */
            <div
              {...getRootProps()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-sm transition-all duration-200 select-none
                ${
                  isDragActive
                    ? 'scale-[1.02] border-orange-500 bg-orange-500/5 dark:bg-orange-500/10 ring-2 ring-orange-500/10 shadow-lg'
                    : 'border-zinc-300 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20'
                }
              `}
            >
              <input {...getInputProps()} />

              <div
                className={`p-4 rounded-2xl border transition-all duration-200
                  ${
                    isDragActive
                      ? 'bg-orange-500/20 text-orange-500 border-orange-500/40 scale-110'
                      : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 border-zinc-200 dark:border-zinc-850'
                  }
                `}
              >
                <UploadCloud size={32} className={isDragActive ? 'animate-bounce' : ''} />
              </div>

              <div className="space-y-1 text-center mt-2">
                <p className="font-bold text-zinc-700 dark:text-zinc-200 text-sm">
                  {isDragActive ? 'Solte o arquivo agora' : 'Arraste e solte o arquivo aqui'}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Ou clique para navegar em sua máquina
                </p>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 mt-2">
                Limite recomendado de tamanho: 10 MB
              </span>
            </div>
          )}

          {/* DYNAMIC INFORMATION BOX (Safety & Guidelines) */}
          <div className="flex flex-col gap-3.5 p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-left transition-all duration-200">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200 font-bold text-xs">
              <Info className="h-4 w-4 text-orange-500 shrink-0 animate-pulse-subtle" />
              <span>Dicas de Formatação ({current.title})</span>
            </div>
            
            <ul className="space-y-2 list-none pl-0">
              {current.guidelines.map((tip, index) => (
                <li key={`tip-${index}`} className="flex items-start gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 dark:bg-orange-400 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </div>
  )
}
