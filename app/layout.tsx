import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TiyulMate - AI-Powered Trip Planner',
  description: 'Plan your perfect hiking trip with AI-powered personalization. Get custom itineraries for Israeli hiking trails.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { isRTL, type Locale } from '@/lib/i18n'

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: Locale }
}

export default function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const locale = params.locale || 'en'
  const isRtl = isRTL(locale)

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
