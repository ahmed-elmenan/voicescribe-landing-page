# VoiceScribe Analytics Setup Guide

## Overview

This landing page integrates **Google Analytics 4 (GA4)** and **Google Tag Manager (GTM)** for comprehensive event tracking.

---

## Quick Setup

### 1. Get Your Tracking IDs

1. **GA4 Measurement ID**: Go to [analytics.google.com](https://analytics.google.com) → Admin → Property → Data Streams → Web → Measurement ID (starts with `G-`)
2. **GTM Container ID**: Go to [tagmanager.google.com](https://tagmanager.google.com) → Container → Container ID (starts with `GTM-`)

### 2. Update Configuration

Edit `src/lib/analytics/ga4.ts`:

```typescript
// Replace these placeholders with your actual IDs
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Your GA4 ID
export const GTM_ID = 'GTM-XXXXXXX';             // Your GTM ID (optional)
```

### 3. Deploy & Verify

1. Run `npm run build && npm run start`
2. Open browser DevTools → Console
3. Look for "Track Event" logs in development
4. Check GA4 Real-Time reports for live data

---

## Events Tracked

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `appstore_click` | App Store download clicks | `platform`, `location` |
| `language_toggle` | Language switcher usage | `from_language`, `to_language` |
| `scroll_depth` | Page scroll milestones | `percentage` (25, 50, 75, 90) |
| `section_view` | Section visibility | `section_id`, `section_name` |
| `pricing_billing_toggle` | Monthly/Yearly toggle | `billing_period` |
| `pricing_cta_click` | Plan CTA button clicks | `plan_name`, `billing_period` |
| `faq_expand` | FAQ accordion opens | `question` |
| `page_view` | Page navigation | `page_path`, `page_title` |
| `cta_click` | General CTA clicks | `cta_name`, `cta_location` |
| `outbound_click` | External link clicks | `url` |

---

## GA4 Dashboard Setup

### Create Custom Events Report

1. Go to GA4 → Reports → Explore
2. Create new Exploration
3. Add dimensions: `Event name`, `Event count`
4. Add metrics: `Total users`, `Event count`

### Recommended Custom Dimensions

Create these in GA4 → Admin → Custom definitions:

| Dimension Name | Scope | Parameter |
|----------------|-------|-----------|
| Plan Name | Event | `plan_name` |
| Billing Period | Event | `billing_period` |
| Language | User | `language` |
| FAQ Question | Event | `question` |
| Scroll Percentage | Event | `percentage` |
| Platform | Event | `platform` |

### Create Key Funnels

#### Pricing Funnel
```
pricing_cta_click → appstore_click
```

#### Engagement Funnel
```
page_view → scroll_depth (50%) → faq_expand → appstore_click
```

---

## GTM Advanced Setup (Optional)

If using GTM for additional tracking:

### 1. Create GA4 Configuration Tag

- Tag Type: Google Analytics: GA4 Configuration
- Measurement ID: `{{GA4 Measurement ID}}`
- Trigger: All Pages

### 2. Create Event Tags

For each custom event, create:
- Tag Type: Google Analytics: GA4 Event
- Event Name: (use names from table above)
- Parameters: (map from dataLayer)

### 3. DataLayer Events

The site pushes events to dataLayer automatically:

```javascript
window.dataLayer.push({
  event: 'appstore_click',
  platform: 'ios',
  location: 'hero'
});
```

---

## Testing & Debugging

### Development Mode

In development, all events are logged to console:
```
Track Event: appstore_click { platform: 'ios', location: 'hero' }
```

### GA4 DebugView

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) extension
2. Enable it on your site
3. Go to GA4 → Admin → DebugView
4. See events in real-time

### GTM Preview Mode

1. Go to GTM → Preview
2. Enter your site URL
3. See all tags firing in real-time

---

## Architecture

```
src/lib/analytics/
├── ga4.ts              # Core GA4 functions & event definitions
├── scroll-tracking.ts  # Scroll depth & section visibility
├── AnalyticsProvider.tsx # React provider & hooks
└── index.ts            # Public exports
```

### Usage in Components

```typescript
import { trackEvent, useAnalytics } from '@/lib/analytics';

// Direct function call
trackEvent('button_click', { button_name: 'submit' });

// Hook-based (within React components)
const { trackEvent } = useAnalytics();
trackEvent('form_submit', { form_name: 'contact' });
```

---

## Privacy & GDPR

### Cookie Consent

For GDPR compliance, implement cookie consent:

1. Add a cookie consent banner
2. Initialize analytics only after consent:

```typescript
// In your consent handler
if (userConsented) {
  initGA();
}
```

### Data Retention

Configure in GA4 → Admin → Data Settings → Data Retention:
- Recommended: 14 months (maximum)
- Enable "Reset on new activity"

### IP Anonymization

GA4 anonymizes IPs by default. No additional configuration needed.

---

## Conversion Goals

### Set Up Conversions

1. Go to GA4 → Admin → Events
2. Mark these as conversions:
   - `appstore_click` ⭐ (Primary)
   - `pricing_cta_click`
   - `faq_expand` (engagement)

### Track Conversion Value

For e-commerce tracking, add value to events:

```typescript
trackEvent('appstore_click', {
  platform: 'ios',
  location: 'pricing',
  value: 9.99, // Premium price
  currency: 'USD'
});
```

---

## Troubleshooting

### Events Not Showing

1. **Check Measurement ID**: Ensure `G-XXXXXXXXXX` is replaced
2. **Ad Blockers**: Disable ad blockers for testing
3. **Real-Time Delay**: GA4 can have 24-48h delay for reports
4. **DebugView**: Use GA4 DebugView for immediate feedback

### Console Errors

```
gtag is not defined
```
→ GA4 script may be blocked. Check network tab.

### GTM Not Firing

1. Check GTM container is published
2. Verify trigger conditions
3. Use GTM Preview mode

---

## Performance Impact

Analytics adds minimal overhead:

- **gtag.js**: ~29KB (compressed)
- **GTM**: ~25KB (compressed)
- **Load Strategy**: Deferred, non-blocking
- **First Load Impact**: < 1KB additional JS

Scripts load with `strategy="afterInteractive"` to not block page rendering.

---

## Support

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GTM Documentation](https://developers.google.com/tag-manager)
- [Next.js Analytics Guide](https://nextjs.org/docs/basic-features/script)
