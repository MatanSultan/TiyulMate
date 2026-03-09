import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest, NextResponse } from 'next/server'
import { defaultLocale, locales } from '@/lib/i18n'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicSharedRoute = pathname === '/shared' || pathname.startsWith('/shared/')

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1] as (typeof locales)[number]
    const response = NextResponse.next()
    response.cookies.set('locale', locale)
    return await updateSession(request)
  }

  if (
    !isPublicSharedRoute &&
    !pathname.startsWith('/_next/') &&
    !pathname.startsWith('/api/') &&
    !pathname.includes('.')
  ) {
    const locale = request.cookies.get('locale')?.value || defaultLocale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url),
    )
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
