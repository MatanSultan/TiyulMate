import { type Locale } from '@/lib/i18n'

export interface TripPreferences {
  familyFriendly?: boolean
  kidsFriendly?: boolean
  strollerFriendly?: boolean
  dogFriendly?: boolean
  romantic?: boolean
  waterFeatures?: boolean
  camping?: boolean
  viewpoints?: boolean
  archaeological?: boolean
  wildflowers?: boolean
  photography?: boolean
  accessibleRoutes?: boolean
  wheelchairFriendly?: boolean
  lowMobilityFriendly?: boolean
  otherPreferences?: string
  [key: string]: unknown
}

export interface TripImageAsset {
  url?: string
  caption?: string
  hint?: string
}

export interface TripRouteData {
  map_query?: string
  google_maps_url?: string
  start?: string
  end?: string
  waypoints?: string[]
}

export interface TripDayData {
  title?: string
  summary?: string
  activities?: string[]
  highlights?: string[]
  meals?: string[]
  notes?: string[]
  distance?: string
  hiking_time?: string
  drive_time?: string
  elevation_gain?: string
  map_query?: string
  start_location?: string
  end_location?: string
}

export interface TripItinerary {
  title?: string
  overview?: string
  who_its_for?: string
  vibe?: string
  best_time?: string
  weather_note?: string
  accessibility_notes?: string | string[]
  checklist?: string[]
  tags?: string[]
  practical_notes?: string[]
  planner_notes?: string
  starting_area?: string
  hiking_tips?: string | string[]
  estimated_distance?: string
  estimated_elevation_gain?: string
  hero_image_url?: string
  cover_image_url?: string
  image_hint?: string
  gallery?: Array<string | TripImageAsset>
  route?: TripRouteData
  map_query?: string
  language?: Locale
  [key: string]: unknown
}

export interface TripRecord {
  id: string
  user_id: string
  title: string
  region: string
  duration_type: string
  difficulty: string
  language_code?: Locale
  preferences: TripPreferences
  itinerary: TripItinerary
  created_at: string
  updated_at?: string
}

export const REGION_IMAGES: Record<string, string> = {
  'Golan Heights': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  Galilee: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  Carmel: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  'Judean Hills': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  'Dead Sea': 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  Negev: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  Eilat: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function asTripItinerary(value: unknown): TripItinerary {
  return isRecord(value) ? (value as TripItinerary) : {}
}

export function asTripPreferences(value: unknown): TripPreferences {
  return isRecord(value) ? (value as TripPreferences) : {}
}

export function normalizeLabel(key: string, locale: Locale) {
  const dayMatch = key.match(/day[_\s-]?(\d+)/i)
  if (dayMatch) {
    const dayNumber = dayMatch[1]
    if (locale === 'he') return `יום ${dayNumber}`
    if (locale === 'ar') return `اليوم ${dayNumber}`
    return `Day ${dayNumber}`
  }

  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function normalizeDayEntries(itinerary: TripItinerary, locale: Locale) {
  return Object.entries(itinerary)
    .filter(([key]) => /day/i.test(key))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return {
          key,
          label: normalizeLabel(key, locale),
          summary: '',
          bullets: value.map((item) => String(item)),
          data: {} as TripDayData,
        }
      }

      if (isRecord(value)) {
        const data = value as TripDayData
        const bullets = [
          ...(Array.isArray(data.activities) ? data.activities : []),
          ...(Array.isArray(data.highlights) ? data.highlights : []),
          ...(Array.isArray(data.meals) ? data.meals : []),
          ...(Array.isArray(data.notes) ? data.notes : []),
        ].map((item) => String(item))

        return {
          key,
          label: data.title || normalizeLabel(key, locale),
          summary: data.summary || '',
          bullets,
          data,
        }
      }

      return {
        key,
        label: normalizeLabel(key, locale),
        summary: String(value),
        bullets: [] as string[],
        data: {} as TripDayData,
      }
    })
}

export function getTripCoverImage(trip: Pick<TripRecord, 'region' | 'itinerary'>) {
  const itinerary = asTripItinerary(trip.itinerary)
  return itinerary.hero_image_url || itinerary.cover_image_url || REGION_IMAGES[trip.region] || null
}

export function getTripMapQuery(itinerary: unknown) {
  const data = asTripItinerary(itinerary)
  return data.route?.map_query || data.map_query || ''
}

export function getGoogleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function stringifyUnknown(value: unknown) {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map((item) => String(item)).join(', ')
  if (value == null) return ''
  return String(value)
}

export function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}
