import Link from 'next/link';
import { useState } from 'react';
import { SEOHead, siteConfig } from '@/lib/seo';
import { cn } from '@/lib/utils';

const contactOptions = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'cyan',
    title: 'Email Support',
    subtitle: 'support@futurevisionapps.com',
    description: 'Get help from our support team. We typically respond within 24 hours.',
    action: 'Send Email',
    href: 'mailto:support@futurevisionapps.com?subject=VoiceScribe%20Support%20Request',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'orange',
    title: 'Report a Bug',
    subtitle: 'Help us improve',
    description: "Found something not working? Let us know and we'll fix it.",
    action: 'Report Bug',
    href: 'mailto:support@futurevisionapps.com?subject=VoiceScribe%20Bug%20Report&body=Hi%20VoiceScribe%20Team%2C%0A%0AI%20found%20a%20bug%3A%0A%0A**What%20happened%3A**%0A%0A**What%20I%20expected%3A**%0A%0A**Steps%20to%20reproduce%3A**%0A1.%20%0A2.%20%0A3.%20%0A%0A**Device%20info%3A**%0A-%20Device%3A%20%0A-%20iOS%20Version%3A%20',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'amber',
    title: 'Feature Request',
    subtitle: 'Share your ideas',
    description: "Have an idea to make VoiceScribe better? We'd love to hear it!",
    action: 'Request Feature',
    href: 'mailto:support@futurevisionapps.com?subject=VoiceScribe%20Feature%20Request&body=Hi%20VoiceScribe%20Team%2C%0A%0AI%20have%20a%20feature%20suggestion%3A%0A%0A**Feature%20idea%3A**%0A%0A**Why%20it%20would%20be%20useful%3A**%0A%0A**How%20it%20might%20work%3A**',
  },
];

const faqs = [
  {
    question: 'How do I upgrade to Premium?',
    answer: 'Go to Settings and tap on your subscription status to see upgrade options.',
  },
  {
    question: 'Why is my transcription taking long?',
    answer: 'Transcription time depends on audio length and network speed. Longer recordings may take a few minutes.',
  },
  {
    question: 'How do I export my transcriptions?',
    answer: 'Open any transcription and tap the share button to export as text or copy to clipboard.',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; buttonBg: string }> = {
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    buttonBg: 'bg-cyan-500/20 hover:bg-cyan-500/30',
  },
  orange: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    buttonBg: 'bg-orange-500/20 hover:bg-orange-500/30',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    buttonBg: 'bg-amber-500/20 hover:bg-amber-500/30',
  },
};

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact Us | VoiceScribe"
        description="Get in touch with the VoiceScribe team. We're here to help with support, bug reports, and feature requests."
      />

      <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1a1035] to-[#0f0a1f]">
        {/* Header */}
        <header className="border-b border-white/10">
          <div className="container-wide py-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl text-white"
            >
              <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
          </div>
        </header>

        {/* Content */}
        <main className="container-narrow py-12 md:py-20">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-display-sm md:text-display font-bold text-white mb-4">
              We&apos;re Here to Help
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Have questions or feedback? Reach out to our team and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Options */}
          <div className="space-y-4 mb-12">
            {contactOptions.map((option, index) => {
              const colors = colorClasses[option.color];
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
                      <span className={colors.text}>{option.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                      <p className={cn('text-sm font-medium', colors.text)}>{option.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-4">{option.description}</p>
                  <a
                    href={option.href}
                    className={cn(
                      'inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold transition-colors',
                      colors.buttonBg,
                      colors.text,
                      'border',
                      colors.border
                    )}
                  >
                    {option.action}
                  </a>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{faq.question}</h3>
                      <p className="text-white/60 text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time Notice */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-4">
            <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-green-400">Response Time</p>
              <p className="text-green-400/80 text-sm">We typically respond within 24-48 hours</p>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6">
          <div className="container-wide text-center text-sm text-white/40">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
