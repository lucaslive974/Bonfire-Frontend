'use client'

import { SecondaryLayout } from '@/components/UI/secondaryLayout'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { BrandLogoFull } from '@/components/UI/brandLogo'

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
          <BrandLogoFull />
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
