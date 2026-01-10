/**
 * Analytics Provider Component
 * 
 * Wraps the application and provides:
 * - GA4 initialization
 * - GTM script injection
 * - Scroll tracking
 * - Route change tracking
 * - Analytics context for components
 */

'use client';

import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  GA_MEASUREMENT_ID,
  GTM_ID,
  initGA,
  pageview,
  trackAppStoreClick,
  trackLanguageToggle,
  trackPricingToggle,
  trackPricingCTAClick,
  trackFAQExpand,
  trackCTAClick,
  trackOutboundClick,
  trackFormSubmit,
  setUserLanguage,
} from './ga4';
import { initScrollTracking } from './scroll-tracking';

// ============================================================================
// ANALYTICS CONTEXT
// ============================================================================

interface AnalyticsContextType {
  // Event trackers
  trackAppStoreClick: (location: string) => void;
  trackLanguageToggle: (from: string, to: string) => void;
  trackPricingToggle: (period: 'monthly' | 'yearly') => void;
  trackPricingCTAClick: (planName: string, planPrice: string, isYearly: boolean) => void;
  trackFAQExpand: (questionId: string, questionText: string, category?: string) => void;
  trackCTAClick: (ctaName: string, location: string, destination?: string) => void;
  trackOutboundClick: (url: string, linkText: string) => void;
  trackFormSubmit: (formName: string, success: boolean) => void;
  setUserLanguage: (language: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

/**
 * Hook to access analytics functions
 */
export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  
  // Return no-op functions if context is not available
  if (!context) {
    return {
      trackAppStoreClick: () => {},
      trackLanguageToggle: () => {},
      trackPricingToggle: () => {},
      trackPricingCTAClick: () => {},
      trackFAQExpand: () => {},
      trackCTAClick: () => {},
      trackOutboundClick: () => {},
      trackFormSubmit: () => {},
      setUserLanguage: () => {},
    };
  }
  
  return context;
};

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const router = useRouter();
  
  // Initialize analytics on mount
  useEffect(() => {
    // Initialize GA4
    initGA();
    
    // Initialize scroll tracking
    const cleanupScroll = initScrollTracking();
    
    return () => {
      cleanupScroll();
    };
  }, []);
  
  // Track route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  // Memoized context value
  const contextValue: AnalyticsContextType = {
    trackAppStoreClick: useCallback((location: string) => {
      trackAppStoreClick(location);
    }, []),
    
    trackLanguageToggle: useCallback((from: string, to: string) => {
      trackLanguageToggle(from, to);
    }, []),
    
    trackPricingToggle: useCallback((period: 'monthly' | 'yearly') => {
      trackPricingToggle(period);
    }, []),
    
    trackPricingCTAClick: useCallback((planName: string, planPrice: string, isYearly: boolean) => {
      trackPricingCTAClick(planName, planPrice, isYearly);
    }, []),
    
    trackFAQExpand: useCallback((questionId: string, questionText: string, category?: string) => {
      trackFAQExpand(questionId, questionText, category);
    }, []),
    
    trackCTAClick: useCallback((ctaName: string, location: string, destination?: string) => {
      trackCTAClick(ctaName, location, destination);
    }, []),
    
    trackOutboundClick: useCallback((url: string, linkText: string) => {
      trackOutboundClick(url, linkText);
    }, []),
    
    trackFormSubmit: useCallback((formName: string, success: boolean) => {
      trackFormSubmit(formName, success);
    }, []),
    
    setUserLanguage: useCallback((language: string) => {
      setUserLanguage(language);
    }, []),
  };
  
  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// ============================================================================
// SCRIPT COMPONENTS
// ============================================================================

/**
 * GA4 Script Component - Add to _document.tsx Head
 */
export const GA4Script: React.FC = () => {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }
  
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
};

/**
 * GTM Script Component - Add to _document.tsx Head
 */
export const GTMScript: React.FC = () => {
  if (!GTM_ID) {
    return null;
  }
  
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  );
};

/**
 * GTM NoScript Component - Add to _document.tsx body
 */
export const GTMNoScript: React.FC = () => {
  if (!GTM_ID) {
    return null;
  }
  
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export { GA_MEASUREMENT_ID, GTM_ID } from './ga4';
