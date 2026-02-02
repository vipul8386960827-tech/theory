/* 22_performance_optimizations */
/*
========================================
22_performance_optimizations (Next.js)
========================================

Definition:
Performance optimization in Next.js involves improving page load speed,
reducing bundle size, and efficiently fetching/rendering data to provide
a fast and smooth user experience. Techniques differ slightly depending
on Pages Router or App Router, but core concepts remain similar.

--------------------------------
1) Image Optimization:
- Use Next.js <Image> component
  - Automatically optimizes images
  - Lazy loads offscreen images
  - Supports modern formats (WebP, AVIF)
- Reduces bandwidth and improves Largest Contentful Paint (LCP)

--------------------------------
2) Script & Asset Optimization:
- <Script> component:
  - Load scripts with strategy: beforeInteractive, afterInteractive, lazyOnload
  - Prevents blocking main thread
- Dynamic imports:
  - import('module') for code splitting
  - Only load heavy components when needed
- Minimize CSS and JS bundle sizes:
  - Tree-shaking, removing unused code
  - Avoid large third-party libraries

--------------------------------
3) Data Fetching Optimization:
- Pages Router:
  - getStaticProps + ISR for static or partially dynamic pages
  - getServerSideProps only for truly dynamic data
  - Avoid fetching heavy data on every request if not needed
- App Router:
  - Server Components for direct server-side data fetching
  - Streaming and Suspense to render parts of the page faster
  - Colocated data fetching reduces client bundle

--------------------------------
4) Caching:
- Browser caching for static assets
- Server-side caching (CDN, Vercel edge cache)
- API response caching where possible

--------------------------------
5) Lazy Loading & Code Splitting:
- Dynamic import for components not needed on first render
- Route-level code splitting (Next.js does automatically)
- Lazy load images, videos, and heavy third-party libraries

--------------------------------
6) SEO & Performance Metrics:
- Preload critical fonts, images
- Use Lighthouse / Web Vitals to monitor performance
- Optimize Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)

--------------------------------
7) Other Best Practices:
- Avoid blocking the main thread with heavy JS
- Use memoization in React (React.memo, useMemo)
- Keep bundle size small; analyze with @next/bundle-analyzer
- Avoid unnecessary re-renders
- Prefer server-side processing for heavy tasks

--------------------------------
Interview-ready one-liner:
"Next.js performance optimization includes image optimization with <Image>, dynamic imports and
 code splitting, server-side and client-side caching, efficient data fetching with getStaticProps/ISR
  or Server Components, lazy loading, and minimizing bundle size to improve Core Web Vitals."
*/
