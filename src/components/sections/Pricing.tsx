'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics';

// Plan definitions with monthly and yearly pricing
type PlanFeature = {
  name: string;
  value: string | boolean;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  storage: string;
  minutes: string;
  features: PlanFeature[];
  cta: string;
  highlighted: boolean;
  badge?: string;
};

const plans: Record<string, Plan> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for getting started with voice notes',
    monthlyPrice: 0,
    yearlyPrice: 0,
    storage: '~1GB',
    minutes: '60 min/month',
    features: [
      { name: 'Cloud Storage', value: '~1GB', included: true },
      { name: 'Transcription', value: '60 min/month', included: true },
      { name: 'Local Recordings', value: 'Unlimited', included: true },
      { name: 'Basic Organization', value: true, included: true },
      { name: 'YouTube Import', value: '5/month', included: true },
      { name: 'Cloud Sync', value: false, included: false },
      { name: 'Priority Processing', value: false, included: false },
      { name: 'Export Options', value: 'Basic', included: true },
    ],
    cta: 'Download Free',
    highlighted: false,
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    description: 'Unlimited power for professionals',
    monthlyPrice: 9.99,
    yearlyPrice: 79.99,
    storage: 'Unlimited',
    minutes: 'Unlimited',
    features: [
      { name: 'Cloud Storage', value: 'Unlimited', included: true },
      { name: 'Transcription', value: 'Unlimited', included: true },
      { name: 'Local Recordings', value: 'Unlimited', included: true },
      { name: 'Advanced Organization', value: true, included: true },
      { name: 'YouTube Import', value: 'Unlimited', included: true },
      { name: 'Cloud Sync', value: true, included: true },
      { name: 'Priority Processing', value: true, included: true },
      { name: 'Export Options', value: 'All formats', included: true },
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Best Value',
  },
};

// Comparison table features
const comparisonFeatures = [
  { 
    category: 'Storage & Limits',
    features: [
      { name: 'Cloud Storage', basic: '~1GB', premium: 'Unlimited', tooltip: 'Store your recordings in the cloud' },
      { name: 'Transcription Minutes', basic: '60 min/month', premium: 'Unlimited', tooltip: 'Monthly transcription quota' },
      { name: 'Local Recordings', basic: 'Unlimited', premium: 'Unlimited', tooltip: 'Store recordings on device' },
    ]
  },
  {
    category: 'Features',
    features: [
      { name: 'YouTube Import', basic: '5/month', premium: 'Unlimited', tooltip: 'Import and transcribe YouTube videos' },
      { name: 'Cloud Sync', basic: false, premium: true, tooltip: 'Sync across all your devices' },
      { name: 'Priority Processing', basic: false, premium: true, tooltip: 'Faster transcription queue' },
      { name: 'Offline Mode', basic: true, premium: true, tooltip: 'Record without internet' },
    ]
  },
  {
    category: 'Organization',
    features: [
      { name: 'Folders & Categories', basic: 'Basic', premium: 'Unlimited', tooltip: 'Organize your recordings' },
      { name: 'Favorites', basic: true, premium: true, tooltip: 'Mark important notes' },
      { name: 'Search', basic: 'Basic', premium: 'Full-text', tooltip: 'Search through transcriptions' },
      { name: 'Tags', basic: false, premium: true, tooltip: 'Add custom tags to recordings' },
    ]
  },
  {
    category: 'Export & Share',
    features: [
      { name: 'Export Formats', basic: 'TXT', premium: 'TXT, PDF, DOCX', tooltip: 'Export transcriptions' },
      { name: 'Share Links', basic: false, premium: true, tooltip: 'Share via link' },
      { name: 'Clipboard Copy', basic: true, premium: true, tooltip: 'Quick copy to clipboard' },
    ]
  },
];

// Billing toggle component
function BillingToggle({ 
  isYearly, 
  onToggle 
}: { 
  isYearly: boolean; 
  onToggle: (period: 'monthly' | 'yearly') => void;
}) {
  const handleToggle = () => {
    onToggle(isYearly ? 'monthly' : 'yearly');
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={cn(
        'text-sm font-medium transition-colors',
        !isYearly ? 'text-text-primary' : 'text-text-tertiary'
      )}>
        Monthly
      </span>
      <button
        onClick={handleToggle}
        className={cn(
          'relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          isYearly ? 'bg-gradient-primary' : 'bg-gray-300'
        )}
        role="switch"
        aria-checked={isYearly}
        aria-label="Toggle yearly billing"
      >
        <span
          className={cn(
            'absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300',
            isYearly ? 'translate-x-9' : 'translate-x-1'
          )}
        />
      </button>
      <span className={cn(
        'text-sm font-medium transition-colors flex items-center gap-2',
        isYearly ? 'text-text-primary' : 'text-text-tertiary'
      )}>
        Yearly
        <span className="bg-accent-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
          Save 33%
        </span>
      </span>
    </div>
  );
}

// Price display with animation
function PriceDisplay({ 
  plan, 
  isYearly,
  isVisible
}: { 
  plan: Plan; 
  isYearly: boolean;
  isVisible: boolean;
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = plan.monthlyPrice === 0 ? '' : isYearly ? '/year' : '/month';
  
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
          {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
        </span>
        {period && (
          <span className={cn(
            'text-body',
            plan.highlighted ? 'text-white/70' : 'text-text-tertiary'
          )}>
            {period}
          </span>
        )}
      </div>
      {isYearly && plan.monthlyPrice > 0 && (
        <p className={cn(
          'text-sm mt-1',
          plan.highlighted ? 'text-white/60' : 'text-text-tertiary'
        )}>
          ${(plan.yearlyPrice / 12).toFixed(2)}/month billed annually
        </p>
      )}
    </div>
  );
}

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

// Plan card component
function PlanCard({ 
  plan, 
  isYearly, 
  isVisible,
  index,
  onCTAClick
}: { 
  plan: Plan; 
  isYearly: boolean;
  isVisible: boolean;
  index: number;
  onCTAClick: (planName: string, planPrice: string, isYearly: boolean) => void;
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const priceStr = price === 0 ? 'Free' : `$${price.toFixed(2)}`;

  const handleClick = () => {
    onCTAClick(plan.name, priceStr, isYearly);
  };

  return (
    <article
      className={cn(
        'relative rounded-3xl p-8 transition-all duration-500',
        plan.highlighted
          ? 'bg-gradient-primary text-white shadow-glow lg:scale-105'
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
      <div className="text-center mb-6">
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
      <PriceDisplay plan={plan} isYearly={isYearly} isVisible={isVisible} />

      {/* Key highlights */}
      <div className={cn(
        'flex justify-center gap-4 mb-6 pb-6 border-b',
        plan.highlighted ? 'border-white/20' : 'border-gray-100'
      )}>
        <div className="text-center">
          <div className={cn(
            'text-lg font-bold',
            plan.highlighted ? 'text-white' : 'text-primary'
          )}>
            {plan.storage}
          </div>
          <div className={cn(
            'text-xs',
            plan.highlighted ? 'text-white/60' : 'text-text-tertiary'
          )}>
            Storage
          </div>
        </div>
        <div className={cn(
          'w-px',
          plan.highlighted ? 'bg-white/20' : 'bg-gray-200'
        )} />
        <div className="text-center">
          <div className={cn(
            'text-lg font-bold',
            plan.highlighted ? 'text-white' : 'text-primary'
          )}>
            {plan.minutes}
          </div>
          <div className={cn(
            'text-xs',
            plan.highlighted ? 'text-white/60' : 'text-text-tertiary'
          )}>
            Transcription
          </div>
        </div>
      </div>

      {/* Quick features list */}
      <ul className="space-y-3 mb-8" aria-label={`${plan.name} features`}>
        {plan.features.slice(0, 6).map((feature) => (
          <li key={feature.name} className="flex items-center gap-3">
            <FeatureIcon included={feature.included} highlighted={plan.highlighted} />
            <span className={cn(
              'text-sm',
              !feature.included && (plan.highlighted ? 'text-white/40' : 'text-text-tertiary line-through'),
              feature.included && (plan.highlighted ? 'text-white' : 'text-text-primary')
            )}>
              {feature.name}
              {typeof feature.value === 'string' && feature.value !== 'Unlimited' && feature.included && (
                <span className={cn(
                  'ml-1',
                  plan.highlighted ? 'text-white/60' : 'text-text-tertiary'
                )}>
                  ({feature.value})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={siteConfig.appStoreUrl}
        onClick={handleClick}
        className={cn(
          'btn w-full justify-center text-base py-4 font-semibold',
          plan.highlighted
            ? 'bg-white text-primary hover:bg-gray-100 shadow-md'
            : 'btn-primary'
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${plan.cta} - ${plan.name} plan at ${priceStr}${isYearly ? ' per year' : ' per month'} (opens App Store)`}
      >
        {plan.cta}
        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>

      {/* App Store note for premium */}
      {plan.highlighted && (
        <p className="text-center text-white/50 text-xs mt-3">
          7-day free trial • Cancel anytime
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
      
      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl mx-auto" role="table">
          <thead>
            <tr>
              <th className="text-left py-4 px-4 text-text-secondary font-medium" scope="col">Feature</th>
              <th className="text-center py-4 px-4 min-w-[140px]" scope="col">
                <span className="text-text-primary font-semibold">Basic</span>
                <span className="block text-sm text-text-tertiary font-normal">Free</span>
              </th>
              <th className="text-center py-4 px-4 min-w-[140px] bg-primary/5 rounded-t-xl" scope="col">
                <span className="text-primary font-semibold">Premium</span>
                <span className="block text-sm text-text-tertiary font-normal">$9.99/mo</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((category, categoryIndex) => (
              <Fragment key={category.category}>
                <tr>
                  <td 
                    colSpan={3} 
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
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-text-primary">{feature.name}</span>
                        {feature.tooltip && (
                          <div className="group relative">
                            <svg 
                              className="w-4 h-4 text-text-quaternary cursor-help" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                              {feature.tooltip}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof feature.basic === 'boolean' ? (
                        feature.basic ? (
                          <FeatureIcon included={true} />
                        ) : (
                          <FeatureIcon included={false} />
                        )
                      ) : (
                        <span className="text-text-secondary">{feature.basic}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center bg-primary/5">
                      {typeof feature.premium === 'boolean' ? (
                        feature.premium ? (
                          <FeatureIcon included={true} />
                        ) : (
                          <FeatureIcon included={false} />
                        )
                      ) : (
                        <span className="text-primary font-medium">{feature.premium}</span>
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
  const [isYearly, setIsYearly] = useState(true);
  const { trackPricingToggle, trackPricingCTAClick } = useAnalytics();

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

  const handleBillingToggle = (period: 'monthly' | 'yearly') => {
    trackPricingToggle(period);
    setIsYearly(period === 'yearly');
  };

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
            Start free, upgrade when ready
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Begin with our generous free plan and unlock unlimited power when you need it.
            Cancel anytime via the App Store.
          </p>
        </header>

        {/* Billing Toggle */}
        <div 
          className={cn(
            'transition-all duration-500 delay-100',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          <BillingToggle isYearly={isYearly} onToggle={handleBillingToggle} />
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <PlanCard 
            plan={plans.basic} 
            isYearly={isYearly} 
            isVisible={isVisible}
            index={0}
            onCTAClick={trackPricingCTAClick}
          />
          <PlanCard 
            plan={plans.premium} 
            isYearly={isYearly} 
            isVisible={isVisible}
            index={1}
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
              7-day free trial on Premium
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
