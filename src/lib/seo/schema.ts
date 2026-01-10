import { siteConfig } from './config';

/**
 * Generate MobileApplication JSON-LD Schema
 * 
 * This schema is eligible for rich results in Google Search,
 * including app install links and rating snippets.
 * 
 * @see https://schema.org/MobileApplication
 * @see https://developers.google.com/search/docs/appearance/structured-data/software-app
 */
export function generateMobileAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': `${siteConfig.url}/#app`,
    name: siteConfig.name,
    alternateName: 'VoiceScribe - AI Transcription',
    description: siteConfig.description,
    operatingSystem: 'iOS 15.0 or later',
    applicationCategory: 'ProductivityApplication',
    applicationSubCategory: 'Voice Recording',
    
    // Pricing information
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      seller: {
        '@type': 'Organization',
        name: siteConfig.creator,
      },
    },
    
    // Aggregate rating (placeholder - update with real App Store data)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    
    // App details
    url: siteConfig.url,
    image: siteConfig.ogImage,
    screenshot: [
      `${siteConfig.url}/screenshots/recording.png`,
      `${siteConfig.url}/screenshots/transcription.png`,
      `${siteConfig.url}/screenshots/library.png`,
    ],
    
    // Download links
    downloadUrl: siteConfig.appStoreUrl,
    installUrl: siteConfig.appStoreUrl,
    
    // Feature list for rich snippets
    featureList: [
      'AI-powered voice to text transcription',
      'YouTube video caption import',
      'Cloud sync across devices',
      'Support for 50+ languages',
      'Export to PDF, Word, and SRT',
      'Offline recording support',
    ],
    
    // Content rating
    contentRating: 'Everyone',
    
    // File size (approximate)
    fileSize: '45MB',
    
    // Version info
    softwareVersion: '1.0.0',
    datePublished: '2024-01-01',
    
    // Author/Publisher
    author: {
      '@type': 'Organization',
      name: siteConfig.creator,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apple Inc.',
      url: 'https://www.apple.com/app-store/',
    },
    
    // Platform requirements
    memoryRequirements: '256MB',
    processorRequirements: 'A12 Bionic or later',
    
    // In-app purchases info
    inAppPurchase: {
      '@type': 'Offer',
      name: 'VoiceScribe Premium',
      price: '9.99',
      priceCurrency: 'USD',
      description: 'Unlimited transcription, cloud storage, and premium exports',
    },
  };
}

/**
 * Generate Product JSON-LD Schema
 * 
 * Alternative schema for product-focused rich results.
 * Google may use this for shopping-related searches.
 * 
 * @see https://schema.org/Product
 */
export function generateProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteConfig.url}/#product`,
    name: siteConfig.name,
    description: siteConfig.description,
    image: siteConfig.ogImage,
    brand: {
      '@type': 'Brand',
      name: 'Future Vision Apps',
    },
    offers: {
      '@type': 'Offer',
      url: siteConfig.appStoreUrl,
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    category: 'Mobile Application > Productivity',
  };
}

// Generate FAQPage JSON-LD
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate HowTo JSON-LD for general audio transcription
export function generateHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${siteConfig.url}/#howto-audio`,
    name: 'How to Transcribe Audio with VoiceScribe',
    description: 'Learn how to record and transcribe audio using VoiceScribe AI transcription app for iPhone.',
    image: `${siteConfig.url}/images/howto-audio.png`,
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'iPhone with iOS 15.0 or later',
      },
      {
        '@type': 'HowToTool',
        name: 'VoiceScribe app (free download)',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Open VoiceScribe and start recording',
        text: 'Launch the VoiceScribe app and tap the large microphone button to begin recording your audio.',
        image: `${siteConfig.url}/images/step-record.png`,
        url: `${siteConfig.url}/#how-it-works`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Stop recording when finished',
        text: 'Tap the stop button when you\'ve finished speaking. The app will automatically save your recording.',
        image: `${siteConfig.url}/images/step-stop.png`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'AI transcribes automatically',
        text: 'VoiceScribe\'s AI engine instantly transcribes your audio to text with high accuracy in 50+ languages.',
        image: `${siteConfig.url}/images/step-transcribe.png`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Review, edit, and export',
        text: 'Review your transcript, make any edits, and export to PDF, Word, or plain text. Sync to cloud for access anywhere.',
        image: `${siteConfig.url}/images/step-export.png`,
      },
    ],
  };
}

/**
 * Generate HowTo JSON-LD specifically for YouTube transcription
 * 
 * This schema targets "how to transcribe YouTube video" searches
 * and explains the captions-first approach with ASR fallback.
 * 
 * @see https://schema.org/HowTo
 * @see https://developers.google.com/search/docs/appearance/structured-data/how-to
 */
export function generateYouTubeHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${siteConfig.url}/#howto-youtube`,
    name: 'How to Transcribe YouTube Videos to Text with VoiceScribe',
    description: 'Step-by-step guide to transcribe any YouTube video to text using VoiceScribe. Uses captions-first technology for instant results, with AI fallback when needed.',
    image: `${siteConfig.url}/images/howto-youtube.png`,
    totalTime: 'PT1M30S',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'iPhone with iOS 15.0 or later',
      },
      {
        '@type': 'HowToTool',
        name: 'VoiceScribe app (free download)',
      },
      {
        '@type': 'HowToTool',
        name: 'YouTube video link',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy the YouTube video link',
        text: 'Open YouTube and copy the URL of the video you want to transcribe. Works with any public YouTube video.',
        image: `${siteConfig.url}/images/youtube-step-copy.png`,
        url: `${siteConfig.url}/#how-it-works`,
        itemListElement: [
          {
            '@type': 'HowToDirection',
            text: 'Open the YouTube app or website',
          },
          {
            '@type': 'HowToDirection',
            text: 'Navigate to the video you want to transcribe',
          },
          {
            '@type': 'HowToDirection',
            text: 'Tap Share → Copy Link',
          },
        ],
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste the link in VoiceScribe',
        text: 'Open VoiceScribe and tap "Import from YouTube". Paste the video link you copied.',
        image: `${siteConfig.url}/images/youtube-step-paste.png`,
        itemListElement: [
          {
            '@type': 'HowToDirection',
            text: 'Open VoiceScribe app',
          },
          {
            '@type': 'HowToDirection',
            text: 'Tap the "+" button and select "YouTube Import"',
          },
          {
            '@type': 'HowToDirection',
            text: 'Paste the copied YouTube URL',
          },
        ],
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Captions-first extraction (instant)',
        text: 'VoiceScribe first checks for existing captions on the video. If available, the transcript is extracted instantly — usually in under 5 seconds.',
        image: `${siteConfig.url}/images/youtube-step-captions.png`,
        itemListElement: [
          {
            '@type': 'HowToTip',
            text: 'Captions-first is faster and often more accurate than ASR because it uses existing subtitle data from YouTube.',
          },
        ],
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'ASR fallback when no captions exist',
        text: 'If the video has no captions, VoiceScribe automatically falls back to AI Speech Recognition (ASR) to transcribe the audio. This takes 1-2 minutes depending on video length.',
        image: `${siteConfig.url}/images/youtube-step-asr.png`,
        itemListElement: [
          {
            '@type': 'HowToTip',
            text: 'ASR supports 50+ languages and works with any video, even those without subtitles.',
          },
        ],
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'View and export your transcript',
        text: 'Review the complete transcript with timestamps. Edit if needed, then export to PDF, Word, SRT subtitles, or plain text.',
        image: `${siteConfig.url}/images/youtube-step-view.png`,
        itemListElement: [
          {
            '@type': 'HowToDirection',
            text: 'Scroll through the transcript to review',
          },
          {
            '@type': 'HowToDirection',
            text: 'Tap any text to edit',
          },
          {
            '@type': 'HowToDirection',
            text: 'Tap Export to choose your format',
          },
        ],
      },
    ],
  };
}

// Generate Organization JSON-LD
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Future Vision Apps',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github],
  };
}
