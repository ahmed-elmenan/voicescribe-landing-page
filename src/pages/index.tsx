import dynamic from 'next/dynamic';
import { Layout, Hero, Features, HowItWorks, faqData } from '@/components';
import { LazyLoad, LazyLoadPlaceholder } from '@/components/ui';
import { SEOHead, getHomePageStructuredData } from '@/lib/seo';

// Dynamic imports for below-fold sections to reduce initial JS
// These will be code-split and loaded when needed
const Pricing = dynamic(
  () => import('@/components/sections/Pricing').then(mod => ({ default: mod.Pricing })),
  { 
    loading: () => <LazyLoadPlaceholder height="600px" />,
    ssr: true // Keep SSR for SEO
  }
);

const FAQ = dynamic(
  () => import('@/components/sections/FAQ').then(mod => ({ default: mod.FAQ })),
  { 
    loading: () => <LazyLoadPlaceholder height="500px" />,
    ssr: true
  }
);

const CTA = dynamic(
  () => import('@/components/sections/CTA').then(mod => ({ default: mod.CTA })),
  { 
    loading: () => <LazyLoadPlaceholder height="300px" />,
    ssr: true
  }
);

export default function Home() {
  // Generate all structured data for home page including FAQ
  const structuredData = getHomePageStructuredData(
    faqData.map(faq => ({ question: faq.question, answer: faq.answer }))
  );

  return (
    <>
      <SEOHead
        title="AI Voice to Text App for iPhone | Record & Transcribe"
        description="Record audio and transcribe fast with AI. Import YouTube links, sync notes to the cloud, and stay organized. Download VoiceScribe on the App Store."
        structuredData={structuredData}
        preconnect={[
          'https://www.google-analytics.com',
          'https://cdn.jsdelivr.net',
        ]}
        dnsPrefetch={[
          'https://apps.apple.com',
        ]}
      />

      <Layout>
        {/* Above-fold content - critical for LCP */}
        <Hero />
        
        {/* Features section - important for SEO */}
        <Features />
        
        {/* HowItWorks - good for engagement */}
        <HowItWorks />
        
        {/* Below-fold sections - lazy loaded */}
        <LazyLoad 
          rootMargin="300px" 
          minHeight="600px"
          placeholder={<LazyLoadPlaceholder height="600px" />}
        >
          <Pricing />
        </LazyLoad>
        
        <LazyLoad 
          rootMargin="200px" 
          minHeight="500px"
          placeholder={<LazyLoadPlaceholder height="500px" />}
        >
          <FAQ />
        </LazyLoad>
        
        <LazyLoad 
          rootMargin="100px" 
          minHeight="300px"
          placeholder={<LazyLoadPlaceholder height="300px" />}
        >
          <CTA />
        </LazyLoad>
      </Layout>
    </>
  );
}
