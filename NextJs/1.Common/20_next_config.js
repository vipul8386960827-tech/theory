/* 20_next_config */
/*
Key Points (Interviewer Keywords + Explanation):
1. next.config.js – Central configuration file in Next.js
   for customizing app behavior.

2. Common Configurations – Include basePath, rewrites, redirects,
   environment variables, image domains, and i18n.

3. Webpack Customization – Allows modifying Webpack config
   to extend build process.

4. Runtime vs Build Time – Some options apply at build time,
   others at runtime.

5. Next.js Defaults – next.config.js is optional; defaults work
   if not present.
*/

/*
Definition (Using Specific Terms):
next.config.js is a configuration file at the root of a Next.js project
that allows developers to customize and extend Next.js behavior,
modify Webpack settings, define environment variables,
set up redirects/rewrites, configure images, and more.
*/

/*
Code Example (Usage):

// next.config.js
/** @type {import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true,
  env: {
    CUSTOM_API_URL: "https://api.example.com",
  },
  images: {
    domains: ["example.com"],
  },
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
*/

/*
Important Notes:
- Optional file; Next.js works without it.
- Some settings require server restart to take effect.
- Can combine multiple configurations in a single file.
- Supports both synchronous and asynchronous functions.
*/

/*
Follow-up Questions + Answers:

Q1: What is next.config.js for?
A1: To customize Next.js behavior and extend configuration.

Q2: Can we define environment variables in next.config.js?
A2: Yes, via the env object.

Q3: How do we configure image domains?
A3: Using the images.domains array in next.config.js.

Q4: Can we set up redirects or rewrites?
A4: Yes, using async functions redirects() and rewrites().

Q5: Is next.config.js mandatory?
A5: No, Next.js works with default settings if not present.
*/
