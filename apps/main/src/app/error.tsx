'use client'

import { useEffect, useState } from 'react'
import { SecondaryLayout } from '@/components/ui/secondaryLayout'
import { Button } from '@bonfire/ui'
import { AlertTriangle, ChevronDown, ChevronUp, RotateCcw, ArrowLeft, Copy, Check, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    console.error('[Error Fallback] Ocorreu um erro de rota:', error)
  }, [error])

  const copyToClipboard = () => {
    const textToCopy = `${error.message || 'Nenhum erro detalhado'}\n\nStack Trace:\n${error.stack || 'Sem Stack Trace'}${error.digest ? `\nDigest: ${error.digest}` : ''}`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <SecondaryLayout>
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl shadow-xl flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Decorative branding top tag */}
        <div className="flex items-center gap-1.5 justify-center text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
          <Flame size={12} className="text-orange-500 fill-current animate-pulse-subtle" />
          <span>Bonfire ERP</span>
        </div>

        {/* Warning Icon styled as a premium rounded-2xl app card */}
        <div className="relative p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 border border-red-100 dark:border-red-900/50 shadow-md shadow-red-500/5 animate-pulse-subtle">
          <AlertTriangle className="h-7 w-7 stroke-[2]" />
          <span className="absolute -inset-1 rounded-2xl border border-red-500/10 animate-ping pointer-events-none" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Ops! Algo deu errado
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed mx-auto">
            Ocorreu uma falha inesperada no processamento desta página. Você pode tentar recarregar ou retornar ao início.
          </p>
        </div>

        <div className="w-full border-t border-zinc-100 dark:border-zinc-900" />

        {/* Action Controls */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full items-center justify-center gap-2">
            <Button
              onClick={() => reset()}
              className="flex-1 flex items-center justify-center gap-1.5 font-bold shadow-md bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-amber-650 text-white rounded-xl py-5 text-xs transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <RotateCcw size={14} />
              Tentar novamente
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-xs font-bold rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-200"
            >
              Detalhes
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
          </div>

          <Link href="/" className="w-full">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center gap-1.5 font-semibold text-xs text-zinc-550 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 rounded-xl transition-all duration-200"
            >
              <ArrowLeft size={14} />
              Voltar para o Início
            </Button>
          </Link>
        </div>

        {/* Collapsible Technical Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full overflow-hidden text-left"
            >
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 space-y-2 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                    Detalhes técnicos (Logs)
                  </span>
                  
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Copiar erros"
                  >
                    {copied ? (
                      <>
                        <Check size={11} className="text-emerald-500 animate-pulse-subtle" />
                        <span className="text-emerald-500">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copiar logs</span>
                      </>
                    )}
                  </button>
                </div>
                
                <p className="font-mono text-[10px] text-red-650 dark:text-red-400 break-all leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap select-text pr-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                  {error.message || 'Nenhuma mensagem de erro detalhada disponível.'}
                  {error.stack && `\n\n${error.stack}`}
                  {error.digest && `\n\nDigest ID: ${error.digest}`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SecondaryLayout>
  )
}
