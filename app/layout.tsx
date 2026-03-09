import type { Metadata } from 'next'
import {
  Cairo,
  Cormorant_Garamond,
  Heebo,
  Manrope,
  Noto_Naskh_Arabic,
  Noto_Serif_Hebrew,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', preload: false })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  preload: false,
  weight: ['500', '600', '700'],
})
const heebo = Heebo({ subsets: ['latin', 'hebrew'], variable: '--font-heebo', preload: false })
const notoSerifHebrew = Noto_Serif_Hebrew({
  subsets: ['hebrew'],
  variable: '--font-noto-serif-hebrew',
  preload: false,
  weight: ['500', '600', '700'],
})
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo', preload: false })
const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-naskh-arabic',
  preload: false,
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tiyul-mate.vercel.app'),
  title: 'TiyulMate | Premium Trip Planning for Israel',
  description:
    'Plan thoughtful, personalized trips across Israel with multilingual AI guidance, premium itineraries, and polished sharing.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${cormorant.variable} ${heebo.variable} ${notoSerifHebrew.variable} ${cairo.variable} ${notoNaskhArabic.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
