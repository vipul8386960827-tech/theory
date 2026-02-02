/* 71_performance_optimization */
/*
Key Points (Interviewer Keywords + Explanation):
1. Performance Optimization – Techniques to make Next.js apps faster,
   reduce load time, and improve user experience.

2. Purpose – Enhance Core Web Vitals, SEO, and responsiveness.

3. Techniques –
   - Code Splitting: Load only necessary code using dynamic imports.
   - Image Optimization: Use next/image for lazy loading and resizing.
   - Static Generation (SSG): Pre-render pages at build time.
   - Server-Side Rendering (SSR) only when needed.
   - Caching: Cache API responses, assets, and pages.
   - Minimize CSS/JS bundle size: Tree-shaking, removing unused code.
   - Lazy loading components and assets.
   - Prefetching routes with next/link.
   - Monitoring performance using Lighthouse or Web Vitals.

4. Benefits – Faster page loads, better SEO, reduced bandwidth,
   improved Core Web Vitals, and higher user retention.
*/

/*
Definition (Using Specific Terms):
Performance optimization in Next.js involves using techniques like
code splitting, lazy loading, SSG/SSR appropriately, image optimization,
caching, and bundle size reduction to deliver faster, responsive, and
SEO-friendly web applications.
*/

/*
Code Example (Dynamic Import for Code Splitting):

import dynamic from "next/dynamic";

// Lazy load heavy component
const HeavyComponent = dynamic(() => import("../components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // client-only component
});

export default function Home() {
  return (
    <div>
      <h1>Performance Optimization Example</h1>
      <HeavyComponent />
    </div>
  );
}

/*
Code Example (Optimized Image):

import Image from "next/image";
import sampleImg from "../public/sample.jpg";

export default function HomeImages() {
  return (
    <div>
      <h1>Optimized Image Example</h1>
      <Image
        src={sampleImg}
        alt="Sample"
        width={600}
        height={400}
        placeholder="blur"
        priority
      />
    </div>
  );
}
*/

/*
Important Notes:
- Use dynamic imports to reduce initial bundle size.
- Optimize images with next/image for faster loading.
- Prefer SSG for static content; use SSR only when necessary.
- Cache API responses to avoid redundant network calls.
- Monitor performance with Lighthouse, Web Vitals, or analytics tools.
- Combine multiple optimizations for best results.
*/

/*
Follow-up Questions + Answers:

Q1: What is performance optimization in Next.js?
A1: Techniques to improve speed, responsiveness, and SEO of the application.

Q2: How can you optimize images?
A2: Use next/image with lazy loading, proper sizing, blur placeholders, and priority flags.

Q3: When should you use SSR vs SSG?
A3: SSG for static content; SSR only for dynamic data that must be up-to-date on each request.

Q4: How does dynamic import help performance?
A4: Loads components only when needed, reducing initial bundle size.

Q5: What tools can monitor performance?
A5: Lighthouse, Web Vitals, Chrome DevTools, and analytics services.
*/
