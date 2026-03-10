import { z } from 'zod'

export const TripDaySchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  activities: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  meals: z.array(z.string()).default([]),
  notes: z.array(z.string()).default([]),
  distance: z.string().optional(),
  hiking_time: z.string().optional(),
  drive_time: z.string().optional(),
  elevation_gain: z.string().optional(),
  map_query: z.string().optional(),
  start_location: z.string().optional(),
  end_location: z.string().optional(),
})

export type TripDay = z.infer<typeof TripDaySchema>

export const TripRouteSchema = z.object({
  map_query: z.string().optional(),
  google_maps_url: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  waypoints: z.array(z.string()).default([]),
})

export type TripRoute = z.infer<typeof TripRouteSchema>

// Create a schema for generic itinerary with day_1, day_2, etc.
// This will be created dynamically based on duration
export const ItineraryBaseSchema = z.object({
  title: z.string().optional(),
  overview: z.string().optional(),
  who_its_for: z.string().optional(),
  vibe: z.string().optional(),
  best_time: z.string().optional(),
  weather_note: z.string().optional(),
  accessibility_notes: z.union([z.array(z.string()), z.string()]).default([]),
  checklist: z.union([z.array(z.string()), z.string()]).default([]),
  tags: z.union([z.array(z.string()), z.string()]).default([]),
  practical_notes: z.union([z.array(z.string()), z.string()]).default([]),
  planner_notes: z.string().optional(),
  starting_area: z.string().optional(),
  hiking_tips: z.union([z.array(z.string()), z.string()]).default([]),
  estimated_distance: z.string().optional(),
  estimated_elevation_gain: z.string().optional(),
  map_query: z.string().optional(),
  route: TripRouteSchema.optional(),
  image_hint: z.string().optional(),
  language: z.string().optional(),
})

export type ItineraryBase = z.infer<typeof ItineraryBaseSchema>

/**
 * Dynamically creates a schema for itinerary with the required number of days.
 * For a 2-day trip, expects day_1 and day_2.
 * For a 3-day trip, expects day_1, day_2, and day_3.
 * etc.
 */
export function createItinerarySchema(dayCount: number) {
  const dayFields: Record<string, z.ZodTypeAny> = {}

  for (let i = 1; i <= dayCount; i++) {
    dayFields[`day_${i}`] = TripDaySchema.optional()
  }

  return ItineraryBaseSchema.extend(dayFields)
}

export function extractDayCount(itinerary: Record<string, unknown>): number {
  let maxDay = 0
  for (const key of Object.keys(itinerary)) {
    const match = key.match(/^day_(\d+)$/)
    if (match) {
      const dayNum = parseInt(match[1], 10)
      maxDay = Math.max(maxDay, dayNum)
    }
  }
  return maxDay
}

/**
 * Validates itinerary against expected day count.
 * Returns { valid: true } or { valid: false, errors: [...], actualDays: number, expectedDays: number }
 */
export function validateItinerary(
  itinerary: unknown,
  expectedDayCount: number,
): { valid: true } | { valid: false; errors: string[]; actualDays: number; expectedDays: number } {
  const schema = createItinerarySchema(expectedDayCount)

  try {
    const parsed = schema.parse(itinerary)

    // Check that we have the expected number of days
    const actualDays = extractDayCount(parsed)

    if (actualDays < expectedDayCount) {
      return {
        valid: false,
        errors: [
          `Expected ${expectedDayCount} days but found ${actualDays}. Missing: ${missingDays(actualDays, expectedDayCount).join(', ')}`,
        ],
        actualDays,
        expectedDays: expectedDayCount,
      }
    }

    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((issue) => {
        const path = issue.path.join('.')
        return `${path || 'root'}: ${issue.message}`
      })
      return {
        valid: false,
        errors: errorMessages,
        actualDays: extractDayCount(itinerary as Record<string, unknown>),
        expectedDays: expectedDayCount,
      }
    }

    return {
      valid: false,
      errors: ['Unknown validation error'],
      actualDays: 0,
      expectedDays: expectedDayCount,
    }
  }
}

function missingDays(actualDays: number, expectedDayCount: number): string[] {
  const missing = []
  for (let i = actualDays + 1; i <= expectedDayCount; i++) {
    missing.push(`day_${i}`)
  }
  return missing
}

/**
 * Converts a duration string to the minimum expected number of days.
 * - '1 day' -> 1
 * - '2-3 days' -> 2
 * - '4-7 days' -> 4
 * - 'multi-week' -> 7 (capped at 7 for AI reliability)
 */
export function getDayCountFromDuration(duration: string): number {
  const lower = duration.toLowerCase()
  if (lower === '1 day') return 1
  if (lower === '2-3 days') return 2
  if (lower === '4-7 days') return 4
  if (lower === 'multi-week') return 14 // Allow up to 14 days for multi-week
  // Fallback: try to extract first number, cap at reasonable limit
  const match = duration.match(/\d+/)
  const parsed = match ? parseInt(match[0], 10) : 1
  return Math.min(parsed, 14) // Cap at 14 days for AI reliability
}
