/*
Key Points (Interviewer Keywords + Explanation):
1. next-compose-plugins – Utility library to combine multiple Next.js plugins
   (like withTM, withBundleAnalyzer) into a single configuration.

2. Purpose – Simplifies managing multiple plugins without deeply nesting functions.

3. Use Cases – When using plugins for TypeScript paths, bundle analysis,
   CSS support, PWA, image optimization, etc.

4. Implementation – Install the package and wrap plugins using `withPlugins`.

5. Benefits – Cleaner next.config.js, easier to maintain and scale plugin usage.
*/

/*
Definition (Using Specific Terms):
next-compose-plugins allows developers to **compose multiple Next.js plugins**
into a single configuration. Instead of nesting each plugin manually, you can
combine them with `withPlugins`, passing options for each plugin separately.
*/

/*
Code Example:

// 1. Install
// npm install next-compose-plugins

// 2. Usage in next.config.js
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withTM = require("next-transpile-modules")(["some-external-lib"]);

const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["example.com"] },
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer, {}],
    [withTM, {}],
  ],
  nextConfig
);
*/

/*
Important Notes:
- Order of plugins can matter if they modify the same configuration.
- Provides a more readable and maintainable approach compared to nested plugin calls.
- Works with both App Router and Pages Router.
- Helps scale configuration as project grows and multiple plugins are required.
*/

/*
Follow-up Questions + Answers:

Q1: What is next-compose-plugins?
A1: A utility to combine multiple Next.js plugins in a clean way.

Q2: Why not just nest plugins manually?
A2: Nesting becomes messy and hard to maintain as the number of plugins grows.

Q3: Can you pass options to individual plugins?
A3: Yes, each plugin can have its own configuration object.

Q4: Does plugin order matter?
A4: Sometimes, especially if plugins modify the same parts of the config.

Q5: Is next-compose-plugins necessary for small projects?
A5: Not strictly, but it improves readability and maintainability as project grows.
*/
