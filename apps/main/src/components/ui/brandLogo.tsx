import Link from "next/link"
import { Flame } from 'lucide-react'

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-500/20">
        <Flame size={15} className="fill-current animate-pulse-subtle" />
      </div>
      <span className="font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-sm sm:text-base">
        Bonfire
      </span>
    </Link>
  )
}


export function BrandLogoFull() {
  return (
    < div className="flex flex-col items-center space-y-3" >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 animate-pulse-subtle">
        <Flame size={32} className="fill-current" />
      </div>
      <div className="space-y-1">
        <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent block text-center">
          Bonfire
        </span>
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
          Autos de Infração & Gestão
        </span>
      </div>
    </div >
  )
}
