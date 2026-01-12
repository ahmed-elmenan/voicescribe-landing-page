const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imagesToOptimize = [
  { name: 'mockup_1', width: 800, priority: true },
  { name: 'multi_speakers', width: 760, priority: false },
  { name: 'youtube_transcription', width: 760, priority: false },
];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  for (const img of imagesToOptimize) {
    const inputPath = path.join(IMAGES_DIR, `${img.name}.png`);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${img.name}.png - file not found`);
      continue;
    }

    const originalSize = fs.statSync(inputPath).size;
    console.log(`📁 Processing ${img.name}.png (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);

    try {
      // Create WebP version (best compression)
      const webpPath = path.join(OUTPUT_DIR, `${img.name}.webp`);
      await sharp(inputPath)
        .resize(img.width, null, { withoutEnlargement: true })
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);
      const webpSize = fs.statSync(webpPath).size;
      console.log(`   ✅ WebP: ${(webpSize / 1024).toFixed(0)} KB (${((1 - webpSize / originalSize) * 100).toFixed(0)}% smaller)`);

      // Create optimized PNG as fallback
      const pngPath = path.join(OUTPUT_DIR, `${img.name}.png`);
      await sharp(inputPath)
        .resize(img.width, null, { withoutEnlargement: true })
        .png({ quality: 85, compressionLevel: 9, palette: true })
        .toFile(pngPath);
      const pngSize = fs.statSync(pngPath).size;
      console.log(`   ✅ PNG:  ${(pngSize / 1024).toFixed(0)} KB (${((1 - pngSize / originalSize) * 100).toFixed(0)}% smaller)`);

      // Create blur placeholder (tiny base64)
      const placeholderPath = path.join(OUTPUT_DIR, `${img.name}-placeholder.webp`);
      await sharp(inputPath)
        .resize(20, null, { withoutEnlargement: true })
        .blur(10)
        .webp({ quality: 20 })
        .toFile(placeholderPath);
      
      // Generate base64 for blur placeholder
      const placeholderBuffer = fs.readFileSync(placeholderPath);
      const base64 = `data:image/webp;base64,${placeholderBuffer.toString('base64')}`;
      
      // Write placeholder data to JSON
      const placeholderJson = path.join(OUTPUT_DIR, `${img.name}-placeholder.json`);
      fs.writeFileSync(placeholderJson, JSON.stringify({ blurDataURL: base64 }));
      console.log(`   ✅ Placeholder generated\n`);

    } catch (err) {
      console.error(`   ❌ Error processing ${img.name}:`, err.message);
    }
  }

  console.log('✨ Image optimization complete!\n');
  console.log('📋 Next steps:');
  console.log('   1. Replace original images in public/images/ with optimized versions');
  console.log('   2. Update Image components to use WebP with PNG fallback');
  console.log('   3. Add blurDataURL placeholders for better UX');
}

optimizeImages().catch(console.error);
