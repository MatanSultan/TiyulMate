import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import type { TripRecord } from '@/lib/trip-model'

export type Trip = TripRecord

let supportsLanguageCodeColumn: boolean | null = null

function hasMissingColumnError(error: unknown, column: string) {
  if (!error || typeof error !== 'object') return false
  const message = [
    'message' in error ? String(error.message) : '',
    'details' in error ? String(error.details) : '',
    'hint' in error ? String(error.hint) : '',
  ].join(' ')

  return message.toLowerCase().includes(column.toLowerCase())
}

function stripUnsupportedTripFields<T extends Record<string, unknown>>(trip: T) {
  const { language_code, updated_at, ...safeTrip } = trip
  return safeTrip
}

function sortTrips(trips: Trip[]) {
  return [...trips].sort((left, right) => {
    const rightDate = new Date(right.updated_at || right.created_at).getTime()
    const leftDate = new Date(left.updated_at || left.created_at).getTime()
    return rightDate - leftDate
  })
}

async function fetchTrips(key: string) {
  const supabase = createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError) throw authError
  if (!user) return []

  const query = supabase
    .from('trips')
    .select('*')
    .eq('user_id', user.id)
  const { data, error } = await query
    .order('created_at', { ascending: false })

  if (error) throw error
  return sortTrips(data || [])
}

import { useAuth } from '@/hooks/use-auth'

export function useTrips() {
  const { user } = useAuth()

  // don't attempt to load trips until we know who the user is; this avoids
  // triggering a request with no auth token and then getting an empty result
  const shouldFetch = !!user

  const { data, error, isLoading, mutate } = useSWR<Trip[]>(
    shouldFetch ? 'trips' : null,
    fetchTrips,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  )

  return {
    trips: data,
    isLoading,
    error,
    mutate,
  }
}

export async function createTrip(
  trip: Omit<Trip, 'id' | 'user_id' | 'created_at'>,
): Promise<Trip> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  // use `.select().single()` to get the inserted row rather than an array
  const tripPayload = supportsLanguageCodeColumn === false
    ? stripUnsupportedTripFields({
        ...trip,
        user_id: user.id,
      })
    : {
        ...trip,
        user_id: user.id,
      }

  let { data, error } = await supabase
    .from('trips')
    .insert(tripPayload)
    .select()
    .single()

  if (error && (hasMissingColumnError(error, 'language_code') || hasMissingColumnError(error, 'updated_at'))) {
    supportsLanguageCodeColumn = false
    const retry = await supabase
      .from('trips')
      .insert({
        ...stripUnsupportedTripFields({
          ...trip,
          user_id: user.id,
        }),
      })
      .select()
      .single()

    data = retry.data
    error = retry.error
  }

  if (error) throw error
  if (supportsLanguageCodeColumn !== false) {
    supportsLanguageCodeColumn = true
  }
  if (!data) throw new Error('Failed to return created trip')
  return data
}

export async function updateTrip(id: string, updates: Partial<Trip>) {
  const supabase = createClient()
  const nextUpdates = supportsLanguageCodeColumn === false ? stripUnsupportedTripFields(updates) : updates
  let { data, error } = await supabase.from('trips').update(nextUpdates).eq('id', id).select().single()

  if (error && (hasMissingColumnError(error, 'language_code') || hasMissingColumnError(error, 'updated_at'))) {
    supportsLanguageCodeColumn = false
    const retry = await supabase
      .from('trips')
      .update(stripUnsupportedTripFields(updates))
      .eq('id', id)
      .select()
      .single()

    data = retry.data
    error = retry.error
  }

  if (error) throw error
  if (supportsLanguageCodeColumn !== false) {
    supportsLanguageCodeColumn = true
  }
  return data
}

export async function deleteTrip(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('trips').delete().eq('id', id)
  if (error) throw error
}

export async function duplicateTrip(trip: Trip, title?: string) {
  return createTrip({
    title: title || `${trip.title} (Copy)`,
    region: trip.region,
    duration_type: trip.duration_type,
    difficulty: trip.difficulty,
    language_code: trip.language_code,
    preferences: trip.preferences,
    itinerary: {
      ...trip.itinerary,
    },
    updated_at: trip.updated_at,
  })
}
