'use client';

import { useEffect, useCallback } from 'react';

/**
 * Core Web Vitals types
 */
export interface WebVitalsMetric {
  name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'prerender';
}

/**
 * Performance budget thresholds (in ms or unitless for CLS)
 */
export const PERFORMANCE_BUDGET = {
  LCP: 1800, // < 1.8s (good)
  FID: 100,  // < 100ms (good)
  INP: 200,  // < 200ms (good)
  CLS: 0.1,  // < 0.1 (good)
  FCP: 1800, // < 1.8s (good)
  TTFB: 800, // < 800ms (good)
} as const;

/**
 * Get rating for a metric value
 */
function getRating(name: WebVitalsMetric['name'], value: number): WebVitalsMetric['rating'] {
  const thresholds: Record<string, [number, number]> = {
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    FID: [100, 300],
    INP: [200, 500],
    LCP: [2500, 4000],
    TTFB: [800, 1800],
  };

  const [good, poor] = thresholds[name] || [0, 0];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report web vitals to analytics or console
 */
export function reportWebVitals(metric: WebVitalsMetric): void {
  // Check against performance budget
  const budget = PERFORMANCE_BUDGET[metric.name as keyof typeof PERFORMANCE_BUDGET];
  const withinBudget = budget ? metric.value <= budget : true;
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    const emoji = withinBudget ? '✅' : '⚠️';
    console.log(
      `${emoji} ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
      budget ? `Budget: ${budget}` : ''
    );
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Google Analytics 4
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
      });
    }

    // Custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      navigator.sendBeacon?.(
        process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
        JSON.stringify({
          ...metric,
          url: window.location.href,
          timestamp: Date.now(),
        })
      );
    }
  }
}

/**
 * Initialize web vitals tracking using native Performance APIs
 * Lightweight alternative to web-vitals library (~0KB vs ~2KB)
 */
export function initWebVitals(onReport: (metric: WebVitalsMetric) => void): void {
  if (typeof window === 'undefined') return;

  // Track LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
    if (lastEntry) {
      const value = lastEntry.startTime;
      onReport({
        name: 'LCP',
        value,
        rating: getRating('LCP', value),
        delta: value,
        id: `lcp-${Date.now()}`,
        navigationType: getNavigationType(),
      });
    }
  });

  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Browser doesn't support LCP
  }

  // Track FID (First Input Delay) - deprecated but still useful
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const firstEntry = entries[0] as PerformanceEventTiming;
    if (firstEntry) {
      const value = firstEntry.processingStart - firstEntry.startTime;
      onReport({
        name: 'FID',
        value,
        rating: getRating('FID', value),
        delta: value,
        id: `fid-${Date.now()}`,
        navigationType: getNavigationType(),
      });
    }
  });

  try {
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // Browser doesn't support FID
  }

  // Track CLS (Cumulative Layout Shift)
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];
  
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }
  });

  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // Browser doesn't support CLS
  }

  // Report CLS on page hide
  const reportCLS = () => {
    if (clsEntries.length > 0) {
      onReport({
        name: 'CLS',
        value: clsValue,
        rating: getRating('CLS', clsValue),
        delta: clsValue,
        id: `cls-${Date.now()}`,
        navigationType: getNavigationType(),
      });
    }
  };

  // Track INP (Interaction to Next Paint) - replaces FID
  let inpValue = 0;
  const inpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as PerformanceEventTiming[]) {
      const duration = entry.duration;
      if (duration > inpValue) {
        inpValue = duration;
      }
    }
  });

  try {
    inpObserver.observe({ type: 'event', buffered: true });
  } catch (e) {
    // Browser doesn't support INP
  }

  // Report INP on page hide
  const reportINP = () => {
    if (inpValue > 0) {
      onReport({
        name: 'INP',
        value: inpValue,
        rating: getRating('INP', inpValue),
        delta: inpValue,
        id: `inp-${Date.now()}`,
        navigationType: getNavigationType(),
      });
    }
  };

  // Track FCP (First Contentful Paint)
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const fcpEntry = entries.find((e) => e.name === 'first-contentful-paint');
    if (fcpEntry) {
      const value = fcpEntry.startTime;
      onReport({
        name: 'FCP',
        value,
        rating: getRating('FCP', value),
        delta: value,
        id: `fcp-${Date.now()}`,
        navigationType: getNavigationType(),
      });
    }
  });

  try {
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // Browser doesn't support FCP
  }

  // Track TTFB (Time to First Byte)
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navEntry) {
    const value = navEntry.responseStart - navEntry.requestStart;
    onReport({
      name: 'TTFB',
      value,
      rating: getRating('TTFB', value),
      delta: value,
      id: `ttfb-${Date.now()}`,
      navigationType: getNavigationType(),
    });
  }

  // Report final metrics on page unload
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      reportCLS();
      reportINP();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', () => {
    reportCLS();
    reportINP();
  });
}

/**
 * Get navigation type
 */
function getNavigationType(): WebVitalsMetric['navigationType'] {
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navEntry) {
    return navEntry.type as WebVitalsMetric['navigationType'];
  }
  return 'navigate';
}

/**
 * React hook to track web vitals
 */
export function useWebVitals(onReport?: (metric: WebVitalsMetric) => void): void {
  const handleReport = useCallback((metric: WebVitalsMetric) => {
    reportWebVitals(metric);
    onReport?.(metric);
  }, [onReport]);

  useEffect(() => {
    initWebVitals(handleReport);
  }, [handleReport]);
}
