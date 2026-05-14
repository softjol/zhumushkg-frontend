import { AppLayout } from '@/widgets/app-layout/ui/AppLayout'
import { RoleGuard } from '@/widgets/role-guard/RoleGuard'

export default function EmployerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RoleGuard allowedRole="EMPLOYER">
      <AppLayout>{children}</AppLayout>
    </RoleGuard>
  )
}
