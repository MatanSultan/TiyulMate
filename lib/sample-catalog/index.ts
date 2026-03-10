import { type Locale } from '@/lib/i18n'
import {
  sampleTripBase,
  type DetailedSampleTrip,
  type LocalizedSampleContent,
  type SampleTrip,
  type SampleTripId,
  type SampleTripSeed,
  type SampleTripStop,
} from '@/lib/sample-catalog/base'
import { sampleCatalogAr } from '@/lib/sample-catalog/ar'
import { sampleCatalogEn } from '@/lib/sample-catalog/en'
import { sampleCatalogHe } from '@/lib/sample-catalog/he'

const localizedCatalog = {
  en: sampleCatalogEn,
  he: sampleCatalogHe,
  ar: sampleCatalogAr,
} satisfies Record<Locale, Record<SampleTripId, LocalizedSampleContent>>

export type { DetailedSampleTrip, SampleTrip, SampleTripId, SampleTripSeed, SampleTripStop }

function getCatalog(locale: Locale) {
  return localizedCatalog[locale]
}

export function getSampleTripSeed(id?: string | null): SampleTripSeed | null {
  if (!id || !(id in sampleTripBase)) {
    return null
  }

  const sampleId = id as SampleTripId

  return {
    ...sampleTripBase[sampleId],
    title: {
      en: sampleCatalogEn[sampleId].seedTitle,
      he: sampleCatalogHe[sampleId].seedTitle,
      ar: sampleCatalogAr[sampleId].seedTitle,
    },
    plannerNotes: {
      en: sampleCatalogEn[sampleId].plannerNotes,
      he: sampleCatalogHe[sampleId].plannerNotes,
      ar: sampleCatalogAr[sampleId].plannerNotes,
    },
  }
}

export function getLocalizedSampleTrips(locale: Locale): SampleTrip[] {
  const catalog = getCatalog(locale)

  return (Object.keys(sampleTripBase) as SampleTripId[]).map((id) => {
    const entry = catalog[id]
    const seed = getSampleTripSeed(id)

    return {
      id,
      theme: entry.theme,
      title: entry.title,
      summary: entry.summary,
      audience: entry.audience,
      durationNote: entry.durationNote,
      coverImageUrl: sampleTripBase[id].coverImageUrl,
      highlights: entry.highlights,
      badges: entry.badges,
      seed: {
        ...(seed as SampleTripSeed),
        coverImageUrl: sampleTripBase[id].coverImageUrl,
      },
    }
  })
}

export function getDetailedSampleTrip(locale: Locale, id?: string | null): DetailedSampleTrip | null {
  if (!id || !(id in sampleTripBase)) {
    return null
  }

  const sampleId = id as SampleTripId
  const catalog = getCatalog(locale)
  const entry = catalog[sampleId]
  const seed = getSampleTripSeed(sampleId)

  return {
    id: sampleId,
    theme: entry.theme,
    title: entry.title,
    summary: entry.summary,
    audience: entry.audience,
    durationNote: entry.durationNote,
    coverImageUrl: sampleTripBase[sampleId].coverImageUrl,
    highlights: entry.highlights,
    badges: entry.badges,
    seed: {
      ...(seed as SampleTripSeed),
      coverImageUrl: sampleTripBase[sampleId].coverImageUrl,
    },
    vibe: entry.vibe,
    pace: entry.pace,
    practicalNotes: entry.practicalNotes,
    bring: entry.bring,
    routeOutline: entry.routeOutline,
    whyItWorks: entry.whyItWorks,
  }
}
