import Link from 'next/link';
import { SEOHead, siteConfig } from '@/lib/seo';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'cyan',
    title: 'Real-Time Transcription',
    description: 'Instant speech-to-text conversion with high accuracy',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: 'blue',
    title: 'Cloud Sync',
    description: 'Access your notes anywhere, on any device',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'orange',
    title: 'Privacy First',
    description: 'Your data is encrypted and secure',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'red',
    title: 'YouTube Transcription',
    description: 'Transcribe any YouTube video instantly',
  },
];

const timeline = [
  { year: '2024', event: 'VoiceScribe launched on the App Store' },
  { year: '2024', event: 'Added YouTube transcription feature' },
  { year: '2025', event: 'Premium subscription introduced' },
  { year: '2025', event: 'Cloud sync and backup launched' },
  { year: '2026', event: 'Reached 100,000+ happy users' },
];

const colorClasses: Record<string, string> = {
  cyan: 'bg-cyan-500/15 text-cyan-400',
  blue: 'bg-blue-500/15 text-blue-400',
  orange: 'bg-orange-500/15 text-orange-400',
  red: 'bg-red-500/15 text-red-400',
};

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us | VoiceScribe"
        description="Learn about VoiceScribe and Future Vision Apps - our mission to make voice notes effortless for everyone."
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

        {/* Content */}
        <main className="container-narrow py-12 md:py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/30 mb-6">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-display-sm md:text-display font-bold text-white mb-4">
              VoiceScribe
            </h1>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <span className="text-primary font-medium">AI-Powered Voice Transcription</span>
            </div>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Transform your voice into text with the power of AI. Built for students, professionals, 
              journalists, content creators, and anyone who wants to capture their thoughts effortlessly.
            </p>
          </div>

          {/* Description Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Transform Your Voice Into Text</h2>
            <p className="text-white/70 mb-4">
              VoiceScribe is the ultimate voice-to-text app designed for anyone who wants to capture 
              their thoughts effortlessly. Whether you&apos;re recording lecture notes, conducting interviews, 
              brainstorming ideas, or creating content, VoiceScribe makes transcription fast, accurate, and simple.
            </p>
            <p className="text-white/70">
              Our AI-powered technology ensures high accuracy across multiple languages, while our cloud 
              sync keeps your notes accessible anywhere, on any device.
            </p>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">What Makes VoiceScribe Special</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 flex items-start gap-4"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[feature.color]}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Future Vision Apps</h2>
                <p className="text-primary">Innovative Mobile Solutions</p>
              </div>
            </div>
            <p className="text-white/70">
              We&apos;re a passionate team of developers and designers dedicated to creating apps that make 
              everyday tasks simpler and more enjoyable. VoiceScribe is our flagship product, born from 
              a desire to help people capture and organize their thoughts effortlessly.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl border border-primary/30 p-8 text-center mb-12">
            <svg className="w-10 h-10 text-amber-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-white/80 text-lg italic">
              &quot;Make voice notes effortless for everyone, empowering people to capture their ideas without barriers.&quot;
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Our Journey</h2>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-semibold text-primary">{item.year}</div>
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1 bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-white/80">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">100K+</div>
              <div className="text-sm text-white/50">Happy Users</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">4.8★</div>
              <div className="text-sm text-white/50">App Store Rating</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-white/50">Languages</div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Future Vision Apps</p>
            <p className="text-white/40 text-xs mt-1">All rights reserved</p>
            <p className="text-white/50 text-sm mt-3">Made with ❤️ for productivity</p>
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
