'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { cn, trackEvent } from '@/lib/utils';

// Comprehensive FAQ data - 10 items covering all key topics
export const faqData = [
  {
    question: 'What is "captions-first" and how does it differ from ASR?',
    answer:
      'Captions-first is our smart strategy for YouTube transcription. When you paste a YouTube link, we first check if the video has existing captions (either auto-generated or manually added by the creator). If available, we use these instantly — it\'s faster and often more accurate. ASR (Automatic Speech Recognition) is our fallback: when no captions exist, our AI listens to the audio and transcribes it in real-time. ASR works great but takes a bit longer and may be subject to duration limits on the free plan.',
  },
  {
    question: 'What are the storage and transcription quotas?',
    answer:
      'Basic (Free) plan includes approximately 1GB of cloud storage and 60 minutes of transcription per month, plus 5 YouTube imports. Premium unlocks unlimited cloud storage, unlimited transcription minutes, and unlimited YouTube imports. You can always record locally without limits on either plan. The app shows your current usage in Settings, and we\'ll notify you before reaching any limits so you\'re never caught off guard.',
  },
  {
    question: 'What languages does VoiceScribe support?',
    answer:
      'Our AI transcription engine supports 50+ languages including English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Japanese, Korean, Mandarin Chinese, Arabic, Hindi, and many more. For YouTube videos, language support depends on the available captions. The app automatically detects the spoken language, but you can also manually select it for better accuracy. Check Settings → Languages for the complete list.',
  },
  {
    question: 'How is my data protected? Who owns my recordings?',
    answer:
      'Your data is yours, period. All recordings and transcriptions are encrypted both in transit (TLS 1.3) and at rest (AES-256). We use Supabase for secure cloud storage with row-level security — only you can access your data. We never sell, share, or use your content to train AI models. You can export all your data or permanently delete your account anytime from the app. For details, see our Privacy Policy.',
  },
  {
    question: 'How do I subscribe to Premium, and can I cancel anytime?',
    answer:
      'Premium subscriptions are handled entirely through the Apple App Store for security and convenience. You can subscribe monthly ($9.99) or yearly ($79.99 — save 33%). To cancel, go to Settings → Apple ID → Subscriptions on your device, or visit apps.apple.com/account/subscriptions. Cancellation takes effect at the end of your current billing period, and you keep Premium access until then. No questions asked, no hoops to jump through.',
  },
  {
    question: 'Can I use VoiceScribe offline?',
    answer:
      'Yes! You can record audio completely offline — recordings are saved locally on your device. However, transcription requires an internet connection since our AI runs in the cloud for best accuracy. Once transcribed, your notes are cached locally and accessible offline. Cloud sync also requires connectivity, but local recordings are always available.',
  },
  {
    question: 'How accurate is the transcription?',
    answer:
      'Accuracy depends on several factors: audio clarity, background noise, speaker accent, and language. For clear audio in supported languages, our AI typically achieves 95%+ accuracy. YouTube captions (when available) are often even more accurate since they may be human-reviewed. Tips for best results: use a quiet environment, speak clearly, and hold your device 6-12 inches from your mouth when recording.',
  },
  {
    question: 'What export formats are available?',
    answer:
      'Basic users can export transcriptions as plain text (.txt) and copy to clipboard. Premium unlocks additional formats including PDF, Word (.docx), and SRT subtitles. You can also share directly via the iOS share sheet to any app — email, Messages, Notes, and more. Batch export for multiple recordings at once is available to Premium subscribers.',
  },
  {
    question: 'Does VoiceScribe work with Apple Watch?',
    answer:
      'Not yet, but it\'s on our roadmap! Currently VoiceScribe is available on iPhone and iPad. We\'re actively developing Apple Watch support for quick voice recordings on the go. Sign up for our newsletter or follow us on social media to be notified when Watch support launches.',
  },
  {
    question: 'I found a bug or have a feature request. How do I contact you?',
    answer:
      'We\'d love to hear from you! For bugs, feature requests, or general feedback, email us at support@futurevisionapps.com. You can also use the in-app feedback form (Settings → Send Feedback) which automatically includes helpful diagnostic info. We read every message and typically respond within 24-48 hours. For urgent issues, mention "URGENT" in your subject line.',
  },
];

// Generate JSON-LD FAQ Schema
function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// Individual FAQ Item component with smooth animation
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  isVisible,
}: {
  faq: typeof faqData[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isVisible: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [faq.answer]);

  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-soft overflow-hidden transition-all duration-500',
        'hover:shadow-medium',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <h3>
        <button
          onClick={onToggle}
          className={cn(
            'w-full flex items-center justify-between p-6 text-left',
            'hover:bg-surface-secondary/50 transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset'
          )}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
        >
          <span className="text-title font-semibold text-text-primary pr-4 flex items-start gap-3">
            <span 
              className={cn(
                'flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-colors',
                isOpen 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-secondary text-text-tertiary'
              )}
            >
              {index + 1}
            </span>
            <span>{faq.question}</span>
          </span>
          <span 
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
              isOpen 
                ? 'bg-primary text-white rotate-180' 
                : 'bg-surface-secondary text-text-tertiary'
            )}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div 
          ref={contentRef}
          className="px-6 pb-6 pl-16 text-body text-text-secondary leading-relaxed"
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const toggleFAQ = (index: number) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);
    if (newIndex !== null) {
      trackEvent('faq_expand', { question: faqData[index].question });
    }
  };

  const faqSchema = generateFAQSchema();

  return (
    <>
      {/* JSON-LD Schema for SEO rich results */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <section
        ref={sectionRef}
        id="faq"
        className="section-alt scroll-mt-header overflow-hidden"
        aria-labelledby="faq-heading"
      >
        <div className="container-narrow">
          {/* Section Header */}
          <header 
            className={cn(
              'text-center mb-12 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="badge-primary mb-4 inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="text-display-sm md:text-display font-bold text-text-primary mb-4"
            >
              Frequently asked questions
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Everything you need to know about VoiceScribe. Can&apos;t find what you&apos;re looking for? 
              Reach out to our support team.
            </p>
          </header>

          {/* FAQ Accordion */}
          <div 
            className="space-y-3"
            role="list"
            aria-label="Frequently asked questions"
          >
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <div 
            className={cn(
              'text-center mt-12 pt-8 border-t border-separator transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Still have questions?
              </h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Our support team is here to help. We typically respond within 24 hours.
              </p>
              <a
                href="mailto:support@futurevisionapps.com"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div 
            className={cn(
              'flex flex-wrap justify-center gap-4 mt-8 transition-all duration-700',
              isVisible ? 'opacity-100' : 'opacity-0'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            <a 
              href="/privacy" 
              className="text-sm text-text-tertiary hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-text-quaternary">•</span>
            <a 
              href="/terms" 
              className="text-sm text-text-tertiary hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-text-quaternary">•</span>
            <a 
              href="https://apps.apple.com/account/subscriptions" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary hover:text-primary transition-colors"
            >
              Manage Subscription
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
