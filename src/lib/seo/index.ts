export { siteConfig, navItems, locales, defaultLocale, hreflangMappings } from './config';
export type { Locale } from './config';
export {
  generateMobileAppSchema,
  generateProductSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateYouTubeHowToSchema,
  generateOrganizationSchema,
} from './schema';
export {
  SEOHead,
  getHomePageStructuredData,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from './Head';
export type { SEOHeadProps } from './Head';
