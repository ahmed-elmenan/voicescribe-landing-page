'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

/**
 * Animation variants for scroll-triggered animations
 */
export type AnimationVariant = 
  | 'fadeUp' 
  | 'fadeDown' 
  | 'fadeLeft' 
  | 'fadeRight' 
  | 'scaleUp' 
  | 'scaleDown';

/**
 * Options for scroll animation hook
 */
export interface ScrollAnimationOptions {
  /** Animation variant to use (default: 'fadeUp') */
  variant?: AnimationVariant;
  /** Intersection threshold 0-1 (default: 0.15 = 15%) */
  threshold?: number;
  /** Delay before animation starts in ms (default: 0) */
  delay?: number;
  /** Animation duration in ms (default: 700) */
  duration?: number;
  /** Whether animation should trigger only once (default: true) */
  once?: boolean;
  /** Root margin for intersection observer */
  rootMargin?: string;
}

/**
 * Options for stagger animation hook
 */
export interface StaggerAnimationOptions extends ScrollAnimationOptions {
  /** Delay between each item in ms (default: 50) */
  staggerDelay?: number;
}

/**
 * Options for parallax hook
 */
export interface ParallaxOptions {
  /** Speed multiplier for parallax effect (default: 0.8) */
  speed?: number;
  /** Whether to disable on mobile for performance */
  disableOnMobile?: boolean;
}

/**
 * CSS classes for each animation variant
 */
const ANIMATION_CLASSES: Record<AnimationVariant, { initial: string; animate: string }> = {
  fadeUp: {
    initial: 'opacity-0 translate-y-6',
    animate: 'opacity-100 translate-y-0',
  },
  fadeDown: {
    initial: 'opacity-0 -translate-y-6',
    animate: 'opacity-100 translate-y-0',
  },
  fadeLeft: {
    initial: 'opacity-0 translate-x-6',
    animate: 'opacity-100 translate-x-0',
  },
  fadeRight: {
    initial: 'opacity-0 -translate-x-6',
    animate: 'opacity-100 translate-x-0',
  },
  scaleUp: {
    initial: 'opacity-0 scale-95',
    animate: 'opacity-100 scale-100',
  },
  scaleDown: {
    initial: 'opacity-0 scale-105',
    animate: 'opacity-100 scale-100',
  },
};

/**
 * Hook to detect user's prefers-reduced-motion preference
 * SSR-safe - defaults to true (reduced motion) on server
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Main scroll animation hook
 * Returns a ref to attach to the element and animation state
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isVisible, animationClass } = useScrollAnimation({ variant: 'fadeUp' });
 *   return <div ref={ref} className={animationClass}>Content</div>;
 * }
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const {
    variant = 'fadeUp',
    threshold = 0.15,
    delay = 0,
    duration = 700,
    once = true,
    rootMargin = '0px',
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If user prefers reduced motion, immediately show content
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay if specified
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          
          // Disconnect if animation should only run once
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, delay, once, rootMargin, prefersReducedMotion]);

  // Build animation class string
  const animationClass = useMemo(() => {
    if (prefersReducedMotion) {
      return ''; // No animation classes when reduced motion is preferred
    }

    const classes = ANIMATION_CLASSES[variant];
    const transitionClass = `transition-all duration-[${duration}ms] ease-out`;
    
    return `${transitionClass} ${isVisible ? classes.animate : classes.initial}`;
  }, [variant, duration, isVisible, prefersReducedMotion]);

  // Style object for custom delay/duration
  const animationStyle = useMemo(() => {
    if (prefersReducedMotion) return {};
    return {
      transitionDuration: `${duration}ms`,
      transitionDelay: delay > 0 ? `${delay}ms` : undefined,
    };
  }, [duration, delay, prefersReducedMotion]);

  return {
    ref,
    isVisible,
    animationClass,
    animationStyle,
  };
}

/**
 * Hook for staggered animations on multiple elements
 * Returns an array of refs and visibility states
 * 
 * @example
 * ```tsx
 * function FeatureList({ features }) {
 *   const { refs, visibilityStates, animationClasses } = useStaggerAnimation(features.length);
 *   return features.map((f, i) => (
 *     <div key={i} ref={refs[i]} className={animationClasses[i]}>{f.title}</div>
 *   ));
 * }
 * ```
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: StaggerAnimationOptions = {}
) {
  const {
    variant = 'fadeUp',
    threshold = 0.15,
    staggerDelay = 50,
    duration = 700,
    once = true,
    rootMargin = '50px',
  } = options;

  // Create refs array
  const refs = useMemo(
    () => Array.from({ length: itemCount }, () => ({ current: null as T | null })),
    [itemCount]
  );

  const [visibilityStates, setVisibilityStates] = useState<boolean[]>(
    () => Array(itemCount).fill(false)
  );
  
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, immediately show all content
    if (prefersReducedMotion) {
      setVisibilityStates(Array(itemCount).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.findIndex((ref) => ref.current === entry.target);
          if (index === -1) return;

          if (entry.isIntersecting) {
            // Apply staggered delay based on index
            setTimeout(() => {
              setVisibilityStates((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * staggerDelay);

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setVisibilityStates((prev) => {
              const next = [...prev];
              next[index] = false;
              return next;
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe all elements
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [itemCount, refs, threshold, staggerDelay, once, rootMargin, prefersReducedMotion]);

  // Build animation classes for each item
  const animationClasses = useMemo(() => {
    if (prefersReducedMotion) {
      return Array(itemCount).fill('');
    }

    const classes = ANIMATION_CLASSES[variant];
    return visibilityStates.map((isVisible) => {
      const transitionClass = `transition-all duration-[${duration}ms] ease-out`;
      return `${transitionClass} ${isVisible ? classes.animate : classes.initial}`;
    });
  }, [variant, duration, visibilityStates, itemCount, prefersReducedMotion]);

  return {
    refs,
    visibilityStates,
    animationClasses,
  };
}

/**
 * Hook for parallax scrolling effect on background elements
 * Uses transform-only animations for performance (GPU-accelerated)
 * 
 * @example
 * ```tsx
 * function ParallaxBg() {
 *   const { ref, offset, style } = useParallax({ speed: 0.8 });
 *   return <div ref={ref} style={style} className="absolute inset-0" />;
 * }
 * ```
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const { speed = 0.8, disableOnMobile = true } = options;

  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Disable parallax if reduced motion preferred or on mobile
    if (prefersReducedMotion || (disableOnMobile && isMobile)) {
      setOffset(0);
      return;
    }

    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Cancel previous frame to prevent stacking
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only calculate if element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const parallaxOffset = (scrollProgress - 0.5) * 100 * (1 - speed);
          setOffset(parallaxOffset);
        }
        
        lastScrollY = window.scrollY;
      });
    };

    // Initial calculation
    handleScroll();

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [speed, disableOnMobile, isMobile, prefersReducedMotion]);

  // Generate inline style for parallax transform
  const style = useMemo(() => {
    if (prefersReducedMotion || (disableOnMobile && isMobile)) {
      return {};
    }
    return {
      transform: `translateY(${offset}px)`,
      willChange: 'transform' as const,
    };
  }, [offset, prefersReducedMotion, disableOnMobile, isMobile]);

  return {
    ref,
    offset,
    style,
  };
}

/**
 * Hook for batch observing multiple elements with a shared IntersectionObserver
 * More performant than creating individual observers
 * 
 * @example
 * ```tsx
 * const { observe, isVisible } = useBatchScrollObserver();
 * 
 * // In render
 * <div ref={(el) => el && observe(el, 'hero')}>Hero</div>
 * <div className={isVisible('hero') ? 'visible' : 'hidden'}>...</div>
 * ```
 */
export function useBatchScrollObserver(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;
  
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>({});
  const elementMap = useRef<Map<string, Element>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Initialize observer
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show all elements immediately
      setVisibilityMap((prev) => {
        const next: Record<string, boolean> = {};
        elementMap.current.forEach((_, key) => {
          next[key] = true;
        });
        return next;
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Find the key for this element
          let foundKey: string | null = null;
          elementMap.current.forEach((el, key) => {
            if (el === entry.target) foundKey = key;
          });

          if (foundKey) {
            if (entry.isIntersecting) {
              setVisibilityMap((prev) => ({ ...prev, [foundKey!]: true }));
              if (once) {
                observerRef.current?.unobserve(entry.target);
              }
            } else if (!once) {
              setVisibilityMap((prev) => ({ ...prev, [foundKey!]: false }));
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe all registered elements
    elementMap.current.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, once, prefersReducedMotion]);

  // Function to register an element for observation
  const observe = useCallback((element: Element | null, key: string) => {
    if (!element) return;
    
    if (!elementMap.current.has(key)) {
      elementMap.current.set(key, element);
      observerRef.current?.observe(element);
    }
  }, []);

  // Function to check if an element is visible
  const isVisible = useCallback((key: string) => {
    return prefersReducedMotion ? true : (visibilityMap[key] ?? false);
  }, [visibilityMap, prefersReducedMotion]);

  return {
    observe,
    isVisible,
    visibilityMap,
  };
}
