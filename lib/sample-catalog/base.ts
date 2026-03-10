import { type Locale } from '@/lib/i18n'

export type SampleTripId =
  | 'family-springs'
  | 'accessible-sunset'
  | 'romantic-vineyards'
  | 'spontaneous-waterfall'
  | 'photo-desert'
  | 'dog-friendly-coast'

export type SampleTripStop = {
  title: string
  summary: string
}

export type SampleTripSeed = {
  title: Record<Locale, string>
  region: string
  duration_type: string
  difficulty: string
  startingArea: string
  mapQuery: string
  coverImageUrl: string
  plannerNotes: Record<Locale, string>
  preferences: Record<string, boolean | string>
}

export type SampleTrip = {
  id: SampleTripId
  theme: string
  title: string
  summary: string
  audience: string
  durationNote: string
  coverImageUrl: string
  highlights: string[]
  badges: string[]
  seed: SampleTripSeed
}

export type SampleTripDetail = {
  vibe: string
  pace: string
  practicalNotes: string[]
  bring: string[]
  routeOutline: SampleTripStop[]
  whyItWorks: string
}

export type DetailedSampleTrip = SampleTrip & SampleTripDetail

export type LocalizedSampleContent = Omit<SampleTrip, 'id' | 'seed'> &
  SampleTripDetail & {
    seedTitle: string
    plannerNotes: string
  }

export const sampleTripBase = {
  'family-springs': {
    region: 'Galilee',
    duration_type: '1 day',
    difficulty: 'Easy',
    startingArea: 'Rosh Pina',
    mapQuery: 'Upper Galilee family springs Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    preferences: { familyFriendly: true, kidsFriendly: true, strollerFriendly: true, waterFeatures: true, viewpoints: true },
  },
  'accessible-sunset': {
    region: 'Carmel',
    duration_type: '1 day',
    difficulty: 'Easy',
    startingArea: 'Haifa',
    mapQuery: 'Accessible Carmel coastal sunset route Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    preferences: { accessibleRoutes: true, wheelchairFriendly: true, lowMobilityFriendly: true, viewpoints: true },
  },
  'romantic-vineyards': {
    region: 'Judean Hills',
    duration_type: '2-3 days',
    difficulty: 'Moderate',
    startingArea: 'Jerusalem',
    mapQuery: 'Judean Hills vineyards viewpoints weekend',
    coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    preferences: { romantic: true, viewpoints: true, photography: true },
  },
  'spontaneous-waterfall': {
    region: 'Golan Heights',
    duration_type: '1 day',
    difficulty: 'Moderate',
    startingArea: 'Tiberias',
    mapQuery: 'Golan Heights waterfall day trip Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    preferences: { waterFeatures: true, viewpoints: true, photography: true },
  },
  'photo-desert': {
    region: 'Negev',
    duration_type: '2-3 days',
    difficulty: 'Moderate',
    startingArea: 'Mitzpe Ramon',
    mapQuery: 'Negev sunrise photography route Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    preferences: { photography: true, viewpoints: true, camping: true },
  },
  'dog-friendly-coast': {
    region: 'Carmel',
    duration_type: '1 day',
    difficulty: 'Easy',
    startingArea: 'Tel Aviv',
    mapQuery: 'Dog friendly Carmel coast easy walk Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b5?auto=format&fit=crop&w=1200&q=80',
    preferences: { dogFriendly: true, accessibleRoutes: true, lowMobilityFriendly: true, viewpoints: true },
  },
} satisfies Record<
  SampleTripId,
  Omit<SampleTripSeed, 'title' | 'plannerNotes'>
>
