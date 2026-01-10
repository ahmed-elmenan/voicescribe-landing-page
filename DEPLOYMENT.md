# VoiceScribe Landing Page - Deployment Guide

## 🚀 Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/future-vision-apps/VoiceScribeApp/tree/main/landing_page)

### Manual Deployment Steps

#### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `future-vision-apps/VoiceScribeApp`
4. Set **Root Directory** to: `landing_page`
5. Framework Preset: **Next.js** (auto-detected)

#### 2. Configure Build Settings

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `landing_page` |
| Build Command | `npm run build` |
| Output Directory | `out` |
| Install Command | `npm ci` |

#### 3. Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://voicescribe.app
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/idXXXXXXXXX
NEXT_PUBLIC_APP_STORE_ID=XXXXXXXXX

# Analytics (get from Google Analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Search Console (get after domain verification)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Optional
NEXT_PUBLIC_BING_SITE_VERIFICATION=
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

#### 4. Deploy

Click **"Deploy"** and wait for the build to complete.

---

## 🌐 Domain Setup

### Adding Custom Domain

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your domain: `voicescribe.app`
3. Configure DNS at your registrar:

#### DNS Configuration (Cloudflare/GoDaddy/Namecheap)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | Auto |
| CNAME | www | `cname.vercel-dns.com` | Auto |

Or use Vercel's nameservers for automatic setup:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

### SSL Certificate

✅ Vercel automatically provisions and renews SSL certificates via Let's Encrypt.

### Subdomain Configuration (Optional)

For localized subdomains (e.g., `ar.voicescribe.app`):

| Type | Name | Value |
|------|------|-------|
| CNAME | ar | `cname.vercel-dns.com` |

---

## 🔍 Google Search Console Setup

### Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Choose **"URL prefix"** method
4. Enter: `https://voicescribe.app`

### Step 2: Verify Ownership (HTML Tag Method)

1. Select **"HTML tag"** verification method
2. Copy the verification code from the meta tag:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE_HERE" />
   ```
3. Add to Vercel Environment Variables:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=YOUR_CODE_HERE
   ```
4. Redeploy the site
5. Click **"Verify"** in Search Console

### Step 3: Submit Sitemap

1. In Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **"Submit"**

Expected sitemaps:
- `https://voicescribe.app/sitemap.xml` - Main sitemap with all pages

### Step 4: Request Indexing

1. Go to **URL Inspection** tool
2. Enter your homepage URL
3. Click **"Request Indexing"**

Repeat for key pages:
- `https://voicescribe.app/`
- `https://voicescribe.app/#features`
- `https://voicescribe.app/#pricing`

---

## ✅ Post-Deployment Checklist

### Immediate (Day 1)

- [ ] **Verify deployment** - Site loads at custom domain
- [ ] **Check HTTPS** - SSL certificate active (green lock)
- [ ] **Test all pages** - No 404 errors
- [ ] **Mobile test** - Responsive design works
- [ ] **Speed test** - Run Lighthouse (target: 90+ performance)

### SEO & Analytics (Day 1-2)

- [ ] **Search Console** - Property verified
- [ ] **Sitemap submitted** - Check for errors
- [ ] **GA4 tracking** - Real-time data flowing
- [ ] **GTM triggers** - Events firing correctly
- [ ] **robots.txt** - Accessible at `/robots.txt`

### Content & Links (Day 2-3)

- [ ] **App Store link** - Replace `idXXXXXXXXX` with real ID
- [ ] **Social links** - Twitter, GitHub, Instagram
- [ ] **Legal pages** - Privacy Policy, Terms of Service
- [ ] **Contact email** - Working `mailto:` links

### Monitoring (Week 1)

- [ ] **Search Console coverage** - No indexing errors
- [ ] **Core Web Vitals** - All metrics "Good"
- [ ] **Uptime monitoring** - Set up (e.g., Vercel Analytics, UptimeRobot)
- [ ] **Error tracking** - Set up (e.g., Sentry)

### SEO Tracking (Week 2-4)

- [ ] **Index status** - Pages appearing in Google
- [ ] **Keyword rankings** - Track target keywords
- [ ] **Backlinks** - Monitor new backlinks
- [ ] **Traffic growth** - Compare week over week

---

## 🔧 Troubleshooting

### Build Fails

```bash
# Check for type errors
npm run type-check

# Check for lint errors
npm run lint

# Test build locally
npm run build
```

### 404 Errors

1. Check `next.config.js` has `trailingSlash: true`
2. Verify `vercel.json` has correct `outputDirectory: "out"`
3. Clear Vercel cache: Project Settings → Functions → Purge Cache

### Images Not Loading

1. Ensure images are in `public/` folder
2. Check image paths are absolute (start with `/`)
3. Verify `next.config.js` has `images.unoptimized: true` for static export

### Environment Variables Not Working

1. Prefix with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding new variables
3. Check variable names match exactly (case-sensitive)

---

## 📊 Performance Monitoring

### Vercel Analytics

Enable in Vercel Dashboard → Your Project → Analytics

### Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤2.5s | 2.5s - 4s | >4s |
| FID/INP | ≤100ms | 100ms - 300ms | >300ms |
| CLS | ≤0.1 | 0.1 - 0.25 | >0.25 |
| TTFB | ≤800ms | 800ms - 1.8s | >1.8s |

### Current Scores (from last Lighthouse audit)

- Performance: **99**
- Accessibility: **100**
- Best Practices: **96**
- SEO: **100**

---

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On pull requests

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📝 Notes

### Important URLs

| URL | Purpose |
|-----|---------|
| `https://voicescribe.app` | Production site |
| `https://voicescribe.app/sitemap.xml` | Sitemap |
| `https://voicescribe.app/robots.txt` | Robots file |
| Vercel Dashboard | Deployment management |
| Google Search Console | SEO monitoring |
| Google Analytics | Traffic analytics |

### Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Search Console Help: https://support.google.com/webmasters
