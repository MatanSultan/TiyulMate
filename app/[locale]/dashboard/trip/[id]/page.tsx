'use client'

import { useAuth } from '@/hooks/use-auth'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, AlertCircle, Loader } from 'lucide-react'
import type { Trip } from '@/hooks/use-trips'
import { t } from '@/lib/i18n'

export default function TripDetail() {
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const id = params?.id as string | undefined

  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generatingItinerary, setGeneratingItinerary] = useState(false)

  useEffect(() => {
    if (!userLoading && !user) {
      router.push(`/${locale}/auth/login`)
    }
  }, [user, userLoading, router, locale])

  useEffect(() => {
    // log id for troubleshooting
    console.debug('TripDetail id param', id)

    const fetchTrip = async () => {
      try {
        const supabase = createClient()
        const { data, error: queryError } = await supabase
          .from('trips')
          .select('*')
          .eq('id', id)
          .single()

        if (queryError) throw queryError
        setTrip(data as Trip)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load trip'
        console.error('fetchTrip error', message)
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    if (user && id) {
      fetchTrip()
    }
  }, [user, id])

  const handleGenerateItinerary = async () => {
    if (!trip) return

    try {
      setGeneratingItinerary(true)
      setError(null)

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: trip.id,
          region: trip.region,
          duration: trip.duration_type,
          difficulty: trip.difficulty,
          preferences: trip.preferences,
          locale: locale,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        const message = payload.error || 'Failed to generate itinerary'
        throw new Error(message)
      }

      const updatedTrip = payload
      setTrip(updatedTrip)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary')
    } finally {
      setGeneratingItinerary(false)
    }
  }

  if (userLoading || loading) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header />
        </Suspense>
        <main className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-center text-muted-foreground">Loading...</p>
        </main>
      </>
    )
  }

  if (!trip) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header />
        </Suspense>
        <main className="mx-auto max-w-4xl px-4 py-12">
          <Card className="p-8 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h2 className="text-xl font-semibold text-foreground">
              {error ? `Error: ${error}` : 'Trip not found'}
            </h2>
            <Button asChild variant="outline" className="mt-6">
              <Link href={`/${locale}/dashboard`}>Back to Dashboard</Link>
            </Button>
          </Card>
        </main>
      </>
    )
  }

  return (
    <>
      <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
        <Header />
      </Suspense>
      <main className="mx-auto max-w-4xl px-4 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/${locale}/dashboard`} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('common.back', locale)} {t('nav.dashboard', locale)}
          </Link>
        </Button>

        {error && (
          <Card className="mb-6 border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        )}

        <Card className="mb-8 p-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">{trip.title}</h1>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{t('wizard.region', locale)}</p>
                <p className="font-semibold text-foreground">{trip.region}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{t('trip.duration', locale)}</p>
                <p className="font-semibold text-foreground capitalize">{trip.duration_type}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('wizard.difficulty', locale)}</p>
              <p>
                <span className="inline-block rounded bg-primary/10 px-3 py-1 font-semibold text-primary">
                  {trip.difficulty}
                </span>
              </p>
            </div>
          </div>

          {Object.keys(trip.itinerary || {}).length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
              <p className="mb-4 text-muted-foreground">
                {locale === 'en' ? 'No itinerary yet. Generate a personalized itinerary using AI.' :
                 locale === 'he' ? 'אין עדיין יומן. צור יומן מותאם אישית באמצעות AI.' :
                 'لا يوجد مسار بعد. أنشئ مساراً مخصصاً باستخدام الذكاء الاصطناعي.'}
              </p>
              <Button
                onClick={handleGenerateItinerary}
                disabled={generatingItinerary}
                className="gap-2"
              >
                {generatingItinerary && <Loader className="h-4 w-4 animate-spin" />}
                {generatingItinerary ? 
                  (locale === 'en' ? 'Generating...' : locale === 'he' ? 'יוצר...' : 'جاري الإنشاء...') : 
                  (locale === 'en' ? 'Generate Itinerary with AI' : locale === 'he' ? 'צור יומן עם AI' : 'أنشئ مساراً بالذكاء الاصطناعي')}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">{t('trip.itinerary', locale)}</h2>
              <div className="space-y-4">
                {Object.entries(trip.itinerary || {}).map(([day, activities]: any) => (
                  <Card key={day} className="p-6 bg-card/50">
                    <h3 className="font-semibold text-foreground mb-4 capitalize">{day}</h3>
                    {Array.isArray(activities) ? (
                      <ul className="space-y-2">
                        {activities.map((activity: string, idx: number) => (
                          <li key={idx} className="flex gap-2 text-muted-foreground">
                            <span className="text-primary">•</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">{activities}</p>
                    )}
                  </Card>
                ))}
              </div>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href={`/${locale}/dashboard/trip/${trip.id}/share`}>{t('dashboard.share', locale)} {locale === 'en' ? 'Trip' : locale === 'he' ? 'טיול' : 'رحلة'}</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGenerateItinerary}
                  disabled={generatingItinerary}
                >
                  {generatingItinerary ? 
                    (locale === 'en' ? 'Regenerating...' : locale === 'he' ? 'מייצר מחדש...' : 'جاري إعادة الإنشاء...') : 
                    (locale === 'en' ? 'Regenerate' : locale === 'he' ? 'ייצר מחדש' : 'أعد الإنشاء')}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </>
  )
}
