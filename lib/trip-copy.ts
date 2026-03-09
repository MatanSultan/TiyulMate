import { type Locale } from '@/lib/i18n'

type CopyTree = {
  dashboard: {
    eyebrow: string
    title: string
    subtitle: string
    emptyTitle: string
    emptyBody: string
    create: string
    open: string
    share: string
  }
  wizard: {
    stepLabel: string
    aiBadge: string
    subtitle: string
    regionQuestion: string
    durationQuestion: string
    difficultyQuestion: string
    preferencesQuestion: string
    preferencesBody: string
    reviewTitle: string
    tripName: string
    mapQuery: string
    imageUrl: string
    create: string
    generatingTitle: string
    generatingBody: string
    smartQuestions: string
    otherLocation: string
    otherDuration: string
    otherDifficulty: string
    customLocationPlaceholder: string
    customDurationPlaceholder: string
    customDifficultyPlaceholder: string
    otherPreferences: string
    otherPreferencesPlaceholder: string
    autoRedirect: string
  }
  detail: {
    aiBadge: string
    overview: string
    tips: string
    route: string
    openMap: string
    edit: string
    delete: string
    save: string
    cancel: string
    regenerate: string
    deleteTitle: string
    deleteBody: string
    deleteConfirm: string
    noItineraryTitle: string
    noItineraryBody: string
    generate: string
    imageUrl: string
    imageUrlPlaceholder: string
    mapQuery: string
    mapQueryPlaceholder: string
    language: string
    shareTrip: string
    tripName: string
    region: string
    duration: string
    difficulty: string
    preferences: string
    actions: string
  }
}

export const tripCopy: Record<Locale, CopyTree> = {
  en: {
    dashboard: {
      eyebrow: 'AI trip command center',
      title: 'Your next Israel adventure starts here.',
      subtitle: 'Create, refine, and regenerate premium AI itineraries built around your pace, interests, and available time.',
      emptyTitle: 'No trips yet',
      emptyBody: 'Start with a guided planning flow and let TiyulMate shape a personalized hiking journey for you.',
      create: 'Plan new trip',
      open: 'Open trip',
      share: 'Share',
    },
    wizard: {
      stepLabel: 'Step',
      aiBadge: 'AI-guided planner',
      subtitle: 'Answer a few smart questions and TiyulMate will generate a tailored trip in your selected language.',
      regionQuestion: 'Where do you want to explore?',
      durationQuestion: 'How much time do you have?',
      difficultyQuestion: 'What pace should the trip match?',
      preferencesQuestion: 'What should the AI optimize for?',
      preferencesBody: 'Pick the experiences that matter most and we will shape the itinerary around them.',
      reviewTitle: 'Review and personalize',
      tripName: 'Trip name',
      mapQuery: 'Google Maps query',
      imageUrl: 'Cover image URL',
      create: 'Generate trip with AI',
      generatingTitle: 'Building your itinerary',
      generatingBody: 'We are tailoring trails, pacing, viewpoints, and logistics around your preferences.',
      smartQuestions: 'Smart trip setup',
      otherLocation: 'Other location',
      otherDuration: 'Other duration',
      otherDifficulty: 'Other difficulty',
      customLocationPlaceholder: 'Write your location',
      customDurationPlaceholder: 'Write number of days or trip length',
      customDifficultyPlaceholder: 'Write your fitness level or difficulty',
      otherPreferences: 'Other interests',
      otherPreferencesPlaceholder: 'Anything else the trip should include?',
      autoRedirect: 'You will be redirected to the trip page as soon as generation is complete.',
    },
    detail: {
      aiBadge: 'AI trip dossier',
      overview: 'Overview',
      tips: 'Trail notes',
      route: 'Route and map',
      openMap: 'Open in Google Maps',
      edit: 'Edit trip',
      delete: 'Delete trip',
      save: 'Save changes',
      cancel: 'Cancel',
      regenerate: 'Regenerate with AI',
      deleteTitle: 'Delete this trip?',
      deleteBody: 'This will permanently remove the trip, itinerary, and saved refinements.',
      deleteConfirm: 'Delete permanently',
      noItineraryTitle: 'Your trip is ready for AI generation',
      noItineraryBody: 'Generate a polished day-by-day itinerary with route ideas, pacing, and hiking context.',
      generate: 'Generate itinerary',
      imageUrl: 'Cover image URL',
      imageUrlPlaceholder: 'Paste an image URL for the trip cover',
      mapQuery: 'Google Maps query',
      mapQueryPlaceholder: 'Example: Banias Waterfall Israel',
      language: 'Language',
      shareTrip: 'Share trip',
      tripName: 'Trip name',
      region: 'Region',
      duration: 'Duration',
      difficulty: 'Difficulty',
      preferences: 'Preferences',
      actions: 'Actions',
    },
  },
  he: {
    dashboard: {
      eyebrow: 'מרכז הבקרה של הטיול',
      title: 'ההרפתקה הבאה שלך בישראל מתחילה כאן.',
      subtitle: 'צור, ערוך וחדש מסלולי AI פרימיום שמותאמים לקצב, להעדפות ולזמן שלך.',
      emptyTitle: 'עדיין אין טיולים',
      emptyBody: 'התחל עם תהליך תכנון מודרך ותן ל-TiyulMate לבנות עבורך מסלול הליכה אישי.',
      create: 'תכנן טיול חדש',
      open: 'פתח טיול',
      share: 'שתף',
    },
    wizard: {
      stepLabel: 'שלב',
      aiBadge: 'מתכנן חכם מבוסס AI',
      subtitle: 'ענה על כמה שאלות חכמות ו-TiyulMate ייצור עבורך טיול מותאם בשפה שבחרת.',
      regionQuestion: 'לאן תרצה לצאת?',
      durationQuestion: 'כמה זמן עומד לרשותך?',
      difficultyQuestion: 'איזה קצב הטיול צריך להתאים?',
      preferencesQuestion: 'למה ה-AI צריך לתת עדיפות?',
      preferencesBody: 'בחר את סוגי החוויה שחשובים לך ונבנה סביבם את המסלול.',
      reviewTitle: 'סקירה והתאמה אישית',
      tripName: 'שם הטיול',
      mapQuery: 'שאילתת Google Maps',
      imageUrl: 'קישור לתמונת כיסוי',
      create: 'צור טיול עם AI',
      generatingTitle: 'בונים את המסלול שלך',
      generatingBody: 'אנחנו מתאימים שבילים, קצב, תצפיות ולוגיסטיקה לפי ההעדפות שלך.',
      smartQuestions: 'הגדרת הטיול החכמה',
      otherLocation: 'אזור אחר',
      otherDuration: 'משך אחר',
      otherDifficulty: 'רמת קושי אחרת',
      customLocationPlaceholder: 'כתוב מיקום אחר',
      customDurationPlaceholder: 'כתוב כמה ימים או משך טיול',
      customDifficultyPlaceholder: 'כתוב את רמת הכושר או הקושי',
      otherPreferences: 'תחומי עניין נוספים',
      otherPreferencesPlaceholder: 'יש משהו נוסף שחשוב לך לכלול?',
      autoRedirect: 'ברגע שהטיול ייווצר נעביר אותך אוטומטית לעמוד הפרטים שלו.',
    },
    detail: {
      aiBadge: 'תיק טיול מבוסס AI',
      overview: 'סקירה',
      tips: 'הערות למסלול',
      route: 'מסלול ומפה',
      openMap: 'פתח בגוגל מפות',
      edit: 'ערוך טיול',
      delete: 'מחק טיול',
      save: 'שמור שינויים',
      cancel: 'ביטול',
      regenerate: 'צור מחדש עם AI',
      deleteTitle: 'למחוק את הטיול?',
      deleteBody: 'הפעולה תמחק לצמיתות את הטיול, המסלול והשינויים ששמרת.',
      deleteConfirm: 'מחק לצמיתות',
      noItineraryTitle: 'הטיול מוכן ליצירת מסלול',
      noItineraryBody: 'צור מסלול יומי חכם עם רעיונות לדרך, קצב, והקשר טיול מותאם.',
      generate: 'צור מסלול',
      imageUrl: 'קישור לתמונת כיסוי',
      imageUrlPlaceholder: 'הדבק קישור לתמונת כיסוי של הטיול',
      mapQuery: 'שאילתת Google Maps',
      mapQueryPlaceholder: 'לדוגמה: Banias Waterfall Israel',
      language: 'שפה',
      shareTrip: 'שתף טיול',
      tripName: 'שם הטיול',
      region: 'אזור',
      duration: 'משך',
      difficulty: 'רמת קושי',
      preferences: 'העדפות',
      actions: 'פעולות',
    },
  },
  ar: {
    dashboard: {
      eyebrow: 'مركز قيادة الرحلة',
      title: 'مغامرتك القادمة في إسرائيل تبدأ هنا.',
      subtitle: 'أنشئ وعدل وأعد توليد خطط رحلات ذكية ومميزة تناسب وقتك واهتماماتك وإيقاعك.',
      emptyTitle: 'لا توجد رحلات بعد',
      emptyBody: 'ابدأ بتدفق تخطيط موجه ودع TiyulMate يصمم لك رحلة مشي شخصية.',
      create: 'خطط رحلة جديدة',
      open: 'افتح الرحلة',
      share: 'مشاركة',
    },
    wizard: {
      stepLabel: 'الخطوة',
      aiBadge: 'مخطط ذكي بالذكاء الاصطناعي',
      subtitle: 'أجب عن بعض الأسئلة الذكية وسيقوم TiyulMate بإنشاء رحلة مخصصة بلغتك الحالية.',
      regionQuestion: 'إلى أين تريد أن تذهب؟',
      durationQuestion: 'كم من الوقت لديك؟',
      difficultyQuestion: 'ما الوتيرة المناسبة للرحلة؟',
      preferencesQuestion: 'ما الذي يجب أن يركز عليه الذكاء الاصطناعي؟',
      preferencesBody: 'اختر التجارب الأهم بالنسبة لك وسنصمم الرحلة حولها.',
      reviewTitle: 'مراجعة وتخصيص',
      tripName: 'اسم الرحلة',
      mapQuery: 'استعلام Google Maps',
      imageUrl: 'رابط صورة الغلاف',
      create: 'أنشئ الرحلة بالذكاء الاصطناعي',
      generatingTitle: 'نقوم ببناء رحلتك الآن',
      generatingBody: 'نقوم بتنسيق المسارات والإيقاع ونقاط المشاهدة واللوجستيات حسب تفضيلاتك.',
      smartQuestions: 'إعداد الرحلة الذكي',
      otherLocation: 'منطقة أخرى',
      otherDuration: 'مدة أخرى',
      otherDifficulty: 'مستوى صعوبة آخر',
      customLocationPlaceholder: 'اكتب المنطقة التي تريدها',
      customDurationPlaceholder: 'اكتب عدد الأيام أو مدة الرحلة',
      customDifficultyPlaceholder: 'اكتب مستوى اللياقة أو الصعوبة',
      otherPreferences: 'اهتمامات أخرى',
      otherPreferencesPlaceholder: 'هل هناك شيء آخر تريد إضافته؟',
      autoRedirect: 'سننقلك تلقائياً إلى صفحة تفاصيل الرحلة فور انتهاء التوليد.',
    },
    detail: {
      aiBadge: 'ملف الرحلة الذكي',
      overview: 'نظرة عامة',
      tips: 'ملاحظات المسار',
      route: 'المسار والخريطة',
      openMap: 'افتح في Google Maps',
      edit: 'تعديل الرحلة',
      delete: 'حذف الرحلة',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
      regenerate: 'إعادة التوليد بالذكاء الاصطناعي',
      deleteTitle: 'حذف هذه الرحلة؟',
      deleteBody: 'سيؤدي هذا إلى حذف الرحلة والخطة وكل التعديلات المحفوظة نهائياً.',
      deleteConfirm: 'حذف نهائي',
      noItineraryTitle: 'رحلتك جاهزة للتوليد الذكي',
      noItineraryBody: 'أنشئ خطة يومية أنيقة مع اقتراحات طريق وإيقاع وسياق للمشي.',
      generate: 'أنشئ الخطة',
      imageUrl: 'رابط صورة الغلاف',
      imageUrlPlaceholder: 'ألصق رابط صورة لغلاف الرحلة',
      mapQuery: 'استعلام Google Maps',
      mapQueryPlaceholder: 'مثال: Banias Waterfall Israel',
      language: 'اللغة',
      shareTrip: 'مشاركة الرحلة',
      tripName: 'اسم الرحلة',
      region: 'المنطقة',
      duration: 'المدة',
      difficulty: 'الصعوبة',
      preferences: 'التفضيلات',
      actions: 'الإجراءات',
    },
  },
}
