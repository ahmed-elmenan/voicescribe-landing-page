/**
 * i18n Language Toggle E2E Tests
 * 
 * Tests:
 * - Language toggle visibility
 * - Language switching
 * - Persistence across page reload
 * - RTL layout for Arabic
 * - Content translation
 */

import { test, expect } from '@playwright/test';

test.describe('Language Toggle & i18n', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('language toggle is visible', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /language|عربي|en/i });
    await expect(toggle).toBeVisible();
  });

  test('defaults to English', async ({ page }) => {
    // Check document lang attribute
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('en');
    
    // Check direction
    const dir = await page.getAttribute('html', 'dir');
    expect(dir).toBe('ltr');
  });

  test('switches to Arabic on toggle click', async ({ page }) => {
    // Find and click language toggle
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    // Wait for language change
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Verify Arabic is active
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('ar');
    
    // Verify RTL
    const dir = await page.getAttribute('html', 'dir');
    expect(dir).toBe('rtl');
  });

  test('persists language preference across reload', async ({ page }) => {
    // Switch to Arabic
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Reload page
    await page.reload();
    
    // Should still be Arabic
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('ar');
  });

  test('persists language across navigation', async ({ page }) => {
    // Switch to Arabic
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Navigate to a section
    await page.click('nav a[href="#features"]');
    
    // Language should persist
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('ar');
  });

  test('displays Arabic content when switched', async ({ page }) => {
    // Switch to Arabic
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Check for Arabic text (hero section)
    const arabicText = page.getByText(/صوتك|فوري|حمّل/);
    await expect(arabicText.first()).toBeVisible();
  });

  test('toggles back to English', async ({ page }) => {
    // Switch to Arabic first
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Toggle back
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'en');
    
    // Verify English
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('en');
  });

  test('RTL layout applies correctly', async ({ page }) => {
    // Switch to Arabic
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Check that RTL class is added
    const hasRtlClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('rtl');
    });
    expect(hasRtlClass).toBe(true);
  });

  test('localStorage stores correct key', async ({ page }) => {
    // Switch to Arabic
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Check localStorage
    const storedLocale = await page.evaluate(() => {
      return localStorage.getItem('voicescribe-locale');
    });
    expect(storedLocale).toBe('ar');
  });
});

test.describe('i18n Content Verification', () => {
  test('English hero content is correct', async ({ page }) => {
    await page.goto('/');
    
    // Check hero headline
    const headline = page.getByRole('heading', { level: 1 });
    await expect(headline).toContainText(/voice|transcribed/i);
  });

  test('Arabic hero content is correct', async ({ page }) => {
    await page.goto('/');
    
    // Switch to Arabic
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Check for Arabic headline
    const headline = page.getByRole('heading', { level: 1 });
    await expect(headline).toContainText(/صوتك|فوري/);
  });

  test('navigation labels translate correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check English nav
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible();
    
    // Switch to Arabic
    const toggle = page.getByRole('button', { name: /عربي|arabic|language/i }).first();
    await toggle.click();
    
    await page.waitForFunction(() => document.documentElement.lang === 'ar');
    
    // Check Arabic nav (المزايا = Features)
    await expect(page.getByRole('link', { name: 'المزايا' })).toBeVisible();
  });
});
