import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'

export interface Trip {
  id: string
  user_id: string
  title: string
  region: string
  duration_type: string
  difficulty: string
  preferences: Record<string, unknown>
  itinerary: Record<string, unknown>
  created_at: string
}

async function fetchTrips(key: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('trips').select('*')
  if (error) throw error
  return data
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
  const { data, error } = await supabase
    .from('trips')
    .insert({
      ...trip,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) throw error
  if (!data) throw new Error('Failed to return created trip')
  return data
}

export async function updateTrip(id: string, updates: Partial<Trip>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('trips').update(updates).eq('id', id)
  if (error) throw error
  return data
}

export async function deleteTrip(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('trips').delete().eq('id', id)
  if (error) throw error
}
