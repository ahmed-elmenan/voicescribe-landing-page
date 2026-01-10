import {
  generateMobileAppSchema,
  generateProductSchema,
  generateFAQSchema,
  generateHowToSchema,
} from '@/lib/seo/schema';

describe('SEO Schema Generation', () => {
  describe('generateMobileAppSchema', () => {
    it('returns valid MobileApplication schema', () => {
      const schema = generateMobileAppSchema();
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('MobileApplication');
      expect(schema.name).toBe('VoiceScribe');
      expect(schema.operatingSystem).toContain('iOS');
      expect(schema.applicationCategory).toBe('ProductivityApplication');
    });

    it('includes required rating information', () => {
      const schema = generateMobileAppSchema();
      
      expect(schema.aggregateRating).toBeDefined();
      expect(schema.aggregateRating.ratingValue).toBeDefined();
      expect(schema.aggregateRating.ratingCount).toBeDefined();
      expect(schema.aggregateRating.bestRating).toBe('5');
      expect(schema.aggregateRating.worstRating).toBe('1');
    });

    it('includes offer information', () => {
      const schema = generateMobileAppSchema();
      
      expect(schema.offers).toBeDefined();
      expect(schema.offers.price).toBe('0');
      expect(schema.offers.priceCurrency).toBe('USD');
      expect(schema.offers.availability).toBe('https://schema.org/InStock');
    });

    it('includes download and install URLs', () => {
      const schema = generateMobileAppSchema();
      
      expect(schema.downloadUrl).toBeDefined();
      expect(schema.installUrl).toBeDefined();
    });

    it('includes feature list for rich snippets', () => {
      const schema = generateMobileAppSchema();
      
      expect(schema.featureList).toBeDefined();
      expect(Array.isArray(schema.featureList)).toBe(true);
      expect(schema.featureList.length).toBeGreaterThan(0);
    });

    it('includes author and publisher information', () => {
      const schema = generateMobileAppSchema();
      
      expect(schema.author).toBeDefined();
      expect(schema.author['@type']).toBe('Organization');
      expect(schema.publisher).toBeDefined();
    });

    it('includes in-app purchase information', () => {
      const schema = generateMobileAppSchema();
      
      expect(schema.inAppPurchase).toBeDefined();
      expect(schema.inAppPurchase.name).toBe('VoiceScribe Premium');
      expect(schema.inAppPurchase.price).toBe('9.99');
    });
  });

  describe('generateProductSchema', () => {
    it('returns valid Product schema', () => {
      const schema = generateProductSchema();
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('VoiceScribe');
    });

    it('includes brand information', () => {
      const schema = generateProductSchema();
      
      expect(schema.brand).toBeDefined();
      expect(schema.brand['@type']).toBe('Brand');
    });

    it('includes offer with availability', () => {
      const schema = generateProductSchema();
      
      expect(schema.offers).toBeDefined();
      expect(schema.offers.availability).toBe('https://schema.org/InStock');
      expect(schema.offers.itemCondition).toBe('https://schema.org/NewCondition');
    });

    it('includes aggregate rating', () => {
      const schema = generateProductSchema();
      
      expect(schema.aggregateRating).toBeDefined();
      expect(schema.aggregateRating.ratingValue).toBeDefined();
    });
  });

  describe('generateFAQSchema', () => {
    const mockFaqs = [
      { question: 'What is VoiceScribe?', answer: 'An audio transcription app.' },
      { question: 'Is it free?', answer: 'Yes, with premium options.' },
    ];

    it('returns valid FAQPage schema', () => {
      const schema = generateFAQSchema(mockFaqs);
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
    });

    it('includes all FAQ items', () => {
      const schema = generateFAQSchema(mockFaqs);
      
      expect(schema.mainEntity).toHaveLength(2);
    });

    it('formats questions correctly', () => {
      const schema = generateFAQSchema(mockFaqs);
      
      expect(schema.mainEntity[0]['@type']).toBe('Question');
      expect(schema.mainEntity[0].name).toBe('What is VoiceScribe?');
      expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe(
        'An audio transcription app.'
      );
    });
  });

  describe('generateHowToSchema', () => {
    it('returns valid HowTo schema', () => {
      const schema = generateHowToSchema();
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('HowTo');
      expect(schema.name).toBeDefined();
    });

    it('includes steps', () => {
      const schema = generateHowToSchema();
      
      expect(schema.step).toBeDefined();
      expect(schema.step.length).toBeGreaterThan(0);
    });

    it('formats steps correctly', () => {
      const schema = generateHowToSchema();
      
      schema.step.forEach((step: any, index: number) => {
        expect(step['@type']).toBe('HowToStep');
        expect(step.position).toBe(index + 1);
        expect(step.name).toBeDefined();
        expect(step.text).toBeDefined();
      });
    });
  });
});
