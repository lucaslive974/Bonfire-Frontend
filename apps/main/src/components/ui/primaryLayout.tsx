'use client'
import { ReactNode } from 'react'
import { PrimaryLayout as SharedPrimaryLayout, Footer } from '@bonfire/ui'
import { Header } from './header'
import { SideBar } from './sidebar'

interface Props {
  children?: ReactNode
}

export function PrimaryLayout({ children }: Props) {
  return (
    <SharedPrimaryLayout
      header={({ toggleSideBar }) => <Header toggleSideBar={toggleSideBar} />}
      sidebar={({ sidebarOpen, toggleSideBar }) => (
        <SideBar sidebarOpen={sidebarOpen} toggleSideBar={toggleSideBar} />
      )}
      footer={<Footer />}
    >
      {children}
    </SharedPrimaryLayout>
  )
}
