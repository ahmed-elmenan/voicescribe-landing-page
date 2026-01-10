/**
 * Structured Data E2E Tests
 * 
 * Tests:
 * - JSON-LD scripts are present in page
 * - Schema types are correct
 * - Required properties exist
 */

import { test, expect } from '@playwright/test';

// Helper to extract JSON-LD scripts
async function getJsonLdScripts(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    return Array.from(scripts).map((script) => {
      try {
        return JSON.parse(script.textContent || '');
      } catch {
        return null;
      }
    }).filter(Boolean);
  });
}

test.describe('Structured Data Presence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('page contains JSON-LD scripts', async ({ page }) => {
    const scripts = await getJsonLdScripts(page);
    expect(scripts.length).toBeGreaterThan(0);
  });

  test('MobileApplication schema is present', async ({ page }) => {
    const scripts = await getJsonLdScripts(page);
    
    const mobileAppSchema = scripts.find(
      (s: any) => s['@type'] === 'MobileApplication'
    );
    
    expect(mobileAppSchema).toBeTruthy();
  });

  test('MobileApplication has required properties', async ({ page }) => {
    const scripts = await getJsonLdScripts(page);
    
    const mobileAppSchema = scripts.find(
      (s: any) => s['@type'] === 'MobileApplication'
    );
    
    expect(mobileAppSchema).toBeTruthy();
    expect(mobileAppSchema['@context']).toBe('https://schema.org');
    expect(mobileAppSchema.name).toBeTruthy();
    expect(mobileAppSchema.operatingSystem).toBeTruthy();
  });

  test('MobileApplication has aggregate rating', async ({ page }) => {
    const scripts = await getJsonLdScripts(page);
    
    const mobileAppSchema = scripts.find(
      (s: any) => s['@type'] === 'MobileApplication'
    );
    
    expect(mobileAppSchema?.aggregateRating).toBeTruthy();
    expect(mobileAppSchema.aggregateRating['@type']).toBe('AggregateRating');
    expect(mobileAppSchema.aggregateRating.ratingValue).toBeTruthy();
  });

  test('MobileApplication has offer information', async ({ page }) => {
    const scripts = await getJsonLdScripts(page);
    
    const mobileAppSchema = scripts.find(
      (s: any) => s['@type'] === 'MobileApplication'
    );
    
    expect(mobileAppSchema?.offers).toBeTruthy();
    expect(mobileAppSchema.offers['@type']).toBe('Offer');
    expect(mobileAppSchema.offers.price).toBeDefined();
  });
});

test.describe('FAQPage Schema', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to FAQ to ensure it's rendered
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('FAQPage schema is present', async ({ page }) => {
    const scripts = await getJsonLdScripts(page);
    
    const faqSchema = scripts.find(
      (s: any) => s['@type'] === 'FAQPage'
    );
    
    expect(faqSchema).toBeTruthy();
  });

  test('FAQPage has mainEntity array', async ({ page }) => {
    const scripts = await getJsonLdScripts(page);
    
    const faqSchema = scripts.find(
      (s: any) => s['@type'] === 'FAQPage'
    );
    
    expect(faqSchema?.mainEntity).toBeTruthy();
    expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
    expect(faqSchema.mainEntity.length).toBeGreaterThan(0);
  });

  test('FAQ questions have correct structure', async ({ page }) => {
    const scripts = await getJsonLdScripts(page);
    
    const faqSchema = scripts.find(
      (s: any) => s['@type'] === 'FAQPage'
    );
    
    if (faqSchema?.mainEntity?.length > 0) {
      const firstQuestion = faqSchema.mainEntity[0];
      
      expect(firstQuestion['@type']).toBe('Question');
      expect(firstQuestion.name).toBeTruthy();
      expect(firstQuestion.acceptedAnswer).toBeTruthy();
      expect(firstQuestion.acceptedAnswer['@type']).toBe('Answer');
      expect(firstQuestion.acceptedAnswer.text).toBeTruthy();
    }
  });
});

test.describe('HowTo Schema', () => {
  test('HowTo schema is present', async ({ page }) => {
    await page.goto('/');
    
    const scripts = await getJsonLdScripts(page);
    
    const howToSchema = scripts.find(
      (s: any) => s['@type'] === 'HowTo'
    );
    
    expect(howToSchema).toBeTruthy();
  });

  test('HowTo has steps', async ({ page }) => {
    await page.goto('/');
    
    const scripts = await getJsonLdScripts(page);
    
    const howToSchema = scripts.find(
      (s: any) => s['@type'] === 'HowTo'
    );
    
    expect(howToSchema?.step).toBeTruthy();
    expect(Array.isArray(howToSchema.step)).toBe(true);
    expect(howToSchema.step.length).toBeGreaterThan(0);
  });

  test('HowTo steps have correct structure', async ({ page }) => {
    await page.goto('/');
    
    const scripts = await getJsonLdScripts(page);
    
    const howToSchema = scripts.find(
      (s: any) => s['@type'] === 'HowTo'
    );
    
    if (howToSchema?.step?.length > 0) {
      const firstStep = howToSchema.step[0];
      
      expect(firstStep['@type']).toBe('HowToStep');
      expect(firstStep.name).toBeTruthy();
      expect(firstStep.text).toBeTruthy();
    }
  });
});

test.describe('Organization Schema', () => {
  test('Organization schema is present', async ({ page }) => {
    await page.goto('/');
    
    const scripts = await getJsonLdScripts(page);
    
    const orgSchema = scripts.find(
      (s: any) => s['@type'] === 'Organization'
    );
    
    expect(orgSchema).toBeTruthy();
  });

  test('Organization has required properties', async ({ page }) => {
    await page.goto('/');
    
    const scripts = await getJsonLdScripts(page);
    
    const orgSchema = scripts.find(
      (s: any) => s['@type'] === 'Organization'
    );
    
    if (orgSchema) {
      expect(orgSchema.name).toBeTruthy();
      expect(orgSchema.url).toBeTruthy();
    }
  });
});

test.describe('Schema Validity', () => {
  test('all JSON-LD scripts are valid JSON', async ({ page }) => {
    await page.goto('/');
    
    const validityCheck = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const results: { valid: boolean; error?: string }[] = [];
      
      scripts.forEach((script) => {
        try {
          JSON.parse(script.textContent || '');
          results.push({ valid: true });
        } catch (e) {
          results.push({ valid: false, error: String(e) });
        }
      });
      
      return results;
    });
    
    validityCheck.forEach((result) => {
      expect(result.valid).toBe(true);
    });
  });

  test('all schemas have @context', async ({ page }) => {
    await page.goto('/');
    
    const scripts = await getJsonLdScripts(page);
    
    scripts.forEach((schema: any) => {
      expect(schema['@context']).toBe('https://schema.org');
    });
  });

  test('all schemas have @type', async ({ page }) => {
    await page.goto('/');
    
    const scripts = await getJsonLdScripts(page);
    
    scripts.forEach((schema: any) => {
      expect(schema['@type']).toBeTruthy();
    });
  });
});
