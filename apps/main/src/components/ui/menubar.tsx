'use client'

import {
  LucideHome,
  LucideBookCheck,
  Scale,
  Layers,
  LucideImport,
  History,
  LogIn,
  LogOut
} from 'lucide-react'

import {
  SideBarLink,
  SideBarCollapsible,
  SideBarSubLink,
  SideBarSection
} from "@bonfire/ui"

import { useMenuBar } from '@/hooks/useMenuBar'

export function MenuBar() {
  const { session, handleSignIn, handleSignOut, isActive, pathname } = useMenuBar()

  return (
    <nav className="flex flex-col gap-1.5 max-sm:w-full">
      
      {/* Principal */}
      <SideBarLink href="/" isActive={pathname === "/"} icon={LucideHome}>
        Início
      </SideBarLink>

      {/* Multas Section */}
      <SideBarSection title="Multas" />

      <SideBarLink href="/infractions" isActive={isActive("/infractions")} icon={LucideBookCheck}>
        Infrações
      </SideBarLink>

      <SideBarCollapsible title="Recursos" isActive={isActive("/recurses")} defaultOpen={isActive("/recurses")} icon={Scale}>
        <SideBarSubLink href="/recurses/firstInstance" isActive={pathname === "/recurses/firstInstance"}>
          1ª Instância
        </SideBarSubLink>
        <SideBarSubLink href="/recurses/secondInstance" isActive={pathname === "/recurses/secondInstance"}>
          2ª Instância
        </SideBarSubLink>
      </SideBarCollapsible>

      {/* Gestão Section */}
      <SideBarSection title="Gestão" />

      <SideBarCollapsible title="Cadastros" isActive={isActive("/registers")} defaultOpen={isActive("/registers")} icon={Layers}>
        <SideBarSubLink href="/registers/vehicles" isActive={pathname === "/registers/vehicles"}>
          Veículos
        </SideBarSubLink>
        <SideBarSubLink href="/registers/lines" isActive={pathname === "/registers/lines"}>
          Linhas
        </SideBarSubLink>
        <SideBarSubLink href="/registers/consortium" isActive={pathname === "/registers/consortium"}>
          Consórcios
        </SideBarSubLink>
      </SideBarCollapsible>

      <SideBarLink href="/import" isActive={isActive("/import")} icon={LucideImport}>
        Importação
      </SideBarLink>

      <SideBarLink href="/history" isActive={isActive("/history")} icon={History}>
        Histórico
      </SideBarLink>

      {/* Divider */}
      <div className="my-3 border-t border-zinc-150 dark:border-zinc-900" />

      {/* Auth Trigger Action */}
      <button
        onClick={session ? handleSignOut : handleSignIn}
        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300 ease-in-out w-full hover:translate-x-1 ${
          session 
            ? 'text-zinc-600 dark:text-zinc-400 hover:bg-red-50/50 dark:hover:bg-red-950/10 hover:text-red-500 dark:hover:text-red-400' 
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/10 hover:text-orange-600 dark:hover:text-orange-400'
        }`}
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
