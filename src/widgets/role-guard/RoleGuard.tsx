'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/entities/user/model/store'

type RoleGuardProps = {
  allowedRole: 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN'
  children: React.ReactNode
}

function getRoleRedirect(role: string): string {
  if (role === 'EMPLOYER') return '/employer/candidates'
  if (role === 'ADMIN') return '/admin'
  return '/jobs'
}

export function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useUserStore()

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated || !user) {
      router.replace('/login')
      return
    }

    const role = user.role.toUpperCase()
    if (role !== allowedRole) {
      router.replace(getRoleRedirect(role))
    }
  }, [isLoading, isAuthenticated, user, allowedRole])

  if (isLoading || !isAuthenticated || !user) return null
  if (user.role.toUpperCase() !== allowedRole) return null

  return <>{children}</>
}
