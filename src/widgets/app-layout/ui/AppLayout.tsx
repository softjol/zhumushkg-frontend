'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useAppLayout } from '../model/use-app-layout'
import { Sidebar } from '../../sidebar'
import { BottomNav } from '@/widgets/app-layout/ui/BottomNav'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { role, navItems, switchRole } = useAppLayout()
  const pathname = usePathname()
  const isChatDetail = /\/chat\/.+/.test(pathname ?? '')

  return (
    <div className={`w-full flex ${isChatDetail ? 'h-svh overflow-hidden' : 'min-h-svh'} bg-background`}>
      {/* Desktop Sidebar */}
      <Sidebar navItems={navItems} role={role} onRoleChange={switchRole} />

      {/* Main Content */}
      <div className={`relative flex-1 flex flex-col overflow-x-hidden lg:mb-0 ${isChatDetail ? 'h-svh overflow-hidden' : 'min-h-svh mb-18'}`}>
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav navItems={navItems} />
    </div>
  )
}
