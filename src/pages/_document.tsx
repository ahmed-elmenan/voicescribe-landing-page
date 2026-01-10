import { Html, Head, Main, NextScript } from 'next/document';
import { GA4Script, GTMScript, GTMNoScript } from '@/lib/analytics';

export default function Document() {
  // Script to set initial direction based on stored preference
  // This runs before React hydration to prevent flash
  const setDirectionScript = `
    (function() {
      try {
        var locale = localStorage.getItem('voicescribe-locale');
        if (locale === 'ar') {
          document.documentElement.lang = 'ar';
          document.documentElement.dir = 'rtl';
        }
      } catch (e) {}
    })();
  `;

  // Critical CSS for above-the-fold content
  // Inlined to prevent render blocking
  const criticalCSS = `
    /* Critical layout styles to prevent CLS */
    *,*::before,*::after{box-sizing:border-box}
    html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
    body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased}
    img,video{max-width:100%;height:auto;display:block}
    
    /* Reserve space for header to prevent CLS */
    header{min-height:64px}
    
    /* Hero section placeholder dimensions */
    .hero-placeholder{min-height:90vh}
    
    /* Font loading optimization */
    @font-face{font-family:'Inter var';font-style:normal;font-weight:100 900;font-display:swap;src:url('/fonts/inter-var.woff2') format('woff2')}
  `;

  return (
    <Html lang="en" dir="ltr" className="scroll-smooth">
      <Head>
        {/* DNS Prefetch for faster external resource resolution */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect to critical origins - establishes early connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS - inlined to prevent render blocking */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Google Fonts with proper preconnect - loads async with font-display: swap */}
        {/* eslint-disable-next-line @next/next/google-font-preconnect */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        
        {/* Arabic fonts for RTL support */}
        {/* eslint-disable-next-line @next/next/google-font-preconnect */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap" 
          rel="stylesheet"
        />
        
        {/* Noscript fallback for fonts */}
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap" 
            rel="stylesheet" 
          />
        </noscript>
        
        {/* Favicon - use SVG for scalability and small size */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#6366f1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#8b5cf6" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        
        {/* iOS specific optimizations */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VoiceScribe" />
        
        {/* Disable automatic detection for performance */}
        <meta name="format-detection" content="telephone=no,date=no,email=no,address=no" />
        
        {/* Preload critical above-fold image (LCP element) */}
        <link
          rel="preload"
          href="/app-store-badge.svg"
          as="image"
          type="image/svg+xml"
        />
        
        {/* Google Analytics 4 */}
        <GA4Script />
        
        {/* Google Tag Manager (optional) */}
        <GTMScript />
      </Head>
      <body className="antialiased bg-white text-gray-900">
        {/* GTM NoScript fallback */}
        <GTMNoScript />
        
        {/* Set direction before React hydration to prevent CLS */}
        <script dangerouslySetInnerHTML={{ __html: setDirectionScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
