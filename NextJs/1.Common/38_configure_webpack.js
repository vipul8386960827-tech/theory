/* 38_configure_webpack */
/*
Key Points (Interviewer Keywords + Explanation):
1. Webpack Configuration – Next.js allows **customizing Webpack**
   to modify the build process, add loaders, or plugins.

2. Implementation – Done in `next.config.js` via the `webpack` function.

3. Use Cases – Add support for new file types (e.g., SVGs, Markdown),
   modify optimization settings, integrate custom plugins, or alias paths.

4. Default Webpack – Next.js comes with a default Webpack setup,
   so most projects don’t need custom configuration unless required.

5. App Router & Pages Router – Works for both routers; applied at build time.
*/

/*
Definition (Using Specific Terms):
Configuring Webpack in Next.js involves extending or modifying the
default Webpack configuration via the webpack function in next.config.js.
It allows developers to customize how files are processed, add plugins,
or define module resolution aliases.
*/

/*
Code Example (next.config.js):

/** @type {import('next').NextConfig} 
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Example: Add support for SVG as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Example: Add a custom plugin
    // config.plugins.push(new MyCustomWebpackPlugin());

    return config;
  },
};

module.exports = nextConfig;
*/

/*
Important Notes:
- Custom Webpack configuration merges with Next.js default setup.
- Avoid overriding the default config completely unless necessary.
- Can handle loaders, plugins, aliases, and other advanced Webpack features.
- Useful for handling non-standard file types or advanced optimizations.
*/

/*
Follow-up Questions + Answers:

Q1: Why would you configure Webpack in Next.js?
A1: To add custom loaders, plugins, file type support, or modify build behavior.

Q2: Where is Webpack configured?
A2: In next.config.js using the webpack function.

Q3: Does this affect default Next.js optimizations?
A3: Custom changes are merged; default optimizations remain unless explicitly overridden.

Q4: Can you add support for SVG as React components?
A4: Yes, by adding a loader like @svgr/webpack.

Q5: Does Webpack config work for both App Router and Pages Router?
A5: Yes, it applies at build time for the entire project.
*/
/*
Key Points (Interviewer Keywords + Explanation):
1. Webpack Configuration – Next.js allows **customizing Webpack**
   to modify the build process, add loaders, or plugins.

2. Implementation – Done in `next.config.js` via the `webpack` function.

3. Use Cases – Add support for new file types (e.g., SVGs, Markdown),
   modify optimization settings, integrate custom plugins, or alias paths.

4. Default Webpack – Next.js comes with a default Webpack setup,
   so most projects don’t need custom configuration unless required.

5. App Router & Pages Router – Works for both routers; applied at build time.
*/

/*
Definition (Using Specific Terms):
Configuring Webpack in Next.js involves extending or modifying the
default Webpack configuration via the webpack function in next.config.js.
It allows developers to customize how files are processed, add plugins,
or define module resolution aliases.
*/

/*
Code Example (next.config.js):

/** @type {import('next').NextConfig} 
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Example: Add support for SVG as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Example: Add a custom plugin
    // config.plugins.push(new MyCustomWebpackPlugin());

    return config;
  },
};

module.exports = nextConfig;
*/

/*
Important Notes:
- Custom Webpack configuration merges with Next.js default setup.
- Avoid overriding the default config completely unless necessary.
- Can handle loaders, plugins, aliases, and other advanced Webpack features.
- Useful for handling non-standard file types or advanced optimizations.
*/

/*
Follow-up Questions + Answers:

Q1: Why would you configure Webpack in Next.js?
A1: To add custom loaders, plugins, file type support, or modify build behavior.

Q2: Where is Webpack configured?
A2: In next.config.js using the webpack function.

Q3: Does this affect default Next.js optimizations?
A3: Custom changes are merged; default optimizations remain unless explicitly overridden.

Q4: Can you add support for SVG as React components?
A4: Yes, by adding a loader like @svgr/webpack.

Q5: Does Webpack config work for both App Router and Pages Router?
A5: Yes, it applies at build time for the entire project.
*/
