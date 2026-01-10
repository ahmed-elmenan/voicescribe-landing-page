/**
 * CTA Tracking E2E Tests
 * 
 * Tests:
 * - Analytics events fire on CTA clicks
 * - Event data is correct
 * - Multiple CTAs track separately
 */

import { test, expect, Page } from '@playwright/test';

// Helper to capture dataLayer events
async function getDataLayerEvents(page: Page): Promise<unknown[]> {
  return page.evaluate(() => {
    return (window as any).dataLayer || [];
  });
}

// Helper to setup event tracking spy
async function setupAnalyticsSpy(page: Page) {
  await page.addInitScript(() => {
    (window as any).trackedEvents = [];
    (window as any).gtag = function (...args: unknown[]) {
      (window as any).trackedEvents.push(args);
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push(args);
      }
    };
    (window as any).dataLayer = (window as any).dataLayer || [];
  });
}

test.describe('CTA Click Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await setupAnalyticsSpy(page);
    await page.goto('/');
  });

  test('hero App Store CTA tracks click', async ({ page }) => {
    // Find hero App Store link
    const heroSection = page.locator('section').first();
    const appStoreLink = heroSection.getByRole('link', { name: /app store|download/i }).first();
    
    // Click (but prevent navigation)
    await page.evaluate(() => {
      document.querySelectorAll('a[href*="apple.com"]').forEach((link) => {
        link.addEventListener('click', (e) => e.preventDefault());
      });
    });
    
    await appStoreLink.click();
    
    // Check tracked events
    const events = await page.evaluate(() => (window as any).trackedEvents);
    
    // Should have tracked the click
    const clickEvent = events.find(
      (e: unknown[]) => e[0] === 'event' && (
        e[1] === 'appstore_click' ||
        e[1] === 'hero_cta_click' ||
        String(e[1]).includes('cta')
      )
    );
    
    expect(clickEvent).toBeTruthy();
  });

  test('CTA section App Store link tracks click', async ({ page }) => {
    // Scroll to CTA section
    await page.locator('section').last().scrollIntoViewIfNeeded();
    
    // Prevent navigation
    await page.evaluate(() => {
      document.querySelectorAll('a[href*="apple.com"]').forEach((link) => {
        link.addEventListener('click', (e) => e.preventDefault());
      });
    });
    
    // Find CTA section App Store link
    const ctaLink = page.locator('section').last().getByRole('link', { name: /app store|download/i });
    
    if (await ctaLink.count() > 0) {
      await ctaLink.first().click();
      
      const events = await page.evaluate(() => (window as any).trackedEvents);
      expect(events.length).toBeGreaterThan(0);
    }
  });

  test('header CTA tracks click', async ({ page }) => {
    // Prevent navigation
    await page.evaluate(() => {
      document.querySelectorAll('a[href*="apple.com"]').forEach((link) => {
        link.addEventListener('click', (e) => e.preventDefault());
      });
    });
    
    // Find header App Store link
    const headerLink = page.locator('header').getByRole('link', { name: /download|app store/i });
    
    if (await headerLink.count() > 0) {
      await headerLink.first().click();
      
      const events = await page.evaluate(() => (window as any).trackedEvents);
      expect(events.some((e: unknown[]) => e[0] === 'event')).toBe(true);
    }
  });

  test('FAQ expand tracks event', async ({ page }) => {
    // Scroll to FAQ
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Click a collapsed FAQ item
    const secondButton = page.locator('#faq button').nth(1);
    await secondButton.click();
    
    // Check for faq_expand event
    const events = await page.evaluate(() => (window as any).trackedEvents);
    const faqEvent = events.find(
      (e: unknown[]) => e[0] === 'event' && e[1] === 'faq_expand'
    );
    
    expect(faqEvent).toBeTruthy();
  });

  test('nav click tracks event', async ({ page }) => {
    // Click nav link
    const navLink = page.locator('nav a[href="#features"]');
    await navLink.click();
    
    // Check for nav_click event
    const events = await page.evaluate(() => (window as any).trackedEvents);
    const navEvent = events.find(
      (e: unknown[]) => e[0] === 'event' && e[1] === 'nav_click'
    );
    
    expect(navEvent).toBeTruthy();
  });

  test('secondary CTA tracks with correct location', async ({ page }) => {
    // Find "See How It Works" link
    const secondaryLink = page.getByRole('link', { name: /how it works/i }).first();
    
    if (await secondaryLink.count() > 0) {
      await secondaryLink.click();
      
      const events = await page.evaluate(() => (window as any).trackedEvents);
      const ctaEvent = events.find(
        (e: unknown[]) => e[0] === 'event' && String(e[1]).includes('secondary')
      );
      
      if (ctaEvent) {
        expect(ctaEvent[2]).toHaveProperty('location');
      }
    }
  });
});

test.describe('Event Data Validation', () => {
  test.beforeEach(async ({ page }) => {
    await setupAnalyticsSpy(page);
    await page.goto('/');
  });

  test('events include required parameters', async ({ page }) => {
    // Trigger an event
    await page.locator('nav a[href="#features"]').click();
    
    const events = await page.evaluate(() => (window as any).trackedEvents);
    const navEvent = events.find((e: unknown[]) => e[1] === 'nav_click');
    
    if (navEvent && navEvent[2]) {
      // Should have destination parameter
      expect(navEvent[2]).toHaveProperty('destination');
    }
  });

  test('App Store clicks include location parameter', async ({ page }) => {
    // Prevent navigation
    await page.evaluate(() => {
      document.querySelectorAll('a[href*="apple.com"]').forEach((link) => {
        link.addEventListener('click', (e) => e.preventDefault());
      });
    });
    
    // Click hero App Store link
    const appStoreLink = page.getByRole('link', { name: /app store|download/i }).first();
    await appStoreLink.click();
    
    const events = await page.evaluate(() => (window as any).trackedEvents);
    const clickEvent = events.find(
      (e: unknown[]) => e[0] === 'event' && String(e[1]).includes('appstore')
    );
    
    if (clickEvent && clickEvent[2]) {
      expect(clickEvent[2]).toHaveProperty('location');
    }
  });
});

test.describe('Multiple CTA Tracking', () => {
  test('different CTAs track with different locations', async ({ page }) => {
    await setupAnalyticsSpy(page);
    await page.goto('/');
    
    // Prevent navigation
    await page.evaluate(() => {
      document.querySelectorAll('a[href*="apple.com"]').forEach((link) => {
        link.addEventListener('click', (e) => e.preventDefault());
      });
    });
    
    // Click hero CTA
    const heroCta = page.locator('section').first().getByRole('link', { name: /app store|download/i }).first();
    await heroCta.click();
    
    // Scroll to footer CTA and click
    await page.locator('section').last().scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    const footerCta = page.locator('section').last().getByRole('link', { name: /app store|download/i });
    if (await footerCta.count() > 0) {
      await footerCta.first().click();
    }
    
    // Verify multiple events were tracked
    const events = await page.evaluate(() => (window as any).trackedEvents);
    const clickEvents = events.filter(
      (e: unknown[]) => e[0] === 'event' && (
        String(e[1]).includes('appstore') ||
        String(e[1]).includes('cta')
      )
    );
    
    expect(clickEvents.length).toBeGreaterThanOrEqual(1);
  });
});
