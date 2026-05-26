import { SecondaryLayout } from '@/components/ui/secondaryLayout'
import { Button } from '@bonfire/ui'
import { Compass, ArrowLeft, Flame } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Bonfire - 404 Não Encontrado',
}

export default function NotFound() {
  return (
    <SecondaryLayout>
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl shadow-xl flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Decorative branding top tag */}
        <div className="flex items-center gap-1.5 justify-center text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
          <Flame size={12} className="text-orange-500 fill-current animate-pulse-subtle" />
          <span>Bonfire ERP</span>
        </div>

        {/* Compass Icon styled as a premium rounded-2xl app card */}
        <div className="relative p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/20 text-orange-550 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50 shadow-md shadow-orange-500/5 animate-pulse-subtle">
          <Compass className="h-7 w-7 stroke-[2]" />
          <span className="absolute -inset-1 rounded-2xl border border-orange-500/10 animate-ping pointer-events-none" />
        </div>

        {/* 404 Large Gradient Header */}
        <div className="space-y-2 text-center">
          <span className="text-6xl font-extrabold tracking-tighter bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent block">
            404
          </span>
          <h1 className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Algo está perdido por aí...
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed mx-auto">
            O endereço ou a página que você tentou acessar não foi localizada, está indisponível ou pode ter sido movida permanentemente.
          </p>
        </div>

        <div className="w-full border-t border-zinc-100 dark:border-zinc-900" />

        {/* Primary CTA Escape Link */}
        <Link href="/" className="w-full">
          <Button className="w-full flex items-center justify-center gap-2 font-bold py-6 text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-amber-650 text-white rounded-2xl shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 border border-orange-400/20 dark:border-orange-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200">
            <ArrowLeft size={16} />
            <span>Voltar para o Painel Principal</span>
          </Button>
        </Link>
      </div>
    </SecondaryLayout>
  )
}
