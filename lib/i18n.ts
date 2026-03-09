export type Locale = 'en' | 'he' | 'ar'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'he', 'ar']

export const isRTL = (locale: Locale): boolean => locale === 'he' || locale === 'ar'

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',

    // Landing
    'landing.title': 'TiyulMate - Your AI Trip Planner',
    'landing.subtitle': 'Plan your perfect hiking trip with AI-powered personalization',
    'landing.description': 'Get custom itineraries for Israeli hiking trails based on your preferences, duration, and difficulty level.',
    'landing.cta': 'Start Planning',
    'landing.features': 'Features',
    'landing.feature1': 'AI-Powered Planning',
    'landing.feature1_desc': 'Get personalized itineraries based on your preferences',
    'landing.feature2': 'Israeli Trails',
    'landing.feature2_desc': 'Discover the best hiking routes across Israel',
    'landing.feature3': 'Easy Sharing',
    'landing.feature3_desc': 'Share your trip plans with friends and family',

    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.loginHere': 'Login here',
    'auth.signupHere': 'Sign up here',
    'auth.confirmEmail': 'Please confirm your email',

    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.newTrip': 'Plan New Trip',
    'dashboard.myTrips': 'My Trips',
    'dashboard.noTrips': 'No trips yet. Create your first one!',
    'dashboard.edit': 'Edit',
    'dashboard.delete': 'Delete',
    'dashboard.share': 'Share',

    // Trip Wizard
    'wizard.title': 'Plan Your Trip',
    'wizard.region': 'Select Region',
    'wizard.duration': 'Trip Duration',
    'wizard.difficulty': 'Difficulty Level',
    'wizard.preferences': 'Your Preferences',
    'wizard.next': 'Next',
    'wizard.prev': 'Previous',
    'wizard.create': 'Create Itinerary',

    // Trip Detail
    'trip.itinerary': 'Itinerary',
    'trip.dayOne': 'Day 1',
    'trip.dayTwo': 'Day 2',
    'trip.dayThree': 'Day 3',
    'trip.activities': 'Activities',
    'trip.points': 'Points of Interest',
    'trip.distance': 'Distance',
    'trip.duration': 'Duration',
    'trip.elevation': 'Elevation Gain',

    // Common
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
  },
  he: {
    // Navigation
    'nav.home': 'בית',
    'nav.dashboard': 'לוח בקרה',
    'nav.login': 'כניסה',
    'nav.signup': 'הרשמה',
    'nav.logout': 'התנתקות',
    'nav.language': 'שפה',

    // Landing
    'landing.title': 'TiyulMate - מתכנן הטיולים שלך',
    'landing.subtitle': 'תכננו את הטיול המושלם שלכם עם AI מסתגל אישית',
    'landing.description': 'קבלו יומנים מותאמים אישית לשבילי הטיול הטובים ביותר בישראל בהתאם להעדפותיכם.',
    'landing.cta': 'התחל תכנון',
    'landing.cta2': 'גלה טיולים מוכנים',
    'landing.features': 'תכונות',
    'landing.feature1': 'תכנון מונע על ידי AI',
    'landing.feature1_desc': 'קבל יומנים מותאמים אישית על פי העדפותיך',
    'landing.feature2': 'שבילים בישראל',
    'landing.feature2_desc': 'גלה את השבילים הטובים ביותר בכל פינת ישראל',
    'landing.feature3': 'שיתוף קל',
    'landing.feature3_desc': 'שתף את תוכניות הטיולים שלך עם חברים ומשפחה',
    'landing.readyMade': 'טיולים מוכנים',
    'landing.exploreTrips': 'בחר טיול',

    // Auth
    'auth.email': 'דוא"ל',
    'auth.password': 'סיסמה',
    'auth.fullName': 'שם מלא',
    'auth.login': 'כניסה',
    'auth.signup': 'הרשמה',
    'auth.noAccount': 'אין לך חשבון?',
    'auth.haveAccount': 'יש לך כבר חשבון?',
    'auth.loginHere': 'התחבר כאן',
    'auth.signupHere': 'הירשם כאן',
    'auth.confirmEmail': 'אנא אשר את דוא"לך',

    // Dashboard
    'dashboard.welcome': 'ברוכים חזרתם',
    'dashboard.newTrip': 'תכנן טיול חדש',
    'dashboard.myTrips': 'הטיולים שלי',
    'dashboard.noTrips': 'אין טיולים עדיין. צור את הראשון שלך!',
    'dashboard.edit': 'עריכה',
    'dashboard.delete': 'מחיקה',
    'dashboard.share': 'שיתוף',

    // Trip Wizard
    'wizard.title': 'תכנן את הטיול שלך',
    'wizard.region': 'בחר אזור',
    'wizard.duration': 'משך הטיול',
    'wizard.difficulty': 'רמת קושי',
    'wizard.preferences': 'ההעדפות שלך',
    'wizard.next': 'הבא',
    'wizard.prev': 'הקודם',
    'wizard.create': 'צור יומן',

    // Trip Detail
    'trip.itinerary': 'יומן',
    'trip.dayOne': 'יום 1',
    'trip.dayTwo': 'יום 2',
    'trip.dayThree': 'יום 3',
    'trip.activities': 'פעילויות',
    'trip.points': 'נקודות עניין',
    'trip.distance': 'מרחק',
    'trip.duration': 'משך זמן',
    'trip.elevation': 'עלייה בגובה',

    // Common
    'common.back': 'חזור',
    'common.save': 'שמור',
    'common.cancel': 'בטל',
    'common.loading': 'טוען...',
    'common.error': 'אירעה שגיאה',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.dashboard': 'لوحة التحكم',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'التسجيل',
    'nav.logout': 'تسجيل الخروج',
    'nav.language': 'اللغة',

    // Landing
    'landing.title': 'TiyulMate - مخطط رحلتك الذكي',
    'landing.subtitle': 'خطط رحلة المشي المثالية مع التخصيص الذكي',
    'landing.description': 'احصل على مسارات مخصصة لأجمل مسارات المشي في إسرائيل وفقاً لتفضيلاتك.',
    'landing.cta': 'ابدأ التخطيط',
    'landing.cta2': 'اكتشف الرحلات الجاهزة',
    'landing.features': 'المميزات',
    'landing.feature1': 'التخطيط بتقنية الذكاء الاصطناعي',
    'landing.feature1_desc': 'احصل على مسارات مخصصة حسب تفضيلاتك',
    'landing.feature2': 'مسارات في إسرائيل',
    'landing.feature2_desc': 'اكتشف أفضل مسارات المشي في جميع أنحاء إسرائيل',
    'landing.feature3': 'المشاركة السهلة',
    'landing.feature3_desc': 'شارك خططك مع الأصدقاء والعائلة',
    'landing.readyMade': 'رحلات جاهزة',
    'landing.exploreTrips': 'اختر رحلة',

    // Auth
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'التسجيل',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.haveAccount': 'هل لديك حساب بالفعل؟',
    'auth.loginHere': 'سجل هنا',
    'auth.signupHere': 'اشترك هنا',
    'auth.confirmEmail': 'يرجى تأكيد بريدك الإلكتروني',

    // Dashboard
    'dashboard.welcome': 'أهلا وسهلا',
    'dashboard.newTrip': 'خطط رحلة جديدة',
    'dashboard.myTrips': 'رحلاتي',
    'dashboard.noTrips': 'لا توجد رحلات حتى الآن. أنشئ رحلتك الأولى!',
    'dashboard.edit': 'تعديل',
    'dashboard.delete': 'حذف',
    'dashboard.share': 'مشاركة',

    // Trip Wizard
    'wizard.title': 'خطط رحلتك',
    'wizard.region': 'اختر المنطقة',
    'wizard.duration': 'مدة الرحلة',
    'wizard.difficulty': 'مستوى الصعوبة',
    'wizard.preferences': 'تفضيلاتك',
    'wizard.next': 'التالي',
    'wizard.prev': 'السابق',
    'wizard.create': 'إنشاء المسار',

    // Trip Detail
    'trip.itinerary': 'المسار',
    'trip.dayOne': 'اليوم 1',
    'trip.dayTwo': 'اليوم 2',
    'trip.dayThree': 'اليوم 3',
    'trip.activities': 'الأنشطة',
    'trip.points': 'نقاط الاهتمام',
    'trip.distance': 'المسافة',
    'trip.duration': 'المدة',
    'trip.elevation': 'الارتفاع',

    // Common
    'common.back': 'رجوع',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
  },
}

export function t(key: string, locale: Locale = defaultLocale): string {
  const translation = translations[locale][key as keyof typeof translations['en']]
  return translation || translations[defaultLocale][key as keyof typeof translations['en']] || key
}

export const READY_MADE_TRIPS = {
  en: [
    {
      id: 'golan-waterfall',
      title: 'Banias Waterfall Loop',
      description: 'Experience stunning waterfalls and lush greenery in the Golan Heights',
      region: 'Golan Heights',
      duration: 3,
      difficulty: 'moderate',
      image: 'golan-heights.jpg',
    },
    {
      id: 'dead-sea-trek',
      title: 'Dead Sea Salt Cliffs',
      description: 'Trek through dramatic salt formations with breathtaking views',
      region: 'Dead Sea',
      duration: 2,
      difficulty: 'easy',
      image: 'dead-sea.jpg',
    },
    {
      id: 'masada-sunrise',
      title: 'Masada Sunrise Trek',
      description: 'Hike the iconic fortress at sunrise with ancient history lessons',
      region: 'Negev',
      duration: 1,
      difficulty: 'moderate',
      image: 'masada.jpg',
    },
  ],
  he: [
    {
      id: 'golan-waterfall',
      title: 'לולאת מפלות בניאס',
      description: 'חוו מפלות מדהימות וירקות שופע בגבעות הגולן',
      region: 'גבעות הגולן',
      duration: 3,
      difficulty: 'moderate',
      image: 'golan-heights.jpg',
    },
    {
      id: 'dead-sea-trek',
      title: 'צוקי המלח של ים המלח',
      description: 'טיול דרך סוגי מלח דרמטיים עם נוף מדהים',
      region: 'ים המלח',
      duration: 2,
      difficulty: 'easy',
      image: 'dead-sea.jpg',
    },
    {
      id: 'masada-sunrise',
      title: 'טיול עלייה למסדה בעלות השחר',
      description: 'טיול לעיר המצודה המפורסמת בעלות השחר עם שיעורי היסטוריה',
      region: 'הנגב',
      duration: 1,
      difficulty: 'moderate',
      image: 'masada.jpg',
    },
  ],
  ar: [
    {
      id: 'golan-waterfall',
      title: 'حلقة شلالات بانياس',
      description: 'اختبر الشلالات المذهلة والخضرة الوفيرة في مرتفعات الجولان',
      region: 'مرتفعات الجولان',
      duration: 3,
      difficulty: 'moderate',
      image: 'golan-heights.jpg',
    },
    {
      id: 'dead-sea-trek',
      title: 'منحدرات الملح في البحر الميت',
      description: 'اطلع على تشكيلات الملح الدرامية مع مناظر خلابة',
      region: 'البحر الميت',
      duration: 2,
      difficulty: 'easy',
      image: 'dead-sea.jpg',
    },
    {
      id: 'masada-sunrise',
      title: 'رحلة مسادا مع شروق الشمس',
      description: 'تسلق القلعة الأيقونية عند الفجر مع دروس تاريخية قديمة',
      region: 'النقب',
      duration: 1,
      difficulty: 'moderate',
      image: 'masada.jpg',
    },
  ],
}
