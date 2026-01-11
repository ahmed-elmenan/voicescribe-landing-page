import Link from 'next/link';
import { SEOHead, siteConfig } from '@/lib/seo';

const pressReleases = [
  {
    date: 'January 2026',
    title: 'VoiceScribe Surpasses 100,000 Users Milestone',
    excerpt: 'The AI-powered transcription app celebrates rapid growth and announces new premium features.',
  },
  {
    date: 'December 2025',
    title: 'VoiceScribe Launches Cloud Sync Feature',
    excerpt: 'Users can now access their transcriptions across all devices with end-to-end encryption.',
  },
  {
    date: 'October 2025',
    title: 'VoiceScribe Premium Subscription Now Available',
    excerpt: 'New premium tier offers unlimited transcription, advanced export options, and priority support.',
  },
  {
    date: 'August 2025',
    title: 'VoiceScribe Adds YouTube Transcription',
    excerpt: 'Revolutionary feature allows users to transcribe any YouTube video with a single tap.',
  },
];

const mediaAssets = [
  {
    name: 'App Icon',
    description: 'High-resolution app icons in various sizes',
    formats: 'PNG, SVG',
    icon: '📱',
  },
  {
    name: 'Screenshots',
    description: 'App screenshots for iPhone and iPad',
    formats: 'PNG',
    icon: '📸',
  },
  {
    name: 'Logo Pack',
    description: 'VoiceScribe and Future Vision Apps logos',
    formats: 'PNG, SVG, AI',
    icon: '🎨',
  },
  {
    name: 'Brand Guidelines',
    description: 'Colors, typography, and usage guidelines',
    formats: 'PDF',
    icon: '📋',
  },
];

const factSheet = [
  { label: 'Company', value: 'Future Vision Apps' },
  { label: 'Product', value: 'VoiceScribe' },
  { label: 'Category', value: 'Productivity / AI' },
  { label: 'Platform', value: 'iOS (iPhone & iPad)' },
  { label: 'Launch Date', value: '2024' },
  { label: 'Users', value: '100,000+' },
  { label: 'App Store Rating', value: '4.8 ★' },
  { label: 'Languages', value: '50+' },
];

export default function PressPage() {
  return (
    <>
      <SEOHead
        title="Press Kit | VoiceScribe"
        description="Press resources, media assets, and company information for journalists and media professionals."
      />

      <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1a1035] to-[#0f0a1f]">
        {/* Header */}
        <header className="border-b border-white/10">
          <div className="container-wide py-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl text-white"
            >
              <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span>{siteConfig.name}</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary/20 to-transparent py-16 md:py-20">
          <div className="container-narrow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/30 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h1 className="text-display-sm md:text-display font-bold text-white mb-4">
              Press Kit
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Resources for journalists, bloggers, and media professionals covering VoiceScribe
            </p>
          </div>
        </div>

        {/* Content */}
        <main className="container-narrow py-12 md:py-16">
          {/* Media Contact */}
          <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl border border-primary/30 p-8 mb-12 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Media Contact</h2>
            <p className="text-white/60 mb-4">For press inquiries, please contact:</p>
            <a
              href="mailto:press@futurevisionapps.com"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              press@futurevisionapps.com
            </a>
          </div>

          {/* Company Fact Sheet */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Company Fact Sheet</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              {factSheet.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 ${
                    index < factSheet.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <span className="text-white/60">{item.label}</span>
                  <span className="text-white font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-12">
            <h2 className="text-xl font-bold text-white mb-4">About VoiceScribe</h2>
            <p className="text-white/70 mb-4">
              VoiceScribe is an AI-powered voice transcription app developed by Future Vision Apps. 
              Launched in 2024, it quickly became a favorite among students, professionals, journalists, 
              and content creators who need to convert speech to text quickly and accurately.
            </p>
            <p className="text-white/70 mb-4">
              The app features real-time transcription, YouTube video transcription, cloud sync with 
              end-to-end encryption, and support for over 50 languages. VoiceScribe uses advanced 
              machine learning models to deliver industry-leading transcription accuracy.
            </p>
            <p className="text-white/70">
              With over 100,000 users and a 4.8-star rating on the App Store, VoiceScribe continues 
              to set the standard for mobile voice transcription.
            </p>
          </div>

          {/* Media Assets */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Media Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mediaAssets.map((asset, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{asset.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{asset.name}</h3>
                      <p className="text-sm text-white/60 mb-2">{asset.description}</p>
                      <span className="text-xs text-primary font-medium">{asset.formats}</span>
                    </div>
                    <svg className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-white/50 text-sm mt-4">
              Contact us at{' '}
              <a href="mailto:press@futurevisionapps.com" className="text-primary hover:underline">
                press@futurevisionapps.com
              </a>{' '}
              to request media assets
            </p>
          </div>

          {/* Press Releases */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Press Releases</h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <span className="text-sm text-primary font-medium">{release.date}</span>
                  <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-primary transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-2">{release.excerpt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Guidelines */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-xl font-bold text-white mb-4">Brand Usage Guidelines</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use &quot;VoiceScribe&quot; as one word with capital V and S</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Please use official logos and screenshots from our press kit</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Do not modify, distort, or recolor our logos</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Do not use our brand in a way that implies partnership without approval</span>
              </li>
            </ul>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6">
          <div className="container-wide text-center text-sm text-white/40">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
