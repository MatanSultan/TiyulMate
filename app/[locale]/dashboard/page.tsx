'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { ArrowRight, Clock3, Compass, MapPin, Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { LogoMark } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useTrips } from '@/hooks/use-trips'
import { resolveLocale, t, type Locale } from '@/lib/i18n'
import { tripCopy } from '@/lib/trip-copy'
import { getTripCoverImage } from '@/lib/trip-model'
import { getDifficultyLabel, getDurationLabel, getEnabledPreferenceLabels, getRegionLabel } from '@/lib/trip-options'

export default function DashboardPage() {
  const { user, loading: userLoading } = useAuth()
  const { trips, isLoading: tripsLoading, error } = useTrips()
  const router = useRouter()
  const params = useParams()
  const locale = resolveLocale(params.locale as string) as Locale
  const copy = tripCopy[locale].dashboard
  const [activeFilter, setActiveFilter] = useState<'all' | 'accessible' | 'family' | 'dog'>('all')

  const filterLabels = {
    all: locale === 'he' ? 'הכול' : locale === 'ar' ? 'الكل' : 'All',
    accessible: locale === 'he' ? 'נגיש' : locale === 'ar' ? 'مسارات ميسرة' : 'Accessible',
    family: locale === 'he' ? 'משפחתי' : locale === 'ar' ? 'عائلي' : 'Family',
    dog: locale === 'he' ? 'ידידותי לכלבים' : locale === 'ar' ? 'مناسب للكلاب' : 'Dog-friendly',
  }

  const filteredTrips = useMemo(() => {
    if (!trips) return []
    if (activeFilter === 'all') return trips
    if (activeFilter === 'accessible') {
      return trips.filter((trip) => trip.preferences?.accessibleRoutes || trip.preferences?.wheelchairFriendly || trip.preferences?.lowMobilityFriendly)
    }
    if (activeFilter === 'family') {
      return trips.filter((trip) => trip.preferences?.familyFriendly || trip.preferences?.kidsFriendly || trip.preferences?.strollerFriendly)
    }
    return trips.filter((trip) => trip.preferences?.dogFriendly)
  }, [activeFilter, trips])

  const regionLabel = locale === 'he' ? 'אזור' : locale === 'ar' ? 'المنطقة' : 'Region'
  const durationLabel = locale === 'he' ? 'משך' : locale === 'ar' ? 'المدة' : 'Duration'

  useEffect(() => {
    if (!userLoading && !user) {
      router.push(`/${locale}/auth/login`)
    }
  }, [locale, router, user, userLoading])

  if (userLoading) {
    return (
      <>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Header locale={locale} />
        </Suspense>
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">{t('common.loading', locale)}</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
        <Header locale={locale} />
      </Suspense>

      <main className="app-shell mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="travel-panel animate-float-up rounded-[2.35rem] p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="travel-kicker">
                <LogoMark className="h-4 w-4" />
                {copy.eyebrow}
              </div>
              <h1 className="brand-display mt-5 text-balance text-5xl text-foreground">{copy.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{copy.subtitle}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={`/${locale}/dashboard/trip-wizard`}>
                  <Plus className="h-4 w-4" />
                  {copy.create}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {error && (
          <Card className="mt-6 rounded-[1.5rem] border-destructive/40 bg-destructive/8 p-4 text-sm text-destructive">
            {String(error)}
          </Card>
        )}

        <section className="mt-8">
          <div className="mb-5 flex flex-wrap gap-2">
            {(['all', 'accessible', 'family', 'dog'] as const).map((filter) => (
              <Button
                key={filter}
                type="button"
                variant={activeFilter === filter ? 'default' : 'outline'}
                className="rounded-full"
                onClick={() => setActiveFilter(filter)}
              >
                {filterLabels[filter]}
              </Button>
            ))}
          </div>

          {tripsLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="travel-card overflow-hidden rounded-[1.85rem] p-0">
                  <div className="h-52 animate-shimmer bg-gradient-to-r from-muted via-white/60 to-muted" />
                  <div className="space-y-3 p-6">
                    <div className="h-5 w-2/3 animate-shimmer rounded-full bg-gradient-to-r from-muted via-white/60 to-muted" />
                    <div className="h-4 w-1/2 animate-shimmer rounded-full bg-gradient-to-r from-muted via-white/60 to-muted" />
                    <div className="h-4 w-3/4 animate-shimmer rounded-full bg-gradient-to-r from-muted via-white/60 to-muted" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredTrips.map((trip, index) => {
                const coverImage = getTripCoverImage(trip)
                const preferenceBadges = getEnabledPreferenceLabels(trip.preferences, locale, 3)

                return (
                  <Card
                    key={trip.id}
                    className="travel-card animate-float-up overflow-hidden rounded-[1.9rem] p-0"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-secondary/50 via-accent/18 to-primary/12">
                      {coverImage && (
                        <Image
                          src={coverImage}
                          alt={trip.title}
                          width={1200}
                          height={800}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          unoptimized
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                      <div className="absolute left-5 top-5">
                        <span className="travel-chip bg-black/45 text-white backdrop-blur-md">
                          {getDifficultyLabel(trip.difficulty, locale)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-5 p-6">
                      <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{trip.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {trip.itinerary?.overview ? String(trip.itinerary.overview) : trip.region}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="travel-card-soft rounded-[1.25rem] p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary/70">
                            <MapPin className="h-3.5 w-3.5" />
                            {regionLabel}
                          </div>
                          <p className="mt-2 font-medium text-foreground">{getRegionLabel(trip.region, locale)}</p>
                        </div>
                        <div className="travel-card-soft rounded-[1.25rem] p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary/70">
                            <Clock3 className="h-3.5 w-3.5" />
                            {durationLabel}
                          </div>
                          <p className="mt-2 font-medium text-foreground">{getDurationLabel(trip.duration_type, locale)}</p>
                        </div>
                      </div>

                      {preferenceBadges.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {preferenceBadges.map((badge) => (
                            <span key={badge} className="travel-chip">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button asChild className="flex-1 rounded-full">
                          <Link href={`/${locale}/dashboard/trip/${trip.id}`}>
                            {copy.open}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-full">
                          <Link href={`/${locale}/dashboard/trip/${trip.id}/share`}>{copy.share}</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : trips && trips.length > 0 ? (
            <Card className="travel-card rounded-[2rem] p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Compass className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-foreground">{filterLabels[activeFilter]}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                {locale === 'he'
                  ? 'אין כרגע טיולים שמתאימים לסינון הזה.'
                  : locale === 'ar'
                    ? 'لا توجد رحلات تطابق هذا الفلتر الآن.'
                    : 'No trips match this filter yet.'}
              </p>
            </Card>
          ) : (
            <Card className="travel-panel rounded-[2rem] p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Compass className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-foreground">{copy.emptyTitle}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{copy.emptyBody}</p>
              <Button asChild className="mt-8 rounded-full px-6">
                <Link href={`/${locale}/dashboard/trip-wizard`}>
                  <Plus className="h-4 w-4" />
                  {copy.create}
                </Link>
              </Button>
            </Card>
          )}
        </section>
      </main>
    </>
  )
}
