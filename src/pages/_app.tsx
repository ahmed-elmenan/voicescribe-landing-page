import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { I18nProvider } from '@/lib/i18n';
import { initWebVitals, reportWebVitals } from '@/lib/performance';
import { AnalyticsProvider } from '@/lib/analytics';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  // Initialize web vitals tracking
  useEffect(() => {
    // Initialize performance monitoring
    initWebVitals(reportWebVitals);
    
    // Log initial load performance
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      window.addEventListener('load', () => {
        // Log resource timing
        const resources = performance.getEntriesByType('resource');
        const jsResources = resources.filter(r => r.name.includes('.js'));
        const cssResources = resources.filter(r => r.name.includes('.css'));
        
        console.log('📊 Performance Summary:');
        console.log(`  Total resources: ${resources.length}`);
        console.log(`  JS files: ${jsResources.length}`);
        console.log(`  CSS files: ${cssResources.length}`);
        
        // Calculate total transfer size
        const totalSize = resources.reduce((acc, r) => {
          const perf = r as PerformanceResourceTiming;
          return acc + (perf.transferSize || 0);
        }, 0);
        console.log(`  Total transfer: ${(totalSize / 1024).toFixed(1)}KB`);
      });
    }
  }, []);

  return (
    <AnalyticsProvider>
      <I18nProvider>
        <Component {...pageProps} />
      </I18nProvider>
    </AnalyticsProvider>
  );
}
