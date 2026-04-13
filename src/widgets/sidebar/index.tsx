'use client'

import { usePathname } from 'next/navigation'
import logoIcon from '@/assets/icons/Logo.svg'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import { RoleSwitcher } from '@/features/role-switcher/ui/RoleSwitcher'
import { NavItem, UserRole } from '../app-layout/model/types'
import Image from 'next/image'

interface SidebarProps {
  navItems: NavItem[]
  role: UserRole
  onRoleChange: (role: UserRole) => void
}

export function Sidebar({ navItems, role, onRoleChange }: SidebarProps) {
  const pathname = usePathname()

  const homePath = role === 'employer' ? '/employer/candidates' : '/'

  return (
    <aside className="lg:w-[260px] h-full">
      <div className="hidden lg:flex flex-col w-[260px] border-r border-sidebar-border bg-sidebar fixed h-full z-30">
        {/* Logo */}
        <div className="p-6 pb-4">
          <Link href={homePath} className="w-full flex justify-center items-center gap-2">
            <div className="text-[30px]  flex items-center font-bold">
              Ж
              <Image src={logoIcon} alt="Жумуш" className="w-[22px] mt-[1px]" />
              муш.kg
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 pt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path === '/jobs' && pathname === '/')
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-muted',
                )}
              >
                <item.icon size={22} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Role Switcher */}
        <div className="p-4 border-t border-sidebar-border">
          <RoleSwitcher currentRole={role} onRoleChange={onRoleChange} />
        </div>
      </div>
    </aside>
  )
}
