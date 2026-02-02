/* 39_custom_babel */
/*
Key Points (Interviewer Keywords + Explanation):
1. Custom Babel – Next.js allows customizing Babel configuration
   to control JavaScript/TypeScript compilation.

2. Implementation – Create a `babel.config.js` or `.babelrc` file
   in the project root.

3. Use Cases – Add plugins, presets, or enable experimental features,
   like decorators, class properties, or JSX transforms.

4. Default Babel – Next.js comes with a default Babel setup,
   so custom Babel is only needed for special transformations.

5. App Router & Pages Router – Works for both; applied during build.
*/

/*
Definition (Using Specific Terms):
Custom Babel configuration in Next.js allows developers to modify
or extend the default Babel setup to include plugins or presets
for handling new syntax, optimizing code, or supporting experimental features.
*/

/*
Code Example (babel.config.js):

module.exports = {
  presets: ["next/babel"], // include default Next.js preset
  plugins: [
    "@babel/plugin-proposal-class-properties", // enable class properties
    "@babel/plugin-proposal-decorators",       // enable decorators
  ],
};

Important Notes:
- Always include "next/babel" preset to preserve Next.js defaults.
- Can add any standard Babel plugin or preset as needed.
- Avoid overriding presets completely unless necessary.
- Useful for experimental JavaScript/TypeScript features or custom transpilation.
*/

/*
Follow-up Questions + Answers:

Q1: Why use custom Babel in Next.js?
A1: To enable additional plugins or experimental JavaScript/TypeScript features.

Q2: Where do you define custom Babel config?
A2: In babel.config.js or .babelrc at the project root.

Q3: Do you need to include next/babel preset?
A3: Yes, to keep Next.js default behavior and optimizations.

Q4: Can it affect performance?
A4: Misconfigured plugins can affect build performance; use only necessary plugins.

Q5: Does this work with both App Router and Pages Router?
A5: Yes, Babel configuration applies globally at build time.
*/
