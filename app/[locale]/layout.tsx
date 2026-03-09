import { LocaleDocumentSync } from '@/components/locale-document-sync'
import { resolveLocale, type Locale } from '@/lib/i18n'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Readonly<LocaleLayoutProps>) {
  const resolvedParams = await params
  const locale = resolveLocale(resolvedParams.locale) as Locale

  return (
    <>
      <LocaleDocumentSync locale={locale} />
      <div dir={locale === 'he' || locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        {children}
      </div>
    </>
  )
}
