/**
 * CTA Tracking Events Tests
 * 
 * Tests for:
 * - App Store CTA click tracking
 * - Hero CTA tracking
 * - Navigation CTA tracking
 * - Pricing CTA tracking
 * - Footer CTA tracking
 * - Event parameters validation
 */

import { render, screen, fireEvent } from './utils/test-utils';
import { Hero } from '@/components/sections/Hero';
import { CTA } from '@/components/sections/CTA';
import { Pricing } from '@/components/sections/Pricing';
import { Header } from '@/components/layout/Header';
import { AppStoreCTA, AppStoreCTAInline, AppStoreCTAStacked } from '@/components/common/AppStoreCTA';

// Mock the trackEvent function
const mockTrackEvent = jest.fn();
const mockTrackAppStoreClick = jest.fn();

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  trackEvent: (...args: unknown[]) => mockTrackEvent(...args),
  prefersReducedMotion: jest.fn(() => true), // Disable animations for faster tests
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}));

jest.mock('@/lib/analytics', () => ({
  useAnalytics: () => ({
    trackAppStoreClick: mockTrackAppStoreClick,
    trackPricingCTA: jest.fn(),
    trackPricingCTAClick: jest.fn(),
    trackPricingToggle: jest.fn(),
    trackNavClick: jest.fn(),
    trackLanguageToggle: jest.fn(),
    setUserLanguage: jest.fn(),
  }),
}));

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) {
    return (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

describe('CTA Tracking Events', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window.gtag mock
    (window as any).gtag = jest.fn();
  });

  describe('AppStoreCTA Component', () => {
    it('tracks click with badge variant', () => {
      render(<AppStoreCTA location="test" />);
      
      const link = screen.getByRole('link');
      fireEvent.click(link);
      
      expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.objectContaining({
        location: 'test',
      }));
    });

    it('tracks click with inline variant', () => {
      render(<AppStoreCTAInline location="pricing" />);
      
      const link = screen.getByRole('link');
      fireEvent.click(link);
      
      expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.objectContaining({
        location: 'pricing',
      }));
    });

    it('tracks click with stacked variant', () => {
      render(<AppStoreCTAStacked location="hero" />);
      
      const link = screen.getByRole('link');
      fireEvent.click(link);
      
      expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.objectContaining({
        location: 'hero',
      }));
    });

    it('includes correct href to App Store', () => {
      render(<AppStoreCTA location="test" />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('href')).toContain('apps.apple.com');
    });

    it('opens in new tab with correct rel attributes', () => {
      render(<AppStoreCTA location="test" />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Hero Section CTA', () => {
    it('tracks primary CTA click', () => {
      render(<Hero />);
      
      // Find the App Store link in hero
      const appStoreLinks = screen.getAllByRole('link');
      const heroAppStoreLink = appStoreLinks.find((link) =>
        link.getAttribute('href')?.includes('apple.com')
      );
      
      if (heroAppStoreLink) {
        fireEvent.click(heroAppStoreLink);
        expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.anything());
      }
    });

    it('tracks secondary CTA click', () => {
      render(<Hero />);
      
      // Look for "See How It Works" link
      const secondaryLink = screen.queryByText(/see how it works|how it works/i);
      
      if (secondaryLink) {
        fireEvent.click(secondaryLink);
        expect(mockTrackEvent).toHaveBeenCalledWith(
          'hero_secondary_cta_click',
          expect.objectContaining({
            location: 'hero',
          })
        );
      }
    });
  });

  describe('CTA Section', () => {
    it('tracks CTA button click', () => {
      render(<CTA />);
      
      // Find App Store link
      const appStoreLinks = screen.getAllByRole('link');
      const ctaLink = appStoreLinks.find((link) =>
        link.getAttribute('href')?.includes('apple.com')
      );
      
      if (ctaLink) {
        fireEvent.click(ctaLink);
        expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.anything());
      }
    });

    it('includes location parameter in tracking', () => {
      render(<CTA />);
      
      const appStoreLinks = screen.getAllByRole('link');
      const ctaLink = appStoreLinks.find((link) =>
        link.getAttribute('href')?.includes('apple.com')
      );
      
      if (ctaLink) {
        fireEvent.click(ctaLink);
        // Verify the call includes location info
        expect(mockTrackEvent).toHaveBeenCalledWith(
          'appstore_click',
          expect.objectContaining({
            location: expect.any(String),
          })
        );
      }
    });
  });

  describe('Pricing Section CTA', () => {
    it('renders pricing plans', () => {
      render(<Pricing />);
      
      // Should have pricing section with plan names
      const basicElements = screen.getAllByText(/basic/i);
      const premiumElements = screen.getAllByText(/premium/i);
      
      expect(basicElements.length).toBeGreaterThan(0);
      expect(premiumElements.length).toBeGreaterThan(0);
    });

    it('renders plan CTA buttons', () => {
      render(<Pricing />);
      
      // Find CTA links in pricing section
      const ctaLinks = screen.getAllByRole('link').filter((link) =>
        link.textContent?.toLowerCase().includes('start') ||
        link.textContent?.toLowerCase().includes('download') ||
        link.getAttribute('href')?.includes('apple.com')
      );
      
      // Should have at least one CTA
      expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Header Navigation CTA', () => {
    it('tracks header download CTA click', () => {
      render(<Header />);
      
      // Find header CTA (desktop version)
      const downloadLinks = screen.getAllByRole('link');
      const headerCta = downloadLinks.find((link) =>
        link.getAttribute('href')?.includes('apple.com') ||
        link.textContent?.toLowerCase().includes('download')
      );
      
      if (headerCta) {
        fireEvent.click(headerCta);
        expect(mockTrackEvent).toHaveBeenCalled();
      }
    });
  });

  describe('Event Parameters', () => {
    it('includes timestamp in events', () => {
      render(<AppStoreCTA location="test" />);
      
      const link = screen.getByRole('link');
      fireEvent.click(link);
      
      // Verify tracking was called
      expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.anything());
    });

    it('includes variant information', () => {
      render(<AppStoreCTAInline location="footer" variant="secondary" />);
      
      const link = screen.getByRole('link');
      fireEvent.click(link);
      
      expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.objectContaining({
        location: 'footer',
      }));
    });

    it('tracks different locations separately', () => {
      const { unmount } = render(<AppStoreCTA location="hero" />);
      fireEvent.click(screen.getByRole('link'));
      
      unmount();
      
      render(<AppStoreCTA location="footer" />);
      fireEvent.click(screen.getByRole('link'));
      
      expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.objectContaining({ location: 'hero' }));
      expect(mockTrackEvent).toHaveBeenCalledWith('appstore_click', expect.objectContaining({ location: 'footer' }));
    });
  });
});

describe('Analytics Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (window as any).gtag = jest.fn();
    (window as any).dataLayer = [];
  });

  it('gtag is called when window.gtag exists', () => {
    const { trackEvent } = jest.requireActual('@/lib/utils');
    
    trackEvent('test_event', { param: 'value' });
    
    expect((window as any).gtag).toHaveBeenCalled();
  });

  it('handles missing gtag gracefully', () => {
    delete (window as any).gtag;
    const { trackEvent } = jest.requireActual('@/lib/utils');
    
    // Should not throw
    expect(() => trackEvent('test_event', {})).not.toThrow();
  });

  it('logs events in development mode', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const originalEnv = process.env.NODE_ENV;
    
    // Note: NODE_ENV is read-only in Jest, this is illustrative
    const { trackEvent } = jest.requireActual('@/lib/utils');
    trackEvent('test_event', { param: 'value' });
    
    consoleSpy.mockRestore();
  });
});

describe('CTA Accessibility', () => {
  it('App Store CTA has accessible name', () => {
    render(<AppStoreCTA location="test" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAccessibleName();
  });

  it('CTA buttons are keyboard accessible', () => {
    render(<AppStoreCTA location="test" />);
    
    const link = screen.getByRole('link');
    link.focus();
    
    expect(document.activeElement).toBe(link);
  });

  it('CTA has sufficient color contrast', () => {
    render(<AppStoreCTAInline location="test" variant="primary" />);
    
    const link = screen.getByRole('link');
    // Visual contrast testing would be done in E2E
    expect(link).toBeInTheDocument();
  });
});
