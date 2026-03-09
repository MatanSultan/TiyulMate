import { type Locale } from '@/lib/i18n'

export type SampleTripId =
  | 'family-springs'
  | 'accessible-sunset'
  | 'romantic-vineyards'
  | 'spontaneous-waterfall'
  | 'photo-desert'
  | 'dog-friendly-coast'

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

const sampleTripSeeds: Record<SampleTripId, SampleTripSeed> = {
  'family-springs': {
    title: {
      en: 'Family Springs in the Upper Galilee',
      he: 'מעיינות משפחתיים בגליל העליון',
      ar: 'ينابيع عائلية في الجليل الأعلى',
    },
    region: 'Galilee',
    duration_type: '1 day',
    difficulty: 'Easy',
    startingArea: 'Rosh Pina',
    mapQuery: 'Upper Galilee family springs Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    plannerNotes: {
      en: 'Make this feel calm, child-friendly, and easy to execute on a spontaneous day out.',
      he: 'הפוך את זה לטיול רגוע, ידידותי לילדים וקל לביצוע ביום חופשי ספונטני.',
      ar: 'اجعلها رحلة هادئة ومناسبة للأطفال وسهلة التنفيذ في يوم خروج سريع.',
    },
    preferences: {
      familyFriendly: true,
      kidsFriendly: true,
      strollerFriendly: true,
      waterFeatures: true,
      viewpoints: true,
    },
  },
  'accessible-sunset': {
    title: {
      en: 'Accessible Sunset Escape by the Sea',
      he: 'בריחת שקיעה נגישה ליד הים',
      ar: 'رحلة غروب ميسّرة قرب البحر',
    },
    region: 'Carmel',
    duration_type: '1 day',
    difficulty: 'Easy',
    startingArea: 'Haifa',
    mapQuery: 'Accessible Carmel coastal sunset route Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    plannerNotes: {
      en: 'Prioritize smooth access, short transfers, shaded stops, and realistic low-mobility pacing.',
      he: 'תעדף נגישות חלקה, מעברים קצרים, עצירות מוצלות וקצב מותאם לניידות נמוכה.',
      ar: 'قدّم سهولة الوصول والتنقل القصير ومحطات مظللة وإيقاعاً واقعياً لمحدودي الحركة.',
    },
    preferences: {
      accessibleRoutes: true,
      wheelchairFriendly: true,
      lowMobilityFriendly: true,
      viewpoints: true,
    },
  },
  'romantic-vineyards': {
    title: {
      en: 'Romantic Judean Hills Weekend',
      he: 'סוף שבוע רומנטי בהרי יהודה',
      ar: 'نهاية أسبوع رومانسية في جبال يهودا',
    },
    region: 'Judean Hills',
    duration_type: '2-3 days',
    difficulty: 'Moderate',
    startingArea: 'Jerusalem',
    mapQuery: 'Judean Hills vineyards viewpoints weekend',
    coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    plannerNotes: {
      en: 'Make it intimate, scenic, and relaxed with sunset moments and memorable food stops.',
      he: 'הפוך את הטיול לאינטימי, נופי ונינוח עם רגעי שקיעה ועצירות אוכל טובות.',
      ar: 'اجعل الرحلة حميمة ومناظرها جميلة ومريحة مع لحظات غروب وتوقفات طعام مميزة.',
    },
    preferences: {
      romantic: true,
      viewpoints: true,
      photography: true,
    },
  },
  'spontaneous-waterfall': {
    title: {
      en: 'Spontaneous Waterfall Escape',
      he: 'בריחת מפלים ספונטנית',
      ar: 'هروب عفوي نحو الشلالات',
    },
    region: 'Golan Heights',
    duration_type: '1 day',
    difficulty: 'Moderate',
    startingArea: 'Tiberias',
    mapQuery: 'Golan Heights waterfall day trip Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    plannerNotes: {
      en: 'Keep it flexible, fast to start, and strong on water views and easy logistics.',
      he: 'שמור על תחושה ספונטנית, יציאה מהירה ולוגיסטיקה פשוטה עם הרבה מים ונוף.',
      ar: 'اجعلها مرنة وسريعة الانطلاق وغنية بالمياه والمناظر مع لوجستيات بسيطة.',
    },
    preferences: {
      waterFeatures: true,
      viewpoints: true,
      photography: true,
    },
  },
  'photo-desert': {
    title: {
      en: 'Photography Sunrise in the Negev',
      he: 'זריחה לצילום בנגב',
      ar: 'شروق للتصوير في النقب',
    },
    region: 'Negev',
    duration_type: '2-3 days',
    difficulty: 'Moderate',
    startingArea: 'Mitzpe Ramon',
    mapQuery: 'Negev sunrise photography route Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    plannerNotes: {
      en: 'Focus on golden-hour timing, wide viewpoints, practical packing notes, and pacing for photographers.',
      he: 'התמקד בזמני זריחה ושקיעה, תצפיות רחבות, הערות ציוד וקצב שמתאים לצלמים.',
      ar: 'ركّز على توقيت الضوء الذهبي ونقاط المشاهدة الواسعة وملاحظات التجهيز العملية وإيقاع مناسب للمصورين.',
    },
    preferences: {
      photography: true,
      viewpoints: true,
      camping: true,
    },
  },
  'dog-friendly-coast': {
    title: {
      en: 'Dog-Friendly Coastal Reset',
      he: 'רענון חופי ידידותי לכלבים',
      ar: 'استراحة ساحلية مناسبة للكلاب',
    },
    region: 'Carmel',
    duration_type: '1 day',
    difficulty: 'Easy',
    startingArea: 'Tel Aviv',
    mapQuery: 'Dog friendly Carmel coast easy walk Israel',
    coverImageUrl: 'https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b5?auto=format&fit=crop&w=1200&q=80',
    plannerNotes: {
      en: 'Keep it dog-friendly, easy to park, and gentle on distance with practical stop recommendations.',
      he: 'שמור על טיול ידידותי לכלבים, חניה נוחה, מרחקים קצרים ועצירות פרקטיות בדרך.',
      ar: 'اجعلها مناسبة للكلاب وسهلة في الوصول والوقوف وبمسافات لطيفة مع محطات عملية.',
    },
    preferences: {
      dogFriendly: true,
      accessibleRoutes: true,
      lowMobilityFriendly: true,
      viewpoints: true,
    },
  },
}

const localizedTripContent: Record<
  Locale,
  Record<
    SampleTripId,
    Omit<SampleTrip, 'id' | 'seed' | 'coverImageUrl'> & {
      coverImageUrl: string
    }
  >
> = {
  en: {
    'family-springs': {
      theme: 'Family',
      title: 'Upper Galilee Springs for Families',
      summary: 'A calm day plan with easy nature stops, water views, and enough flexibility for kids and parents alike.',
      audience: 'Best for families, grandparents, and relaxed weekend pacing',
      durationNote: 'Easy one-day outing',
      coverImageUrl: sampleTripSeeds['family-springs'].coverImageUrl,
      highlights: ['Shady spring stop', 'Short scenic walks', 'Lunch-friendly pacing'],
      badges: ['Family-friendly', 'Kids-friendly', 'Stroller-friendly'],
    },
    'accessible-sunset': {
      theme: 'Accessible',
      title: 'Accessible Sunset by the Carmel Coast',
      summary: 'A low-friction route built around smooth access, scenic sea moments, and comfortable timing.',
      audience: 'Best for accessible planning, low-mobility pacing, and wheelchair-friendly travel',
      durationNote: 'Gentle one-day route',
      coverImageUrl: sampleTripSeeds['accessible-sunset'].coverImageUrl,
      highlights: ['Smooth access points', 'Short transfers', 'Sunset viewpoint'],
      badges: ['Accessible', 'Wheelchair-friendly', 'Low-mobility'],
    },
    'romantic-vineyards': {
      theme: 'Romantic',
      title: 'Romantic Judean Hills Weekend',
      summary: 'A scenic, slower-paced escape with viewpoints, winery energy, and polished date-night atmosphere.',
      audience: 'Best for couples and slower premium weekend plans',
      durationNote: '2-3 day escape',
      coverImageUrl: sampleTripSeeds['romantic-vineyards'].coverImageUrl,
      highlights: ['Golden-hour outlooks', 'Food stop moments', 'Relaxed scenic pacing'],
      badges: ['Romantic', 'Scenic', 'Weekend'],
    },
    'spontaneous-waterfall': {
      theme: 'Water',
      title: 'Spontaneous Waterfall Day Trip',
      summary: 'A fast-start escape with strong payoff: waterfalls, splashy scenery, and simple route logic.',
      audience: 'Best for short-notice plans and refreshing day trips',
      durationNote: 'Quick one-day adventure',
      coverImageUrl: sampleTripSeeds['spontaneous-waterfall'].coverImageUrl,
      highlights: ['Waterfall energy', 'Easy launch logistics', 'Photo-worthy viewpoints'],
      badges: ['Spontaneous', 'Water-based', 'Day trip'],
    },
    'photo-desert': {
      theme: 'Photography',
      title: 'Negev Sunrise for Photographers',
      summary: 'A desert route tuned around timing, viewpoints, packing logic, and golden-hour photography.',
      audience: 'Best for photographers, sunrise chasers, and scenic desert pacing',
      durationNote: '2-3 day photo route',
      coverImageUrl: sampleTripSeeds['photo-desert'].coverImageUrl,
      highlights: ['Sunrise timing', 'Wide desert vistas', 'Packing-focused notes'],
      badges: ['Photography', 'Sunrise', 'Scenic'],
    },
    'dog-friendly-coast': {
      theme: 'Dog-friendly',
      title: 'Dog-Friendly Coastal Reset',
      summary: 'A relaxed coastal plan with easy access, practical stops, and pacing that works for dogs and humans.',
      audience: 'Best for dog owners and easy-going coastal escapes',
      durationNote: 'Easy one-day reset',
      coverImageUrl: sampleTripSeeds['dog-friendly-coast'].coverImageUrl,
      highlights: ['Simple parking', 'Gentle walking distance', 'Flexible stop suggestions'],
      badges: ['Dog-friendly', 'Easy', 'Coastal'],
    },
  },
  he: {
    'family-springs': {
      theme: 'משפחתי',
      title: 'מעיינות בגליל העליון למשפחות',
      summary: 'תוכנית יום רגועה עם טבע קליל, מים, מסלולים קצרים וגמישות שמתאימה גם לילדים וגם להורים.',
      audience: 'מתאים למשפחות, סבים וסבתות וקצב סוף שבוע נינוח',
      durationNote: 'יציאת יום קלה',
      coverImageUrl: sampleTripSeeds['family-springs'].coverImageUrl,
      highlights: ['מעיין מוצל', 'הליכות קצרות עם נוף', 'קצב שמתאים לארוחת צהריים'],
      badges: ['ידידותי למשפחות', 'מתאים לילדים', 'מתאים לעגלות'],
    },
    'accessible-sunset': {
      theme: 'נגיש',
      title: 'שקיעה נגישה בחוף הכרמל',
      summary: 'מסלול נעים עם נגישות חלקה, רגעי ים יפים ותזמון נוח בלי עומס מיותר.',
      audience: 'מתאים לתכנון נגיש, ניידות נמוכה וכיסאות גלגלים',
      durationNote: 'מסלול עדין ליום אחד',
      coverImageUrl: sampleTripSeeds['accessible-sunset'].coverImageUrl,
      highlights: ['נקודות גישה נוחות', 'מעברים קצרים', 'תצפית שקיעה'],
      badges: ['נגיש', 'ידידותי לכיסא גלגלים', 'מותאם לניידות נמוכה'],
    },
    'romantic-vineyards': {
      theme: 'רומנטי',
      title: 'סוף שבוע רומנטי בהרי יהודה',
      summary: 'בריחה איטית ונופית עם תצפיות, אווירת יקבים ותחושת דייט מושקעת.',
      audience: 'מתאים לזוגות ולתוכניות סוף שבוע איכותיות',
      durationNote: 'בריחה ל־2-3 ימים',
      coverImageUrl: sampleTripSeeds['romantic-vineyards'].coverImageUrl,
      highlights: ['נקודות זהב לשקיעה', 'עצירות אוכל טובות', 'קצב נופי ונינוח'],
      badges: ['רומנטי', 'נופי', 'סוף שבוע'],
    },
    'spontaneous-waterfall': {
      theme: 'מים',
      title: 'טיול מפלים ספונטני',
      summary: 'יציאה מהירה עם תמורה חזקה: מפלים, נוף מרענן ולוגיסטיקה פשוטה מהיציאה ועד הסיום.',
      audience: 'מתאים לתוכניות קצרות הודעה ולטיולי יום מרעננים',
      durationNote: 'הרפתקת יום מהירה',
      coverImageUrl: sampleTripSeeds['spontaneous-waterfall'].coverImageUrl,
      highlights: ['אנרגיית מפלים', 'יציאה פשוטה ומהירה', 'תצפיות מעולות לצילום'],
      badges: ['ספונטני', 'מבוסס מים', 'טיול יום'],
    },
    'photo-desert': {
      theme: 'צילום',
      title: 'זריחה לצלמים בנגב',
      summary: 'מסלול מדברי שמכוון לתזמון נכון, תצפיות רחבות, ציוד נדרש וקצב שמתאים לצילום.',
      audience: 'מתאים לצלמים, חובבי זריחה וקצב מדברי נופי',
      durationNote: 'מסלול צילום ל־2-3 ימים',
      coverImageUrl: sampleTripSeeds['photo-desert'].coverImageUrl,
      highlights: ['תזמון זריחה', 'נופי מדבר פתוחים', 'הערות ציוד שימושיות'],
      badges: ['צילום', 'זריחה', 'נופי'],
    },
    'dog-friendly-coast': {
      theme: 'ידידותי לכלבים',
      title: 'רענון חופי עם הכלב',
      summary: 'תוכנית חופית רגועה עם גישה קלה, עצירות פרקטיות וקצב שמתאים גם לכלבים וגם לבני אדם.',
      audience: 'מתאים לבעלי כלבים ולבריחות חוף קלילות',
      durationNote: 'יציאת יום קלה',
      coverImageUrl: sampleTripSeeds['dog-friendly-coast'].coverImageUrl,
      highlights: ['חניה פשוטה', 'מרחק הליכה נעים', 'עצירות גמישות בדרך'],
      badges: ['ידידותי לכלבים', 'קל', 'חופי'],
    },
  },
  ar: {
    'family-springs': {
      theme: 'عائلي',
      title: 'ينابيع الجليل الأعلى للعائلات',
      summary: 'خطة يوم هادئة مع طبيعة سهلة ومياه ومحطات قصيرة ومرونة تناسب الأطفال والأهل.',
      audience: 'مناسب للعائلات والأجداد وإيقاع عطلة نهاية أسبوع هادئ',
      durationNote: 'خروج سهل ليوم واحد',
      coverImageUrl: sampleTripSeeds['family-springs'].coverImageUrl,
      highlights: ['نبع مظلل', 'مشيات قصيرة مع مناظر', 'إيقاع مناسب للغداء'],
      badges: ['مناسب للعائلات', 'مناسب للأطفال', 'مناسب للعربات'],
    },
    'accessible-sunset': {
      theme: 'ميسّر',
      title: 'غروب ميسّر على ساحل الكرمل',
      summary: 'مسار مريح مع وصول سلس ولحظات بحر جميلة وتوقيت مريح بدون مجهود زائد.',
      audience: 'مناسب للتخطيط الميسّر ولمحدودي الحركة وللكراسي المتحركة',
      durationNote: 'مسار لطيف ليوم واحد',
      coverImageUrl: sampleTripSeeds['accessible-sunset'].coverImageUrl,
      highlights: ['نقاط وصول سهلة', 'تنقلات قصيرة', 'إطلالة غروب'],
      badges: ['ميسّر', 'مناسب للكراسي المتحركة', 'وتيرة منخفضة الحركة'],
    },
    'romantic-vineyards': {
      theme: 'رومانسي',
      title: 'نهاية أسبوع رومانسية في جبال يهودا',
      summary: 'هروب بطيء ومناظر جميلة مع نقاط مشاهدة وأجواء كروم ومزاج مخصص للأزواج.',
      audience: 'مناسب للأزواج وخطط نهاية الأسبوع الراقية',
      durationNote: 'هروب لمدة 2-3 أيام',
      coverImageUrl: sampleTripSeeds['romantic-vineyards'].coverImageUrl,
      highlights: ['لحظات غروب ذهبية', 'محطات طعام جميلة', 'إيقاع مريح ومنظري'],
      badges: ['رومانسي', 'منظري', 'نهاية أسبوع'],
    },
    'spontaneous-waterfall': {
      theme: 'مائي',
      title: 'رحلة شلالات عفوية',
      summary: 'خروج سريع بمكافأة قوية: شلالات ومناظر منعشة ولوجستيات بسيطة من البداية للنهاية.',
      audience: 'مناسب للخطط السريعة والرحلات اليومية المنعشة',
      durationNote: 'مغامرة يوم سريع',
      coverImageUrl: sampleTripSeeds['spontaneous-waterfall'].coverImageUrl,
      highlights: ['طاقة الشلالات', 'انطلاق سريع وبسيط', 'نقاط تصوير ممتازة'],
      badges: ['عفوي', 'مائي', 'رحلة يوم'],
    },
    'photo-desert': {
      theme: 'تصوير',
      title: 'شروق للتصوير في النقب',
      summary: 'مسار صحراوي مضبوط على التوقيت الصحيح ونقاط المشاهدة العريضة وملاحظات التجهيز وإيقاع مناسب للمصورين.',
      audience: 'مناسب للمصورين وعشاق الشروق والإيقاع الصحراوي المنظري',
      durationNote: 'مسار تصوير لمدة 2-3 أيام',
      coverImageUrl: sampleTripSeeds['photo-desert'].coverImageUrl,
      highlights: ['توقيت الشروق', 'مناظر صحراوية واسعة', 'ملاحظات تجهيز عملية'],
      badges: ['تصوير', 'شروق', 'منظري'],
    },
    'dog-friendly-coast': {
      theme: 'مناسب للكلاب',
      title: 'استراحة ساحلية مع الكلب',
      summary: 'خطة ساحلية مريحة مع وصول سهل ومحطات عملية وإيقاع يناسب الكلاب والبشر معاً.',
      audience: 'مناسب لأصحاب الكلاب وللهروب الساحلي الهادئ',
      durationNote: 'خروج سهل ليوم واحد',
      coverImageUrl: sampleTripSeeds['dog-friendly-coast'].coverImageUrl,
      highlights: ['مواقف سهلة', 'مسافة مشي لطيفة', 'محطات مرنة على الطريق'],
      badges: ['مناسب للكلاب', 'سهل', 'ساحلي'],
    },
  },
}

export function getSampleTripSeed(id?: string | null) {
  if (!id) return null
  return sampleTripSeeds[id as SampleTripId] || null
}

export function getLocalizedSampleTrips(locale: Locale): SampleTrip[] {
  return (Object.keys(sampleTripSeeds) as SampleTripId[]).map((id) => ({
    id,
    ...localizedTripContent[locale][id],
    seed: sampleTripSeeds[id],
  }))
}
