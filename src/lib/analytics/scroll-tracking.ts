/**
 * Scroll Depth Tracker
 * 
 * Tracks user scroll behavior and fires analytics events at key milestones.
 * Also tracks when specific sections come into view.
 */

import { trackScrollDepth, trackSectionView } from './ga4';

// Scroll depth milestones to track
const SCROLL_MILESTONES = [25, 50, 75, 90, 100];

// Section IDs to track visibility
const TRACKED_SECTIONS = [
  'hero',
  'features',
  'how-it-works',
  'pricing',
  'faq',
  'cta',
  'footer',
];

// Track which milestones have been reported
const reportedMilestones = new Set<number>();
const viewedSections = new Set<string>();

/**
 * Calculate current scroll percentage
 */
const getScrollPercentage = (): number => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  
  if (documentHeight <= 0) return 100;
  
  return Math.round((window.scrollY / documentHeight) * 100);
};

/**
 * Get the current section in view
 */
const getCurrentSection = (): string | undefined => {
  const sections = TRACKED_SECTIONS
    .map(id => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];
  
  const viewportMiddle = window.scrollY + window.innerHeight / 2;
  
  for (const section of sections.reverse()) {
    if (section.offsetTop <= viewportMiddle) {
      return section.id;
    }
  }
  
  return sections[0]?.id;
};

/**
 * Handle scroll event
 */
const handleScroll = (): void => {
  const percentage = getScrollPercentage();
  const currentSection = getCurrentSection();
  
  // Check for milestone reached
  for (const milestone of SCROLL_MILESTONES) {
    if (percentage >= milestone && !reportedMilestones.has(milestone)) {
      reportedMilestones.add(milestone);
      trackScrollDepth(milestone, currentSection);
    }
  }
  
  // Track section visibility
  if (currentSection && !viewedSections.has(currentSection)) {
    viewedSections.add(currentSection);
    trackSectionView(currentSection);
  }
};

// Throttle scroll handler for performance
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
const throttledScrollHandler = (): void => {
  if (scrollTimeout) return;
  
  scrollTimeout = setTimeout(() => {
    handleScroll();
    scrollTimeout = null;
  }, 200);
};

/**
 * Initialize scroll depth tracking
 */
export const initScrollTracking = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  // Reset state
  reportedMilestones.clear();
  viewedSections.clear();
  
  // Add scroll listener
  window.addEventListener('scroll', throttledScrollHandler, { passive: true });
  
  // Track initial position
  handleScroll();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', throttledScrollHandler);
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  };
};

/**
 * Get scroll tracking stats (for debugging)
 */
export const getScrollStats = (): {
  currentPercentage: number;
  currentSection: string | undefined;
  reportedMilestones: number[];
  viewedSections: string[];
} => {
  return {
    currentPercentage: getScrollPercentage(),
    currentSection: getCurrentSection(),
    reportedMilestones: Array.from(reportedMilestones),
    viewedSections: Array.from(viewedSections),
  };
};
