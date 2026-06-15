import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/employer',
          '/chat',
          '/profile',
          '/resume',
          '/applications',
          '/favorites',
          '/notifications',
          '/filters',
          '/jobs',
          '/login',
          '/register',
        ],
      },
    ],
    sitemap: 'https://www.zhumushkg.com/sitemap.xml',
  }
}
