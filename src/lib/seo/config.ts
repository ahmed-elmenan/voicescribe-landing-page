// Site configuration
export const siteConfig = {
  name: 'VoiceScribe',
  description:
    'Record audio and transcribe fast with AI. Import YouTube links, sync notes to the cloud, and stay organized.',
  url: 'https://voicescribe.app',
  ogImage: 'https://voicescribe.app/og-image.jpg',
  appStoreUrl: 'https://apps.apple.com/app/idXXXXXXXXX', // Replace with actual ID
  links: {
    twitter: 'https://twitter.com/voicescribe',
    github: 'https://github.com/future-vision-apps',
  },
  creator: 'Future Vision Apps',
  keywords: [
    'voice to text app iphone',
    'audio to text transcription app',
    'transcribe youtube video to text',
    'ai transcription app ios',
    'record and transcribe notes',
    'cloud sync transcription app',
  ],
  keywordsAr: [
    'تطبيق تحويل الصوت إلى نص',
    'تحويل فيديو يوتيوب إلى نص',
    'تطبيق نسخ صوتي للآيفون',
    'تطبيق تفريغ الصوت إلى نص',
    'مزامنة سحابية للملاحظات',
  ],
};

// Navigation items
export const navItems = [
  { href: '#features', label: 'Features', labelAr: 'المميزات' },
  { href: '#pricing', label: 'Pricing', labelAr: 'الأسعار' },
  { href: '#how-it-works', label: 'How It Works', labelAr: 'كيف يعمل' },
  { href: '#faq', label: 'FAQ', labelAr: 'الأسئلة الشائعة' },
];

// Supported locales
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Hreflang mappings
export const hreflangMappings = [
  { lang: 'en-us', href: 'https://voicescribe.app/' },
  { lang: 'ar-sa', href: 'https://voicescribe.app/ar-sa/' },
  { lang: 'ar-ae', href: 'https://voicescribe.app/ar-ae/' },
  { lang: 'ar-qa', href: 'https://voicescribe.app/ar-qa/' },
  { lang: 'ar-kw', href: 'https://voicescribe.app/ar-kw/' },
  { lang: 'ar-bh', href: 'https://voicescribe.app/ar-bh/' },
  { lang: 'ar-om', href: 'https://voicescribe.app/ar-om/' },
  { lang: 'x-default', href: 'https://voicescribe.app/' },
];
