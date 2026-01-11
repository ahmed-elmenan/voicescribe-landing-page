import Link from 'next/link';
import { SEOHead, siteConfig } from '@/lib/seo';

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Service | VoiceScribe"
        description="Terms of Service for VoiceScribe - Read our terms and conditions for using the app."
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
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span>{siteConfig.name}</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="container-narrow py-12 md:py-20">
          <article className="prose prose-lg prose-invert max-w-none">
            <h1 className="text-display-sm md:text-display font-bold text-white mb-8">
              Terms of Service
            </h1>
            
            <p className="text-white/60 mb-6">
              <strong className="text-white">Last updated:</strong> January 2026
            </p>

            <p className="text-white/70 mb-8">
              Please read these Terms of Service (&quot;Terms&quot;) carefully before using the VoiceScribe 
              mobile application operated by Future Vision Apps (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/70">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree 
                with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="text-white/70 mb-4">
                VoiceScribe is a mobile application that provides:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: '🎙️', text: 'Audio recording capabilities' },
                  { icon: '✍️', text: 'AI-powered transcription services' },
                  { icon: '✏️', text: 'Transcription editing and export features' },
                  { icon: '☁️', text: 'Cloud storage for recordings and transcriptions' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-white/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
              <p className="text-white/70 mb-4">
                When you create an account with us, you must provide accurate, complete, and current 
                information. You are responsible for safeguarding your account and for any activities 
                that occur under your account.
              </p>
              <p className="text-white/70">
                You agree to notify us immediately of any unauthorized access or use of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Subscriptions and Payments</h2>
              <p className="text-white/70 mb-4">
                Some parts of the Service are billed on a subscription basis. You will be billed in 
                advance on a recurring basis (monthly or annually), depending on the subscription 
                plan you select.
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
                <li>You can cancel your subscription at any time through your app store account</li>
                <li>Refunds are handled according to Apple App Store or Google Play Store policies</li>
                <li>We reserve the right to change subscription prices with 30 days notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
              <p className="text-white/70 mb-4">You agree not to use the Service to:</p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Record conversations without proper consent where required by law</li>
                  <li>Upload or transmit harmful, offensive, or illegal content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Use automated systems to access the Service without permission</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <p className="text-white/70 mb-4">
                The Service and its original content, features, and functionality are and will remain 
                the exclusive property of Future Vision Apps. The Service is protected by copyright, 
                trademark, and other laws.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <p className="text-green-400 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You retain full ownership of all audio recordings and transcriptions you create using the Service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-white/70 mb-4">
                The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind, 
                either express or implied. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>100% accuracy of transcriptions</li>
                <li>Uninterrupted or error-free service</li>
                <li>That the Service will meet your specific requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-white/70">
                In no event shall Future Vision Apps, its directors, employees, partners, or agents 
                be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, or goodwill.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
              <p className="text-white/70 mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason, including breach of these Terms.
              </p>
              <p className="text-white/70">
                Upon termination, your right to use the Service will immediately cease. You may delete 
                your account and data at any time from within the app.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
              <p className="text-white/70">
                We reserve the right to modify these Terms at any time. We will notify you of any 
                changes by posting the new Terms on this page. Continued use of the Service after 
                changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
              <p className="text-white/70">
                These Terms shall be governed by and construed in accordance with the laws of the 
                United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p className="text-white/70">
                If you have any questions about these Terms, please contact us at:{' '}
                <a href="mailto:support@futurevisionapps.com" className="text-primary hover:underline">
                  support@futurevisionapps.com
                </a>
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-white/10">
              <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </article>
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
