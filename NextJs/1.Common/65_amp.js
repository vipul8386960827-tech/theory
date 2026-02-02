/* 65_amp */
/*
Key Points (Interviewer Keywords + Explanation):
1. AMP (Accelerated Mobile Pages) – Framework to build **fast-loading,
   mobile-optimized pages** for Next.js or other web apps.

2. Purpose – Improve page speed, mobile performance, and SEO rankings
   on search engines.

3. Implementation – Next.js supports AMP by adding `amp: true` in page
   config or using hybrid AMP with `useAmp()` hook.

4. Features –
   - AMP-only pages: Entire page served as AMP
   - Hybrid pages: Serve both AMP and non-AMP versions
   - Automatic optimizations for images, scripts, and styles

5. Benefits – Faster load times on mobile, better Core Web Vitals,
   improved search visibility, and better user experience.
*/

/*
Definition (Using Specific Terms):
AMP in Next.js allows developers to create **accelerated mobile pages**
that follow AMP standards. You can enable AMP per page using
`export const config = { amp: true }` or create hybrid pages with
`useAmp()` to conditionally render AMP content.
*/

/*
Code Example (AMP-only Page):

// pages/amp-page.js
export const config = { amp: true };

export default function AmpPage() {
  return (
    <html amp="">
      <head>
        <meta charSet="utf-8" />
        <title>AMP Page</title>
        <link rel="canonical" href="/amp-page" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
      </head>
      <body>
        <h1>This is an AMP Page</h1>
      </body>
    </html>
  );
}

/*
Code Example (Hybrid AMP Page):

// pages/hybrid-amp.js
import { useAmp } from "next/amp";

export const config = { amp: "hybrid" };

export default function HybridAmpPage() {
  const isAmp = useAmp();
  return (
    <div>
      <h1>{isAmp ? "AMP Version" : "Non-AMP Version"}</h1>
    </div>
  );
}
*/

/*
Important Notes:
- AMP pages are restricted: no custom JS (except AMP scripts).
- Hybrid AMP allows serving both AMP and normal HTML.
- Improves SEO and Core Web Vitals for mobile.
- Works with Pages Router; App Router support is limited and requires custom setup.
- Use canonical links to avoid duplicate content issues.
*/

/*
Follow-up Questions + Answers:

Q1: What is AMP in Next.js?
A1: Accelerated Mobile Pages, optimized for fast loading on mobile.

Q2: How do you enable AMP for a page?
A2: Set `export const config = { amp: true }` or `amp: "hybrid"` for hybrid pages.

Q3: Can you use custom JavaScript in AMP pages?
A3: No, only AMP-approved scripts are allowed; hybrid pages can use JS in non-AMP version.

Q4: Why use AMP?
A4: Faster page load, better mobile experience, improved SEO.

Q5: Does AMP work in App Router?
A5: Limited support; primarily for Pages Router.
*/
