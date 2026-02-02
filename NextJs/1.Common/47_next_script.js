/* 47_next_script */
/*
Key Points (Interviewer Keywords + Explanation):
1. next/script – Next.js built-in component to load third-party or custom scripts efficiently.

2. Purpose – Optimizes script loading without blocking page rendering and supports different loading strategies.

3. Loading Strategies:
   - beforeInteractive: Loads before the page is interactive (rarely used, blocks page).
   - afterInteractive: Loads after hydration (default for most scripts).
   - lazyOnload: Loads when browser is idle (for non-critical scripts).

4. Use Cases – Google Analytics, chat widgets, ads, or any external JS library.

5. Benefits – Improves performance, avoids blocking main thread, ensures proper script execution.
*/

/*
Definition (Using Specific Terms):
`next/script` in Next.js is a specialized component to add external or inline scripts
with control over their loading strategy, prioritization, and execution order,
ensuring optimized performance and avoiding render-blocking issues.
*/

/*
Code Example:

import Script from "next/script";

export default function Home() {
  return (
    <div>
      <h1>Home Page with External Script</h1>

      {/* Loads after the page is interactive }
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />

      {/* Inline script executed after page is interactive }
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>

      {/* Lazy load script when browser is idle }
      <Script src="/custom-script.js" strategy="lazyOnload" />
    </div>
  );
}
*/

/*
Important Notes:
- Always choose the correct `strategy` based on criticality of the script.
- Scripts with beforeInteractive can block page, use sparingly.
- Works both in Pages Router and App Router.
- Can include inline scripts using the `id` prop for proper hydration.
*/

/*
Follow-up Questions + Answers:

Q1: What is next/script used for?
A1: Loading external or inline scripts efficiently with optimized strategies.

Q2: What loading strategies does it support?
A2: beforeInteractive, afterInteractive, lazyOnload.

Q3: Which strategy should you use for Google Analytics?
A3: afterInteractive (non-blocking, runs after page hydration).

Q4: Can you use inline scripts with next/script?
A4: Yes, provide the code as children and assign an `id`.

Q5: Does next/script improve performance?
A5: Yes, by controlling load timing and avoiding render-blocking.
*/
