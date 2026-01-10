'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

// Types
export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

// Translation dictionaries
const translations = { en, ar } as const;

// Type for nested translation keys
type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string
      ? T[K] extends object
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`
      : never
    }[keyof T]
  : never;

export type TranslationKey = NestedKeyOf<typeof en>;

// Locale configuration
export const localeConfig: Record<Locale, {
  code: Locale;
  name: string;
  nativeName: string;
  direction: Direction;
  fontFamily: string;
  dateLocale: string;
}> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    dateLocale: 'en-US',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    fontFamily: '"IBM Plex Sans Arabic", "Noto Sans Arabic", system-ui, sans-serif',
    dateLocale: 'ar-SA',
  },
};

// Context type
interface I18nContextType {
  locale: Locale;
  direction: Direction;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
  localeConfig: typeof localeConfig[Locale];
}

// Storage key for persisting locale preference
const LOCALE_STORAGE_KEY = 'voicescribe-locale';

// Get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
}

// Replace template variables in string
function interpolate(str: string, params: Record<string, string | number>): string {
  return str.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key]?.toString() ?? `{${key}}`;
  });
}

// Create context with default values
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider props
interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

/**
 * I18n Provider Component
 * 
 * Wraps the application to provide internationalization support.
 * Handles locale persistence, RTL support, and translation functions.
 */
export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  // Initialize locale from storage or default to English
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (initialLocale) return initialLocale;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (stored && (stored === 'en' || stored === 'ar')) {
        return stored;
      }
      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ar')) {
        return 'ar';
      }
    }
    return 'en';
  });

  const direction = localeConfig[locale].direction;
  const isRTL = direction === 'rtl';

  // Update locale with persistence
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  }, []);

  // Translation function
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const value = getNestedValue(translations[locale] as Record<string, unknown>, key);
    
    if (value === undefined) {
      // Fallback to English
      const fallback = getNestedValue(translations.en as Record<string, unknown>, key);
      if (fallback === undefined) {
        console.warn(`Missing translation: ${key}`);
        return key;
      }
      return params ? interpolate(fallback, params) : fallback;
    }
    
    return params ? interpolate(value, params) : value;
  }, [locale]);

  // Apply document-level attributes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      
      // Set direction and language
      html.setAttribute('dir', direction);
      html.setAttribute('lang', locale);
      
      // Add/remove RTL class for styling
      if (isRTL) {
        html.classList.add('rtl');
        html.classList.remove('ltr');
      } else {
        html.classList.add('ltr');
        html.classList.remove('rtl');
      }
      
      // Set font family
      html.style.fontFamily = localeConfig[locale].fontFamily;
    }
  }, [locale, direction, isRTL]);

  // Memoize context value
  const value = useMemo<I18nContextType>(() => ({
    locale,
    direction,
    setLocale,
    t,
    isRTL,
    localeConfig: localeConfig[locale],
  }), [locale, direction, setLocale, t, isRTL]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to access i18n context
 * 
 * @example
 * const { t, locale, setLocale, isRTL } = useI18n();
 * 
 * // Get translation
 * const title = t('hero.title');
 * 
 * // With interpolation
 * const greeting = t('greeting', { name: 'Ahmed' });
 * 
 * // Check RTL
 * if (isRTL) { ... }
 * 
 * // Switch locale
 * setLocale('ar');
 */
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

/**
 * Hook to get direction-aware CSS class names
 * Useful for RTL-specific styling
 */
export function useDirectionalClass(
  ltrClass: string,
  rtlClass: string
): string {
  const { isRTL } = useI18n();
  return isRTL ? rtlClass : ltrClass;
}

/**
 * Get the correct directional property name
 * e.g., 'left' -> 'right' in RTL, or returns same value in LTR
 */
export function useDirectionalProp<T extends string>(
  ltrValue: T,
  rtlValue: T
): T {
  const { isRTL } = useI18n();
  return isRTL ? rtlValue : ltrValue;
}

export default I18nProvider;
