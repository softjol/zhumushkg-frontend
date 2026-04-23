'use client'
import { AppLayout } from '@/widgets/app-layout/ui/AppLayout'

export default function CandidateLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return <AppLayout>{children}</AppLayout>
}
