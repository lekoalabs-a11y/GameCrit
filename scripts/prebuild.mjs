#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'client', 'index.html');

// HTML content
const htmlContent = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>GameCritic — Expert Video Game Reviews</title>
    <meta name="description" content="GameCritic delivers in-depth, expert video game reviews with scores, pros & cons, and detailed analysis. Find your next great game." />
    <meta name="keywords" content="video game reviews, game scores, gaming, RPG, action, strategy, indie games" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#0d0f14" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="GameCritic" />
    <meta property="og:title" content="GameCritic — Expert Video Game Reviews" />
    <meta property="og:description" content="In-depth video game reviews with scores, pros & cons, and detailed analysis." />
    <meta property="og:image" content="https://d2xsxph8kpxj0f.cloudfront.net/310519663530105637/WpQQxE6BG26rErDtiDLBRY/hero-banner-oABQP86xKYenxf8RTVZmhn.webp" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="GameCritic — Expert Video Game Reviews" />
    <meta name="twitter:description" content="In-depth video game reviews with scores, pros & cons, and detailed analysis." />
    <meta name="twitter:image" content="https://d2xsxph8kpxj0f.cloudfront.net/310519663530105637/WpQQxE6BG26rErDtiDLBRY/hero-banner-oABQP86xKYenxf8RTVZmhn.webp" />

    <!-- Google Fonts: Poppins (headings) + Inter (body) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

    <!-- Canonical -->
    <link rel="canonical" href="/" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <script
      defer
      src="%VITE_ANALYTICS_ENDPOINT%/umami"
      data-website-id="%VITE_ANALYTICS_WEBSITE_ID%"></script>
  </body>
</html>`;

try {
  // Remove the file/directory if it exists
  if (fs.existsSync(indexHtmlPath)) {
    const stats = fs.statSync(indexHtmlPath);
    if (stats.isDirectory()) {
      fs.rmSync(indexHtmlPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(indexHtmlPath);
    }
  }

  // Write the HTML file
  fs.writeFileSync(indexHtmlPath, htmlContent, 'utf-8');
  console.log(`✓ Recreated ${indexHtmlPath}`);
} catch (error) {
  console.error(`✗ Failed to recreate index.html:`, error.message);
  process.exit(1);
}
