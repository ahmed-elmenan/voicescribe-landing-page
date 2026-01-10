import { render } from './utils/test-utils';
import { SEOHead, getHomePageStructuredData, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo';

// Mock next/head
jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

describe('SEOHead', () => {
  it('renders default title with site name', () => {
    const { container } = render(<SEOHead />);
    const title = container.querySelector('title');
    expect(title?.textContent).toContain('VoiceScribe');
  });

  it('renders custom title with site name appended', () => {
    const { container } = render(<SEOHead title="Features" />);
    const title = container.querySelector('title');
    expect(title?.textContent).toBe('Features | VoiceScribe');
  });

  it('renders title without site name when noSiteName is true', () => {
    const { container } = render(<SEOHead title="Custom Page" noSiteName />);
    const title = container.querySelector('title');
    expect(title?.textContent).toBe('Custom Page');
  });

  it('renders meta description', () => {
    const { container } = render(<SEOHead description="Test description" />);
    const meta = container.querySelector('meta[name="description"]');
    expect(meta?.getAttribute('content')).toBe('Test description');
  });

  it('renders canonical URL', () => {
    const { container } = render(<SEOHead canonical="https://voicescribe.app/features" />);
    const link = container.querySelector('link[rel="canonical"]');
    expect(link?.getAttribute('href')).toBe('https://voicescribe.app/features');
  });

  it('renders hreflang tags by default', () => {
    const { container } = render(<SEOHead />);
    const hreflangTags = container.querySelectorAll('link[rel="alternate"][hreflang]');
    expect(hreflangTags.length).toBeGreaterThan(0);
    
    // Check for specific hreflang values
    const hreflangValues = Array.from(hreflangTags).map(tag => tag.getAttribute('hreflang'));
    expect(hreflangValues).toContain('en-us');
    expect(hreflangValues).toContain('ar-sa');
    expect(hreflangValues).toContain('ar-ae');
    expect(hreflangValues).toContain('x-default');
  });

  it('disables hreflang tags when noHreflang is true', () => {
    const { container } = render(<SEOHead noHreflang />);
    const hreflangTags = container.querySelectorAll('link[rel="alternate"][hreflang]');
    expect(hreflangTags.length).toBe(0);
  });

  it('renders Open Graph tags', () => {
    const { container } = render(
      <SEOHead
        title="Test Page"
        description="Test description"
        ogImage="https://example.com/image.jpg"
      />
    );
    
    expect(container.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('website');
    expect(container.querySelector('meta[property="og:title"]')?.getAttribute('content')).toContain('Test Page');
    expect(container.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('Test description');
    expect(container.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('https://example.com/image.jpg');
  });

  it('renders Twitter Card tags', () => {
    const { container } = render(
      <SEOHead
        title="Test Page"
        description="Test description"
        twitterCard="summary_large_image"
      />
    );
    
    expect(container.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
    expect(container.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toContain('Test Page');
    expect(container.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe('Test description');
  });

  it('renders preconnect links', () => {
    const { container } = render(
      <SEOHead preconnect={['https://custom-cdn.com']} />
    );
    
    const preconnectLinks = container.querySelectorAll('link[rel="preconnect"]');
    const hrefs = Array.from(preconnectLinks).map(link => link.getAttribute('href'));
    
    expect(hrefs).toContain('https://fonts.googleapis.com');
    expect(hrefs).toContain('https://custom-cdn.com');
  });

  it('renders robots meta with noindex when specified', () => {
    const { container } = render(<SEOHead noIndex />);
    const robotsMeta = container.querySelector('meta[name="robots"]');
    expect(robotsMeta?.getAttribute('content')).toContain('noindex');
  });

  it('renders robots meta with nofollow when specified', () => {
    const { container } = render(<SEOHead noFollow />);
    const robotsMeta = container.querySelector('meta[name="robots"]');
    expect(robotsMeta?.getAttribute('content')).toContain('nofollow');
  });

  it('renders structured data when provided', () => {
    const structuredData = [
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Test' },
    ];
    const { container } = render(<SEOHead structuredData={structuredData} />);
    
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(1);
    expect(scripts[0].textContent).toContain('WebPage');
  });

  it('renders iOS app links', () => {
    const { container } = render(<SEOHead appStoreId="123456789" appName="TestApp" />);
    
    expect(container.querySelector('meta[property="al:ios:app_store_id"]')?.getAttribute('content')).toBe('123456789');
    expect(container.querySelector('meta[property="al:ios:app_name"]')?.getAttribute('content')).toBe('TestApp');
    expect(container.querySelector('meta[name="apple-itunes-app"]')?.getAttribute('content')).toBe('app-id=123456789');
  });

  it('renders keywords meta tag', () => {
    const { container } = render(<SEOHead keywords={['test', 'keywords']} />);
    const keywordsMeta = container.querySelector('meta[name="keywords"]');
    expect(keywordsMeta?.getAttribute('content')).toBe('test, keywords');
  });

  it('renders article-specific OG tags for articles', () => {
    const { container } = render(
      <SEOHead
        ogType="article"
        articlePublishedTime="2024-01-01T00:00:00Z"
        articleModifiedTime="2024-01-02T00:00:00Z"
        articleAuthor="John Doe"
        articleSection="Technology"
        articleTags={['ai', 'transcription']}
      />
    );
    
    expect(container.querySelector('meta[property="article:published_time"]')?.getAttribute('content')).toBe('2024-01-01T00:00:00Z');
    expect(container.querySelector('meta[property="article:modified_time"]')?.getAttribute('content')).toBe('2024-01-02T00:00:00Z');
    expect(container.querySelector('meta[property="article:author"]')?.getAttribute('content')).toBe('John Doe');
    expect(container.querySelector('meta[property="article:section"]')?.getAttribute('content')).toBe('Technology');
    
    const tagMetas = container.querySelectorAll('meta[property="article:tag"]');
    expect(tagMetas.length).toBe(2);
  });

  it('renders custom children elements', () => {
    const { container } = render(
      <SEOHead>
        <meta name="custom-tag" content="custom-value" />
      </SEOHead>
    );
    
    expect(container.querySelector('meta[name="custom-tag"]')?.getAttribute('content')).toBe('custom-value');
  });
});

describe('getHomePageStructuredData', () => {
  it('returns array of structured data objects', () => {
    const result = getHomePageStructuredData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(3);
  });

  it('includes FAQ schema when faqData is provided', () => {
    const faqData = [
      { question: 'Test question?', answer: 'Test answer' },
    ];
    const result = getHomePageStructuredData(faqData);
    
    const faqSchema = result.find((schema: Record<string, unknown>) => schema['@type'] === 'FAQPage');
    expect(faqSchema).toBeDefined();
  });

  it('includes MobileApplication schema', () => {
    const result = getHomePageStructuredData();
    const appSchema = result.find((schema: Record<string, unknown>) => schema['@type'] === 'MobileApplication');
    expect(appSchema).toBeDefined();
  });
});

describe('generateBreadcrumbSchema', () => {
  it('generates valid breadcrumb schema', () => {
    const items = [
      { name: 'Home', url: 'https://voicescribe.app/' },
      { name: 'Features', url: 'https://voicescribe.app/features' },
    ];
    const result = generateBreadcrumbSchema(items);
    
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('BreadcrumbList');
    expect(result.itemListElement).toHaveLength(2);
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[1].position).toBe(2);
  });
});

describe('generateWebPageSchema', () => {
  it('generates valid WebPage schema', () => {
    const result = generateWebPageSchema({
      name: 'Features',
      description: 'All features of VoiceScribe',
      url: 'https://voicescribe.app/features',
      datePublished: '2024-01-01',
      dateModified: '2024-06-01',
    });
    
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('WebPage');
    expect(result.name).toBe('Features');
    expect(result.description).toBe('All features of VoiceScribe');
    expect(result.url).toBe('https://voicescribe.app/features');
    expect(result.datePublished).toBe('2024-01-01');
    expect(result.dateModified).toBe('2024-06-01');
  });

  it('omits optional date fields when not provided', () => {
    const result = generateWebPageSchema({
      name: 'Test',
      description: 'Test description',
      url: 'https://voicescribe.app/test',
    });
    
    expect(result.datePublished).toBeUndefined();
    expect(result.dateModified).toBeUndefined();
  });
});
