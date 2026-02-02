/* 57_google_analytics */
/*
Key Points (Interviewer Keywords + Explanation):
1. Google Analytics – Tool to track website traffic, user behavior,
   and interactions in Next.js apps.

2. Implementation – Can be added via script tag, `next/script`,
   or libraries like `nextjs-google-analytics`.

3. Use Cases – Track page views, events, conversions, and user engagement.

4. Methods – 
   - Pages Router: Track route changes using `useEffect` and `next/router`.
   - App Router: Track route changes using `usePathname` or `useSearchParams` from `next/navigation`.

5. Benefits – Helps analyze user behavior, improve UX, and measure KPIs.
*/

/*
Definition (Using Specific Terms):
Google Analytics in Next.js allows developers to monitor user activity
by embedding GA scripts or using libraries. It can track page views,
events, and conversions in both Pages Router and App Router.
*/

/*
Code Example (Pages Router):

// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", "GA_MEASUREMENT_ID", { page_path: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

/*
Code Example (App Router):

// app/layout.js
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", { page_path: pathname });
    }
  }, [pathname]);

  return (
    <html>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
*/

/*
Important Notes:
- Replace GA_MEASUREMENT_ID with your actual Google Analytics ID.
- Use next/script for optimized script loading.
- Track route changes for SPAs to log page views correctly.
- Works with both Pages Router and App Router.
*/

/*
Follow-up Questions + Answers:

Q1: How do you integrate Google Analytics in Next.js?
A1: Use next/script or libraries; track route changes for SPAs.

Q2: Difference in Pages Router vs App Router integration?
A2: Pages Router uses useRouter events; App Router uses usePathname or useSearchParams.

Q3: Can you track events in addition to page views?
A3: Yes, using window.gtag('event', 'action', {...}).

Q4: Where should scripts be placed?
A4: Inside _app.js (Pages) or layout.js (App Router) with strategy="afterInteractive".

Q5: Does this affect SSR?
A5: No, scripts run only on the client.
*/
