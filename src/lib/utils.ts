import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.matchMedia) return false;
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery?.matches ?? false;
}

// Format duration for display
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Smooth scroll to element
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

// Track analytics event (placeholder)
export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: Function }).gtag('event', eventName, properties);
  }
  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Track Event:', eventName, properties);
  }
}
