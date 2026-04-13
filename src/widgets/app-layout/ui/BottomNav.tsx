'use client'

import { usePathname } from 'next/navigation'
import { NavItem } from '../model/types'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'

interface BottomNavProps {
  navItems: NavItem[]
}

export const BottomNav = ({ navItems }: BottomNavProps) => {
  const pathname = usePathname()

  return (
    // <nav className="w-full h-[72px] lg:hidden">
      <div className="lg:hidden  fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30 px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors relative',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}      
              >
                <item.icon size={25} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    // </nav>
  )
}
