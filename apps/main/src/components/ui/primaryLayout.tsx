'use client'
import { ReactNode } from 'react'
import { PrimaryLayout as SharedPrimaryLayout, Footer, SideBar } from '@bonfire/ui'
import { Header } from './header'
import { MenuBar } from './menubar'

interface Props {
  children?: ReactNode
}

export function PrimaryLayout({ children }: Props) {
  return (
    <SharedPrimaryLayout
      header={({ toggleSideBar }) => <Header toggleSideBar={toggleSideBar} />}
      sidebar={({ sidebarOpen, toggleSideBar }) => (
        <SideBar sidebarOpen={sidebarOpen} toggleSideBar={toggleSideBar}>
          <MenuBar />
        </SideBar>
      )}
      footer={<Footer />}
    >
      {children}
    </SharedPrimaryLayout>
  )
}
