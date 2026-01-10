'use client';

import { useI18n, localeConfig, Locale } from '@/lib/i18n';
import { useAnalytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'icon' | 'text' | 'dropdown';
  showLabel?: boolean;
}

/**
 * Language Toggle Component
 * 
 * Allows users to switch between English and Arabic.
 * Persists preference to localStorage.
 */
export function LanguageToggle({ 
  className,
  variant = 'text',
  showLabel = false,
}: LanguageToggleProps) {
  const { locale, setLocale, t, isRTL } = useI18n();
  const { trackLanguageToggle, setUserLanguage } = useAnalytics();

  const handleToggle = () => {
    const newLocale: Locale = locale === 'en' ? 'ar' : 'en';
    trackLanguageToggle(locale, newLocale);
    setUserLanguage(newLocale);
    setLocale(newLocale);
  };

  const handleDropdownChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      trackLanguageToggle(locale, newLocale);
      setUserLanguage(newLocale);
      setLocale(newLocale);
    }
  };

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const otherConfig = localeConfig[otherLocale];

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'p-2 rounded-lg transition-colors',
          'hover:bg-surface-secondary',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        aria-label={t('languageToggle.switchTo', { language: otherConfig.nativeName })}
        title={t('languageToggle.switchTo', { language: otherConfig.nativeName })}
      >
        <svg
          className="w-5 h-5 text-text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      </button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <select
          value={locale}
          onChange={(e) => handleDropdownChange(e.target.value as Locale)}
          className={cn(
            'appearance-none bg-surface-secondary rounded-lg px-4 py-2 pe-8',
            'text-sm font-medium text-text-primary',
            'border border-separator',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'cursor-pointer'
          )}
          aria-label={t('languageToggle.label')}
        >
          <option value="en">{localeConfig.en.nativeName}</option>
          <option value="ar">{localeConfig.ar.nativeName}</option>
        </select>
        <svg
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none',
            isRTL ? 'left-2' : 'right-2'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    );
  }

  // Default: text toggle button
  return (
    <button
      onClick={handleToggle}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg',
        'text-sm font-medium transition-all',
        'bg-surface-secondary hover:bg-surface-tertiary',
        'border border-separator',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      aria-label={t('languageToggle.switchTo', { language: otherConfig.nativeName })}
    >
      {showLabel && (
        <span className="text-text-tertiary">{t('common.language')}:</span>
      )}
      <span className={cn(
        'transition-opacity',
        locale === 'en' ? 'opacity-100' : 'opacity-50'
      )}>
        EN
      </span>
      <span className="text-text-quaternary">/</span>
      <span className={cn(
        'transition-opacity',
        locale === 'ar' ? 'opacity-100' : 'opacity-50'
      )}>
        عربي
      </span>
    </button>
  );
}

export default LanguageToggle;
