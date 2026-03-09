import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { resolveLocale, type Locale } from '@/lib/i18n'
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
  mapQuery?: string
  coverImageUrl?: string
  locale?: string
}) {
  const { tripId, title, region, duration, difficulty, preferences = {}, mapQuery, coverImageUrl, locale } = payload
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
  const prompt = `You are TiyulMate, a premium AI hiking planner for Israel.

Create a polished itinerary for this trip.
Trip title: ${title || 'Untitled trip'}
Region: ${region}
Duration: ${duration}
Difficulty: ${difficulty}
Preferences: ${JSON.stringify(preferences, null, 2)}
Preferred map context: ${mapQuery || 'No map hint provided'}
Cover image context: ${coverImageUrl || 'No image URL provided'}
Output language: ${language}

Return valid JSON only with this structure:
{
  "title": "Localized short trip title",
  "overview": "Localized overview paragraph",
  "vibe": "Localized short vibe summary",
  "best_time": "Localized best time to go",
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
- Include route-friendly map queries.
- Do not wrap the JSON in markdown.`

  let text = ''
  try {
    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
      temperature: 0.6,
      maxOutputTokens: 2200,
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

  const mergedItinerary = {
    ...(existingTrip?.itinerary || {}),
    ...itinerary,
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
