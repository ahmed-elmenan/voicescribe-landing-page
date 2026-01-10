'use client';

import { useRef, useState, useEffect, ReactNode, memo, Suspense } from 'react';
import { cn } from '@/lib/utils';

interface LazyLoadProps {
  /** Content to lazy load */
  children: ReactNode;
  /** Placeholder while loading */
  placeholder?: ReactNode;
  /** Root margin for IntersectionObserver (e.g., '100px' to load 100px before visible) */
  rootMargin?: string;
  /** Threshold for visibility (0-1) */
  threshold?: number;
  /** CSS class for wrapper */
  className?: string;
  /** Minimum height to prevent CLS */
  minHeight?: string | number;
  /** Whether to keep content mounted after first load */
  keepMounted?: boolean;
  /** Callback when component becomes visible */
  onVisible?: () => void;
}

/**
 * Lazy load below-fold content using IntersectionObserver
 * Reduces initial JS execution and improves INP
 */
export const LazyLoad = memo(function LazyLoad({
  children,
  placeholder,
  rootMargin = '200px',
  threshold = 0,
  className,
  minHeight,
  keepMounted = true,
  onVisible,
}: LazyLoadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already been visible and keepMounted, skip observer
    if (hasBeenVisible && keepMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          onVisible?.();
          
          // Disconnect if we're keeping it mounted
          if (keepMounted) {
            observer.disconnect();
          }
        } else if (!keepMounted) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, keepMounted, hasBeenVisible, onVisible]);

  // Determine what to render
  const shouldRender = keepMounted ? hasBeenVisible : isVisible;

  return (
    <div
      ref={ref}
      className={cn('lazy-load-wrapper', className)}
      style={{ minHeight: minHeight ?? undefined }}
    >
      {shouldRender ? children : placeholder}
    </div>
  );
});

/**
 * Default placeholder with skeleton animation
 */
export function LazyLoadPlaceholder({
  className,
  height = '400px',
}: {
  className?: string;
  height?: string | number;
}) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-100 rounded-lg',
        className
      )}
      style={{ height }}
      aria-hidden="true"
    />
  );
}

/**
 * Lazy load a component with Suspense boundary
 */
export function LazyComponent<T extends object>({
  component: Component,
  props,
  fallback,
}: {
  component: React.ComponentType<T>;
  props: T;
  fallback?: ReactNode;
}) {
  return (
    <Suspense fallback={fallback ?? <LazyLoadPlaceholder />}>
      <Component {...props} />
    </Suspense>
  );
}

/**
 * Hook to detect if an element is visible
 */
export function useIsVisible(
  options: { rootMargin?: string; threshold?: number; once?: boolean } = {}
) {
  const { rootMargin = '0px', threshold = 0, once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, isVisible };
}

export default LazyLoad;
