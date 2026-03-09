'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { ArrowRight, Clock3, MapPin, Plus, Sparkles } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useTrips } from '@/hooks/use-trips'
import { resolveLocale, t, type Locale } from '@/lib/i18n'
import { tripCopy } from '@/lib/trip-copy'
import { getTripCoverImage } from '@/lib/trip-model'
import { getDifficultyLabel, getDurationLabel, getRegionLabel } from '@/lib/trip-options'

export default function DashboardPage() {
  const { user, loading: userLoading } = useAuth()
  const { trips, isLoading: tripsLoading, error } = useTrips()
  const router = useRouter()
  const params = useParams()
  const locale = resolveLocale(params.locale as string) as Locale
  const copy = tripCopy[locale].dashboard
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
        <section className="animate-float-up rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(28,102,159,0.16),rgba(75,197,185,0.08),rgba(255,255,255,0.58))] p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)] glass-panel">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                <Sparkles className="h-3.5 w-3.5" />
                {copy.eyebrow}
              </div>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {copy.title}
              </h1>
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
          {tripsLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden rounded-[1.75rem] border-white/10 bg-card/70 p-0">
                  <div className="h-52 animate-shimmer bg-gradient-to-r from-muted via-white/60 to-muted" />
                  <div className="space-y-3 p-6">
                    <div className="h-5 w-2/3 animate-shimmer rounded-full bg-gradient-to-r from-muted via-white/60 to-muted" />
                    <div className="h-4 w-1/2 animate-shimmer rounded-full bg-gradient-to-r from-muted via-white/60 to-muted" />
                    <div className="h-4 w-3/4 animate-shimmer rounded-full bg-gradient-to-r from-muted via-white/60 to-muted" />
                  </div>
                </Card>
              ))}
            </div>
          ) : trips && trips.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {trips.map((trip, index) => {
                const coverImage = getTripCoverImage(trip)

                return (
                  <Card
                    key={trip.id}
                    className="animate-float-up overflow-hidden rounded-[1.85rem] border-white/10 bg-card/78 p-0 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.55)]"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/10">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <div className="absolute left-5 top-5">
                        <span className="inline-flex rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
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
                        <div className="rounded-[1.25rem] bg-muted/35 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary/70">
                            <MapPin className="h-3.5 w-3.5" />
                            {regionLabel}
                          </div>
                          <p className="mt-2 font-medium text-foreground">{getRegionLabel(trip.region, locale)}</p>
                        </div>
                        <div className="rounded-[1.25rem] bg-muted/35 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary/70">
                            <Clock3 className="h-3.5 w-3.5" />
                            {durationLabel}
                          </div>
                          <p className="mt-2 font-medium text-foreground">{getDurationLabel(trip.duration_type, locale)}</p>
                        </div>
                      </div>

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
          ) : (
            <Card className="rounded-[2rem] border-white/10 bg-card/78 p-10 text-center shadow-[0_30px_90px_-60px_rgba(15,23,42,0.55)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Sparkles className="h-7 w-7" />
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
