'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ============================================================================
// MULTI-SPEAKER SECTION
// ============================================================================
export function MultiSpeakerSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Auto Speaker Detection',
      description: 'AI automatically identifies and labels different speakers in your recordings',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Color-Coded Speakers',
      description: 'Each speaker gets a unique color for easy visual distinction',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Conversation View',
      description: 'See transcriptions as natural chat bubbles between speakers',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Timestamped Segments',
      description: 'Jump to any moment in your recording with precise timestamps',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="multi-speaker"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-surface-primary via-surface-secondary to-surface-primary"
      aria-labelledby="multi-speaker-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div
            className={cn(
              'order-2 lg:order-1 transition-all duration-700',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-green/10 text-accent-green px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
              </span>
              Multi-Speaker Detection
            </div>

            {/* Heading */}
            <h2
              id="multi-speaker-heading"
              className="text-display-md md:text-display-lg font-bold text-text-primary mb-6"
            >
              Perfect for{' '}
              <span className="text-gradient bg-gradient-to-r from-accent-green to-primary">
                Meetings & Interviews
              </span>
            </h2>

            {/* Description */}
            <p className="text-body-lg text-text-secondary mb-8 max-w-lg">
              Enable multi-speaker mode and let AI automatically identify who&apos;s talking. 
              Perfect for meetings, interviews, podcasts, and group discussions.
            </p>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={cn(
                    'flex items-start gap-3 p-4 rounded-xl bg-surface-secondary/50 border border-border/50 hover:border-accent-green/30 transition-all duration-300',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center text-accent-green flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">{feature.title}</h3>
                    <p className="text-sm text-text-tertiary">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Speaker Preview */}
            <div className="mt-8 p-4 rounded-xl bg-surface-dark-secondary/80 border border-border/30">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-text-dark-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium text-text-dark-primary">3 Speakers Detected</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#6366F1]" />
                  <span className="text-xs text-[#6366F1] font-medium">Speaker 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="text-xs text-[#10B981] font-medium">Speaker 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="text-xs text-[#F59E0B] font-medium">Speaker 3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div
            className={cn(
              'order-1 lg:order-2 flex justify-center transition-all duration-700',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            <div className="relative">
              {/* Phone Image */}
              <div className="relative w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px]">
                <Image
                  src="/images/multi_speakers.png"
                  alt="VoiceScribe multi-speaker detection showing color-coded conversation between multiple speakers"
                  width={380}
                  height={780}
                  className="w-full h-auto drop-shadow-2xl"
                  quality={90}
                />
              </div>

              {/* Floating Badge - Speaker Detected */}
              <div className="absolute -left-4 sm:-left-8 md:-left-12 top-1/3 animate-float">
                <div className="bg-white rounded-2xl shadow-card-hover p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-border/50">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6366F1]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-text-primary">Speaker 1</p>
                    <p className="text-[10px] sm:text-xs text-text-secondary">Detected</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge - AI Processing */}
              <div className="absolute -right-4 sm:-right-8 md:-right-12 bottom-1/3 animate-float animation-delay-500">
                <div className="bg-white rounded-2xl shadow-card-hover p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-border/50">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-text-primary">AI Diarization</p>
                    <p className="text-[10px] sm:text-xs text-text-secondary">Active</p>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.4) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// YOUTUBE TRANSCRIPTION SECTION
// ============================================================================
export function YouTubeSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Paste YouTube URL',
      description: 'Copy any YouTube video link and paste it into VoiceScribe',
    },
    {
      number: '2',
      title: 'Tap Transcribe',
      description: 'Hit the transcribe button and let AI do the work',
    },
    {
      number: '3',
      title: 'Get Full Transcript',
      description: 'Receive accurate transcription with summary and key insights',
    },
  ];

  const supportedFormats = [
    'youtube.com/watch?v=...',
    'youtu.be/...',
    'youtube.com/shorts/...',
  ];

  return (
    <section
      ref={sectionRef}
      id="youtube-transcription"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-surface-primary to-surface-secondary"
      aria-labelledby="youtube-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-brand-recording/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Phone Mockup (shows on mobile too) */}
          <div
            className={cn(
              'flex justify-center order-1 lg:order-1 transition-all duration-700',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <div className="relative">
              {/* Phone Image */}
              <div className="relative w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]">
                <Image
                  src="/images/youtube_transcription.png"
                  alt="VoiceScribe YouTube transcription feature showing URL input and transcribe button"
                  width={380}
                  height={780}
                  className="w-full h-auto drop-shadow-2xl"
                  quality={90}
                />
              </div>

              {/* Floating Badge - YouTube */}
              <div className="absolute -right-2 sm:-right-6 md:-right-10 lg:-right-12 top-1/4 animate-float z-10">
                <div className="bg-white rounded-2xl shadow-card-hover p-2.5 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3 border border-border/50">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-brand-recording/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand-recording" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-text-primary">YouTube</p>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-text-secondary">Connected</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Transcription Complete */}
              <div className="absolute -left-2 sm:-left-6 md:-left-10 lg:-left-12 bottom-1/3 animate-float animation-delay-700 z-10">
                <div className="bg-white rounded-2xl shadow-card-hover p-2.5 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3 border border-border/50">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-accent-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-text-primary">Complete!</p>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-text-secondary">2 min video</p>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.3) 0%, rgba(88, 86, 214, 0.2) 50%, transparent 70%)',
                }}
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div
            className={cn(
              'order-2 lg:order-2 text-center lg:text-left transition-all duration-700',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-recording/10 text-brand-recording px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube Transcription
            </div>

            {/* Heading */}
            <h2
              id="youtube-heading"
              className="text-display-md md:text-display-lg font-bold text-text-primary mb-6"
            >
              Transcribe{' '}
              <span className="text-gradient bg-gradient-to-r from-brand-recording to-secondary">
                YouTube Videos
              </span>{' '}
              Instantly
            </h2>

            {/* Description */}
            <p className="text-body-lg text-text-secondary mb-8 max-w-lg">
              Turn any YouTube video into searchable text. Just paste the link and get a full 
              transcription with AI-generated summary and key insights.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-xl bg-surface-secondary/50 border border-border/50 hover:border-brand-recording/30 transition-all duration-300',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-brand-recording/10 flex items-center justify-center text-brand-recording font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">{step.title}</h3>
                    <p className="text-sm text-text-tertiary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Supported Formats */}
            <div className="p-4 rounded-xl bg-surface-dark-secondary/80 border border-border/30">
              <h4 className="text-sm font-semibold text-text-dark-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-recording" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Supported URL formats:
              </h4>
              <div className="flex flex-wrap gap-2">
                {supportedFormats.map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1.5 bg-surface-dark-tertiary/50 rounded-lg text-xs text-text-dark-secondary font-mono"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature highlights */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-5 h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Auto-generated summary
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-5 h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Key insights extraction
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-5 h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Works with Shorts
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default { MultiSpeakerSection, YouTubeSection };
