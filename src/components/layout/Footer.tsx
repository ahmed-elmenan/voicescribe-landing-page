'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo';
import { cn, trackEvent } from '@/lib/utils';

// Footer link groups
const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
  support: [
    { label: 'Contact Us', href: 'mailto:support@futurevisionapps.com' },
    { label: 'Help Center', href: '/help' },
    { label: 'Report a Bug', href: 'mailto:support@futurevisionapps.com?subject=Bug%20Report' },
    { label: 'Feature Request', href: 'mailto:support@futurevisionapps.com?subject=Feature%20Request' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press Kit', href: '/press' },
  ],
};

// Social links with icons
const socialLinks = [
  {
    name: 'Twitter',
    href: siteConfig.links.twitter,
    icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
  },
  {
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    fillRule: 'evenodd' as const,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/voicescribeapp',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@voicescribeapp',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

// Newsletter subscription (optional)
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    trackEvent('newsletter_subscribe', { email });
    setStatus('success');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="footer-email" className="sr-only">Email address</label>
      <div className="flex gap-2">
        <input
          type="email"
          id="footer-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            'flex-1 px-4 py-2 text-sm rounded-lg border bg-surface-dark-tertiary border-transparent',
            'text-text-dark-primary placeholder:text-text-dark-quaternary',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'disabled:opacity-50'
          )}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
            'bg-primary text-white hover:bg-primary-dark',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-dark-secondary',
            'disabled:opacity-50'
          )}
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed' : 'Subscribe'}
        </button>
      </div>
      {status === 'success' && (
        <p className="mt-2 text-sm text-accent-green">Thanks for subscribing!</p>
      )}
    </form>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-surface-dark-secondary text-text-dark-primary" 
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer Content */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div 
            className={cn(
              'col-span-2 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2.5 font-bold text-xl mb-4 group"
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
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-text-dark-tertiary text-sm mb-6 max-w-xs">
              Turn audio and YouTube links into clean, searchable notes — fast. Available on iOS.
            </p>
            
            {/* App Store Badge */}
            <Link
              href={siteConfig.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
              aria-label="Download on the App Store"
              onClick={() => trackEvent('footer_appstore_click')}
            >
              <img
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={135}
                height={45}
                loading="lazy"
              />
            </Link>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-text-dark-primary mb-2">
                Stay Updated
              </h3>
              <p className="text-xs text-text-dark-tertiary mb-2">
                Get notified about new features and updates.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Product Links */}
          <nav 
            className={cn(
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: '100ms' }}
            aria-label="Product navigation"
          >
            <h3 className="font-semibold mb-4 text-text-dark-primary">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-dark-tertiary hover:text-text-dark-primary transition-colors text-sm inline-flex items-center gap-1 group"
                    onClick={() => trackEvent('footer_link_click', { link: link.label })}
                  >
                    <span>{link.label}</span>
                    <svg 
                      className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support Links */}
          <nav 
            className={cn(
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: '150ms' }}
            aria-label="Support navigation"
          >
            <h3 className="font-semibold mb-4 text-text-dark-primary">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-dark-tertiary hover:text-text-dark-primary transition-colors text-sm inline-flex items-center gap-1 group"
                    onClick={() => trackEvent('footer_link_click', { link: link.label })}
                  >
                    <span>{link.label}</span>
                    {link.href.startsWith('mailto:') && (
                      <svg className="w-3 h-3 text-text-dark-quaternary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav 
            className={cn(
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: '200ms' }}
            aria-label="Legal navigation"
          >
            <h3 className="font-semibold mb-4 text-text-dark-primary">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-dark-tertiary hover:text-text-dark-primary transition-colors text-sm"
                    onClick={() => trackEvent('footer_link_click', { link: link.label })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav 
            className={cn(
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: '250ms' }}
            aria-label="Company navigation"
          >
            <h3 className="font-semibold mb-4 text-text-dark-primary">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-dark-tertiary hover:text-text-dark-primary transition-colors text-sm"
                    onClick={() => trackEvent('footer_link_click', { link: link.label })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-dark-tertiary">
        <div className="container-wide py-6">
          <div 
            className={cn(
              'flex flex-col md:flex-row justify-between items-center gap-4',
              'transition-all duration-700',
              isVisible ? 'opacity-100' : 'opacity-0'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Copyright */}
            <p className="text-text-dark-tertiary text-sm text-center md:text-left">
              © {currentYear} {siteConfig.creator}. All rights reserved.
            </p>

            {/* Social Links */}
            <nav aria-label="Social media links">
              <ul className="flex items-center gap-4">
                {socialLinks.map(social => (
                  <li key={social.name}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center',
                        'bg-surface-dark-tertiary text-text-dark-tertiary',
                        'hover:bg-primary hover:text-white transition-all',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark-secondary'
                      )}
                      aria-label={`Follow us on ${social.name}`}
                      onClick={() => trackEvent('social_click', { platform: social.name })}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        aria-hidden="true"
                      >
                        <path 
                          d={social.icon}
                          fillRule={social.fillRule}
                          clipRule={social.fillRule ? 'evenodd' : undefined}
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={cn(
                'hidden md:flex items-center gap-2 text-sm text-text-dark-tertiary',
                'hover:text-text-dark-primary transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 py-1'
              )}
              aria-label="Scroll to top of page"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
