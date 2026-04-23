'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
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

  const label = currentRole === 'employer' ? 'Ищу сотрудника' : 'Ищу работу'

  return (
    <>
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

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
              'flex items-center justify-center outline-none border-[2px] gap-2',
              'text-base font-medium text-muted-foreground hover:text-foreground',
              'transition-colors w-full px-4 py-[10px] rounded-2xl hover:bg-muted',
            )}
          >
            <span>{label}</span>
            <ChevronDown size={16} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[220px] rounded-2xl p-2 flex flex-col gap-1"
        >
          <DropdownMenuItem
            onClick={() => onRoleChange('candidate')}
            className={cn(
              'rounded-2xl py-2 px-5 ',
              currentRole === 'candidate' && ' bg-primary-light text-primary font-medium text-base',
            )}
          >
            Ищу работу
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onRoleChange('employer')}
            className={cn(
              'rounded-2xl py-2 px-5',
              currentRole === 'employer' && 'bg-primary-light text-primary font-medium text-base',
            )}
          >
            Ищу сотрудника
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
