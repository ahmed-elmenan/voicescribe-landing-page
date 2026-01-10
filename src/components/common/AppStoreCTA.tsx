'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/utils';
import { siteConfig } from '@/lib/seo';

/**
 * App Store CTA Badge Component
 * 
 * Follows Apple's App Store Marketing Guidelines:
 * - Uses official "Download on the App Store" badge artwork
 * - Maintains required minimum size and proportions
 * - Includes proper alt text for accessibility
 * - Tracks click events for analytics
 * 
 * @see https://developer.apple.com/app-store/marketing/guidelines/
 */

export interface AppStoreCTAProps {
  /** Visual variant of the badge */
  variant?: 'black' | 'white';
  /** Size variant - affects badge dimensions */
  size?: 'sm' | 'md' | 'lg';
  /** Location identifier for analytics tracking */
  location?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom click handler (analytics tracked automatically) */
  onClick?: () => void;
}

// Badge dimensions per Apple guidelines (minimum 10mm/40px height)
const sizes = {
  sm: { width: 120, height: 40 },  // Minimum allowed size
  md: { width: 150, height: 50 },  // Standard size
  lg: { width: 180, height: 60 },  // Large size for hero sections
};

/**
 * AppStoreCTA - Official Apple App Store download badge
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <AppStoreCTA location="hero" />
 * 
 * // White badge on dark background
 * <AppStoreCTA variant="white" location="footer" />
 * 
 * // Large badge for hero section
 * <AppStoreCTA size="lg" location="hero" />
 * ```
 */
export function AppStoreCTA({
  variant = 'black',
  size = 'md',
  location = 'unknown',
  className,
  onClick,
}: AppStoreCTAProps) {
  const { width, height } = sizes[size];
  
  const handleClick = () => {
    // Track analytics event
    trackEvent('appstore_click', {
      platform: 'ios',
      location,
      badge_variant: variant,
      badge_size: size,
    });
    
    // Call custom click handler if provided
    onClick?.();
  };

  // Badge image source - using SVG for crisp rendering at all sizes
  // Apple provides official badge artwork that should be downloaded from:
  // https://developer.apple.com/app-store/marketing/guidelines/#downloadBadges
  const badgeSrc = variant === 'black' 
    ? '/badges/app-store-black.svg'
    : '/badges/app-store-white.svg';

  return (
    <Link
      href={siteConfig.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-block transition-all duration-200',
        'hover:scale-105 hover:opacity-90',
        'active:scale-100',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:rounded-lg',
        className
      )}
      aria-label="Download VoiceScribe on the App Store (opens in new tab)"
    >
      <Image
        src={badgeSrc}
        alt="Download on the App Store"
        width={width}
        height={height}
        priority={location === 'hero'} // Prioritize loading for hero badge
        className="h-auto"
        // Prevent layout shift
        style={{ aspectRatio: `${width}/${height}` }}
      />
    </Link>
  );
}

/**
 * AppStoreCTAInline - Text-based App Store button (fallback/alternative)
 * 
 * Use when the official badge doesn't fit the design or as a secondary CTA.
 * Still follows accessibility guidelines with proper ARIA labels.
 */
export interface AppStoreCTAInlineProps {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Location identifier for analytics */
  location?: string;
  /** Show Apple logo icon */
  showIcon?: boolean;
  /** Button text */
  text?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom click handler */
  onClick?: () => void;
}

const variantStyles = {
  primary: 'bg-black text-white hover:bg-gray-800',
  secondary: 'bg-primary text-white hover:bg-primary-dark',
  ghost: 'bg-transparent text-text-primary border-2 border-current hover:bg-surface-secondary',
  white: 'bg-white text-primary hover:bg-gray-100',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-2.5',
  lg: 'px-8 py-4 text-lg gap-3',
};

const iconSizes = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
};

export function AppStoreCTAInline({
  variant = 'primary',
  size = 'md',
  location = 'unknown',
  showIcon = true,
  text = 'Download on the App Store',
  className,
  onClick,
}: AppStoreCTAInlineProps) {
  const handleClick = () => {
    trackEvent('appstore_click', {
      platform: 'ios',
      location,
      button_variant: variant,
      button_size: size,
    });
    
    onClick?.();
  };

  return (
    <Link
      href={siteConfig.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl',
        'transition-all duration-200',
        'hover:scale-[1.02] active:scale-[0.98]',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50',
        'shadow-md hover:shadow-lg',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      aria-label="Download VoiceScribe on the App Store (opens in new tab)"
    >
      {showIcon && (
        <svg
          className={cn(iconSizes[size], 'flex-shrink-0')}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      )}
      <span>{text}</span>
    </Link>
  );
}

/**
 * AppStoreCTAStacked - Stacked layout App Store button
 * 
 * Shows "Download on the" above "App Store" text with Apple logo.
 * Best for hero sections where you want maximum visual impact.
 */
export interface AppStoreCTAStackedProps {
  /** Visual variant */
  variant?: 'black' | 'white' | 'gradient';
  /** Location identifier for analytics */
  location?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom click handler */
  onClick?: () => void;
}

const stackedVariantStyles = {
  black: 'bg-black text-white hover:bg-gray-800',
  white: 'bg-white text-black hover:bg-gray-100 border border-gray-200',
  gradient: 'bg-gradient-primary text-white hover:shadow-glow',
};

export function AppStoreCTAStacked({
  variant = 'black',
  location = 'unknown',
  className,
  onClick,
}: AppStoreCTAStackedProps) {
  const handleClick = () => {
    trackEvent('appstore_click', {
      platform: 'ios',
      location,
      button_type: 'stacked',
      button_variant: variant,
    });
    
    onClick?.();
  };

  return (
    <Link
      href={siteConfig.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'group inline-flex items-center gap-3 px-6 py-4 rounded-xl font-semibold',
        'transition-all duration-200',
        'hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50',
        'shadow-strong',
        stackedVariantStyles[variant],
        className
      )}
      aria-label="Download on the App Store - opens in new tab"
    >
      {/* Apple Logo */}
      <svg
        className="w-8 h-8 transition-transform group-hover:scale-110 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      
      {/* Stacked Text */}
      <div className="text-left">
        <div className={cn(
          'text-xs font-normal',
          variant === 'white' ? 'text-gray-500' : 'opacity-80'
        )}>
          Download on the
        </div>
        <div className="text-lg font-semibold -mt-0.5">App Store</div>
      </div>
    </Link>
  );
}

export default AppStoreCTA;
