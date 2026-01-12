'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics';

// Plan definitions matching the Flutter app
type PlanFeature = {
  name: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  periodShort: string;
  features: PlanFeature[];
  cta: string;
  highlighted: boolean;
  badge?: string;
  savings?: string;
};

const plans: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Basic voice note recording and transcription',
    price: 0,
    period: '',
    periodShort: '',
    features: [
      { name: 'Record 3 free voice notes', included: true },
      { name: 'Maximum 60 minutes total', included: true },
      { name: 'Basic transcription', included: true },
      { name: 'Local storage only', included: true },
      { name: '2 YouTube transcriptions', included: true },
      { name: 'File uploads', included: false },
      { name: 'Multi-speaker detection', included: false },
      { name: 'Cloud sync', included: false },
    ],
    cta: 'Download Free',
    highlighted: false,
  },
  weekly: {
    id: 'weekly',
    name: 'Weekly',
    description: 'Try premium before you commit',
    price: 2.99,
    period: '/week',
    periodShort: 'wk',
    features: [
      { name: 'Unlimited voice notes', included: true },
      { name: 'Up to 60 min per recording', included: true },
      { name: 'Advanced transcription', included: true },
      { name: 'Export to multiple formats', included: true },
      { name: 'YouTube transcription', included: true },
      { name: 'File uploads transcription', included: true },
      { name: 'Multi-speaker detection', included: true },
      { name: 'Cloud sync & backup', included: true },
      { name: 'AI summary generation', included: true },
      { name: 'Key insights extraction', included: true },
      { name: 'Priority support', included: true },
    ],
    cta: 'Start Weekly',
    highlighted: false,
  },
  yearly: {
    id: 'yearly',
    name: 'Yearly',
    description: 'Best value – huge savings',
    price: 98.99,
    period: '/year',
    periodShort: 'yr',
    features: [
      { name: 'Everything in Weekly', included: true },
      { name: 'Unlimited recording duration', included: true },
      { name: 'AI-powered audio enhancement', included: true },
      { name: 'Advanced search & filtering', included: true },
      { name: 'Bulk export features', included: true },
      { name: 'Priority support', included: true },
      { name: 'Early access to new features', included: true },
      { name: 'Save over 65% vs weekly', included: true },
    ],
    cta: 'Start Yearly',
    highlighted: true,
    badge: 'Best Value',
    savings: 'Save 65%',
  },
};

// Comparison table features - 4 columns: Feature, Free, Weekly, Yearly
const comparisonFeatures = [
  { 
    category: 'Recording & Storage',
    features: [
      { name: 'Voice Notes', free: '3 notes', weekly: 'Unlimited', yearly: 'Unlimited' },
      { name: 'Recording Duration', free: '60 min total', weekly: '60 min/recording', yearly: 'Unlimited' },
      { name: 'Cloud Storage', free: false, weekly: true, yearly: true },
      { name: 'Cloud Sync & Backup', free: false, weekly: true, yearly: true },
    ]
  },
  {
    category: 'Transcription',
    features: [
      { name: 'Basic Transcription', free: true, weekly: true, yearly: true },
      { name: 'Advanced Transcription', free: false, weekly: true, yearly: true },
      { name: 'Multi-Speaker Detection', free: false, weekly: true, yearly: true },
      { name: '50+ Languages', free: true, weekly: true, yearly: true },
    ]
  },
  {
    category: 'Import Sources',
    features: [
      { name: 'Voice Recording', free: true, weekly: true, yearly: true },
      { name: 'File Uploads', free: false, weekly: true, yearly: true },
      { name: 'YouTube Transcription', free: '2 videos', weekly: 'Unlimited', yearly: 'Unlimited' },
    ]
  },
  {
    category: 'AI Features',
    features: [
      { name: 'AI Summary Generation', free: false, weekly: true, yearly: true },
      { name: 'Key Insights Extraction', free: false, weekly: true, yearly: true },
      { name: 'AI Audio Enhancement', free: false, weekly: false, yearly: true },
    ]
  },
  {
    category: 'Export & Organization',
    features: [
      { name: 'Export Formats', free: 'Basic', weekly: 'All formats', yearly: 'All formats' },
      { name: 'Bulk Export', free: false, weekly: false, yearly: true },
      { name: 'Advanced Search', free: false, weekly: false, yearly: true },
      { name: 'Custom Categories', free: false, weekly: true, yearly: true },
    ]
  },
  {
    category: 'Support',
    features: [
      { name: 'Priority Support', free: false, weekly: true, yearly: true },
      { name: 'Early Access Features', free: false, weekly: true, yearly: true },
    ]
  },
];

// Feature check/x icon
function FeatureIcon({ included, highlighted }: { included: boolean; highlighted?: boolean }) {
  if (included) {
    return (
      <svg
        className={cn(
          'w-5 h-5 flex-shrink-0',
          highlighted ? 'text-white' : 'text-accent-green'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  return (
    <svg
      className={cn(
        'w-5 h-5 flex-shrink-0',
        highlighted ? 'text-white/30' : 'text-text-quaternary'
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// Price display
function PriceDisplay({ 
  plan, 
  isVisible
}: { 
  plan: Plan; 
  isVisible: boolean;
}) {
  return (
    <div className="text-center mb-6">
      <div className="flex items-baseline justify-center gap-1">
        <span 
          className={cn(
            'text-5xl font-bold transition-all duration-500',
            plan.highlighted ? 'text-white' : 'text-text-primary',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          {plan.price === 0 ? 'Free' : `$${plan.price.toFixed(2)}`}
        </span>
        {plan.period && (
          <span className={cn(
            'text-body',
            plan.highlighted ? 'text-white/70' : 'text-text-tertiary'
          )}>
            {plan.period}
          </span>
        )}
      </div>
      {plan.id === 'yearly' && (
        <p className={cn(
          'text-sm mt-1',
          plan.highlighted ? 'text-white/60' : 'text-text-tertiary'
        )}>
          ${(plan.price / 52).toFixed(2)}/week billed annually
        </p>
      )}
    </div>
  );
}

// Plan card component
function PlanCard({ 
  plan, 
  isVisible,
  index,
  onCTAClick
}: { 
  plan: Plan; 
  isVisible: boolean;
  index: number;
  onCTAClick: (planName: string, planPrice: string, isYearly: boolean) => void;
}) {
  const priceStr = plan.price === 0 ? 'Free' : `$${plan.price.toFixed(2)}`;

  const handleClick = () => {
    onCTAClick(plan.name, priceStr, plan.id === 'yearly');
  };

  return (
    <article
      className={cn(
        'relative rounded-3xl p-6 md:p-8 transition-all duration-500 flex flex-col',
        plan.highlighted
          ? 'bg-gradient-primary text-white shadow-glow lg:scale-105 z-10'
          : 'bg-white border border-gray-200 shadow-soft hover:shadow-medium',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Badge */}
      {plan.badge && (
        <div 
          className={cn(
            'absolute -top-4 left-1/2 -translate-x-1/2 transition-all duration-500',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          )}
          style={{ transitionDelay: `${index * 150 + 200}ms` }}
        >
          <span className="bg-accent-green text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-4">
        <h3 className={cn(
          'text-2xl font-bold mb-2',
          plan.highlighted ? 'text-white' : 'text-text-primary'
        )}>
          {plan.name}
        </h3>
        <p className={cn(
          'text-body-sm',
          plan.highlighted ? 'text-white/80' : 'text-text-secondary'
        )}>
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <PriceDisplay plan={plan} isVisible={isVisible} />

      {/* Savings badge for yearly */}
      {plan.savings && (
        <div className="flex justify-center mb-4">
          <span className="bg-accent-green/20 text-accent-green text-sm font-semibold px-3 py-1 rounded-full">
            {plan.savings}
          </span>
        </div>
      )}

      {/* Quick features list */}
      <ul className="space-y-2.5 mb-6 flex-grow" aria-label={`${plan.name} features`}>
        {plan.features.slice(0, 8).map((feature) => (
          <li key={feature.name} className="flex items-center gap-3">
            <FeatureIcon included={feature.included} highlighted={plan.highlighted} />
            <span className={cn(
              'text-sm',
              !feature.included && (plan.highlighted ? 'text-white/40' : 'text-text-tertiary line-through'),
              feature.included && (plan.highlighted ? 'text-white' : 'text-text-primary')
            )}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={siteConfig.appStoreUrl}
        onClick={handleClick}
        className={cn(
          'btn w-full justify-center text-base py-4 font-semibold mt-auto',
          plan.highlighted
            ? 'bg-white text-primary hover:bg-gray-100 shadow-md'
            : 'btn-primary'
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${plan.cta} - ${plan.name} plan at ${priceStr}${plan.period} (opens App Store)`}
      >
        {plan.cta}
        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>

      {/* Trial note for paid plans */}
      {plan.price > 0 && (
        <p className={cn(
          'text-center text-xs mt-3',
          plan.highlighted ? 'text-white/50' : 'text-text-tertiary'
        )}>
          Cancel anytime via App Store
        </p>
      )}
    </article>
  );
}

// Comparison table component
function ComparisonTable({ isVisible }: { isVisible: boolean }) {
  return (
    <div 
      className={cn(
        'mt-20 transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: '400ms' }}
    >
      <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
        Full Feature Comparison
      </h3>
      
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full max-w-5xl mx-auto min-w-[600px]" role="table">
          <thead>
            <tr>
              <th className="text-left py-4 px-4 text-text-secondary font-medium" scope="col">Feature</th>
              <th className="text-center py-4 px-3 min-w-[100px]" scope="col">
                <span className="text-text-primary font-semibold">Free</span>
                <span className="block text-xs text-text-tertiary font-normal mt-0.5">$0</span>
              </th>
              <th className="text-center py-4 px-3 min-w-[100px]" scope="col">
                <span className="text-text-primary font-semibold">Weekly</span>
                <span className="block text-xs text-text-tertiary font-normal mt-0.5">$2.99/wk</span>
              </th>
              <th className="text-center py-4 px-3 min-w-[100px] bg-primary/5 rounded-t-xl" scope="col">
                <span className="text-primary font-semibold">Yearly</span>
                <span className="block text-xs text-text-tertiary font-normal mt-0.5">$98.99/yr</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((category, categoryIndex) => (
              <Fragment key={category.category}>
                <tr>
                  <td 
                    colSpan={4} 
                    className="pt-6 pb-2 px-4 text-sm font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {category.category}
                  </td>
                </tr>
                {category.features.map((feature, featureIndex) => (
                  <tr 
                    key={feature.name}
                    className={cn(
                      'border-b border-gray-100 transition-colors hover:bg-gray-50/50',
                      isVisible ? 'opacity-100' : 'opacity-0'
                    )}
                    style={{ 
                      transitionDelay: `${500 + (categoryIndex * 100) + (featureIndex * 50)}ms`,
                      transitionDuration: '300ms'
                    }}
                  >
                    <td className="py-3 px-4">
                      <span className="text-text-primary text-sm">{feature.name}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {typeof feature.free === 'boolean' ? (
                        <div className="flex justify-center">
                          <FeatureIcon included={feature.free} />
                        </div>
                      ) : (
                        <span className="text-text-secondary text-sm">{feature.free}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {typeof feature.weekly === 'boolean' ? (
                        <div className="flex justify-center">
                          <FeatureIcon included={feature.weekly} />
                        </div>
                      ) : (
                        <span className="text-text-secondary text-sm">{feature.weekly}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center bg-primary/5">
                      {typeof feature.yearly === 'boolean' ? (
                        <div className="flex justify-center">
                          <FeatureIcon included={feature.yearly} />
                        </div>
                      ) : (
                        <span className="text-primary font-medium text-sm">{feature.yearly}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { trackPricingCTAClick } = useAnalytics();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section scroll-mt-header overflow-hidden" 
      aria-labelledby="pricing-heading"
    >
      <div className="container-wide">
        {/* Section Header */}
        <header 
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pricing
          </span>
          <h2
            id="pricing-heading"
            className="text-display-sm md:text-display font-bold text-text-primary mb-4"
          >
            Simple, transparent pricing
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Start free with basic features. Upgrade to Weekly for full access, 
            or save 65% with our Yearly plan.
          </p>
        </header>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-8">
          <PlanCard 
            plan={plans.free} 
            isVisible={isVisible}
            index={0}
            onCTAClick={trackPricingCTAClick}
          />
          <PlanCard 
            plan={plans.weekly} 
            isVisible={isVisible}
            index={1}
            onCTAClick={trackPricingCTAClick}
          />
          <PlanCard 
            plan={plans.yearly} 
            isVisible={isVisible}
            index={2}
            onCTAClick={trackPricingCTAClick}
          />
        </div>

        {/* Comparison Table */}
        <ComparisonTable isVisible={isVisible} />

        {/* Cancel Note */}
        <div 
          className={cn(
            'text-center mt-12 pt-8 border-t border-separator transition-all duration-700',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure payment via App Store
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <Link
                href="https://apps.apple.com/account/subscriptions"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cancel anytime
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              All subscriptions auto-renew
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
