import Link from 'next/link';
import { SEOHead, siteConfig } from '@/lib/seo';

export default function CookiePolicyPage() {
  return (
    <>
      <SEOHead
        title="Cookie Policy | VoiceScribe"
        description="Cookie Policy for VoiceScribe - Learn how we use cookies and similar technologies."
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
              Cookie Policy
            </h1>
            
            <p className="text-white/60 mb-6">
              <strong className="text-white">Last updated:</strong> January 2026
            </p>

            <p className="text-white/70 mb-8">
              This Cookie Policy explains how Future Vision Apps (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies 
              and similar technologies on our website and mobile application VoiceScribe.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-white/70 mb-4">
                Cookies are small text files that are stored on your device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information 
                to the website owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    Essential Cookies
                  </h3>
                  <p className="text-white/60 text-sm">
                    These cookies are necessary for the website to function properly. They enable basic 
                    functions like page navigation and access to secure areas. The website cannot function 
                    properly without these cookies.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    Analytics Cookies
                  </h3>
                  <p className="text-white/60 text-sm">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. This helps us improve our website and services.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    Functional Cookies
                  </h3>
                  <p className="text-white/60 text-sm">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your preferences and settings. They may be set by us or by third-party providers.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white font-semibold">Cookie Name</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Purpose</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-primary">_ga</td>
                      <td className="py-3 px-4">Google Analytics - distinguishes users</td>
                      <td className="py-3 px-4">2 years</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-primary">_gid</td>
                      <td className="py-3 px-4">Google Analytics - distinguishes users</td>
                      <td className="py-3 px-4">24 hours</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-primary">locale</td>
                      <td className="py-3 px-4">Stores language preference</td>
                      <td className="py-3 px-4">1 year</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-primary">theme</td>
                      <td className="py-3 px-4">Stores theme preference (dark/light)</td>
                      <td className="py-3 px-4">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
              <p className="text-white/70 mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>
                  <strong className="text-white">Browser Settings:</strong> Most browsers allow you to 
                  refuse or accept cookies and delete existing cookies. Check your browser&apos;s help 
                  section for instructions.
                </li>
                <li>
                  <strong className="text-white">Mobile Devices:</strong> You can manage cookies 
                  through your device settings.
                </li>
                <li>
                  <strong className="text-white">Opt-Out Tools:</strong> Some analytics providers 
                  offer opt-out mechanisms (e.g., Google Analytics Opt-out Browser Add-on).
                </li>
              </ul>
              <p className="text-white/70 mt-4">
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Cookies</h2>
              <p className="text-white/70">
                We may use third-party services that set their own cookies. We have no control over 
                these cookies. Please refer to the respective third-party privacy policies for more 
                information about their cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p className="text-white/70">
                We may update this Cookie Policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/70">
                If you have any questions about our Cookie Policy, please contact us at:{' '}
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
