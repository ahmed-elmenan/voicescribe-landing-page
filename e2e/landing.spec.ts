/**
 * VoiceScribe Landing Page - Core E2E Tests
 * 
 * Tests:
 * - Page loads correctly
 * - Navigation works
 * - All sections render
 * - Mobile responsiveness
 * - SEO elements present
 */

import { test, expect } from '@playwright/test';

test.describe('Landing Page Core', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/VoiceScribe/i);
  });

  test('hero section is visible', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    // Check for main headline
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    // Click Features link
    await page.click('nav a[href="#features"]');
    
    // Should scroll to features section
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();
  });

  test('all main sections are present', async ({ page }) => {
    const sections = ['features', 'how-it-works', 'pricing', 'faq'];
    
    for (const section of sections) {
      const sectionEl = page.locator(`#${section}`);
      await expect(sectionEl).toBeAttached();
    }
  });

  test('footer is visible', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeAttached();
    
    // Scroll to footer
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });

  test('has proper meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('has Open Graph tags', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toBeAttached();
    await expect(page.locator('meta[property="og:description"]')).toBeAttached();
    await expect(page.locator('meta[property="og:type"]')).toBeAttached();
  });
});

test.describe('Mobile Responsiveness', () => {
  test('mobile menu toggle works', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');
    
    await page.goto('/');
    
    // Mobile menu button should be visible
    const menuButton = page.getByRole('button', { name: /menu|navigation/i });
    await expect(menuButton).toBeVisible();
    
    // Click to open
    await menuButton.click();
    
    // Menu should be visible
    const mobileNav = page.locator('[role="dialog"], [data-mobile-menu]');
    if (await mobileNav.count() > 0) {
      await expect(mobileNav.first()).toBeVisible();
    }
  });

  test('hero CTA is accessible on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');
    
    await page.goto('/');
    
    // App Store link should be visible
    const appStoreLink = page.getByRole('link', { name: /app store|download/i }).first();
    await expect(appStoreLink).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out expected errors (e.g., third-party scripts)
    const criticalErrors = errors.filter(
      (e) => !e.includes('analytics') && !e.includes('gtag')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});
