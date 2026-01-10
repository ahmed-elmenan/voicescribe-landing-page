'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Responsive image breakpoints for srcset
 */
const IMAGE_SIZES = [320, 640, 768, 1024, 1280, 1536, 1920] as const;

/**
 * Image format preference order (modern first)
 */
const FORMAT_PRIORITY = ['avif', 'webp', 'png', 'jpg'] as const;

export interface OptimizedImageProps {
  /** Image source URL */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Loading strategy: eager for above-fold, lazy for below-fold */
  loading?: 'eager' | 'lazy';
  /** Priority loading (preload in head) */
  priority?: boolean;
  /** Fetch priority hint */
  fetchPriority?: 'high' | 'low' | 'auto';
  /** CSS class */
  className?: string;
  /** Object fit */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Object position */
  objectPosition?: string;
  /** Placeholder blur data URL */
  placeholder?: string;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback on error */
  onError?: () => void;
}

/**
 * Generate srcset for responsive images
 */
function generateSrcSet(src: string, sizes: readonly number[] = IMAGE_SIZES): string {
  // For SVGs, don't generate srcset
  if (src.endsWith('.svg')) {
    return '';
  }
  
  return sizes
    .map((size) => {
      // For external URLs, return original
      if (src.startsWith('http')) {
        return `${src} ${size}w`;
      }
      // For local images, assume they're already optimized
      return `${src} ${size}w`;
    })
    .join(', ');
}

/**
 * Generate picture sources for modern formats
 */
function generateSources(src: string): { type: string; srcSet: string }[] {
  // Skip for SVGs or data URLs
  if (src.endsWith('.svg') || src.startsWith('data:')) {
    return [];
  }

  const basePath = src.replace(/\.(png|jpg|jpeg|gif)$/i, '');
  const sources: { type: string; srcSet: string }[] = [];

  // Add AVIF source if available
  sources.push({
    type: 'image/avif',
    srcSet: `${basePath}.avif`,
  });

  // Add WebP source
  sources.push({
    type: 'image/webp',
    srcSet: `${basePath}.webp`,
  });

  return sources;
}

/**
 * Low-quality image placeholder (LQIP) blur
 */
const DEFAULT_BLUR_PLACEHOLDER = 
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';

/**
 * Optimized responsive image component
 * - Supports WebP/AVIF with fallback
 * - Lazy loading with native browser support
 * - Blur placeholder for LCP optimization
 * - Proper aspect ratio to prevent CLS
 */
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  loading = 'lazy',
  priority = false,
  fetchPriority = 'auto',
  className,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = DEFAULT_BLUR_PLACEHOLDER,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Calculate aspect ratio for CLS prevention
  const aspectRatio = width && height ? width / height : undefined;

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Check if image is already cached
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  // Generate sources for picture element
  const sources = generateSources(src);
  const srcSet = generateSrcSet(src);
  const isSvg = src.endsWith('.svg');

  // For priority images, set loading to eager
  const effectiveLoading = priority ? 'eager' : loading;
  const effectiveFetchPriority = priority ? 'high' : fetchPriority;

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        width: width ? `${width}px` : undefined,
        maxWidth: '100%',
      }}
    >
      {/* Blur placeholder - shown until image loads */}
      {placeholder && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image with picture element for format selection */}
      {isSvg ? (
        // SVGs don't need picture element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={effectiveLoading}
          // @ts-ignore - fetchpriority is a valid attribute
          fetchpriority={effectiveFetchPriority}
          decoding="async"
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            hasError && 'hidden'
          )}
          style={{
            objectFit,
            objectPosition,
            width: '100%',
            height: '100%',
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <picture>
          {/* Modern format sources */}
          {sources.map((source) => (
            <source
              key={source.type}
              type={source.type}
              srcSet={source.srcSet}
            />
          ))}
          
          {/* Fallback image */}
          <img
            ref={imgRef}
            src={src}
            srcSet={srcSet || undefined}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={effectiveLoading}
            // @ts-ignore - fetchpriority is a valid attribute
            fetchpriority={effectiveFetchPriority}
            decoding="async"
            className={cn(
              'transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
              hasError && 'hidden'
            )}
            style={{
              objectFit,
              objectPosition,
              width: '100%',
              height: '100%',
            }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
          role="img"
          aria-label={alt}
        >
          <svg
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
});

/**
 * Preload critical images in document head
 */
export function preloadImage(src: string, as: 'image' = 'image'): void {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  
  // Add modern format hints
  if (!src.endsWith('.svg')) {
    link.setAttribute('imagesrcset', generateSrcSet(src));
    link.setAttribute('imagesizes', '100vw');
  }
  
  document.head.appendChild(link);
}

export default OptimizedImage;
