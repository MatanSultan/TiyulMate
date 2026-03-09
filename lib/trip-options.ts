import { type Locale } from '@/lib/i18n'

export const REGIONS = ['Golan Heights', 'Galilee', 'Carmel', 'Judean Hills', 'Dead Sea', 'Negev', 'Eilat']
export const DURATIONS = ['1 day', '2-3 days', '4-7 days', 'multi-week']
export const DIFFICULTIES = ['Easy', 'Moderate', 'Hard', 'Expert']

export type PreferenceKey =
  | 'waterFeatures'
  | 'camping'
  | 'viewpoints'
  | 'archaeological'
  | 'wildflowers'
  | 'photography'
  | 'accessibleRoutes'
  | 'wheelchairFriendly'
  | 'lowMobilityFriendly'

const preferenceLabels: Record<Locale, Record<string, string>> = {
  en: {
    waterFeatures: 'Water features',
    camping: 'Camping opportunities',
    viewpoints: 'Scenic viewpoints',
    archaeological: 'Archaeological sites',
    wildflowers: 'Wildflowers and nature',
    photography: 'Photography spots',
    accessibleRoutes: 'Accessible routes',
    wheelchairFriendly: 'Wheelchair-friendly options',
    lowMobilityFriendly: 'Low-mobility friendly pacing',
  },
  he: {
    waterFeatures: 'מעיינות ומפלים',
    camping: 'אפשרויות קמפינג',
    viewpoints: 'תצפיות נוף',
    archaeological: 'אתרים ארכיאולוגיים',
    wildflowers: 'פריחה וטבע',
    photography: 'נקודות צילום',
    accessibleRoutes: 'מסלולים נגישים',
    wheelchairFriendly: 'אפשרויות ידידותיות לכיסא גלגלים',
    lowMobilityFriendly: 'קצב מותאם לניידות נמוכה',
  },
  ar: {
    waterFeatures: 'ينابيع وشلالات',
    camping: 'خيارات تخييم',
    viewpoints: 'نقاط مشاهدة',
    archaeological: 'مواقع أثرية',
    wildflowers: 'زهور وطبيعة',
    photography: 'أماكن تصوير',
    accessibleRoutes: 'مسارات يسهل الوصول إليها',
    wheelchairFriendly: 'خيارات مناسبة للكراسي المتحركة',
    lowMobilityFriendly: 'وتيرة مناسبة لمحدودي الحركة',
  },
}

const regionLabels: Record<Locale, Record<string, string>> = {
  en: {
    'Golan Heights': 'Golan Heights',
    Galilee: 'Galilee',
    Carmel: 'Carmel',
    'Judean Hills': 'Judean Hills',
    'Dead Sea': 'Dead Sea',
    Negev: 'Negev',
    Eilat: 'Eilat',
  },
  he: {
    'Golan Heights': 'רמת הגולן',
    Galilee: 'הגליל',
    Carmel: 'הכרמל',
    'Judean Hills': 'הרי יהודה',
    'Dead Sea': 'ים המלח',
    Negev: 'הנגב',
    Eilat: 'אילת',
  },
  ar: {
    'Golan Heights': 'مرتفعات الجولان',
    Galilee: 'الجليل',
    Carmel: 'الكرمل',
    'Judean Hills': 'جبال يهودا',
    'Dead Sea': 'البحر الميت',
    Negev: 'النقب',
    Eilat: 'إيلات',
  },
}

const durationLabels: Record<Locale, Record<string, string>> = {
  en: {
    '1 day': '1 day',
    '2-3 days': '2-3 days',
    '4-7 days': '4-7 days',
    'multi-week': 'Multi-week',
  },
  he: {
    '1 day': 'יום אחד',
    '2-3 days': 'יומיים עד שלושה',
    '4-7 days': 'ארבעה עד שבעה ימים',
    'multi-week': 'כמה שבועות',
  },
  ar: {
    '1 day': 'يوم واحد',
    '2-3 days': 'يومان إلى 3 أيام',
    '4-7 days': '4 إلى 7 أيام',
    'multi-week': 'عدة أسابيع',
  },
}

const difficultyLabels: Record<Locale, Record<string, string>> = {
  en: {
    Easy: 'Easy',
    Moderate: 'Moderate',
    Hard: 'Hard',
    Expert: 'Expert',
  },
  he: {
    Easy: 'קל',
    Moderate: 'בינוני',
    Hard: 'קשה',
    Expert: 'מאתגר מאוד',
  },
  ar: {
    Easy: 'سهل',
    Moderate: 'متوسط',
    Hard: 'صعب',
    Expert: 'احترافي',
  },
}

function normalizeDifficultyValue(value: string) {
  const normalized = value.trim().toLowerCase()

  if (normalized === 'easy') return 'Easy'
  if (normalized === 'moderate') return 'Moderate'
  if (normalized === 'hard') return 'Hard'
  if (normalized === 'expert') return 'Expert'

  return value
}

export function getPreferenceOptions(locale: Locale): Array<{ key: PreferenceKey; label: string }> {
  const labels = preferenceLabels[locale]
  return Object.entries(labels).map(([key, label]) => ({ key: key as PreferenceKey, label }))
}

export function getRegionLabel(region: string, locale: Locale) {
  return regionLabels[locale][region] || region
}

export function getDurationLabel(duration: string, locale: Locale) {
  return durationLabels[locale][duration] || duration
}

export function getDifficultyLabel(difficulty: string, locale: Locale) {
  const normalizedDifficulty = normalizeDifficultyValue(difficulty)
  return difficultyLabels[locale][normalizedDifficulty] || difficulty
}

export function getSuggestedTripTitle(region: string, locale: Locale) {
  if (!region) return ''

  const localizedRegion = getRegionLabel(region, locale)

  if (locale === 'he') return `מסע ${localizedRegion}`
  if (locale === 'ar') return `رحلة ${localizedRegion}`

  return `${localizedRegion} Escape`
}
