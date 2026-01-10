'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation, usePrefersReducedMotion } from '@/lib/hooks';

// Step data with detailed info
const steps = [
  {
    id: 'record',
    number: 1,
    title: 'Record or Import',
    subtitle: 'Capture your audio',
    description:
      'Record directly with live waveform visualization, or paste any YouTube link. Both methods get you to text fast.',
    features: ['Tap to record', 'Paste YouTube URL', 'Import audio files'],
  },
  {
    id: 'transcribe',
    number: 2,
    title: 'AI Transcribes',
    subtitle: 'Lightning-fast processing',
    description:
      'Our AI transcribes in seconds. For YouTube, captions load instantly — ASR kicks in automatically when needed.',
    features: ['Captions-first strategy', 'ASR fallback', 'Multi-language support'],
  },
  {
    id: 'organize',
    number: 3,
    title: 'Organize & Share',
    subtitle: 'Your notes, everywhere',
    description:
      'Categorize with folders, star favorites, and sync to the cloud. Export or share with a tap.',
    features: ['Smart categories', 'Cloud sync', 'Easy export'],
  },
];

// Animated illustration for Step 1: Recording
function RecordingIllustration({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* Phone outline */}
      <div 
        className={cn(
          'relative w-28 h-48 bg-gray-900 rounded-[2rem] border-4 border-gray-800 shadow-2xl',
          'transition-all duration-700',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        )}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full" />
        
        {/* Screen content */}
        <div className="absolute inset-3 top-8 bg-gradient-to-b from-gray-950 to-gray-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
          {/* Recording indicator */}
          <div 
            className={cn(
              'w-12 h-12 rounded-full bg-brand-recording flex items-center justify-center mb-3',
              'transition-all duration-500 delay-300',
              isVisible ? 'scale-100' : 'scale-0'
            )}
          >
            <div className={cn(
              'w-4 h-4 bg-white rounded-sm',
              isVisible && 'animate-pulse'
            )} />
          </div>
          
          {/* Waveform bars */}
          <div className="flex items-center gap-0.5 h-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-1 bg-brand-recording/80 rounded-full transition-all',
                  isVisible ? 'opacity-100' : 'opacity-0'
                )}
                style={{
                  height: isVisible ? `${12 + Math.sin(i * 0.8) * 10}px` : '4px',
                  transitionDelay: `${400 + i * 50}ms`,
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* YouTube link floating card */}
      <div 
        className={cn(
          'absolute -right-4 top-8 bg-white rounded-xl shadow-strong p-3 w-32',
          'transition-all duration-500 delay-500',
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
          </div>
          <span className="text-[10px] font-medium text-gray-600">YouTube</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full bg-red-500 rounded-full transition-all duration-1000 delay-700',
              isVisible ? 'w-full' : 'w-0'
            )}
          />
        </div>
      </div>
    </div>
  );
}

// Animated illustration for Step 2: AI Transcription
function TranscriptionIllustration({ isVisible }: { isVisible: boolean }) {
  const lines = ['Hello, this is a test...', 'The quick brown fox...', 'Transcribing audio...'];
  
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* Main card */}
      <div 
        className={cn(
          'relative bg-white rounded-2xl shadow-strong p-4 w-56',
          'transition-all duration-500',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
          <div className={cn(
            'w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center',
            isVisible && 'animate-pulse'
          )}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-900">AI Processing</div>
            <div className="text-[10px] text-gray-500">Transcribing...</div>
          </div>
        </div>

        {/* Text lines appearing */}
        <div className="space-y-2">
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                'transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              )}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              <div className="text-[10px] text-gray-700 font-mono">{line}</div>
            </div>
          ))}
        </div>

        {/* Typing cursor */}
        <div 
          className={cn(
            'inline-block w-0.5 h-3 bg-primary mt-1',
            isVisible && 'animate-pulse'
          )}
        />
      </div>

      {/* Floating accuracy badge */}
      <div 
        className={cn(
          'absolute -left-2 bottom-4 bg-emerald-800 text-white text-[10px] font-bold px-2 py-1 rounded-full',
          'transition-all duration-500 delay-700',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        )}
      >
        98% Accurate
      </div>

      {/* Speed indicator */}
      <div 
        className={cn(
          'absolute -right-2 top-4 bg-amber-700 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1',
          'transition-all duration-500 delay-500',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        )}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Fast
      </div>
    </div>
  );
}

// Animated illustration for Step 3: Organize & Sync
function OrganizeIllustration({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* Main folder structure */}
      <div 
        className={cn(
          'relative bg-white rounded-2xl shadow-strong p-4 w-48',
          'transition-all duration-500',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
      >
        {/* Folder items */}
        {[
          { name: 'Meetings', color: 'bg-primary', icon: '📁', count: 12 },
          { name: 'Lectures', color: 'bg-secondary', icon: '📚', count: 8 },
          { name: 'Ideas', color: 'bg-accent-green', icon: '💡', count: 24 },
        ].map((folder, i) => (
          <div
            key={folder.name}
            className={cn(
              'flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            )}
            style={{ transitionDelay: `${200 + i * 150}ms` }}
          >
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-lg', folder.color)}>
              {folder.icon}
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-900">{folder.name}</div>
              <div className="text-[10px] text-gray-500">{folder.count} notes</div>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>

      {/* Cloud sync indicator */}
      <div 
        className={cn(
          'absolute -right-4 -top-2 bg-gradient-to-br from-secondary to-purple-500 text-white rounded-xl p-3 shadow-lg',
          'transition-all duration-500 delay-600',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        )}
      >
        <svg 
          className={cn('w-6 h-6', isVisible && 'animate-bounce')} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>

      {/* Share button */}
      <div 
        className={cn(
          'absolute -left-4 bottom-8 bg-white rounded-full p-2 shadow-strong',
          'transition-all duration-500 delay-800',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        )}
      >
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </div>
    </div>
  );
}

// Step component with illustration
function Step({ 
  step, 
  index, 
  isVisible,
  isLast
}: { 
  step: typeof steps[0]; 
  index: number; 
  isVisible: boolean;
  isLast: boolean;
}) {
  const illustrations = [RecordingIllustration, TranscriptionIllustration, OrganizeIllustration];
  const Illustration = illustrations[index];

  return (
    <div 
      className={cn(
        'relative',
        'transition-all duration-700',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Desktop: Alternating layout */}
      <div className={cn(
        'flex flex-col lg:flex-row items-center gap-8 lg:gap-16',
        index % 2 === 1 && 'lg:flex-row-reverse'
      )}>
        {/* Illustration */}
        <div className="flex-1 flex justify-center">
          <Illustration isVisible={isVisible} />
        </div>

        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Step number badge */}
          <div 
            className={cn(
              'inline-flex items-center gap-2 mb-4',
              'transition-all duration-500',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: `${index * 200 + 100}ms` }}
          >
            <span className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              {step.number}
            </span>
            <span className="text-sm font-medium text-primary-700 uppercase tracking-wider">
              {step.subtitle}
            </span>
          </div>

          {/* Title */}
          <h3 
            className={cn(
              'text-2xl md:text-3xl font-bold text-text-primary mb-4',
              'transition-all duration-500',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: `${index * 200 + 200}ms` }}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p 
            className={cn(
              'text-body-lg text-text-secondary mb-6 max-w-md mx-auto lg:mx-0',
              'transition-all duration-500',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: `${index * 200 + 300}ms` }}
          >
            {step.description}
          </p>

          {/* Feature tags */}
          <div 
            className={cn(
              'flex flex-wrap gap-2 justify-center lg:justify-start',
              'transition-all duration-500',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: `${index * 200 + 400}ms` }}
          >
            {step.features.map((feature) => (
              <span 
                key={feature}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-secondary rounded-full text-sm text-text-secondary"
              >
                <svg className="w-4 h-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Connection arrow (between steps) */}
      {!isLast && (
        <div 
          className={cn(
            'flex justify-center my-12 lg:my-16',
            'transition-all duration-500',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          )}
          style={{ transitionDelay: `${index * 200 + 500}ms` }}
          aria-hidden="true"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-primary/20 to-transparent flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-primary animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export function HowItWorks() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref: headerRef, animationClass: headerAnim } = useScrollAnimation({ 
    variant: 'fadeUp' 
  });
  const { refs: stepRefs, visibilityStates } = useStaggerAnimation<HTMLLIElement>(steps.length, {
    staggerDelay: 200,
    threshold: 0.1
  });
  const { ref: ctaRef, animationClass: ctaAnim } = useScrollAnimation({ 
    variant: 'fadeUp', 
    delay: 500 
  });

  return (
    <section
      id="how-it-works"
      className="section-alt scroll-mt-header overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-wide">
        {/* Section Header */}
        <header 
          ref={headerRef}
          className={cn(
            'text-center mb-16 lg:mb-20',
            reducedMotion ? '' : headerAnim
          )}
        >
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How It Works
          </span>
          <h2
            id="how-it-works-heading"
            className="text-display-sm md:text-display font-bold text-text-primary mb-4"
          >
            Three simple steps
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            From audio to organized notes in seconds. Here&apos;s how VoiceScribe transforms your workflow.
          </p>
        </header>

        {/* Steps */}
        <ol className="space-y-8" aria-label="Steps to use VoiceScribe">
          {steps.map((step, index) => (
            <li key={step.id} ref={stepRefs[index]}>
              <Step 
                step={step} 
                index={index} 
                isVisible={reducedMotion ? true : visibilityStates[index]}
                isLast={index === steps.length - 1}
              />
            </li>
          ))}
        </ol>

        {/* Bottom CTA */}
        <div 
          ref={ctaRef}
          className={cn(
            'text-center mt-16 pt-12 border-t border-separator',
            reducedMotion ? '' : ctaAnim
          )}
        >
          <p className="text-text-secondary mb-6">
            Ready to streamline your audio workflow?
          </p>
          <a 
            href="#pricing"
            className="btn-primary inline-flex items-center gap-2"
            aria-label="Get Started Free - view pricing plans"
          >
            Get Started Free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
