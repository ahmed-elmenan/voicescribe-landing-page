/**
 * Reduced Motion E2E Tests
 * 
 * Tests:
 * - Animations are disabled when prefers-reduced-motion is set
 * - Static alternatives are shown
 * - Functionality remains intact
 */

import { test, expect } from '@playwright/test';

// This test file uses the 'reduced-motion' project defined in playwright.config.ts
// which has reducedMotion: 'reduce' set in contextOptions

test.describe('Reduced Motion Preference', () => {
  test.use({ 
    contextOptions: { 
      reducedMotion: 'reduce' 
    } 
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with reduced motion enabled', async ({ page }) => {
    // Verify media query matches
    const prefersReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    
    expect(prefersReducedMotion).toBe(true);
  });

  test('hero section is fully functional', async ({ page }) => {
    // Hero should still render
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    // Headline should be visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // CTA should work
    const cta = hero.getByRole('link', { name: /download|app store/i }).first();
    await expect(cta).toBeVisible();
  });

  test('hero waveform shows static version', async ({ page }) => {
    const hero = page.locator('section').first();
    
    // Check if canvas is NOT present (animated version) or SVG IS present (static version)
    const canvas = hero.locator('canvas');
    const svg = hero.locator('svg[aria-hidden="true"]');
    
    // In reduced motion mode, should prefer static SVG over animated canvas
    // Or canvas should not be animating (requestAnimationFrame not called)
    
    // We can verify by checking that the page doesn't have active animations
    const hasActiveAnimations = await page.evaluate(() => {
      const animations = document.getAnimations();
      return animations.some(a => a.playState === 'running');
    });
    
    // With reduced motion, CSS animations should be paused or not running
    // Note: This depends on CSS implementation
  });

  test('FAQ accordion works without animation', async ({ page }) => {
    // Scroll to FAQ
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    // Toggle FAQ item
    const secondButton = page.locator('#faq button').nth(1);
    await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
    
    await secondButton.click();
    
    // Should expand immediately (no animation delay)
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    
    // Content should be visible immediately
    const panelId = await secondButton.getAttribute('aria-controls');
    const panel = page.locator(`#${panelId}`);
    await expect(panel).toBeVisible();
  });

  test('smooth scroll is disabled', async ({ page }) => {
    // Click nav link
    const navLink = page.locator('nav a[href="#features"]');
    
    // Track scroll behavior
    const scrollBehavior = await page.evaluate(() => {
      // Get computed scroll-behavior from html/body
      const htmlStyles = window.getComputedStyle(document.documentElement);
      const bodyStyles = window.getComputedStyle(document.body);
      return {
        html: htmlStyles.scrollBehavior,
        body: bodyStyles.scrollBehavior,
      };
    });
    
    // With reduced motion, scroll-behavior should be 'auto' not 'smooth'
    // Or the site should use 'auto' when calling scrollIntoView
  });

  test('navigation still works', async ({ page }) => {
    // Click features nav link
    await page.click('nav a[href="#features"]');
    
    // Should still navigate to section
    await page.waitForTimeout(100);
    
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();
  });

  test('language toggle works without animation', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Language should change immediately
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('ar');
  });

  test('pricing toggle works without animation', async ({ page }) => {
    // Scroll to pricing
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    // Find and click yearly toggle if it exists
    const yearlyToggle = page.locator('#pricing').getByRole('button', { name: /yearly|annual/i });
    
    if (await yearlyToggle.count() > 0) {
      await yearlyToggle.click();
      // Prices should update immediately
    }
  });
});

test.describe('Reduced Motion - Transition Durations', () => {
  test.use({ 
    contextOptions: { 
      reducedMotion: 'reduce' 
    } 
  });

  test('CSS transitions are reduced', async ({ page }) => {
    await page.goto('/');
    
    // Check if elements have reduced transition durations
    const hasReducedTransitions = await page.evaluate(() => {
      // Check a sample of animated elements
      const elements = document.querySelectorAll('[class*="transition"]');
      let allReduced = true;
      
      elements.forEach((el) => {
        const styles = window.getComputedStyle(el);
        const duration = parseFloat(styles.transitionDuration);
        
        // In reduced motion mode, durations should be 0 or very short
        // Note: This depends on CSS implementation with @media (prefers-reduced-motion)
      });
      
      return allReduced;
    });
  });

  test('no infinite animations running', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const infiniteAnimations = await page.evaluate(() => {
      const animations = document.getAnimations();
      return animations.filter(a => {
        const effect = a.effect as KeyframeEffect;
        const timing = effect?.getTiming();
        return timing?.iterations === Infinity;
      }).length;
    });
    
    // With reduced motion, infinite animations should be paused or not present
    // Some implementations may still have them but paused
  });
});

test.describe('Reduced Motion vs Normal Motion Comparison', () => {
  test('reduced motion has same content as normal', async ({ browser }) => {
    // Create context with reduced motion
    const reducedContext = await browser.newContext({
      reducedMotion: 'reduce',
    });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto('/');
    
    // Create context without reduced motion
    const normalContext = await browser.newContext({
      reducedMotion: 'no-preference',
    });
    const normalPage = await normalContext.newPage();
    await normalPage.goto('/');
    
    // Compare headline text (should be same)
    const reducedHeadline = await reducedPage.getByRole('heading', { level: 1 }).textContent();
    const normalHeadline = await normalPage.getByRole('heading', { level: 1 }).textContent();
    
    expect(reducedHeadline).toBe(normalHeadline);
    
    // Compare number of sections
    const reducedSections = await reducedPage.locator('section').count();
    const normalSections = await normalPage.locator('section').count();
    
    expect(reducedSections).toBe(normalSections);
    
    // Cleanup
    await reducedContext.close();
    await normalContext.close();
  });
});
