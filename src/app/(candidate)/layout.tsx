'use client'
import { AppLayout } from '@/widgets/app-layout/ui/AppLayout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/entities/user/model/store'

function getRoleRedirect(role: string): string {
  if (role === 'EMPLOYER') return '/employer/candidates'
  if (role === 'ADMIN') return '/admin'
  return '/jobs'
}

export default function CandidateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useUserStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isLoading || !isAuthenticated || !user) return
    const role = user.role.toUpperCase()
    if (role !== 'JOB_SEEKER') {
      router.replace(getRoleRedirect(role))
    }
  }, [mounted, isLoading, isAuthenticated, user])

  if (!mounted) return null

  return <AppLayout>{children}</AppLayout>
}
