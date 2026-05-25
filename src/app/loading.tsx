'use client'

import { SecondaryLayout } from '@/components/UI/secondaryLayout'
import { Flame, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <SecondaryLayout>
      <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300">
        
        {/* Animated logo wrapper */}
        <motion.div 
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 mb-3 animate-pulse-subtle">
            <Flame size={26} className="fill-current" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
            Bonfire
          </span>
          <span className="text-[10px] font-semibold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest mt-1">
            Autos de Infração
          </span>
        </motion.div>

        {/* Custom Premium Loader */}
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 text-orange-500 dark:text-orange-400 animate-spin stroke-[2.5]" />
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-350">
            Carregando sua área de trabalho...
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Sincronizando dados com o servidor
          </p>
        </div>
      </div>
    </SecondaryLayout>
  )
}
