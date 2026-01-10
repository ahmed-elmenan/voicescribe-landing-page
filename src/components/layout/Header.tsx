'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { navItems, siteConfig } from '@/lib/seo';
import { cn, trackEvent } from '@/lib/utils';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import { useI18n } from '@/lib/i18n';

// Navigation items with icons for mobile (icons and hrefs)
const navItemsConfig = [
  { href: '#features', labelKey: 'nav.features', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { href: '#pricing', labelKey: 'nav.pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '#how-it-works', labelKey: 'nav.howItWorks', icon: 'M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '#faq', labelKey: 'nav.faq', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { t, direction } = useI18n();
  // Handle scroll for header styling and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Detect active section
      const sections = ['features', 'pricing', 'how-it-works', 'faq'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((href: string) => {
    trackEvent('nav_click', { destination: href });
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to section
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-soft' 
            : 'bg-white/50 backdrop-blur-sm'
        )}
        role="banner"
      >
        <nav className="container-wide" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl text-text-primary group"
              aria-label={`${siteConfig.name} - Home`}
            >
              <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <span className="hidden sm:inline">{siteConfig.name}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1" role="menubar">
              {navItemsConfig.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    'hover:bg-surface-secondary hover:text-primary',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    activeSection === item.href 
                      ? 'text-primary bg-primary/5' 
                      : 'text-text-secondary'
                  )}
                  role="menuitem"
                  aria-current={activeSection === item.href ? 'page' : undefined}
                >
                  {t(item.labelKey)}
                  {activeSection === item.href && (
                    <span className={cn(
                      "absolute bottom-0 w-1 h-1 bg-primary rounded-full",
                      direction === 'rtl' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                    )} />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button & Language Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle variant="icon" />
              <Link
                href={siteConfig.appStoreUrl}
                onClick={() => trackEvent('header_cta_click')}
                className="btn-primary text-sm inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t('nav.download')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={cn(
                'md:hidden p-2 rounded-lg transition-colors',
                'hover:bg-surface-secondary',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isMobileMenuOpen ? 'text-primary' : 'text-text-secondary'
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="fixed top-16 left-0 right-0 bottom-0 md:hidden bg-white z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="p-4" aria-label="Mobile navigation">
            <ul className="space-y-1" role="menu">
              {navItemsConfig.map((item, index) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      'flex items-center gap-3 px-4 py-4 rounded-xl transition-all',
                      'hover:bg-surface-secondary',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                      activeSection === item.href 
                        ? 'bg-primary/5 text-primary' 
                        : 'text-text-primary'
                    )}
                    role="menuitem"
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      activeSection === item.href 
                        ? 'bg-primary text-white' 
                        : 'bg-surface-secondary text-text-tertiary'
                    )}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </span>
                    <span className="font-medium">{t(item.labelKey)}</span>
                    {activeSection === item.href && (
                      <span className={cn(
                        "text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full",
                        direction === 'rtl' ? 'mr-auto' : 'ml-auto'
                      )}>
                        {t('nav.current')}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Toggle in Mobile */}
            <div className="mt-4 px-4">
              <LanguageToggle variant="text" className="w-full justify-center" />
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 pt-6 border-t border-separator">
              <Link
                href={siteConfig.appStoreUrl}
                onClick={() => trackEvent('mobile_cta_click')}
                className={cn(
                  "btn-primary w-full justify-center text-base py-4",
                  direction === 'rtl' ? 'flex-row-reverse' : ''
                )}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <svg className={cn("w-5 h-5", direction === 'rtl' ? 'ml-2' : 'mr-2')} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t('nav.downloadOnAppStore')}
              </Link>
              
              {/* Quick links in mobile */}
              <div className="flex justify-center gap-4 mt-6 text-sm text-text-tertiary">
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
                <span>•</span>
                <Link href="mailto:support@futurevisionapps.com" className="hover:text-primary transition-colors">
                  {t('footer.support')}
                </Link>
              </div>
            </div>
          </nav>
          </div>
        )}
      </header>
    </>
  );
}
