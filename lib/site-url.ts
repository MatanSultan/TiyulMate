const FALLBACK_ORIGIN = 'http://localhost:3000'

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL?.replace(/^https?:\/\//, 'https://') ||
    process.env.VERCEL_URL?.replace(/^https?:\/\//, 'https://') ||
    ''
  ).replace(/\/$/, '')
}

export function getClientSiteUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin.replace(/\/$/, '')
  }

  return getSiteUrl() || FALLBACK_ORIGIN
}

export function buildShareUrl(token: string, origin?: string) {
  const baseUrl = (origin || getSiteUrl() || FALLBACK_ORIGIN).replace(/\/$/, '')
  return `${baseUrl}/shared/${token}`
}
