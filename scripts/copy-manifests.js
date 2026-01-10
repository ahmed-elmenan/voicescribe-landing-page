/**
 * Post-build script to copy manifest files from .next to out directory
 * Required for Vercel deployment with Next.js static export
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', '.next');
const targetDir = path.join(__dirname, '..', 'out');

// Manifest files that Vercel expects
const manifestFiles = [
  'routes-manifest.json',
  'build-manifest.json',
  'prerender-manifest.json',
];

console.log('📦 Copying manifest files to static export directory...');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  console.log('⚠️  Output directory does not exist. Build may have failed.');
  process.exit(1);
}

let copiedCount = 0;

manifestFiles.forEach((file) => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);

  if (fs.existsSync(sourcePath)) {
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ Copied ${file}`);
      copiedCount++;
    } catch (error) {
      console.error(`❌ Failed to copy ${file}:`, error.message);
    }
  } else {
    console.log(`⚠️  ${file} not found in .next directory (may not be required)`);
  }
});

// Also create a minimal routes-manifest.json if it doesn't exist
const routesManifestPath = path.join(targetDir, 'routes-manifest.json');
if (!fs.existsSync(routesManifestPath)) {
  const minimalRoutesManifest = {
    version: 3,
    pages404: true,
    basePath: "",
    redirects: [],
    rewrites: [],
    headers: [],
    staticRoutes: [
      { page: "/", regex: "^/(?:/)?$", namedRegex: "^/(?:/)?$", routeKeys: {} }
    ],
    dynamicRoutes: [],
    dataRoutes: [],
    i18n: null
  };
  
  try {
    fs.writeFileSync(routesManifestPath, JSON.stringify(minimalRoutesManifest, null, 2));
    console.log('✅ Created minimal routes-manifest.json');
    copiedCount++;
  } catch (error) {
    console.error('❌ Failed to create routes-manifest.json:', error.message);
  }
}

console.log(`\n📦 Post-build complete. ${copiedCount} manifest file(s) processed.`);
