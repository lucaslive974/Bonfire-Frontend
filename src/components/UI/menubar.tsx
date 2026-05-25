'use client'

import {
  AlignJustify,
  FileSpreadsheetIcon,
  LogIn,
  LucideBookCheck,
  LucideHome,
  LucideImport,
  ChevronRight,
  History,
} from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"

import { usePathname } from "next/navigation"
import { signIn, signOut, useSession } from 'next-auth/react'

import Link from 'next/link'

function handleSignIn() {
  signIn('keycloak', { redirect: true, callbackUrl: '/' })
}

function handleSignOut() {
  signOut({ redirect: true, callbackUrl: '/' })
}

export function MenuBar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <div className="mt-8 flex flex-col gap-1 max-sm:w-full">

      {/* Inicio */}
      <Link
        href="/"
        className={`sidebar-link flex items-center gap-2 ${pathname === "/" ? "sidebar-active" : ""
          }`}
      >
        <LucideHome size={16} />
        Inicio
      </Link>

      {/* Infrações */}
      <Link
        href="/infractions"
        className={`sidebar-link flex items-center gap-2 ${pathname.startsWith("/infractions") ? "sidebar-active" : ""
          }`}
      >
        <LucideBookCheck size={16} />
        Infrações
      </Link>

      {/* Recursos */}
      <Collapsible defaultOpen={isActive("/recurses")}>
        <CollapsibleTrigger asChild>
          <button className="sidebar-link group flex w-full items-center gap-2">
            <AlignJustify size={16} className="shrink-0" />
            <span className="flex-1 text-left">
              Recursos
            </span>
            <ChevronRight size={16} className="text-zinc-500 transition-transform group-data-[state=open]:rotate-90 shrink-0" />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="ml-6 flex flex-col gap-1">
          <Link
            href="/recurses/firstInstance"
            className={`sidebar-link ${pathname === "/recurses/firstInstance" ? "sidebar-active" : ""}`}
          >
            1° Instância
          </Link>

          <Link
            href="/recurses/secondInstance"
            className={`sidebar-link ${pathname === "/recurses/secondInstance" ? "sidebar-active" : ""}`}
          >
            2° Instância
          </Link>
        </CollapsibleContent>
      </Collapsible>

      {/* Cadastros */}
      <Collapsible defaultOpen={isActive("/registers")}>
        <CollapsibleTrigger asChild>
          <button className="sidebar-link group flex w-full items-center gap-2">
            <AlignJustify size={16} className="shrink-0" />
            <span className="flex-1 text-left">
              Cadastros
            </span>
            <ChevronRight size={16} className="text-zinc-500 transition-transform group-data-[state=open]:rotate-90 shrink-0" />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="ml-6 flex flex-col gap-1">
          <Link
            href="/registers/vehicles"
            className={`sidebar-link ${pathname === "/registers/vehicles" ? "sidebar-active" : ""}`}
          >
            Veículos
          </Link>

          <Link
            href="/registers/lines"
            className={`sidebar-link ${pathname === "/registers/lines" ? "sidebar-active" : ""}`}
          >
            Linhas
          </Link>

          <Link
            href="/registers/consortium"
            className={`sidebar-link ${pathname === "/registers/consortium" ? "sidebar-active" : ""}`}
          >
            Consórcio
          </Link>
        </CollapsibleContent>
      </Collapsible>

      {/* Importação */}
      <Link
        href="/import"
        className={`sidebar-link flex items-center gap-2 ${pathname.startsWith("/import") ? "sidebar-active" : ""
          }`}
      >
        <LucideImport size={16} />
        Importação
      </Link>

      {/* Histórico */}
      <Link
        href="/history"
        className={`sidebar-link flex items-center gap-2 ${pathname.startsWith("/history") ? "sidebar-active" : ""
          }`}
      >
        <History size={16} />
        Histórico
      </Link>

      {/* Login / Logout */}
      <button
        onClick={session ? handleSignOut : handleSignIn}
        className="sidebar-link flex items-center gap-2"
      >
        <LogIn size={16} />
        {session ? "Log-out" : "Log-in"}
      </button>

    </div>
  )
}
