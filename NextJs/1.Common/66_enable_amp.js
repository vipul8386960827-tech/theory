/* 66_enable_amp */
/*
Key Points (Interviewer Keywords + Explanation):
1. Enable AMP – In Next.js, AMP is enabled per page using the
   `export const config` object.

2. Options –
   - `amp: true` → AMP-only page
   - `amp: "hybrid"` → Both AMP and normal version available

3. Purpose – Allows faster mobile page loads and better SEO.

4. Implementation –
   - AMP-only: Page rendered strictly as AMP
   - Hybrid AMP: Use `useAmp()` hook to detect and render AMP-specific content

5. Benefits – Improves Core Web Vitals, reduces load time,
   ensures mobile-friendly rendering, and can boost SEO.
*/

/*
Definition (Using Specific Terms):
Enabling AMP in Next.js configures the page to comply with
Accelerated Mobile Pages standards. Developers can choose AMP-only
or hybrid mode and conditionally render components using `useAmp()`.
*/

/*
Code Example (AMP-only Page):

// pages/amp-example.js
export const config = { amp: true };

export default function AmpExample() {
  return (
    <html amp="">
      <head>
        <meta charSet="utf-8" />
        <title>AMP Example</title>
        <link rel="canonical" href="/amp-example" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
      </head>
      <body>
        <h1>AMP-only Page</h1>
      </body>
    </html>
  );
}

/*
Code Example (Hybrid AMP Page):

// pages/hybrid-amp-example.js
import { useAmp } from "next/amp";

export const config = { amp: "hybrid" };

export default function HybridAmpExample() {
  const isAmp = useAmp();
  return (
    <div>
      <h1>{isAmp ? "AMP Version" : "Non-AMP Version"}</h1>
      <p>{isAmp ? "This content is optimized for AMP." : "Regular content for normal users."}</p>
    </div>
  );
}
*/

/*
Important Notes:
- AMP-only pages restrict custom JS; hybrid AMP allows normal JS in non-AMP version.
- Always include canonical link to avoid duplicate content issues.
- Works mainly with Pages Router; App Router requires custom setup.
- Enhances SEO, mobile performance, and Core Web Vitals.
- Use `useAmp()` hook to conditionally render AMP-specific content in hybrid pages.
*/

/*
Follow-up Questions + Answers:

Q1: How do you enable AMP in Next.js?
A1: Set `export const config = { amp: true }` (AMP-only) or `amp: "hybrid"` (both versions).

Q2: How to detect AMP in hybrid pages?
A2: Use the `useAmp()` hook from "next/amp".

Q3: Can you use custom JavaScript in AMP pages?
A3: No, AMP-only pages cannot use custom JS; hybrid pages can in non-AMP version.

Q4: Why include a canonical link?
A4: Prevent duplicate content issues and help SEO.

Q5: Does enabling AMP affect SEO?
A5: Yes, it improves mobile page speed and can boost search rankings.
*/
