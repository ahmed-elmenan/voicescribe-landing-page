'use client';

import Head from 'next/head';
import { siteConfig, hreflangMappings } from './config';
import {
  generateMobileAppSchema,
  generateProductSchema,
  generateOrganizationSchema,
  generateHowToSchema,
  generateYouTubeHowToSchema,
  generateFAQSchema,
} from './schema';

/**
 * SEO Head Props
 * All properties are optional and will fall back to siteConfig defaults
 */
export interface SEOHeadProps {
  /** Page title - will be appended with site name unless noSiteName is true */
  title?: string;
  /** Meta description - max ~155 characters for optimal display */
  description?: string;
  /** Canonical URL for this page */
  canonical?: string;
  /** Path to OG image (absolute URL or path from domain root) */
  ogImage?: string;
  /** OG image alt text for accessibility */
  ogImageAlt?: string;
  /** OG image width */
  ogImageWidth?: number;
  /** OG image height */
  ogImageHeight?: number;
  /** Page type for Open Graph */
  ogType?: 'website' | 'article' | 'product' | 'profile';
  /** Article publish date (ISO 8601) */
  articlePublishedTime?: string;
  /** Article modified date (ISO 8601) */
  articleModifiedTime?: string;
  /** Article author name */
  articleAuthor?: string;
  /** Article section/category */
  articleSection?: string;
  /** Article tags */
  articleTags?: string[];
  /** Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Twitter @username of content creator */
  twitterCreator?: string;
  /** Twitter @username of website/app */
  twitterSite?: string;
  /** Keywords for meta keywords tag */
  keywords?: string[];
  /** Robots meta directives */
  robots?: string;
  /** Don't append site name to title */
  noSiteName?: boolean;
  /** Don't index this page */
  noIndex?: boolean;
  /** Don't follow links on this page */
  noFollow?: boolean;
  /** Locale for og:locale (e.g., 'en_US', 'ar_SA') */
  locale?: string;
  /** Alternate locales for og:locale:alternate */
  alternateLocales?: string[];
  /** JSON-LD structured data objects */
  structuredData?: Record<string, unknown>[];
  /** Additional preconnect URLs */
  preconnect?: string[];
  /** Additional prefetch URLs */
  dnsPrefetch?: string[];
  /** Preload resources */
  preload?: Array<{
    href: string;
    as: 'script' | 'style' | 'font' | 'image' | 'fetch';
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
  }>;
  /** App Store ID for iOS */
  appStoreId?: string;
  /** App name for iOS */
  appName?: string;
  /** Disable hreflang tags */
  noHreflang?: boolean;
  /** Custom hreflang mappings (overrides default) */
  customHreflang?: Array<{ lang: string; href: string }>;
  /** Google Search Console verification code */
  googleSiteVerification?: string;
  /** Bing Webmaster Tools verification code */
  bingSiteVerification?: string;
  /** Children elements to render inside Head */
  children?: React.ReactNode;
}

/**
 * Default preconnect domains for performance
 */
const defaultPreconnect = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

/**
 * Default DNS prefetch domains
 */
const defaultDnsPrefetch = [
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com',
];

/**
 * SEOHead Component
 * 
 * A comprehensive, reusable SEO component that handles:
 * - Title and meta description
 * - Canonical URLs
 * - Open Graph tags (Facebook, LinkedIn)
 * - Twitter Card tags
 * - Hreflang alternates for internationalization
 * - Preconnect and DNS prefetch for performance
 * - JSON-LD structured data
 * - iOS App Links
 * 
 * @example
 * ```tsx
 * <SEOHead
 *   title="Features"
 *   description="Discover all the powerful features of VoiceScribe"
 *   canonical="https://voicescribe.app/features"
 * />
 * ```
 */
export function SEOHead({
  title,
  description = siteConfig.description,
  canonical,
  ogImage,
  ogImageAlt = `${siteConfig.name} - AI Voice to Text App`,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  articleTags,
  twitterCard = 'summary_large_image',
  twitterCreator,
  twitterSite,
  keywords = siteConfig.keywords,
  robots,
  noSiteName = false,
  noIndex = false,
  noFollow = false,
  locale = 'en_US',
  alternateLocales = ['ar_SA', 'ar_AE', 'ar_QA', 'ar_KW', 'ar_BH', 'ar_OM'],
  structuredData = [],
  preconnect = [],
  dnsPrefetch = [],
  preload = [],
  appStoreId = 'XXXXXXXXX',
  appName = siteConfig.name,
  noHreflang = false,
  customHreflang,
  googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  children,
}: SEOHeadProps) {
  // Construct full title
  const fullTitle = title
    ? noSiteName
      ? title
      : `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — AI Voice to Text App for iPhone | Record & Transcribe`;

  // Construct canonical URL
  const canonicalUrl = canonical || siteConfig.url;

  // Construct OG image URL (ensure absolute)
  const ogImageUrl = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${siteConfig.url}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
    : siteConfig.ogImage;

  // Construct robots directive
  const robotsDirective =
    robots ||
    [
      noIndex ? 'noindex' : 'index',
      noFollow ? 'nofollow' : 'follow',
      'max-snippet:-1',
      'max-image-preview:large',
      'max-video-preview:-1',
    ].join(', ');

  // Merge preconnect URLs
  const allPreconnect = [...new Set([...defaultPreconnect, ...preconnect])];

  // Merge DNS prefetch URLs
  const allDnsPrefetch = [...new Set([...defaultDnsPrefetch, ...dnsPrefetch])];

  // Get hreflang mappings
  const hreflangTags = customHreflang || hreflangMappings;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />

      {/* Search Console & Webmaster Verification Tags */}
      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}
      {bingSiteVerification && (
        <meta name="msvalidate.01" content={bingSiteVerification} />
      )}

      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for International SEO */}
      {!noHreflang &&
        hreflangTags.map(({ lang, href }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={href} />
        ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={locale} />
      
      {/* Alternate locales for Open Graph */}
      {alternateLocales.map((altLocale) => (
        <meta key={altLocale} property="og:locale:alternate" content={altLocale} />
      ))}

      {/* Article-specific Open Graph (for blog posts, etc.) */}
      {ogType === 'article' && (
        <>
          {articlePublishedTime && (
            <meta property="article:published_time" content={articlePublishedTime} />
          )}
          {articleModifiedTime && (
            <meta property="article:modified_time" content={articleModifiedTime} />
          )}
          {articleAuthor && (
            <meta property="article:author" content={articleAuthor} />
          )}
          {articleSection && (
            <meta property="article:section" content={articleSection} />
          )}
          {articleTags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* iOS App Links */}
      <meta property="al:ios:app_store_id" content={appStoreId} />
      <meta property="al:ios:app_name" content={appName} />
      <meta name="apple-itunes-app" content={`app-id=${appStoreId}`} />

      {/* Preconnect for performance */}
      {allPreconnect.map((url) => (
        <link
          key={url}
          rel="preconnect"
          href={url}
          crossOrigin={url.includes('gstatic') ? 'anonymous' : undefined}
        />
      ))}

      {/* DNS Prefetch for performance */}
      {allDnsPrefetch.map((url) => (
        <link key={url} rel="dns-prefetch" href={url} />
      ))}

      {/* Preload resources */}
      {preload.map((resource) => (
        <link
          key={resource.href}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossOrigin}
        />
      ))}

      {/* JSON-LD Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      {/* Additional custom head elements */}
      {children}
    </Head>
  );
}

/**
 * Generate default structured data for the home page
 * Includes MobileApplication, Product, Organization, HowTo (audio + YouTube), and FAQ schemas
 */
export function getHomePageStructuredData(
  faqData?: Array<{ question: string; answer: string }>
) {
  const schemas: Record<string, unknown>[] = [
    generateMobileAppSchema(),
    generateProductSchema(),
    generateOrganizationSchema(),
    generateHowToSchema(),
    generateYouTubeHowToSchema(),
  ];

  if (faqData && faqData.length > 0) {
    schemas.push(generateFAQSchema(faqData));
  }

  return schemas;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebPage structured data
 */
export function generateWebPageSchema({
  name,
  description,
  url,
  datePublished,
  dateModified,
}: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export default SEOHead;
