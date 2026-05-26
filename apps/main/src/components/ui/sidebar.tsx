import { SideBar as SharedSideBar } from '@bonfire/ui'
import { MenuBar } from './menubar'

interface SideBarProps {
  sidebarOpen: boolean
  toggleSideBar: () => void
}

export function SideBar({ sidebarOpen, toggleSideBar }: SideBarProps) {
  return (
    <SharedSideBar sidebarOpen={sidebarOpen} toggleSideBar={toggleSideBar}>
      <MenuBar />
    </SharedSideBar>
  )
}
