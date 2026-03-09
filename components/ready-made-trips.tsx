'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { READY_MADE_TRIPS, type Locale, isRTL, t } from '@/lib/i18n'
import { getDifficultyLabel } from '@/lib/trip-options'
import { MapPin, Clock, TrendingUp } from 'lucide-react'

export function ReadyMadeTrips({ locale = 'en' }: { locale?: Locale }) {
  const trips = READY_MADE_TRIPS[locale] || READY_MADE_TRIPS['en']
  const rtl = isRTL(locale)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
      case 'moderate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            {t('landing.readyMade', locale)}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Explore curated hiking experiences crafted by adventure experts'
              : locale === 'he'
              ? 'גלה חוויות טיול מקוצרות שיצרו מומחי ההרפתקאות'
              : 'اكتشف تجارب الرحلات المنتقاة التي أنشأها خبراء المغامرات'}
          </p>
        </div>

        <div className={`grid gap-6 md:grid-cols-3 ${rtl ? 'direction-rtl' : ''}`}>
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300"
            >
              {/* Image Placeholder with Gradient */}
              <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-50" />
                <div className="text-center z-10 opacity-75 group-hover:opacity-100 transition-opacity">
                  <MapPin className="h-12 w-12 text-primary/50 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-muted-foreground">{trip.region}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {trip.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {trip.description}
                </p>

                {/* Metadata */}
                <div className={`flex items-center gap-4 mb-4 text-sm text-muted-foreground ${rtl ? 'flex-row-reverse' : ''}`}>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{trip.duration} {locale === 'en' ? 'days' : locale === 'he' ? 'ימים' : 'أيام'}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${rtl ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp className="h-4 w-4" />
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                        trip.difficulty
                      )}`}
                    >
                      {getDifficultyLabel(trip.difficulty, locale)}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full" asChild>
                  <Link href={`/${locale}/auth/sign-up?trip=${trip.id}`}>
                    {t('landing.exploreTrips', locale)}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
