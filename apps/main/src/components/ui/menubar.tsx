'use client'

import {
  LucideHome,
  LucideBookCheck,
  Scale,
  Layers,
  LucideImport,
  History,
  LogIn,
  LogOut,
  ChevronRight
} from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@bonfire/ui"

import { usePathname } from "next/navigation"
import { useAuth } from '@/hooks/useAuth'

import Link from 'next/link'

export function MenuBar() {
  const pathname = usePathname()
  const { session, login, logout } = useAuth()

  const handleSignIn = () => login('keycloak')
  const handleSignOut = () => logout()

  const isActive = (path: string) => pathname.startsWith(path)

  const linkStyles = (active: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 shadow-sm border-l-2 border-orange-500 rounded-l-none pl-2.5'
        : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'
    }`

  const triggerStyles = (active: boolean) =>
    `flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-orange-50/50 dark:bg-orange-950/10 text-orange-600 dark:text-orange-400 border-l-2 border-orange-500/50 rounded-l-none pl-2.5'
        : 'text-zinc-655 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'
    }`

  const subLinkStyles = (active: boolean) =>
    `flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
      active
        ? 'text-orange-600 dark:text-orange-400 font-bold bg-orange-50/30 dark:bg-orange-950/10'
        : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20'
    }`

  return (
    <nav className="flex flex-col gap-1.5 max-sm:w-full">

      {/* Inicio */}
      <Link href="/" className={linkStyles(pathname === "/")}>
        <LucideHome size={17} className="shrink-0" />
        <span>Início</span>
      </Link>

      {/* Infrações */}
      <Link href="/infractions" className={linkStyles(isActive("/infractions"))}>
        <LucideBookCheck size={17} className="shrink-0" />
        <span>Infrações</span>
      </Link>

      {/* Recursos */}
      <Collapsible defaultOpen={isActive("/recurses")} className="w-full">
        <CollapsibleTrigger asChild>
          <button className={triggerStyles(isActive("/recurses"))}>
            <Scale size={17} className="shrink-0" />
            <span className="flex-1 text-left">Recursos</span>
            <ChevronRight size={15} className="text-zinc-400 dark:text-zinc-500 transition-transform duration-200 group-data-[state=open]:rotate-90 shrink-0" />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="pl-6 pr-2 py-1 flex flex-col gap-1 border-l border-zinc-100 dark:border-zinc-900 ml-[17px] mt-1">
          <Link
            href="/recurses/firstInstance"
            className={subLinkStyles(pathname === "/recurses/firstInstance")}
          >
            <span className="h-1 w-1 rounded-full bg-current shrink-0" />
            <span>1ª Instância</span>
          </Link>

          <Link
            href="/recurses/secondInstance"
            className={subLinkStyles(pathname === "/recurses/secondInstance")}
          >
            <span className="h-1 w-1 rounded-full bg-current shrink-0" />
            <span>2ª Instância</span>
          </Link>
        </CollapsibleContent>
      </Collapsible>

      {/* Cadastros */}
      <Collapsible defaultOpen={isActive("/registers")} className="w-full">
        <CollapsibleTrigger asChild>
          <button className={triggerStyles(isActive("/registers"))}>
            <Layers size={17} className="shrink-0" />
            <span className="flex-1 text-left">Cadastros</span>
            <ChevronRight size={15} className="text-zinc-400 dark:text-zinc-500 transition-transform duration-200 group-data-[state=open]:rotate-90 shrink-0" />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="pl-6 pr-2 py-1 flex flex-col gap-1 border-l border-zinc-100 dark:border-zinc-900 ml-[17px] mt-1">
          <Link
            href="/registers/vehicles"
            className={subLinkStyles(pathname === "/registers/vehicles")}
          >
            <span className="h-1 w-1 rounded-full bg-current shrink-0" />
            <span>Veículos</span>
          </Link>

          <Link
            href="/registers/lines"
            className={subLinkStyles(pathname === "/registers/lines")}
          >
            <span className="h-1 w-1 rounded-full bg-current shrink-0" />
            <span>Linhas</span>
          </Link>

          <Link
            href="/registers/consortium"
            className={subLinkStyles(pathname === "/registers/consortium")}
          >
            <span className="h-1 w-1 rounded-full bg-current shrink-0" />
            <span>Consórcios</span>
          </Link>
        </CollapsibleContent>
      </Collapsible>

      {/* Importação */}
      <Link href="/import" className={linkStyles(isActive("/import"))}>
        <LucideImport size={17} className="shrink-0" />
        <span>Importação</span>
      </Link>

      {/* Histórico */}
      <Link href="/history" className={linkStyles(isActive("/history"))}>
        <History size={17} className="shrink-0" />
        <span>Histórico</span>
      </Link>

      {/* Divider */}
      <div className="my-2 border-t border-zinc-150 dark:border-zinc-900" />

      {/* Login / Logout */}
      <button
        onClick={session ? handleSignOut : handleSignIn}
        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-orange-600 dark:hover:text-orange-400 w-full"
      >
        {session ? (
          <>
            <LogOut size={17} className="shrink-0" />
            <span>Sair da Conta</span>
          </>
        ) : (
          <>
            <LogIn size={17} className="shrink-0" />
            <span>Entrar no Sistema</span>
          </>
        )}
      </button>

    </nav>
  )
}
