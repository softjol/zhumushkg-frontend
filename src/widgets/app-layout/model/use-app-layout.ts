'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getNavItems } from './nav-config'
import { UserRole, AppLayoutContextType } from './types'
import { ROUTES } from '@/shared/config/routes'
import { useUserStore } from '@/entities/user/model/store'
import { switchRoleApi } from '@/entities/user/api'

export function useAppLayout(): AppLayoutContextType {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUserStore()
  const [role, setRole] = useState<UserRole>('JOB_SEEKER')
  const [hasCompanyProfile, setHasCompanyProfile] = useState(false)
  const [activeFilterGroupsCount, setActiveFilterGroupsCount] = useState(0)

  useEffect(() => {
    if (pathname?.startsWith('/employer')) {
      setRole('EMPLOYER')
    } else {
      setRole(user?.role === 'EMPLOYER' ? 'EMPLOYER' : 'JOB_SEEKER')
    }
  }, [pathname, user])

  const isMainPage = pathname === ROUTES.CANDIDATE.JOBS || pathname === ROUTES.EMPLOYER.CANDIDATES

  const navItems = getNavItems(role)

  const { token, setToken } = useUserStore()

  const switchRole = async (newRole: UserRole) => {
    const backendRole = newRole === 'EMPLOYER' ? 'EMPLOYER' : 'JOB_SEEKER'

    try {
      const newToken = await switchRoleApi(backendRole, token!) // вызов API
      setToken(newToken) // setToken уже декодирует токен и обновляет user.role
    } catch (e) {
      console.error('Не удалось переключить роль', e)
      return
    }

    setRole(newRole)
    const defaultPath = newRole === 'EMPLOYER' ? ROUTES.EMPLOYER.CANDIDATES : ROUTES.CANDIDATE.JOBS
    router.push(defaultPath)
  }

  return {
    role,
    navItems,
    isMainPage,
    activeFilterGroupsCount,
    switchRole,
    hasCompanyProfile,
  }
}
