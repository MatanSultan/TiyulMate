import { generateTripItinerary } from '@/lib/generate-trip-itinerary'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    return generateTripItinerary(payload)
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to generate itinerary' },
      { status: 500 },
    )
  }
}
