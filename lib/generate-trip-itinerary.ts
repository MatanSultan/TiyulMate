import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { resolveLocale, type Locale } from '@/lib/i18n'
import { normalizeStringArray } from '@/lib/trip-model'
import { createClient } from '@/lib/supabase/server'

function getLanguageInstruction(locale: Locale) {
  if (locale === 'he') return 'Hebrew'
  if (locale === 'ar') return 'Arabic'
  return 'English'
}

function getLocalizedMessage(locale: Locale, messages: Record<Locale, string>) {
  return messages[locale]
}

function extractJson(text: string) {
  const match = text.match(/\{[\s\S]*\}/)
  return match ? match[0] : text
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

  const prompt = `You are TiyulMate, a premium AI trip planner for Israel.

Create a polished and truly personalized itinerary for this trip.
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
- Do not wrap the JSON in markdown.`

  let text = ''
  try {
    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
      temperature: 0.6,
      maxOutputTokens: 2600,
    })
    text = result.text
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : getLocalizedMessage(selectedLocale, {
                en: 'AI service failed',
                he: 'שירות ה-AI נכשל',
                ar: 'فشلت خدمة الذكاء الاصطناعي',
              }),
      },
      { status: 502 },
    )
  }

  let itinerary: Record<string, unknown>
  try {
    itinerary = JSON.parse(extractJson(text))
  } catch {
    itinerary = {
      overview: text,
      day_1: {
        title: selectedLocale === 'he' ? 'יום 1' : selectedLocale === 'ar' ? 'اليوم 1' : 'Day 1',
        summary: text,
      },
    }
  }

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
