/*
Key Points (Interviewer Keywords + Explanation):
1. Redirects – Automatically send users from one URL to another in Next.js.

2. Implementation – Defined in next.config.js using the async redirects() function.

3. Types – 
   a) Permanent (301) – SEO-friendly, browsers cache the redirect.
   b) Temporary (302) – Not cached, used for short-term changes.

4. Use Cases – Changed page URLs, A/B testing, legacy routes, or moved content.

5. App Router vs Pages Router – Works the same in both; defined in next.config.js.
*/

/*
Definition (Using Specific Terms):
Redirects in Next.js allow developers to forward traffic from one path
to another. Permanent redirects improve SEO by signaling search engines
about the new location, while temporary redirects are useful for short-term routing.
*/

/*
Code Example (Usage in next.config.js):

/** @type {import('next').NextConfig}
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/old-blog/:slug", // old URL pattern
        destination: "/blog/:slug", // new URL
        permanent: true,           // 301 redirect
      },
      {
        source: "/temporary-page",
        destination: "/home",
        permanent: false,          // 302 redirect
      },
    ];
  },
};

module.exports = nextConfig;
*/

/*
Important Notes:
- Redirects are handled server-side, before rendering the page.
- Supports dynamic parameters using :param notation.
- Permanent redirects are cached by browsers and search engines.
- Temporary redirects are useful for short-term tests or migrations.
*/

/*
Follow-up Questions + Answers:

Q1: What is a redirect in Next.js?
A1: Automatically sends users from one URL to another.

Q2: How do you define redirects?
A2: Using async redirects() function in next.config.js.

Q3: Difference between permanent and temporary redirects?
A3: Permanent (301) is cached and SEO-friendly; temporary (302) is not cached.

Q4: Can redirects handle dynamic routes?
A4: Yes, using :param notation in source and destination.

Q5: Do redirects work in both App Router and Pages Router?
A5: Yes, defined centrally in next.config.js.
*/
