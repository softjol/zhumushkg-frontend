import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import Script from 'next/script'
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
    default: 'Жумуш.kg - поиск работы и подбор персонала в Кыргызстане',
    template: '%s | Жумуш.kg',
  },
  description:
    'Жумуш.kg - поиск работы и подбор персонала в Кыргызстане. Тысячи предложений в Бишкеке и по всей стране. Зарегистрируйтесь бесплатно.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.zhumushkg.com',
    siteName: 'Жумуш.kg',
    title: 'Жумуш.kg - поиск работы и подбор персонала в Кыргызстане',
    description:
      'Жумуш.kg - поиск работы и подбор персонала в Кыргызстане. Тысячи предложений в Бишкеке и по всей стране.',
    locale: 'ru_KG',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Жумуш.kg - поиск работы и подбор персонала в Кыргызстане',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Жумуш.kg - поиск работы и подбор персонала в Кыргызстане',
    description:
      'Жумуш.kg - поиск работы и подбор персонала в Кыргызстане. Тысячи предложений в Бишкеке и по всей стране.',
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
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e5cfb6da-d3ee-4231-9e3a-766234bdeed7"
        />
      </body>
    </html>
  )
}
