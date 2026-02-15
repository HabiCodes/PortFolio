# Changelog – Habishek Portfolio Redesign

## Overview
Complete overhaul focused on clarity, performance, and client conversion. Key changes:

### index.html
- Added Open Graph meta tags for social sharing.
- Improved typography with `clamp()` and Inter font (system‑first fallback).
- Restructured hero copy to be outcome‑oriented (“apps that convert”).
- Added rotating badges (Fast / Secure / Polished) with CSS animation.
- Converted project galleries to use `srcset` and `loading="lazy"`.
- Removed unused Siema slider markup; replaced with lightweight lightbox.
- Added ARIA attributes and improved semantic tags.
- Added hidden lightbox container and mouse follower element.

### styles.css
- Consolidated variables from colors.css into root.
- Implemented a fluid type scale (body, h1, h2) with `clamp()`.
- Refined glass effects with reduced opacity for better contrast.
- Added hover lift and focus‑visible outlines.
- Styled lightbox and mouse follower.
- Added scroll‑reveal styles (`.reveal`).
- Fully responsive (mobile‑first) with breakpoints at 480, 700, 900, 1200px.

### main.js
- Removed Siema initialization (unused).
- Implemented custom lightbox with keyboard navigation (arrow keys, Esc).
- Added IntersectionObserver for fade‑in reveal of projects.
- Refined mouse follower with lerp (disabled on touch).
- Added optional badge rotator pause on hover.

### assets.json
- Manifest listing optimized images with recommended sizes and WebP conversion.
- Provides mapping from original screenshot names to output filenames.

### Removed / Unused
- colors.css (merged into styles.css).
- siema.min.js (not used, removed from HTML).
- Unused JavaScript from previous version.

## Migration Notes
- Replace all screenshots with optimized WebP files named according to `assets.json`.
- Update image paths in index.html to point to `/assets/optimized/`.
- Generate OG preview image as `og-preview.jpg` (1200x630).
- Ensure `resume.pdf` is placed in `/assets/optimized/`.