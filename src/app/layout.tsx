import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { AppLayout } from '@/widgets/app-layout/ui/AppLayout'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Jumush',
  description: 'Платформа для поиска работы и кандидатов в Кыргызстане',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
