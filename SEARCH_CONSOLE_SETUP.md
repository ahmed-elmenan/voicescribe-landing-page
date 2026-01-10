# Sitemap & Robots.txt - Search Console Submission Guide

## 📁 Deliverables

### `/public/sitemap.xml`
Contains all URLs with proper hreflang annotations for:
- `/` (en-US - default)
- `/ar-sa/` (Arabic - Saudi Arabia)
- `/ar-ae/` (Arabic - UAE)
- `/ar-qa/` (Arabic - Qatar)
- `/ar-kw/` (Arabic - Kuwait)
- `/ar-bh/` (Arabic - Bahrain)
- `/ar-om/` (Arabic - Oman)
- `/privacy/` (Privacy Policy)
- `/terms/` (Terms of Service)

### `/public/robots.txt`
- Allows all major search engine crawlers
- Disallows `/admin/`, `/cms/`, `/api/`
- Blocks known bad bots (AhrefsBot, SemrushBot, MJ12bot)
- References sitemap location
- Sets canonical host

---

## 🔍 Google Search Console Setup

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Choose **"URL prefix"** and enter: `https://voicescribe.app`
4. Verify ownership using one of these methods:
   - **HTML file upload** (recommended for static sites)
   - **DNS TXT record**
   - **Google Analytics** (if already configured)

### Step 2: Submit Sitemap
1. In Search Console, select your property
2. Navigate to **"Sitemaps"** in the left sidebar
3. Enter `sitemap.xml` in the "Add a new sitemap" field
4. Click **"Submit"**

### Step 3: Verify Submission
- Status should show "Success" within a few minutes
- Check "Discovered URLs" count (should be 9 URLs)
- Monitor "Coverage" report for any indexing issues

---

## 🌐 Bing Webmaster Tools Setup

### Step 1: Add Site
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Click **"Add a Site"**
3. Enter: `https://voicescribe.app`
4. Verify ownership (can import from Google Search Console)

### Step 2: Submit Sitemap
1. Navigate to **"Sitemaps"**
2. Click **"Submit sitemap"**
3. Enter: `https://voicescribe.app/sitemap.xml`

---

## ✅ Validation Checklist

### Sitemap Validation
```bash
# Test XML validity
curl -s https://voicescribe.app/sitemap.xml | xmllint --noout - && echo "✓ Valid XML"

# Check all URLs return 200
curl -s https://voicescribe.app/sitemap.xml | grep -oP '(?<=<loc>)[^<]+' | while read url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "$url: $status"
done
```

### Robots.txt Validation
```bash
# Verify robots.txt is accessible
curl -I https://voicescribe.app/robots.txt

# Test with Google's robots.txt tester:
# https://www.google.com/webmasters/tools/robots-testing-tool
```

---

## 📊 Expected Indexing Timeline

| Stage | Timeline |
|-------|----------|
| Sitemap discovered | 1-2 hours |
| URLs crawled | 1-7 days |
| URLs indexed | 1-4 weeks |
| Full ranking | 4-12 weeks |

---

## 🔄 Maintenance

### When to Update Sitemap
- After adding new pages
- After major content updates
- When adding new locales

### Automated Updates
Consider implementing a build-time sitemap generator:
```javascript
// scripts/generate-sitemap.js
// Run during CI/CD: node scripts/generate-sitemap.js
```

---

## 📝 Additional SEO Files

Ensure these are also in place:
- ✅ `/public/manifest.json` - PWA manifest
- ✅ Meta tags in `<head>` (title, description, og:*)
- ✅ Canonical URLs on all pages
- ✅ hreflang tags in HTML `<head>`

---

## 🔗 Useful Links

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [hreflang Implementation](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)
