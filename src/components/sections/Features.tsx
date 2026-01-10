import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Feature card data with detailed copy
const features = [
  {
    id: 'recording',
    title: 'Record with Confidence',
    description:
      'See your voice as a real-time waveform. Pause and resume anytime. Auto-generated titles keep you organized from the start.',
    details: ['Live waveform visualization', 'Pause/resume controls', 'Smart auto-titling'],
    icon: 'microphone',
    gradient: 'from-brand-recording to-red-400',
    bgGlow: 'bg-brand-recording/20',
  },
  {
    id: 'transcription',
    title: 'Lightning-Fast AI Transcription',
    description:
      'State-of-the-art speech recognition delivers accurate transcripts in seconds — not minutes. Edit inline when needed.',
    details: ['Sub-second processing', 'Multi-language support', 'Inline editing'],
    icon: 'bolt',
    gradient: 'from-amber-400 to-yellow-500',
    bgGlow: 'bg-amber-400/20',
  },
  {
    id: 'youtube',
    title: 'YouTube Link Import',
    description:
      'Paste any YouTube URL. We grab captions first for instant results; ASR fallback handles the rest. Smart caching saves quota.',
    details: ['Captions-first strategy', 'ASR fallback for non-captioned', 'Intelligent caching'],
    icon: 'youtube',
    gradient: 'from-red-500 to-red-600',
    bgGlow: 'bg-red-500/20',
  },
  {
    id: 'cloud',
    title: 'Seamless Cloud Sync',
    description:
      'Your notes live safely in the cloud via Supabase — Auth, Storage, and Postgres. Access anywhere, never lose a thought.',
    details: ['Secure authentication', 'Real-time sync', 'Cross-device access'],
    icon: 'cloud',
    gradient: 'from-secondary to-purple-500',
    bgGlow: 'bg-secondary/20',
  },
  {
    id: 'organization',
    title: 'Smart Organization',
    description:
      'Categories, favorites, and recent notes at your fingertips. Quota warnings keep you informed before limits hit.',
    details: ['Custom categories', 'Quick favorites', 'Usage alerts'],
    icon: 'folder',
    gradient: 'from-accent-green to-emerald-500',
    bgGlow: 'bg-accent-green/20',
  },
  {
    id: 'onboarding',
    title: 'Delightful Onboarding',
    description:
      'A/B tested flows with iOS-style animations guide you smoothly. Premium prompts appear at just the right moments.',
    details: ['Optimized conversion', 'Native iOS animations', 'Smart upgrade prompts'],
    icon: 'sparkles',
    gradient: 'from-primary to-blue-500',
    bgGlow: 'bg-primary/20',
  },
];

// Custom SVG icons for each feature
const FeatureIcon = ({ type, className }: { type: string; className?: string }) => {
  const iconClass = cn('w-7 h-7', className);
  
  switch (type) {
    case 'microphone':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          {/* Waveform lines */}
          <path strokeLinecap="round" strokeWidth={2} d="M2 12h2M20 12h2" opacity={0.5} />
          <path strokeLinecap="round" strokeWidth={2} d="M4 9h1M4 15h1M19 9h1M19 15h1" opacity={0.3} />
        </svg>
      );
    case 'bolt':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          {/* Sync arrows */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9" opacity={0.5} />
        </svg>
      );
    case 'folder':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          {/* Star for favorites */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 13.77l-.95 2.87 2.47-1.8 2.47 1.8-.95-2.87 2.47-1.8h-3.04l-.95-2.87-.95 2.87H9.01l2.47 1.8z" opacity={0.5} />
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      );
    default:
      return null;
  }
};

// Feature card component with animations
function FeatureCard({ 
  feature, 
  index, 
  isVisible 
}: { 
  feature: typeof features[0]; 
  index: number; 
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        'bg-white rounded-3xl p-6 lg:p-8',
        'border border-gray-100',
        'shadow-soft hover:shadow-strong',
        'transition-all duration-500 ease-out',
        'transform-gpu',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8',
        isHovered && 'scale-[1.02] -translate-y-1'
      )}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby={`feature-${feature.id}-title`}
    >
      {/* Background glow effect */}
      <div 
        className={cn(
          'absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl',
          'transition-opacity duration-500',
          feature.bgGlow,
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />
      
      {/* Icon container with gradient background */}
      <div className="relative mb-5">
        <div 
          className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center',
            'bg-gradient-to-br shadow-md',
            feature.gradient,
            'text-white',
            'transition-transform duration-300 ease-out',
            'group-hover:scale-110 group-hover:rotate-3'
          )}
          aria-hidden="true"
        >
          <FeatureIcon type={feature.icon} />
        </div>
        
        {/* Floating decoration */}
        <div 
          className={cn(
            'absolute -top-1 -right-1 w-4 h-4 rounded-full',
            'bg-gradient-to-br opacity-60',
            feature.gradient,
            'transition-all duration-500',
            isHovered ? 'scale-150 opacity-30' : 'scale-100'
          )}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative">
        <h3 
          id={`feature-${feature.id}-title`}
          className="text-xl font-semibold text-text-primary mb-3 tracking-tight"
        >
          {feature.title}
        </h3>
        
        <p className="text-body text-text-secondary mb-4 leading-relaxed">
          {feature.description}
        </p>

        {/* Feature details list */}
        <ul className="space-y-2" aria-label={`${feature.title} highlights`}>
          {feature.details.map((detail, i) => (
            <li 
              key={detail}
              className={cn(
                'flex items-center gap-2 text-sm text-text-tertiary',
                'transition-all duration-300',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              )}
              style={{
                transitionDelay: isVisible ? `${(index * 100) + (i * 50) + 200}ms` : '0ms',
              }}
            >
              <svg 
                className={cn(
                  'w-4 h-4 flex-shrink-0',
                  'bg-gradient-to-br bg-clip-text',
                  feature.gradient.replace('from-', 'text-').split(' ')[0].replace('text-', 'text-')
                )}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom gradient line */}
      <div 
        className={cn(
          'absolute bottom-0 left-0 right-0 h-1',
          'bg-gradient-to-r opacity-0',
          feature.gradient,
          'transition-opacity duration-300',
          'group-hover:opacity-100'
        )}
        aria-hidden="true"
      />
    </div>
  );
}

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="section scroll-mt-header bg-gradient-to-b from-surface-primary via-surface-secondary/30 to-surface-primary" 
      aria-labelledby="features-heading"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-16',
          'transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Features
          </span>
          <h2 
            id="features-heading" 
            className="text-display-sm md:text-display font-bold text-text-primary mb-4"
          >
            Everything you need to capture ideas
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Record lectures, transcribe interviews, import YouTube videos — all in one 
            powerful app designed for productivity.
          </p>
        </div>

        {/* Features Grid */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          aria-label="App features"
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={cn(
          'text-center mt-16',
          'transition-all duration-700 delay-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          <p className="text-text-tertiary text-sm mb-4">
            And much more — audio playback sync, export options, dark mode, and continuous updates.
          </p>
          <a 
            href="#pricing" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-medium transition-colors"
          >
            See pricing plans
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

