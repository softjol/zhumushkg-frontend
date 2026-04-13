import { AppLayout } from '@/widgets/app-layout/ui/AppLayout'

export default function EmployerLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return <AppLayout>{children}</AppLayout>
}
