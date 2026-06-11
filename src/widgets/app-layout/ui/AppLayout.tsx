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
    <div className="w-full flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar navItems={navItems} role={role} onRoleChange={switchRole} />

      {/* Main Content */}
      <div className={`relative flex-1 flex flex-col min-h-screen overflow-x-hidden lg:mb-0 ${isChatDetail ? '' : 'mb-[72px]'}`}>
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav navItems={navItems} />
    </div>
  )
}
