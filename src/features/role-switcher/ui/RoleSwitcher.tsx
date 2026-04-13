'use client'

import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { cn } from '@/shared/lib/utils'
import { UserRole } from '@/widgets/app-layout/model/types'

interface RoleSwitcherProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
}

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const label = currentRole === 'employer' ? 'Ищу сотрудника' : 'Ищу работу'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
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

      <DropdownMenuContent align="start" className="w-[220px] rounded-2xl p-2 flex flex-col gap-1">
        <DropdownMenuItem
          onClick={() => onRoleChange('candidate')}
          className={cn(
            'rounded-2xl py-2',
            currentRole === 'candidate' && 'bg-primary-light text-primary font-medium text-base',
          )}
        >
          Ищу работу
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onRoleChange('employer')}
          className={cn(
            'rounded-2xl py-2',
            currentRole === 'employer' && 'bg-primary-light text-primary font-medium text-base',
          )}
        >
          Ищу сотрудника
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
