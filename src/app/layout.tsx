import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/shared/ui/sonner'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zhumushkg.com'),
  title: {
    default: 'Жумуш.kg — работа и вакансии в Кыргызстане',
    template: '%s | Жумуш.kg',
  },
  description:
    'Жумуш.kg — платформа для поиска работы и вакансий в Кыргызстане. Тысячи предложений в Бишкеке и по всей стране. Зарегистрируйтесь бесплатно.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.zhumushkg.com',
    siteName: 'Жумуш.kg',
    title: 'Жумуш.kg — работа и вакансии в Кыргызстане',
    description:
      'Жумуш.kg — платформа для поиска работы и вакансий в Кыргызстане. Тысячи предложений в Бишкеке и по всей стране.',
    locale: 'ru_KG',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Жумуш.kg — работа в Кыргызстане',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Жумуш.kg — работа и вакансии в Кыргызстане',
    description:
      'Жумуш.kg — платформа для поиска работы и вакансий в Кыргызстане. Тысячи предложений в Бишкеке и по всей стране.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="antialiased">
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
