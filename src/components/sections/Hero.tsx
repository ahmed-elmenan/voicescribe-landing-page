'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/seo';
import { trackEvent, prefersReducedMotion } from '@/lib/utils';
import { AppStoreCTAStacked } from '@/components/common/AppStoreCTA';
import { imageBlurPlaceholders } from '@/lib/image-placeholders';

// ============================================================================
// TYPES
// ============================================================================
interface WaveformBar {
  x: number;
  targetHeight: number;
  currentHeight: number;
  baseHeight: number;
  speed: number;
  phase: number;
}

// ============================================================================
// WAVEFORM ANIMATION COMPONENT (Canvas-based)
// ============================================================================
function WaveformCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const barsRef = useRef<WaveformBar[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Initialize bars
  const initBars = useCallback((width: number, height: number) => {
    const barCount = Math.floor(width / 8); // Bar every 8px
    const bars: WaveformBar[] = [];

    for (let i = 0; i < barCount; i++) {
      bars.push({
        x: i * 8 + 4,
        targetHeight: 0.3 + Math.random() * 0.4,
        currentHeight: 0.3 + Math.random() * 0.4,
        baseHeight: 0.2 + Math.random() * 0.3,
        speed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    barsRef.current = bars;
  }, []);

  // Animation loop
  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);

      const bars = barsRef.current;
      const centerY = height * 0.5;
      const maxBarHeight = height * 0.35;

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(0, 122, 255, 0.6)');
      gradient.addColorStop(0.5, 'rgba(88, 86, 214, 0.6)');
      gradient.addColorStop(1, 'rgba(0, 122, 255, 0.6)');

      bars.forEach((bar, index) => {
        // Calculate wave effect
        const waveOffset = Math.sin(time * 0.001 + bar.phase + index * 0.1) * 0.3;
        const pulseOffset = Math.sin(time * 0.0005 + index * 0.05) * 0.2;

        // Mouse interaction (parallax effect)
        const mouseDistance = Math.abs(bar.x - mouseRef.current.x);
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 150) * 0.3;

        // Update target height
        bar.targetHeight = bar.baseHeight + waveOffset + pulseOffset + mouseInfluence;

        // Smooth interpolation
        bar.currentHeight += (bar.targetHeight - bar.currentHeight) * 0.1;

        const barHeight = bar.currentHeight * maxBarHeight;

        // Draw bar with rounded caps
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(bar.x - 2, centerY - barHeight, 4, barHeight * 2, 2);
        ctx.fill();
      });

      // Draw center line
      ctx.strokeStyle = 'rgba(0, 122, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
    },
    []
  );

  useEffect(() => {
    // Check reduced motion preference
    const reducedMotion = prefersReducedMotion();
    setIsReducedMotion(reducedMotion);

    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initBars(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let lastTime = 0;
    const loop = (time: number) => {
      if (time - lastTime > 16) {
        // Cap at ~60fps
        const rect = canvas.getBoundingClientRect();
        animate(ctx, rect.width, rect.height, time);
        lastTime = time;
      }
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initBars]);

  // Static waveform for reduced motion
  if (isReducedMotion) {
    return (
      <div className={className} aria-hidden="true">
        <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="staticWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 122, 255, 0.4)" />
              <stop offset="50%" stopColor="rgba(88, 86, 214, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 122, 255, 0.4)" />
            </linearGradient>
          </defs>
          {Array.from({ length: 50 }).map((_, i) => {
            const height = 20 + Math.sin(i * 0.3) * 15 + Math.random() * 10;
            return (
              <rect
                key={i}
                x={i * 8 + 2}
                y={50 - height / 2}
                width={4}
                height={height}
                rx={2}
                fill="url(#staticWaveGradient)"
              />
            );
          })}
        </svg>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// ============================================================================
// PARALLAX BACKGROUND COMPONENT
// ============================================================================
function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(prefersReducedMotion());

    if (prefersReducedMotion()) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = isReducedMotion ? 0 : scrollY * 0.3;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Gradient Orbs with Parallax */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]"
        style={{
          transform: `translateY(${parallaxOffset * 0.5}px)`,
          transition: isReducedMotion ? 'none' : 'transform 0.1s ease-out',
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[80px]"
        style={{
          transform: `translateY(${parallaxOffset * 0.3}px)`,
          transition: isReducedMotion ? 'none' : 'transform 0.1s ease-out',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-accent-blue/6 rounded-full blur-[60px]"
        style={{
          transform: `translateY(${-parallaxOffset * 0.2}px)`,
          transition: isReducedMotion ? 'none' : 'transform 0.1s ease-out',
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 122, 255, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 255, 1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translateY(${parallaxOffset * 0.1}px)`,
        }}
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-surface-primary/50" />
    </div>
  );
}

// ============================================================================
// DEVICE MOCKUP COMPONENT
// ============================================================================
function DeviceMockup() {
  return (
    <div className="relative">
      {/* Phone Mockup Image */}
      <div className="relative w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]">
        <picture>
          <source srcSet="/images/mockup_1.webp" type="image/webp" />
          <Image
            src="/images/mockup_1.png"
            alt="VoiceScribe app showing recording interface with multi-speaker detection, audio file upload, and YouTube transcription features"
            width={800}
            height={1640}
            className="w-full h-auto drop-shadow-2xl"
            priority
            placeholder="blur"
            blurDataURL={imageBlurPlaceholders.mockup_1}
          />
        </picture>
      </div>

      {/* Floating Notification Cards */}
      <div className="absolute -right-16 sm:-right-20 md:-right-8 lg:-right-12 top-[15%] sm:top-1/4 animate-float z-10">
        <div className="bg-white rounded-2xl shadow-card-hover p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-border/50">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-accent-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-text-primary">Transcribed!</p>
            <p className="text-[10px] sm:text-xs text-text-secondary">Just now</p>
          </div>
        </div>
      </div>

      <div className="absolute -left-16 sm:-left-20 md:-left-8 lg:-left-12 bottom-[40%] sm:bottom-1/3 animate-float animation-delay-700 z-10">
        <div className="bg-white rounded-2xl shadow-card-hover p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-border/50">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-text-primary">Synced</p>
            <p className="text-[10px] sm:text-xs text-text-secondary">Cloud backup</p>
          </div>
        </div>
      </div>

      {/* Glow Effect Behind Phone */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 122, 255, 0.4) 0%, rgba(88, 86, 214, 0.2) 50%, transparent 70%)',
        }}
      />
    </div>
  );
}

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================
export function Hero() {
  const handleSecondaryCtaClick = useCallback(() => {
    trackEvent('hero_secondary_cta_click', { location: 'hero', button: 'learn_more' });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-surface-secondary via-surface-primary to-surface-primary"
      aria-labelledby="hero-heading"
    >
      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Waveform Animation Layer */}
      <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 opacity-40 pointer-events-none">
        <WaveformCanvas className="w-full h-full" />
      </div>

      {/* Main Content */}
      <div className="container-wide relative z-10 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
              </span>
              AI-Powered Transcription
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="text-display-lg md:text-display-xl lg:text-display-2xl font-extrabold text-text-primary mb-6 animate-fade-in-up tracking-tight"
            >
              Record.{' '}
              <span className="text-gradient bg-gradient-primary">Transcribe.</span>{' '}
              <br className="hidden sm:block" />
              Organize.
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg md:text-body-xl text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-100 text-balance">
              Turn audio and YouTube links into clean, searchable notes — fast.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-200">
              {/* Primary CTA - App Store Badge */}
              <AppStoreCTAStacked 
                variant="black" 
                location="hero" 
              />

              {/* Secondary CTA */}
              <Link
                href="#features"
                onClick={handleSecondaryCtaClick}
                className="btn-outline text-lg px-8 py-4"
                aria-label="Learn more about VoiceScribe features"
              >
                Learn More
                <svg
                  className="w-5 h-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex" role="img" aria-label="4.8 out of 5 stars rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4 ? 'text-brand-favorite' : 'text-brand-favorite/50'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-text-primary font-semibold">4.8</span>
                <span className="text-text-tertiary text-sm">(1,200+ reviews)</span>
              </div>

              {/* Divider */}
              <div
                className="hidden sm:block w-px h-6 bg-separator"
                role="separator"
                aria-orientation="vertical"
              />

              {/* Users */}
              <div className="flex items-center gap-2 text-text-secondary">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary ring-2 ring-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="font-medium ml-1">50K+ users</span>
              </div>
            </div>
          </div>

          {/* Right Column - Device Mockup */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in-up animation-delay-200">
            <DeviceMockup />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft hidden md:block">
        <Link
          href="#features"
          className="flex flex-col items-center gap-2 text-text-tertiary hover:text-primary transition-colors"
          aria-label="Scroll to features section"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
