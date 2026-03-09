'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getGoogleMapsUrl, getTripCoverImage, getTripMapQuery, normalizeDayEntries, stringifyUnknown, type TripRecord } from '@/lib/trip-model'
import { type Locale } from '@/lib/i18n'
import { tripCopy } from '@/lib/trip-copy'
import { ExternalLink, MapPin, Sparkles } from 'lucide-react'

export function TripItinerary({ trip, locale }: { trip: TripRecord; locale: Locale }) {
  const copy = tripCopy[locale].detail
  const itinerary = trip.itinerary || {}
  const days = normalizeDayEntries(itinerary, locale)
  const coverImage = getTripCoverImage(trip)
  const mapQuery = getTripMapQuery(itinerary)
  const hasItinerary = days.length > 0 || Boolean(itinerary.overview || itinerary.hiking_tips)

  if (!hasItinerary) {
    return null
  }

  return (
    <div className="space-y-6">
      {coverImage && (
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-card/60">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <Image
            src={coverImage}
            alt={trip.title}
            width={1600}
            height={900}
            className="h-64 w-full object-cover sm:h-80"
            unoptimized
          />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.aiBadge}
            </div>
          </div>
        </div>
      )}

      {itinerary.overview && (
        <Card className="rounded-[1.75rem] border-white/10 bg-card/80 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.overview}</p>
          <p className="text-base leading-8 text-foreground/88">{stringifyUnknown(itinerary.overview)}</p>
        </Card>
      )}

      {mapQuery && (
        <Card className="rounded-[1.75rem] border-white/10 bg-card/80 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.route}</p>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{mapQuery}</span>
              </div>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <a href={getGoogleMapsUrl(mapQuery)} target="_blank" rel="noreferrer">
                {copy.openMap}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>
      )}

      {days.length > 0 && (
        <div className="grid gap-4">
          {days.map((day, index) => (
            <Card key={day.key} className="rounded-[1.75rem] border-white/10 bg-card/80 p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
                    {locale === 'he' ? `יום ${index + 1}` : locale === 'ar' ? `اليوم ${index + 1}` : `Day ${index + 1}`}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground">{day.label}</h3>
                </div>
                {(day.data.distance || day.data.hiking_time) && (
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {day.data.distance && <span className="rounded-full bg-primary/8 px-3 py-1">{day.data.distance}</span>}
                    {day.data.hiking_time && <span className="rounded-full bg-primary/8 px-3 py-1">{day.data.hiking_time}</span>}
                  </div>
                )}
              </div>

              {day.summary && <p className="mb-4 text-sm leading-7 text-muted-foreground">{day.summary}</p>}

              {day.bullets.length > 0 && (
                <ul className="space-y-3">
                  {day.bullets.map((bullet, bulletIndex) => (
                    <li key={`${day.key}-${bulletIndex}`} className="flex gap-3 text-sm leading-7 text-foreground/88">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}

      {itinerary.hiking_tips && (
        <Card className="rounded-[1.75rem] border-white/10 bg-primary/5 p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{copy.tips}</p>
          <p className="text-sm leading-7 text-foreground/88">{stringifyUnknown(itinerary.hiking_tips)}</p>
        </Card>
      )}
    </div>
  )
}
