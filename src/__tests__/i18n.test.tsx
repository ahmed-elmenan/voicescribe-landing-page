/**
 * i18n Language Toggle & Persistence Tests
 * 
 * Tests for:
 * - Language toggle functionality
 * - LocalStorage persistence
 * - RTL/LTR direction switching
 * - Translation loading
 */

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { LanguageToggle } from '@/components/common/LanguageToggle';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  useAnalytics: () => ({
    trackLanguageToggle: jest.fn(),
    setUserLanguage: jest.fn(),
  }),
}));

// Test component to access i18n context
function TestConsumer() {
  const { locale, direction, isRTL, t } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="direction">{direction}</span>
      <span data-testid="isRTL">{isRTL.toString()}</span>
      <span data-testid="translation">{t('hero.title')}</span>
    </div>
  );
}

describe('i18n Language System', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    // Reset document attributes
    document.documentElement.removeAttribute('dir');
    document.documentElement.removeAttribute('lang');
    document.documentElement.classList.remove('rtl', 'ltr');
  });

  describe('I18nProvider', () => {
    it('defaults to English locale', () => {
      render(
        <I18nProvider>
          <TestConsumer />
        </I18nProvider>
      );

      expect(screen.getByTestId('locale')).toHaveTextContent('en');
      expect(screen.getByTestId('direction')).toHaveTextContent('ltr');
      expect(screen.getByTestId('isRTL')).toHaveTextContent('false');
    });

    it('respects initialLocale prop', () => {
      render(
        <I18nProvider initialLocale="ar">
          <TestConsumer />
        </I18nProvider>
      );

      expect(screen.getByTestId('locale')).toHaveTextContent('ar');
      expect(screen.getByTestId('direction')).toHaveTextContent('rtl');
      expect(screen.getByTestId('isRTL')).toHaveTextContent('true');
    });

    it('loads correct translations for English', () => {
      render(
        <I18nProvider initialLocale="en">
          <TestConsumer />
        </I18nProvider>
      );

      expect(screen.getByTestId('translation')).toHaveTextContent(/voice|transcribed/i);
    });

    it('loads correct translations for Arabic', () => {
      render(
        <I18nProvider initialLocale="ar">
          <TestConsumer />
        </I18nProvider>
      );

      // Arabic title should contain Arabic characters
      const translation = screen.getByTestId('translation').textContent;
      expect(translation).toMatch(/[\u0600-\u06FF]/); // Arabic Unicode range
    });

    it('sets document direction attribute', async () => {
      render(
        <I18nProvider initialLocale="ar">
          <TestConsumer />
        </I18nProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.getAttribute('dir')).toBe('rtl');
        expect(document.documentElement.getAttribute('lang')).toBe('ar');
      });
    });

    it('adds RTL class to document when Arabic', async () => {
      render(
        <I18nProvider initialLocale="ar">
          <TestConsumer />
        </I18nProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.classList.contains('rtl')).toBe(true);
      });
    });
  });

  describe('Locale Persistence', () => {
    it('saves locale preference to localStorage', () => {
      const TestSetter = () => {
        const { setLocale } = useI18n();
        return (
          <button onClick={() => setLocale('ar')} data-testid="set-ar">
            Set Arabic
          </button>
        );
      };

      render(
        <I18nProvider initialLocale="en">
          <TestSetter />
        </I18nProvider>
      );

      fireEvent.click(screen.getByTestId('set-ar'));

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'voicescribe-locale',
        'ar'
      );
    });

    it('reads locale from localStorage on mount', () => {
      localStorageMock.getItem.mockReturnValue('ar');

      render(
        <I18nProvider>
          <TestConsumer />
        </I18nProvider>
      );

      // Note: initialLocale takes precedence, but without it, localStorage is checked
      expect(localStorageMock.getItem).toHaveBeenCalledWith('voicescribe-locale');
    });

    it('persists locale across re-renders', () => {
      const TestToggle = () => {
        const { locale, setLocale } = useI18n();
        return (
          <div>
            <span data-testid="current-locale">{locale}</span>
            <button onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}>
              Toggle
            </button>
          </div>
        );
      };

      render(
        <I18nProvider initialLocale="en">
          <TestToggle />
        </I18nProvider>
      );

      expect(screen.getByTestId('current-locale')).toHaveTextContent('en');

      fireEvent.click(screen.getByText('Toggle'));
      expect(screen.getByTestId('current-locale')).toHaveTextContent('ar');

      fireEvent.click(screen.getByText('Toggle'));
      expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    });
  });

  describe('LanguageToggle Component', () => {
    it('renders toggle button', () => {
      render(
        <I18nProvider initialLocale="en">
          <LanguageToggle />
        </I18nProvider>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('switches from English to Arabic on click', () => {
      render(
        <I18nProvider initialLocale="en">
          <LanguageToggle />
          <TestConsumer />
        </I18nProvider>
      );

      expect(screen.getByTestId('locale')).toHaveTextContent('en');

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId('locale')).toHaveTextContent('ar');
    });

    it('switches from Arabic to English on click', () => {
      render(
        <I18nProvider initialLocale="ar">
          <LanguageToggle />
          <TestConsumer />
        </I18nProvider>
      );

      expect(screen.getByTestId('locale')).toHaveTextContent('ar');

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId('locale')).toHaveTextContent('en');
    });

    it('has proper accessibility label', () => {
      render(
        <I18nProvider initialLocale="en">
          <LanguageToggle />
        </I18nProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
      expect(button.getAttribute('aria-label')).toContain('العربية');
    });

    it('persists selection to localStorage', () => {
      render(
        <I18nProvider initialLocale="en">
          <LanguageToggle />
        </I18nProvider>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'voicescribe-locale',
        'ar'
      );
    });

    describe('dropdown variant', () => {
      it('renders select dropdown', () => {
        render(
          <I18nProvider initialLocale="en">
            <LanguageToggle variant="dropdown" />
          </I18nProvider>
        );

        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      it('has both language options', () => {
        render(
          <I18nProvider initialLocale="en">
            <LanguageToggle variant="dropdown" />
          </I18nProvider>
        );

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveValue('en');
        expect(options[1]).toHaveValue('ar');
      });

      it('changes locale on selection', () => {
        render(
          <I18nProvider initialLocale="en">
            <LanguageToggle variant="dropdown" />
            <TestConsumer />
          </I18nProvider>
        );

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'ar' } });

        expect(screen.getByTestId('locale')).toHaveTextContent('ar');
      });
    });

    describe('icon variant', () => {
      it('renders icon button', () => {
        render(
          <I18nProvider initialLocale="en">
            <LanguageToggle variant="icon" />
          </I18nProvider>
        );

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Translation Function', () => {
    it('returns translation for valid key', () => {
      render(
        <I18nProvider initialLocale="en">
          <TestConsumer />
        </I18nProvider>
      );

      expect(screen.getByTestId('translation')).not.toHaveTextContent('hero.title');
    });

    it('supports nested keys', () => {
      const TestNested = () => {
        const { t } = useI18n();
        return <span data-testid="nested">{t('features.items.recording.title')}</span>;
      };

      render(
        <I18nProvider initialLocale="en">
          <TestNested />
        </I18nProvider>
      );

      expect(screen.getByTestId('nested')).not.toHaveTextContent('features.items');
    });

    it('supports interpolation', () => {
      const TestInterpolation = () => {
        const { t } = useI18n();
        return (
          <span data-testid="interpolated">
            {t('footer.copyright', { year: '2026' })}
          </span>
        );
      };

      render(
        <I18nProvider initialLocale="en">
          <TestInterpolation />
        </I18nProvider>
      );

      expect(screen.getByTestId('interpolated')).toHaveTextContent('2026');
    });

    it('falls back to English for missing Arabic translations', () => {
      const TestFallback = () => {
        const { t } = useI18n();
        // Assuming some key might be missing in Arabic
        return <span data-testid="fallback">{t('common.learnMore')}</span>;
      };

      render(
        <I18nProvider initialLocale="ar">
          <TestFallback />
        </I18nProvider>
      );

      // Should not show the key itself
      expect(screen.getByTestId('fallback')).not.toHaveTextContent('common.learnMore');
    });
  });
});
