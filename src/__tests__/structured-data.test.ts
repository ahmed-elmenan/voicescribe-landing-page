/**
 * Structured Data (Schema.org) Presence Tests
 * 
 * Tests for:
 * - FAQPage schema
 * - MobileApplication schema
 * - HowTo schema
 * - Organization schema
 * - BreadcrumbList schema
 * - Schema validation
 */

import {
  generateMobileAppSchema,
  generateProductSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateOrganizationSchema,
} from '@/lib/seo/schema';
import { faqData } from '@/components/sections/FAQ';

describe('Structured Data - MobileApplication Schema', () => {
  let schema: ReturnType<typeof generateMobileAppSchema>;

  beforeEach(() => {
    schema = generateMobileAppSchema();
  });

  it('has correct @context', () => {
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has correct @type', () => {
    expect(schema['@type']).toBe('MobileApplication');
  });

  it('includes app name', () => {
    expect(schema.name).toBe('VoiceScribe');
  });

  it('specifies iOS operating system', () => {
    expect(schema.operatingSystem).toContain('iOS');
  });

  it('has correct application category', () => {
    expect(schema.applicationCategory).toBe('ProductivityApplication');
  });

  it('includes aggregate rating', () => {
    expect(schema.aggregateRating).toBeDefined();
    expect(schema.aggregateRating['@type']).toBe('AggregateRating');
    expect(schema.aggregateRating.ratingValue).toBeDefined();
    expect(parseFloat(schema.aggregateRating.ratingValue)).toBeGreaterThanOrEqual(1);
    expect(parseFloat(schema.aggregateRating.ratingValue)).toBeLessThanOrEqual(5);
    expect(schema.aggregateRating.ratingCount).toBeDefined();
    expect(parseInt(schema.aggregateRating.ratingCount)).toBeGreaterThan(0);
  });

  it('has valid rating bounds', () => {
    expect(schema.aggregateRating.bestRating).toBe('5');
    expect(schema.aggregateRating.worstRating).toBe('1');
  });

  it('includes pricing offer', () => {
    expect(schema.offers).toBeDefined();
    expect(schema.offers['@type']).toBe('Offer');
    expect(schema.offers.price).toBe('0');
    expect(schema.offers.priceCurrency).toBe('USD');
    expect(schema.offers.availability).toBe('https://schema.org/InStock');
  });

  it('includes download URL', () => {
    expect(schema.downloadUrl).toBeDefined();
    expect(schema.downloadUrl).toContain('apps.apple.com');
  });

  it('includes install URL', () => {
    expect(schema.installUrl).toBeDefined();
    expect(schema.installUrl).toContain('apps.apple.com');
  });

  it('has feature list', () => {
    expect(schema.featureList).toBeDefined();
    expect(Array.isArray(schema.featureList)).toBe(true);
    expect(schema.featureList.length).toBeGreaterThan(0);
  });

  it('includes author information', () => {
    expect(schema.author).toBeDefined();
    expect(schema.author['@type']).toBe('Organization');
    expect(schema.author.name).toBeDefined();
  });

  it('includes publisher information', () => {
    expect(schema.publisher).toBeDefined();
    expect(schema.publisher['@type']).toBe('Organization');
  });

  it('includes in-app purchase info', () => {
    expect(schema.inAppPurchase).toBeDefined();
    expect(schema.inAppPurchase.name).toBe('VoiceScribe Premium');
    expect(schema.inAppPurchase.price).toBe('9.99');
    expect(schema.inAppPurchase.priceCurrency).toBe('USD');
  });

  it('includes app description', () => {
    expect(schema.description).toBeDefined();
    expect(schema.description.length).toBeGreaterThan(50);
  });

  it('includes screenshot URLs', () => {
    expect(schema.screenshot).toBeDefined();
  });
});

describe('Structured Data - FAQPage Schema', () => {
  let schema: ReturnType<typeof generateFAQSchema>;

  beforeEach(() => {
    schema = generateFAQSchema(faqData);
  });

  it('has correct @context', () => {
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has correct @type', () => {
    expect(schema['@type']).toBe('FAQPage');
  });

  it('includes mainEntity array', () => {
    expect(schema.mainEntity).toBeDefined();
    expect(Array.isArray(schema.mainEntity)).toBe(true);
  });

  it('has correct number of FAQ items', () => {
    expect(schema.mainEntity.length).toBe(faqData.length);
  });

  it('each FAQ item has Question type', () => {
    schema.mainEntity.forEach((item) => {
      expect(item['@type']).toBe('Question');
    });
  });

  it('each FAQ item has name (question text)', () => {
    schema.mainEntity.forEach((item, index) => {
      expect(item.name).toBe(faqData[index].question);
    });
  });

  it('each FAQ item has acceptedAnswer', () => {
    schema.mainEntity.forEach((item) => {
      expect(item.acceptedAnswer).toBeDefined();
      expect(item.acceptedAnswer['@type']).toBe('Answer');
    });
  });

  it('each answer has text content', () => {
    schema.mainEntity.forEach((item, index) => {
      expect(item.acceptedAnswer.text).toBe(faqData[index].answer);
    });
  });

  it('handles empty FAQ array', () => {
    const emptySchema = generateFAQSchema([]);
    expect(emptySchema.mainEntity).toEqual([]);
  });

  it('handles single FAQ item', () => {
    const singleSchema = generateFAQSchema([faqData[0]]);
    expect(singleSchema.mainEntity.length).toBe(1);
  });
});

describe('Structured Data - HowTo Schema', () => {
  let schema: ReturnType<typeof generateHowToSchema>;

  beforeEach(() => {
    schema = generateHowToSchema();
  });

  it('has correct @context', () => {
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has correct @type', () => {
    expect(schema['@type']).toBe('HowTo');
  });

  it('has name/title', () => {
    expect(schema.name).toBeDefined();
    expect(schema.name.length).toBeGreaterThan(0);
  });

  it('has description', () => {
    expect(schema.description).toBeDefined();
  });

  it('has steps array', () => {
    expect(schema.step).toBeDefined();
    expect(Array.isArray(schema.step)).toBe(true);
    expect(schema.step.length).toBeGreaterThan(0);
  });

  it('each step has HowToStep type', () => {
    schema.step.forEach((step) => {
      expect(step['@type']).toBe('HowToStep');
    });
  });

  it('each step has name', () => {
    schema.step.forEach((step) => {
      expect(step.name).toBeDefined();
      expect(step.name.length).toBeGreaterThan(0);
    });
  });

  it('each step has text description', () => {
    schema.step.forEach((step) => {
      expect(step.text).toBeDefined();
      expect(step.text.length).toBeGreaterThan(0);
    });
  });

  it('steps have position numbers', () => {
    schema.step.forEach((step, index) => {
      if (step.position) {
        expect(step.position).toBe(index + 1);
      }
    });
  });

  it('includes estimated time if applicable', () => {
    // totalTime is optional but recommended
    if (schema.totalTime) {
      expect(schema.totalTime).toMatch(/^PT\d+[HMS]$/); // ISO 8601 duration
    }
  });

  it('includes tool/supply requirements if applicable', () => {
    // These are optional
    if (schema.tool) {
      expect(Array.isArray(schema.tool)).toBe(true);
    }
    if (schema.supply) {
      expect(Array.isArray(schema.supply)).toBe(true);
    }
  });
});

describe('Structured Data - Product Schema', () => {
  let schema: ReturnType<typeof generateProductSchema>;

  beforeEach(() => {
    schema = generateProductSchema();
  });

  it('has correct @context', () => {
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has correct @type', () => {
    expect(schema['@type']).toBe('Product');
  });

  it('has product name', () => {
    expect(schema.name).toBe('VoiceScribe');
  });

  it('has brand information', () => {
    expect(schema.brand).toBeDefined();
    expect(schema.brand['@type']).toBe('Brand');
    expect(schema.brand.name).toBeDefined();
  });

  it('has offer information', () => {
    expect(schema.offers).toBeDefined();
    expect(schema.offers['@type']).toBe('Offer');
    expect(schema.offers.availability).toBe('https://schema.org/InStock');
    expect(schema.offers.itemCondition).toBe('https://schema.org/NewCondition');
  });

  it('has aggregate rating', () => {
    expect(schema.aggregateRating).toBeDefined();
    expect(schema.aggregateRating['@type']).toBe('AggregateRating');
  });

  it('has product description', () => {
    expect(schema.description).toBeDefined();
  });
});

describe('Structured Data - Organization Schema', () => {
  let schema: ReturnType<typeof generateOrganizationSchema>;

  beforeEach(() => {
    schema = generateOrganizationSchema();
  });

  it('has correct @context', () => {
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has correct @type', () => {
    expect(schema['@type']).toBe('Organization');
  });

  it('has organization name', () => {
    expect(schema.name).toBeDefined();
  });

  it('has URL', () => {
    expect(schema.url).toBeDefined();
    expect(schema.url).toMatch(/^https?:\/\//);
  });

  it('has logo', () => {
    expect(schema.logo).toBeDefined();
  });

  it('has social profiles', () => {
    expect(schema.sameAs).toBeDefined();
    expect(Array.isArray(schema.sameAs)).toBe(true);
  });
});

describe('Schema JSON Validity', () => {
  it('MobileApplication schema is valid JSON', () => {
    const schema = generateMobileAppSchema();
    expect(() => JSON.stringify(schema)).not.toThrow();
  });

  it('FAQPage schema is valid JSON', () => {
    const schema = generateFAQSchema(faqData);
    expect(() => JSON.stringify(schema)).not.toThrow();
  });

  it('HowTo schema is valid JSON', () => {
    const schema = generateHowToSchema();
    expect(() => JSON.stringify(schema)).not.toThrow();
  });

  it('Product schema is valid JSON', () => {
    const schema = generateProductSchema();
    expect(() => JSON.stringify(schema)).not.toThrow();
  });

  it('Organization schema is valid JSON', () => {
    const schema = generateOrganizationSchema();
    expect(() => JSON.stringify(schema)).not.toThrow();
  });

  it('schemas do not contain undefined values', () => {
    const schemas = [
      generateMobileAppSchema(),
      generateFAQSchema(faqData),
      generateHowToSchema(),
      generateProductSchema(),
      generateOrganizationSchema(),
    ];

    schemas.forEach((schema) => {
      const json = JSON.stringify(schema);
      expect(json).not.toContain('undefined');
    });
  });

  it('schemas have required context and type', () => {
    const schemas = [
      generateMobileAppSchema(),
      generateFAQSchema(faqData),
      generateHowToSchema(),
      generateProductSchema(),
      generateOrganizationSchema(),
    ];

    schemas.forEach((schema) => {
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBeDefined();
    });
  });
});
