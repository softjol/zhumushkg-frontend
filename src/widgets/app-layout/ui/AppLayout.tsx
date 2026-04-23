'use client'
import { ReactNode } from 'react'
import { useAppLayout } from '../model/use-app-layout'
import { Sidebar } from '../../sidebar'
import { BottomNav } from '@/widgets/app-layout/ui/BottomNav'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { role, navItems, switchRole } = useAppLayout()

  return (
    <div className="w-full flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar navItems={navItems} role={role} onRoleChange={switchRole} />

      {/* Main Content */}
      <div className="relative flex-1  flex flex-col min-h-screen overflow-x-hidden mb-[72px] lg:mb-0">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav navItems={navItems} />
    </div>
  )
}
