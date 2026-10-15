import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Synchronizing GitHub Pages production artifacts...');

// 1. Copy dist/assets to root assets/
const distAssets = path.join(rootDir, 'dist', 'assets');
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(distAssets)) {
  copyDirSync(distAssets, rootAssets);
  console.log('✓ Copied dist/assets -> ./assets');
}

// 2. Copy dist/ to docs/
const distDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');
if (fs.existsSync(distDir)) {
  copyDirSync(distDir, docsDir);
  console.log('✓ Copied dist -> ./docs');
}

// 3. Ensure .nojekyll in root, docs, and dist
const nojekyllContent = '# Disable Jekyll on GitHub Pages\n';
fs.writeFileSync(path.join(rootDir, '.nojekyll'), nojekyllContent);
fs.writeFileSync(path.join(rootDir, 'docs', '.nojekyll'), nojekyllContent);
fs.writeFileSync(path.join(rootDir, 'dist', '.nojekyll'), nojekyllContent);
console.log('✓ Created .nojekyll in root, docs, and dist');

// 4. Ensure 404.html in root and docs
const source404 = path.join(rootDir, 'public', '404.html');
if (fs.existsSync(source404)) {
  fs.copyFileSync(source404, path.join(rootDir, '404.html'));
  fs.copyFileSync(source404, path.join(rootDir, 'docs', '404.html'));
  console.log('✓ Synchronized 404.html in root and docs');
}

console.log('All GitHub Pages deployment targets prepared successfully!');
