import Link from 'next/link';
import { SEOHead, siteConfig } from '@/lib/seo';

const blogPosts = [
  {
    id: 1,
    title: 'Introducing VoiceScribe 2.0: Faster, Smarter, Better',
    excerpt: 'We\'re excited to announce the biggest update to VoiceScribe yet, featuring improved transcription accuracy and a completely redesigned interface.',
    date: 'January 8, 2026',
    readTime: '5 min read',
    category: 'Product Update',
    image: '🚀',
  },
  {
    id: 2,
    title: '10 Tips for Getting the Best Transcription Accuracy',
    excerpt: 'Learn how to optimize your recordings for maximum transcription quality with these expert tips from our team.',
    date: 'January 2, 2026',
    readTime: '8 min read',
    category: 'Tips & Tricks',
    image: '💡',
  },
  {
    id: 3,
    title: 'How Students Are Using VoiceScribe to Ace Their Studies',
    excerpt: 'Discover how students worldwide are leveraging voice transcription to take better notes and improve their academic performance.',
    date: 'December 28, 2025',
    readTime: '6 min read',
    category: 'User Stories',
    image: '📚',
  },
  {
    id: 4,
    title: 'The Future of Voice Technology: What\'s Next for AI Transcription',
    excerpt: 'A deep dive into the emerging trends in voice AI and what they mean for the future of transcription technology.',
    date: 'December 20, 2025',
    readTime: '10 min read',
    category: 'Industry Insights',
    image: '🔮',
  },
  {
    id: 5,
    title: 'YouTube Transcription: The Complete Guide',
    excerpt: 'Everything you need to know about transcribing YouTube videos with VoiceScribe, from setup to export.',
    date: 'December 15, 2025',
    readTime: '7 min read',
    category: 'Tutorial',
    image: '📺',
  },
  {
    id: 6,
    title: 'Privacy First: How We Keep Your Data Safe',
    excerpt: 'An inside look at our security practices and why protecting your privacy is at the core of everything we do.',
    date: 'December 10, 2025',
    readTime: '4 min read',
    category: 'Security',
    image: '🔒',
  },
];

const categories = ['All', 'Product Update', 'Tips & Tricks', 'User Stories', 'Tutorial', 'Industry Insights', 'Security'];

const categoryColors: Record<string, string> = {
  'Product Update': 'bg-blue-500/20 text-blue-400',
  'Tips & Tricks': 'bg-amber-500/20 text-amber-400',
  'User Stories': 'bg-green-500/20 text-green-400',
  'Tutorial': 'bg-purple-500/20 text-purple-400',
  'Industry Insights': 'bg-cyan-500/20 text-cyan-400',
  'Security': 'bg-red-500/20 text-red-400',
};

export default function BlogPage() {
  return (
    <>
      <SEOHead
        title="Blog | VoiceScribe"
        description="Stay up to date with the latest news, tips, and insights from the VoiceScribe team."
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

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary/20 to-transparent py-16 md:py-20">
          <div className="container-narrow text-center">
            <h1 className="text-display-sm md:text-display font-bold text-white mb-4">
              VoiceScribe Blog
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              News, tips, tutorials, and insights from the VoiceScribe team
            </p>
          </div>
        </div>

        {/* Content */}
        <main className="container-wide py-12 md:py-16">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl border border-primary/30 p-8 mb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="text-6xl">{blogPosts[0].image}</div>
              <div className="flex-1 text-center md:text-left">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[blogPosts[0].category]}`}>
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl font-bold text-white mb-2">{blogPosts[0].title}</h2>
                <p className="text-white/60 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-white/40">
                  <span>{blogPosts[0].date}</span>
                  <span>•</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="text-4xl">{post.image}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-white/40">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Stay in the loop</h2>
            <p className="text-white/60 mb-6">Subscribe to our newsletter for the latest updates and tips</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
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
