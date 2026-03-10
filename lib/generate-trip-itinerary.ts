import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { normalizeStringArray } from '@/lib/trip-model'
import { createClient } from '@/lib/supabase/server'
import { validateItinerary, getDayCountFromDuration } from '@/lib/itinerary-schema'

function getLanguageInstruction(locale: Locale) {
  if (locale === 'he') return 'Hebrew'
  if (locale === 'ar') return 'Arabic'
  return 'English'
}

function getLocalizedMessage(locale: Locale, messages: Record<Locale, string>) {
  return messages[locale]
}

/**
 * Extracts valid JSON from text with robust error handling.
 * Handles cases where the model generates incomplete or malformed JSON.
 */
function extractJson(text: string): string {
  const trimmed = text.trim()

  // If text starts with { and ends with }, try to use it directly
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed
  }

  // Try to find balanced JSON object
  let braceCount = 0
  let jsonEnd = -1

  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === '{') braceCount++
    else if (trimmed[i] === '}') braceCount--

    if (braceCount === 0 && trimmed[i] === '}') {
      jsonEnd = i
      break
    }
  }

  if (jsonEnd > -1) {
    return trimmed.substring(0, jsonEnd + 1)
  }

  // Fallback to greedy match
  const match = trimmed.match(/\{[\s\S]*\}/)
  return match ? match[0] : text
}

/**
 * Attempts to generate a valid itinerary with retry logic.
 * Will retry up to 2 times with stricter instructions if validation fails.
 */
async function generateValidItinerary(
  prompt: string,
  expectedDayCount: number,
  selectedLocale: Locale,
  maxRetries = 2,
): Promise<
  | { success: true; itinerary: Record<string, unknown> }
  | { success: false; error: string }
> {
  let lastError = ''

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      let currentPrompt = prompt

      // Make subsequent prompts stricter
      if (attempt > 0) {
        const strictSuffix = `\n\nIMPORTANT - ATTEMPT ${attempt + 1}: STRICT REQUIREMENTS:
1. You MUST include exactly day_1, day_2, ..., day_${expectedDayCount} (all ${expectedDayCount} days).
2. Do NOT skip any days.
3. Do NOT add extra unnumbered days.
4. Each day MUST have at minimum: title, summary, activities array.
5. Return ONLY valid JSON. No markdown. No code blocks. No explanations.
6. Start with { and end with }
7. If you cannot generate ${expectedDayCount} days, still try to generate as many as possible starting from day_1.`
        currentPrompt = prompt + strictSuffix
      }

      const result = await generateText({
        model: groq('llama-3.3-70b-versatile'),
        prompt: currentPrompt,
        temperature: attempt === 0 ? 0.6 : 0.3, // Lower temp for retries
        maxOutputTokens: 2600,
      })

      const text = result.text
      const jsonStr = extractJson(text)
      const itinerary = JSON.parse(jsonStr)

      // Validate against schema
      const validation = validateItinerary(itinerary, expectedDayCount)

      if (validation.valid) {
        return { success: true, itinerary }
      }

      lastError = validation.errors.join('; ')

      // If this is the last attempt, we still return what we got with a warning
      if (attempt === maxRetries) {
        console.warn(
          `[Itinerary Generation] Max retries reached. Validation errors: ${lastError}. Proceeding with partial itinerary.`,
        )
        // Return the itinerary even if not fully valid
        return { success: true, itinerary }
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)

      if (attempt === maxRetries) {
        return {
          success: false,
          error: getLocalizedMessage(selectedLocale, {
            en: `Failed to generate valid itinerary after ${maxRetries + 1} attempts: ${lastError}`,
            he: `נכשל ליצור מסלול תקין לאחר ${maxRetries + 1} ניסיונות: ${lastError}`,
            ar: `فشل في إنشاء مسار صحيح بعد ${maxRetries + 1} محاولات: ${lastError}`,
          }),
        }
      }
    }
  }

  return {
    success: false,
    error: getLocalizedMessage(selectedLocale, {
      en: `Itinerary generation failed: ${lastError}`,
      he: `יצירת המסלול נכשלה: ${lastError}`,
      ar: `فشل إنشاء المسار: ${lastError}`,
    }),
  }
}

export async function generateTripItinerary(payload: {
  tripId: string
  title?: string
  region: string
  duration: string
  difficulty: string
  preferences?: Record<string, unknown>
  startingArea?: string
  plannerNotes?: string
  mapQuery?: string
  coverImageUrl?: string
  locale?: string
}) {
  const {
    tripId,
    title,
    region,
    duration,
    difficulty,
    preferences = {},
    startingArea,
    plannerNotes,
    mapQuery,
    coverImageUrl,
    locale,
  } = payload
  const selectedLocale = resolveLocale(locale)

  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      {
        error: getLocalizedMessage(selectedLocale, {
          en: 'Server not configured for AI',
          he: 'השרת לא מוגדר ל-AI',
          ar: 'الخادم غير مهيأ للذكاء الاصطناعي',
        }),
      },
      { status: 500 },
    )
  }

  if (!tripId || !region || !duration || !difficulty) {
    return Response.json(
      {
        error: getLocalizedMessage(selectedLocale, {
          en: 'Missing required fields',
          he: 'חסרים שדות חובה',
          ar: 'هناك حقول مطلوبة ناقصة',
        }),
      },
      { status: 400 },
    )
  }

  const language = getLanguageInstruction(selectedLocale)
  const enabledPreferences = Object.entries(preferences)
    .filter(([key, value]) => key !== 'otherPreferences' && Boolean(value))
    .map(([key]) => key)
    .join(', ')

  // Extract expected day count from duration
  const expectedDayCount = getDayCountFromDuration(duration)

  const basePrompt = `You are TiyulMate, a premium AI trip planner for Israel.

Create a polished and truly personalized itinerary for this trip with EXACTLY ${expectedDayCount} days.
Trip title: ${title || 'Untitled trip'}
Region: ${region}
Duration: ${duration}
Difficulty: ${difficulty}
Starting area: ${startingArea || 'Not specified'}
Enabled preferences: ${enabledPreferences || 'None selected'}
Full preferences payload: ${JSON.stringify(preferences, null, 2)}
Planner notes from the user: ${plannerNotes || 'None provided'}
Preferred map context: ${mapQuery || 'No map hint provided'}
Cover image context: ${coverImageUrl || 'No image URL provided'}
Output language: ${language}

CRITICAL: You MUST include day_1, day_2, ..., day_${expectedDayCount} (${expectedDayCount} days total).

Return valid JSON only with this structure:
{
  "title": "Localized short trip title",
  "overview": "Localized overview paragraph",
  "vibe": "Localized short vibe summary",
  "best_time": "Localized best time to go",
  "who_its_for": "Localized short line about who this trip is best for",
  "weather_note": "Localized practical weather-aware note placeholder",
  "accessibility_notes": ["Localized accessibility note", "Localized accessibility note"],
  "checklist": ["Localized item", "Localized item"],
  "tags": ["Localized tag", "Localized tag"],
  "practical_notes": ["Localized note", "Localized note"],
  "starting_area": "Localized starting area label or summary",
  "planner_notes": "Short localized acknowledgment of the user's custom notes",
  "map_query": "Google Maps friendly search query for the overall route",
  "route": {
    "map_query": "Google Maps route query",
    "start": "Route start",
    "end": "Route end",
    "waypoints": ["Waypoint 1", "Waypoint 2"]
  },
  "image_hint": "Short visual description for a future cover image",
  "day_1": {
    "title": "Localized day title",
    "summary": "Localized summary paragraph",
    "activities": ["Localized activity", "Localized activity"],
    "highlights": ["Localized highlight"],
    "meals": ["Localized food stop suggestion"],
    "notes": ["Localized safety or packing note"],
    "distance": "Localized distance string",
    "hiking_time": "Localized hiking time string",
    "drive_time": "Localized drive time string",
    "elevation_gain": "Localized elevation string",
    "map_query": "Google Maps query for this day"
  },
  "day_2": { ...similar structure... },
  ...
  "day_${expectedDayCount}": { ...similar structure... },
  "estimated_distance": "Localized total distance",
  "estimated_elevation_gain": "Localized total elevation gain",
  "hiking_tips": ["Localized tip", "Localized tip", "Localized tip"]
}

Rules:
- Keep all user-facing text fully in ${language}.
- Make the itinerary realistic for Israel.
- Match the difficulty honestly.
- Use the user's starting area, interests, accessibility needs, and family/pet/stroller preferences in concrete ways.
- If accessibility-related preferences are selected, include realistic accessible pacing, surface, parking, bathroom, and route notes.
- If family, kids, stroller, dog-friendly, or romantic preferences are selected, reflect them in the tone, stop choices, and practical notes.
- Make the output feel premium, specific, and helpful rather than generic.
- Include route-friendly map queries.
- Do NOT wrap the JSON in markdown or code blocks.
- Return only the JSON object, nothing else.`

  // Generate with retry logic
  const generationResult = await generateValidItinerary(basePrompt, expectedDayCount, selectedLocale, 2)

  if (!generationResult.success) {
    return Response.json(
      {
        error: generationResult.error,
      },
      { status: 502 },
    )
  }

  let itinerary = generationResult.itinerary

  // Normalize string arrays to proper arrays
  itinerary = {
    ...itinerary,
    checklist: normalizeStringArray(itinerary.checklist),
    tags: normalizeStringArray(itinerary.tags),
    practical_notes: normalizeStringArray(itinerary.practical_notes),
    accessibility_notes: normalizeStringArray(itinerary.accessibility_notes),
    hiking_tips: normalizeStringArray(itinerary.hiking_tips),
    map_query: itinerary.map_query || mapQuery || '',
    starting_area: itinerary.starting_area || startingArea || '',
    planner_notes: itinerary.planner_notes || plannerNotes || '',
    cover_image_url: itinerary.cover_image_url || coverImageUrl || '',
    language: selectedLocale,
  }

  const supabase = await createClient()
  const { data: existingTrip, error: existingTripError } = await supabase
    .from('trips')
    .select('itinerary')
    .eq('id', tripId)
    .single()

  if (existingTripError) {
    return Response.json(
      {
        error: getLocalizedMessage(selectedLocale, {
          en: 'Failed to load trip',
          he: 'טעינת הטיול נכשלה',
          ar: 'فشل تحميل الرحلة',
        }),
      },
      { status: 500 },
    )
  }

  const existingItinerary =
    typeof existingTrip?.itinerary === 'object' && existingTrip.itinerary !== null
      ? (existingTrip.itinerary as Record<string, unknown>)
      : {}

  const mergedItinerary = {
    ...existingItinerary,
    ...itinerary,
    route: {
      ...((existingItinerary.route as Record<string, unknown> | undefined) || {}),
      ...((itinerary.route as Record<string, unknown> | undefined) || {}),
    },
  }

  const { data: updatedTrip, error } = await supabase
    .from('trips')
    .update({ itinerary: mergedItinerary })
    .eq('id', tripId)
    .select('*')
    .single()

  if (error) {
    return Response.json(
      {
        error: getLocalizedMessage(selectedLocale, {
          en: 'Failed to save itinerary',
          he: 'שמירת המסלול נכשלה',
          ar: 'فشل حفظ المسار',
        }),
      },
      { status: 500 },
    )
  }

  return Response.json(updatedTrip)
}
