'use client'

import { useEffect, useState } from 'react'
import { SecondaryLayout } from '@/components/UI/secondaryLayout'
import { Button } from '@/components/UI/button'
import { AlertTriangle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Log the error to an external logging service if needed
    console.error('[Error Fallback] Ocorreu um erro de rota:', error)
  }, [error])

  return (
    <SecondaryLayout>
      <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg flex flex-col items-center text-center space-y-6 animate-in fade-in duration-300">
        
        {/* Warning Icon with pulse */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
          <AlertTriangle className="h-7 w-7 text-red-500 dark:text-red-400 stroke-[2]" />
          <span className="absolute -inset-1 rounded-full border border-red-500/20 animate-ping pointer-events-none" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-1.5">
          <h1 className="text-lg font-extrabold text-zinc-950 dark:text-white">
            Ops! Algo deu errado
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
            Ocorreu uma falha inesperada no processamento desta página. Você pode tentar recarregar.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            onClick={() => reset()}
            className="flex items-center gap-1.5 font-bold shadow-md bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl transition-all duration-200"
          >
            <RotateCcw size={15} />
            Tentar novamente
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-xs font-semibold rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
          >
            Detalhes técnicos
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
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
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                  Pilha de erro (Stack Trace)
                </span>
                <p className="font-mono text-[10px] text-red-600 dark:text-red-400 break-all leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap select-text">
                  {error.message || 'Nenhuma mensagem de erro detalhada disponível.'}
                  {error.digest && `\nDigest: ${error.digest}`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SecondaryLayout>
  )
}
