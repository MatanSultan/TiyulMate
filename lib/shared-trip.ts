import { type Locale, resolveLocale } from '@/lib/i18n'
import { asTripItinerary, asTripPreferences, type TripRecord } from '@/lib/trip-model'

export type SharedTripSnapshot = Omit<TripRecord, 'user_id'> & {
  shared_at?: string
}

export type SharedTripRecord = {
  id: string
  trip_id: string
  user_id: string
  token: string
  title: string
  region: string
  duration_type: string
  language_code: Locale
  snapshot: SharedTripSnapshot
  is_active: boolean
  created_at: string
  updated_at: string
}

export function createShareToken() {
  return crypto.randomUUID().replace(/-/g, '')
}

export function buildSharedTripSnapshot(trip: TripRecord): SharedTripSnapshot {
  return {
    id: trip.id,
    title: trip.title,
    region: trip.region,
    duration_type: trip.duration_type,
    difficulty: trip.difficulty,
    language_code: resolveLocale(trip.language_code || trip.itinerary?.language),
    preferences: asTripPreferences(trip.preferences),
    itinerary: asTripItinerary(trip.itinerary),
    created_at: trip.created_at,
    updated_at: trip.updated_at,
    shared_at: new Date().toISOString(),
  }
}

export function buildSharedTripRow(trip: TripRecord, token: string, isActive = true) {
  return {
    trip_id: trip.id,
    user_id: trip.user_id,
    token,
    title: trip.title,
    region: trip.region,
    duration_type: trip.duration_type,
    language_code: resolveLocale(trip.language_code || trip.itinerary?.language),
    snapshot: buildSharedTripSnapshot(trip),
    is_active: isActive,
  }
}

export function extractSharedTrip(sharedTrip: Pick<SharedTripRecord, 'snapshot' | 'language_code'>): Omit<TripRecord, 'user_id'> {
  const snapshot = sharedTrip.snapshot as SharedTripSnapshot

  return {
    ...snapshot,
    language_code: resolveLocale(snapshot.language_code || sharedTrip.language_code),
    preferences: asTripPreferences(snapshot.preferences),
    itinerary: asTripItinerary(snapshot.itinerary),
  }
}
