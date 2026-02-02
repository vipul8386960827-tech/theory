/* 34_custom_headers */
/*
Key Points (Interviewer Keywords + Explanation):
1. Custom Headers – Next.js allows sending HTTP headers
   for specific routes using next.config.js.

2. Implementation – Use the async headers() function in next.config.js.

3. Use Cases – Security headers (CSP, HSTS), caching headers,
   CORS, or custom response headers.

4. Route Matching – Headers can be applied to specific paths or patterns.

5. App Router & Pages Router – Works the same way for both; handled at the server level.
*/

/*
Definition (Using Specific Terms):
Custom headers in Next.js are HTTP headers that can be configured
per route or path pattern in next.config.js using the async headers()
function. They are useful for security, caching, CORS, or custom
metadata sent with responses.
*/

/*
Code Example (Usage in next.config.js):

/** @type {import('next').NextConfig} 
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/api/:path*", // specific to API routes
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
*/

/*
Important Notes:
- Headers are applied at the server response level.
- Can target specific routes or patterns using the source property.
- Useful for improving security and controlling caching behavior.
- Works for both Pages Router and App Router.
*/

/*
Follow-up Questions + Answers:

Q1: What are custom headers in Next.js?
A1: HTTP headers configured per route via next.config.js.

Q2: How do you define custom headers?
A2: Using async headers() function in next.config.js.

Q3: Can headers be applied to all routes?
A3: Yes, by setting source: "/(.*)".

Q4: Give examples of use cases.
A4: Security headers (CSP, HSTS), caching headers, CORS headers.

Q5: Does this work for API routes too?
A5: Yes, you can target API paths using route patterns like /api/:path*.
*/
