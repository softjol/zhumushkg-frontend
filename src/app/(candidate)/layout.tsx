'use client'
import { AppLayout } from '@/widgets/app-layout/ui/AppLayout'
import { RoleGuard } from '@/widgets/role-guard/RoleGuard'

export default function CandidateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RoleGuard allowedRole="JOB_SEEKER">
      <AppLayout>{children}</AppLayout>
    </RoleGuard>
  )
}
