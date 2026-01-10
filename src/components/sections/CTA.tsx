import Link from 'next/link';
import { siteConfig } from '@/lib/seo';
import { trackEvent } from '@/lib/utils';
import { AppStoreCTAInline } from '@/components/common/AppStoreCTA';

export function CTA() {
  return (
    <section id="download" className="section" aria-labelledby="cta-heading">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-primary p-8 md:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2
              id="cta-heading"
              className="text-display-sm md:text-display font-bold text-white mb-4"
            >
              Ready to transform your audio workflow?
            </h2>
            <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join 50,000+ users who've already made the switch. Download VoiceScribe today and
              start transcribing smarter.
            </p>

            {/* CTA Button - Using AppStoreCTAInline */}
            <AppStoreCTAInline 
              variant="white" 
              size="lg" 
              location="bottom_cta"
              text="Download on the App Store"
            />

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-sm font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <span className="text-sm font-medium">Cloud Sync</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
