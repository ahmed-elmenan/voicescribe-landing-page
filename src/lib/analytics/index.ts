/**
 * Analytics Module
 * 
 * Exports all analytics-related functions and components
 */

// Core GA4 functions
export {
  GA_MEASUREMENT_ID,
  GTM_ID,
  initGA,
  pageview,
  trackEvent,
  trackAppStoreClick,
  trackLanguageToggle,
  trackScrollDepth,
  trackPricingToggle,
  trackPricingCTAClick,
  trackFAQExpand,
  trackSectionView,
  trackOutboundClick,
  trackFormSubmit,
  trackVideoInteraction,
  trackCTAClick,
  trackError,
  trackBeginCheckout,
  setUserProperties,
  setUserLanguage,
  isAnalyticsAvailable,
} from './ga4';

// Scroll tracking
export { initScrollTracking, getScrollStats } from './scroll-tracking';

// Provider and hooks
export {
  AnalyticsProvider,
  useAnalytics,
  GA4Script,
  GTMScript,
  GTMNoScript,
} from './AnalyticsProvider';
