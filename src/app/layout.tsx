import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
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
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
