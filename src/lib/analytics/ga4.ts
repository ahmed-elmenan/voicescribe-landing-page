/**
 * VoiceScribe Analytics - GA4 Integration
 * 
 * This module provides Google Analytics 4 integration with custom event tracking
 * for measuring user engagement and conversions.
 * 
 * Events tracked:
 * - Page views
 * - App Store CTA clicks
 * - Language toggle
 * - Scroll depth
 * - Pricing interactions
 * - FAQ expansions
 */

// GA4 Measurement ID - Replace with your actual ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// GTM Container ID - Optional
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Type definitions for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Check if analytics is available
 */
export const isAnalyticsAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Initialize GA4 - call this early in app lifecycle
 */
export const initGA = (): void => {
  if (typeof window === 'undefined') return;
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  // Set initial timestamp
  window.gtag('js', new Date().toISOString());
  
  // Configure GA4
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
    // Enhanced measurement
    enhanced_measurement: true,
    // Debug mode in development
    debug_mode: process.env.NODE_ENV === 'development',
  });
};

/**
 * Track page views - useful for SPA navigation
 */
export const pageview = (url: string, title?: string): void => {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// ============================================================================
// CUSTOM EVENT TYPES
// ============================================================================

export interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Generic event tracking function
 */
export const trackEvent = (
  eventName: string,
  params?: EventParams
): void => {
  if (!isAnalyticsAvailable()) {
    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, params);
    }
    return;
  }
  
  window.gtag('event', eventName, {
    ...params,
    timestamp: new Date().toISOString(),
  });
};

// ============================================================================
// SPECIFIC EVENT TRACKERS
// ============================================================================

/**
 * Track App Store CTA clicks
 * Event: appstore_click
 */
export const trackAppStoreClick = (location: string): void => {
  trackEvent('appstore_click', {
    event_category: 'engagement',
    event_label: location,
    click_location: location,
    // For conversion tracking
    value: 1,
  });
};

/**
 * Track language toggle
 * Event: language_change
 */
export const trackLanguageToggle = (
  fromLanguage: string,
  toLanguage: string
): void => {
  trackEvent('language_change', {
    event_category: 'engagement',
    event_label: `${fromLanguage}_to_${toLanguage}`,
    from_language: fromLanguage,
    to_language: toLanguage,
  });
};

/**
 * Track scroll depth milestones
 * Event: scroll_depth
 */
export const trackScrollDepth = (
  percentage: number,
  section?: string
): void => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    scroll_percentage: percentage,
    section_reached: section,
  });
};

/**
 * Track pricing toggle (monthly/yearly)
 * Event: pricing_toggle
 */
export const trackPricingToggle = (
  period: 'monthly' | 'yearly'
): void => {
  trackEvent('pricing_toggle', {
    event_category: 'engagement',
    event_label: period,
    billing_period: period,
  });
};

/**
 * Track pricing CTA clicks
 * Event: pricing_cta_click
 */
export const trackPricingCTAClick = (
  planName: string,
  planPrice: string,
  isYearly: boolean
): void => {
  trackEvent('pricing_cta_click', {
    event_category: 'conversion',
    event_label: planName,
    plan_name: planName,
    plan_price: planPrice,
    billing_period: isYearly ? 'yearly' : 'monthly',
    // For conversion tracking
    value: 1,
  });
};

/**
 * Track FAQ expansions
 * Event: faq_expand
 */
export const trackFAQExpand = (
  questionId: string,
  questionText: string,
  category?: string
): void => {
  trackEvent('faq_expand', {
    event_category: 'engagement',
    event_label: questionId,
    question_id: questionId,
    question_text: questionText.substring(0, 100), // Truncate for GA limits
    faq_category: category,
  });
};

/**
 * Track section visibility (for engagement metrics)
 * Event: section_view
 */
export const trackSectionView = (sectionId: string): void => {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionId,
    section_id: sectionId,
  });
};

/**
 * Track external link clicks
 * Event: outbound_click
 */
export const trackOutboundClick = (
  url: string,
  linkText: string
): void => {
  trackEvent('outbound_click', {
    event_category: 'engagement',
    event_label: url,
    link_url: url,
    link_text: linkText,
  });
};

/**
 * Track form submissions (newsletter, etc.)
 * Event: form_submit
 */
export const trackFormSubmit = (
  formName: string,
  success: boolean
): void => {
  trackEvent('form_submit', {
    event_category: success ? 'conversion' : 'engagement',
    event_label: formName,
    form_name: formName,
    success: success,
    value: success ? 1 : 0,
  });
};

/**
 * Track video interactions
 * Event: video_interaction
 */
export const trackVideoInteraction = (
  action: 'play' | 'pause' | 'complete',
  videoTitle: string,
  currentTime?: number,
  duration?: number
): void => {
  trackEvent('video_interaction', {
    event_category: 'engagement',
    event_label: `${action}_${videoTitle}`,
    video_action: action,
    video_title: videoTitle,
    video_current_time: currentTime,
    video_duration: duration,
    video_percent: duration ? Math.round((currentTime || 0) / duration * 100) : undefined,
  });
};

/**
 * Track CTA button clicks (generic)
 * Event: cta_click
 */
export const trackCTAClick = (
  ctaName: string,
  location: string,
  destination?: string
): void => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaName,
    cta_name: ctaName,
    cta_location: location,
    cta_destination: destination,
  });
};

/**
 * Track error events
 * Event: error
 */
export const trackError = (
  errorType: string,
  errorMessage: string,
  errorStack?: string
): void => {
  trackEvent('error', {
    event_category: 'error',
    event_label: errorType,
    error_type: errorType,
    error_message: errorMessage.substring(0, 200),
    error_stack: errorStack?.substring(0, 500),
  });
};

// ============================================================================
// ECOMMERCE TRACKING (for future use)
// ============================================================================

/**
 * Track begin checkout
 * Event: begin_checkout
 */
export const trackBeginCheckout = (
  planName: string,
  planPrice: number,
  currency: string = 'USD'
): void => {
  trackEvent('begin_checkout', {
    event_category: 'ecommerce',
    currency: currency,
    value: planPrice,
    items: JSON.stringify([{
      item_id: planName.toLowerCase().replace(/\s+/g, '_'),
      item_name: planName,
      price: planPrice,
      quantity: 1,
    }]),
  });
};

// ============================================================================
// USER PROPERTIES
// ============================================================================

/**
 * Set user properties for segmentation
 */
export const setUserProperties = (properties: Record<string, string | number | boolean>): void => {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag('set', 'user_properties', properties);
};

/**
 * Set user language preference
 */
export const setUserLanguage = (language: string): void => {
  setUserProperties({
    preferred_language: language,
    rtl_user: language === 'ar',
  });
};
