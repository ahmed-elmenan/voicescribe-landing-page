/**
 * Performance budget configuration
 * Enforces Core Web Vitals targets and bundle size limits
 */

export interface PerformanceBudget {
  // Core Web Vitals (in milliseconds, CLS is unitless)
  webVitals: {
    LCP: number;  // Largest Contentful Paint
    CLS: number;  // Cumulative Layout Shift
    INP: number;  // Interaction to Next Paint
    FCP: number;  // First Contentful Paint
    TTFB: number; // Time to First Byte
  };
  
  // Bundle size limits (in KB, gzipped)
  bundles: {
    totalJS: number;       // Total initial JS
    animationJS: number;   // Animation-specific JS
    mainBundle: number;    // Main page bundle
    vendorBundle: number;  // Third-party libraries
  };
  
  // Resource limits
  resources: {
    maxRequests: number;       // Max HTTP requests on initial load
    maxFonts: number;          // Max font files
    maxImages: number;         // Max images above fold
    maxThirdParty: number;     // Max third-party scripts
  };
  
  // Image optimization
  images: {
    maxSizeKB: number;         // Max size per image
    formats: string[];         // Required formats
    lazyLoadBelowFold: boolean;
  };
}

/**
 * VoiceScribe landing page performance budget
 * Target: Lighthouse Performance ≥ 90, SEO ≥ 95
 */
export const performanceBudget: PerformanceBudget = {
  webVitals: {
    LCP: 1800,   // < 1.8s target
    CLS: 0.1,    // < 0.1 target
    INP: 200,    // < 200ms target
    FCP: 1800,   // < 1.8s target
    TTFB: 800,   // < 800ms target
  },
  
  bundles: {
    totalJS: 200,      // ≤ 200KB gz initial JS
    animationJS: 40,   // Animation JS ≤ 40KB gz
    mainBundle: 100,   // Main bundle
    vendorBundle: 100, // Vendor bundle
  },
  
  resources: {
    maxRequests: 25,      // Max initial requests
    maxFonts: 4,          // Max font files (2 weights × 2 families)
    maxImages: 3,         // Max above-fold images
    maxThirdParty: 2,     // Max third-party scripts
  },
  
  images: {
    maxSizeKB: 100,                    // Max 100KB per image
    formats: ['avif', 'webp', 'png'],  // Modern formats first
    lazyLoadBelowFold: true,
  },
};

/**
 * Check if a metric is within budget
 */
export function isWithinBudget(
  metric: keyof PerformanceBudget['webVitals'],
  value: number
): boolean {
  return value <= performanceBudget.webVitals[metric];
}

/**
 * Get budget status for all metrics
 */
export function getBudgetStatus(metrics: Partial<Record<keyof PerformanceBudget['webVitals'], number>>) {
  const results: Record<string, { value: number; budget: number; status: 'pass' | 'fail' }> = {};
  
  for (const [key, value] of Object.entries(metrics)) {
    const budget = performanceBudget.webVitals[key as keyof PerformanceBudget['webVitals']];
    if (budget !== undefined && value !== undefined) {
      results[key] = {
        value,
        budget,
        status: value <= budget ? 'pass' : 'fail',
      };
    }
  }
  
  return results;
}

export default performanceBudget;
