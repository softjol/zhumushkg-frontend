import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/shared/ui/sonner'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Jumush',
  description: 'Платформа для поиска работы и кандидатов в Кыргызстане',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="antialiased ">
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
