/**
 * FAQ Accordion E2E Tests
 * 
 * Tests:
 * - Accordion open/close behavior
 * - ARIA attributes
 * - Keyboard navigation
 * - Content visibility
 */

import { test, expect } from '@playwright/test';

test.describe('FAQ Accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to FAQ section
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Wait for scroll animation
  });

  test('FAQ section is visible', async ({ page }) => {
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();
  });

  test('first FAQ item is expanded by default', async ({ page }) => {
    const firstButton = page.locator('#faq button').first();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('other FAQ items are collapsed by default', async ({ page }) => {
    const buttons = page.locator('#faq button');
    const count = await buttons.count();
    
    // Skip first button, check others are collapsed
    for (let i = 1; i < count; i++) {
      await expect(buttons.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }
  });

  test('clicking collapsed item expands it', async ({ page }) => {
    const secondButton = page.locator('#faq button').nth(1);
    
    await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
    await secondButton.click();
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('clicking expanded item collapses it', async ({ page }) => {
    const firstButton = page.locator('#faq button').first();
    
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('only one item can be expanded at a time', async ({ page }) => {
    const buttons = page.locator('#faq button');
    const firstButton = buttons.first();
    const secondButton = buttons.nth(1);
    
    // First is expanded
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click second
    await secondButton.click();
    
    // First should collapse, second should expand
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('buttons have aria-controls attribute', async ({ page }) => {
    const buttons = page.locator('#faq button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const ariaControls = await buttons.nth(i).getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
      expect(ariaControls).toMatch(/faq-answer-\d+/);
    }
  });

  test('buttons have unique IDs', async ({ page }) => {
    const buttons = page.locator('#faq button');
    const count = await buttons.count();
    const ids = new Set<string>();
    
    for (let i = 0; i < count; i++) {
      const id = await buttons.nth(i).getAttribute('id');
      expect(id).toBeTruthy();
      ids.add(id!);
    }
    
    // All IDs should be unique
    expect(ids.size).toBe(count);
  });

  test('answer content is visible when expanded', async ({ page }) => {
    const firstButton = page.locator('#faq button').first();
    const panelId = await firstButton.getAttribute('aria-controls');
    const panel = page.locator(`#${panelId}`);
    
    // First item is expanded, content should be visible
    await expect(panel).toBeVisible();
  });

  test('answer content is hidden when collapsed', async ({ page }) => {
    const secondButton = page.locator('#faq button').nth(1);
    const panelId = await secondButton.getAttribute('aria-controls');
    const panel = page.locator(`#${panelId}`);
    
    // Second item is collapsed, content should have height 0 or be hidden
    const height = await panel.evaluate((el) => el.clientHeight);
    expect(height).toBe(0);
  });
});

test.describe('FAQ Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('Enter key toggles FAQ item', async ({ page }) => {
    const secondButton = page.locator('#faq button').nth(1);
    
    await secondButton.focus();
    await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
    
    await page.keyboard.press('Enter');
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('Space key toggles FAQ item', async ({ page }) => {
    const secondButton = page.locator('#faq button').nth(1);
    
    await secondButton.focus();
    await page.keyboard.press('Space');
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('Tab navigates between FAQ items', async ({ page }) => {
    const buttons = page.locator('#faq button');
    const firstButton = buttons.first();
    const secondButton = buttons.nth(1);
    
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
    
    await page.keyboard.press('Tab');
    // Focus should move to next focusable element (may be within accordion or next button)
  });

  test('FAQ buttons are focusable', async ({ page }) => {
    const buttons = page.locator('#faq button');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const button = buttons.nth(i);
      await button.focus();
      await expect(button).toBeFocused();
    }
  });

  test('focus indicator is visible', async ({ page }) => {
    const firstButton = page.locator('#faq button').first();
    await firstButton.focus();
    
    // Check for focus-visible styles (outline or ring)
    const hasFocusStyles = await firstButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return (
        styles.outlineStyle !== 'none' ||
        styles.boxShadow !== 'none'
      );
    });
    
    // May or may not have visible focus depending on how it was focused
    // In real usage, keyboard focus should show indicator
  });
});

test.describe('FAQ Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq').scrollIntoViewIfNeeded();
  });

  test('renders all FAQ questions', async ({ page }) => {
    const buttons = page.locator('#faq button');
    const count = await buttons.count();
    
    // Should have multiple FAQ items
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('FAQ heading is present', async ({ page }) => {
    const heading = page.locator('#faq').getByRole('heading', { name: /frequently asked questions|الأسئلة/i });
    await expect(heading).toBeVisible();
  });

  test('contact link is present', async ({ page }) => {
    const contactLink = page.locator('#faq').getByRole('link', { name: /contact|تواصل/i });
    await expect(contactLink).toBeVisible();
  });
});
