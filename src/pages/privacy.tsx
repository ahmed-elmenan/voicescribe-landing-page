import Link from 'next/link';
import { SEOHead, siteConfig } from '@/lib/seo';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | VoiceScribe"
        description="Privacy Policy for VoiceScribe - Learn how we collect, use, and protect your personal information."
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
              Privacy Policy
            </h1>
            
            <p className="text-white/60 mb-6">
              <strong className="text-white">Last updated:</strong> January 2026
            </p>

            <p className="text-white/70 mb-8">
              Future Vision Apps (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the VoiceScribe mobile application. 
              This page informs you of our policies regarding the collection, use, and disclosure of 
              personal information when you use our Service.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Information Collection and Use</h2>
              <p className="text-white/70 mb-4">
                While using our Service, we may ask you to provide us with certain personally identifiable 
                information that can be used to contact or identify you. Personally identifiable information 
                may include, but is not limited to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Email address (for account creation and support)</li>
                <li>Audio recordings (stored securely for transcription)</li>
                <li>Transcription data (generated from your recordings)</li>
                <li>Usage data (app analytics and performance metrics)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Storage and Security</h2>
              <p className="text-white/70 mb-4">
                Your data security is important to us. We implement industry-standard security measures:
              </p>
              <div className="space-y-3">
                {[
                  { icon: '🔒', text: 'All data is encrypted in transit using TLS 1.3' },
                  { icon: '🛡️', text: 'Data at rest is encrypted using AES-256 encryption' },
                  { icon: '☁️', text: 'We use Supabase for secure cloud storage with row-level security' },
                  { icon: '👤', text: 'Audio recordings and transcriptions are only accessible by you' },
                  { icon: '🚫', text: 'We never sell, share, or use your content to train AI models' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-white/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-white/70 mb-4">
                We may employ third-party companies and individuals for the following reasons:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>To facilitate our Service</li>
                <li>To provide the Service on our behalf</li>
                <li>To perform Service-related services</li>
                <li>To assist us in analyzing how our Service is used</li>
              </ul>
              <p className="text-white/70 mt-4">
                These third parties have access to your Personal Information only to perform these tasks 
                on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Data Rights</h2>
              <p className="text-white/70 mb-4">You have the right to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: '📋', text: 'Access your personal data' },
                  { icon: '📤', text: 'Export all your data at any time' },
                  { icon: '🗑️', text: 'Request deletion of your data' },
                  { icon: '❌', text: 'Permanently delete your account from within the app' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-white/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-white/70">
                Our Service does not address anyone under the age of 13. We do not knowingly collect 
                personally identifiable information from children under 13. If you are a parent or 
                guardian and you are aware that your child has provided us with Personal Information, 
                please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-white/70">
                We may update our Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/70">
                If you have any questions about this Privacy Policy, please contact us at:{' '}
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
