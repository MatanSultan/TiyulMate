import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set in environment')
      return Response.json({ error: 'Server not configured for AI' }, { status: 500 })
    }

    const { tripId, region, duration, difficulty, preferences, locale = 'en' } = await request.json()

    if (!tripId || !region || !duration || !difficulty) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Determine the language for the response
    const languageInstructions = {
      en: 'Respond in English.',
      he: 'Respond in Hebrew (עברית). Use Hebrew text for all trail names, locations, and descriptions.',
      ar: 'Respond in Arabic (العربية). Use Arabic text for all trail names, locations, and descriptions.'
    }

    // Build the prompt for the AI
    const prompt = `You are an expert hiking trip planner for Israel. Create a detailed hiking itinerary based on the following:

Region: ${region}
Duration: ${duration}
Difficulty Level: ${difficulty}
User Preferences: ${JSON.stringify(preferences, null, 2)}

${languageInstructions[locale as keyof typeof languageInstructions]}

Please provide a detailed day-by-day itinerary including:
- Specific trails and locations to visit
- Estimated hiking duration and distance for each day
- Activities and points of interest
- Meal and rest stops recommendations
- Safety tips and what to bring

Format your response as a JSON object with the structure:
{
  "day_1": ["activity 1", "activity 2", ...],
  "day_2": [...],
  ...
  "hiking_tips": "General tips for this trip",
  "estimated_distance": "Total km",
  "estimated_elevation_gain": "Total meters"
}

Make sure the itinerary is realistic, safe, and tailored to the difficulty level.`

    let text: string
    try {
      const result = await generateText({
        model: groq('llama-3.3-70b-versatile'),
        prompt,
        temperature: 0.7,
        maxTokens: 2000,
      })
      text = result.text
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      console.error('AI request failed:', errMsg, err)
      return Response.json(
        { error: `AI service failed: ${errMsg}` },
        { status: 502 }
      )
    }

    // Parse the AI response - it should be JSON
    let itinerary
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      itinerary = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: text }
    } catch {
      itinerary = { day_1: [text] }
    }

    // Update the trip in Supabase
    const supabase = await createClient()
    const { data: updatedTrip, error } = await supabase
      .from('trips')
      .update({ itinerary })
      .eq('id', tripId)
      .select('*')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: 'Failed to save itinerary' },
        { status: 500 }
      )
    }

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: 'Failed to save itinerary' },
        { status: 500 }
      )
    }

    return Response.json(updatedTrip)
  } catch (error) {
    console.error('Error generating itinerary:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to generate itinerary' },
      { status: 500 }
    )
  }
}
