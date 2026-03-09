'use client'

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/header'
import { TripItinerary } from '@/components/trip-itinerary'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { resolveLocale, t, type Locale } from '@/lib/i18n'
import { siteCopy } from '@/lib/site-copy'
import { createClient } from '@/lib/supabase/client'
import type { TripRecord } from '@/lib/trip-model'

function buildUiText(locale: Locale) {
  return {
    loading: t('common.loading', locale),
    notFound: locale === 'he' ? 'הטיול לא נמצא' : locale === 'ar' ? 'الرحلة غير موجودة' : 'Trip not found',
    loadError:
      locale === 'he'
        ? 'טעינת הטיול המשותף נכשלה'
        : locale === 'ar'
          ? 'فشل تحميل الرحلة المشتركة'
          : 'Failed to load trip',
    sharedTrip: locale === 'he' ? 'טיול משותף' : locale === 'ar' ? 'رحلة مشتركة' : 'Shared trip',
    backHome: locale === 'he' ? 'חזרה לדף הבית' : locale === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to home',
    ctaBody:
      locale === 'he'
        ? 'רוצה גם מתכנן טיולים חכם משלך?'
        : locale === 'ar'
          ? 'هل تريد أيضاً مخطط رحلات ذكياً خاصاً بك؟'
          : 'Want your own AI-powered trip planner?',
    ctaLink: locale === 'he' ? 'צור חשבון' : locale === 'ar' ? 'أنشئ حساباً' : 'Create an account',
  }
}

export default function SharedTripPage({ params }: { params: { token: string } }) {
  const [trip, setTrip] = useState<TripRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const pageLocale = resolveLocale(
    trip?.language_code || (typeof trip?.itinerary?.language === 'string' ? trip.itinerary.language : undefined),
  )
  const copy = siteCopy[pageLocale].publicShare
  const uiText = useMemo(() => buildUiText(pageLocale), [pageLocale])

  useEffect(() => {
    const fetchSharedTrip = async () => {
      try {
        const supabase = createClient()
        const { data, error: rpcError } = await supabase.rpc('get_shared_trip', {
          share_token: params.token,
        })

        if (rpcError) throw rpcError
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error(uiText.notFound)
        }

        setTrip(data[0] as TripRecord)
      } catch (err) {
        setError(err instanceof Error ? err.message : uiText.loadError)
      } finally {
        setLoading(false)
      }
    }

    fetchSharedTrip()
  }, [params.token, uiText.loadError, uiText.notFound])

  if (loading) {
    return (
      <>
        <Header locale={pageLocale} />
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">{uiText.loading}</p>
        </main>
      </>
    )
  }

  if (!trip) {
    return (
      <>
        <Header locale={pageLocale} />
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="rounded-[2rem] border-destructive/40 bg-destructive/8 p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <p className="mt-4 text-lg font-semibold text-foreground">{error || copy.notFound}</p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link href={`/${pageLocale}`}>{copy.backHome}</Link>
            </Button>
          </Card>
        </main>
      </>
    )
  }

  return (
    <>
      <Header locale={pageLocale} />
      <main className="app-shell mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/10 bg-card/82 p-6 shadow-[0_40px_120px_-64px_rgba(15,23,42,0.58)] sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.sharedTrip}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{trip.title}</h1>
          </div>
          <TripItinerary trip={trip} locale={pageLocale} />
        </section>

        <Card className="mt-6 rounded-[1.75rem] border-white/10 bg-primary/6 p-6 text-sm leading-7 text-foreground/85">
          {copy.ctaBody}{' '}
          <Link href={`/${pageLocale}/auth/sign-up`} className="font-semibold text-primary hover:underline">
            {copy.ctaLink}
          </Link>
          .
        </Card>
      </main>
    </>
  )
}
