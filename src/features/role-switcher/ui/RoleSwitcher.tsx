'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { cn } from '@/shared/lib/utils'
import { UserRole } from '@/widgets/app-layout/model/types'
import { useUserStore } from '@/entities/user/model/store'
import { AuthRequiredModal } from '@/widgets/auth-required/ui/AuthRequiredModal'

interface RoleSwitcherProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
}

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const { isAuthenticated } = useUserStore()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const label = currentRole === 'EMPLOYER' ? 'Ищу сотрудника' : 'Ищу работу'

  const handleTabChange = (value: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    onRoleChange(value as UserRole)
  }

  return (
    <>
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Mobile/tablet: pill tabs, shown below lg */}
      <div className="lg:hidden w-full">
        <Tabs value={currentRole} onValueChange={handleTabChange}>
          <TabsList className="w-full h-auto rounded-2xl bg-muted p-1 gap-1">
            <TabsTrigger
              value="JOB_SEEKER"
              className={cn(
                'flex-1 rounded-2xl py-2.5 text-sm font-medium transition-all',
                'data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm',
                'data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground',
              )}
            >
              Ищу работу
            </TabsTrigger>
            <TabsTrigger
              value="EMPLOYER"
              className={cn(
                'flex-1 rounded-2xl py-2.5 text-sm font-medium transition-all',
                'data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm',
                'data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground',
              )}
            >
              Ищу сотрудника
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Desktop: dropdown, shown at lg and above */}
      <div className="hidden lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              id="role-switcher-trigger"
              onPointerDown={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault()
                  setShowAuthModal(true)
                }
              }}
              className={cn(
                'flex items-center justify-center outline-none border-2 gap-2',
                'text-base font-medium text-muted-foreground hover:text-foreground',
                'transition-colors w-full px-4 py-2.5 rounded-2xl hover:bg-muted',
              )}
            >
              <span>{label}</span>
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-55 rounded-2xl p-2 flex flex-col gap-1">
            <DropdownMenuItem
              onClick={() => onRoleChange('JOB_SEEKER')}
              className={cn(
                'rounded-2xl py-2 px-5',
                currentRole === 'JOB_SEEKER' &&
                  'bg-primary-light text-primary font-medium text-base',
              )}
            >
              Ищу работу
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onRoleChange('EMPLOYER')}
              className={cn(
                'rounded-2xl py-2 px-5',
                currentRole === 'EMPLOYER' && 'bg-primary-light text-primary font-medium text-base',
              )}
            >
              Ищу сотрудника
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
