/*
Key Points (Interviewer Keywords + Explanation):
1. Strict Mode – React feature enabled in Next.js to highlight potential problems
   in an application during development.

2. Implementation – Wrap your app in `<React.StrictMode>` or enable in `next.config.js`.

3. Benefits – Detects unsafe lifecycles, legacy API usage, unexpected side effects,
   and helps with future React upgrades.

4. Next.js Default – Strict Mode can be enabled in next.config.js with `reactStrictMode: true`.

5. Development Only – Warnings are shown in development; no impact on production.
*/

/*
Definition (Using Specific Terms):
Strict Mode in Next.js is a development tool that activates additional checks
and warnings for React components. It helps developers find potential bugs,
unsafe practices, and ensures adherence to modern React standards.
*/

/*
Code Example (next.config.js):

/** @type {import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true, // enables React Strict Mode for all components
};

module.exports = nextConfig;

/*
Code Example (Manual Usage in _app.js):

import React from "react";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}
*/

/*
Important Notes:
- Helps detect deprecated lifecycle methods, side effects, and legacy patterns.
- Strict Mode only affects development mode; production build runs normally.
- Can be applied globally via next.config.js or manually per component.
- Useful for improving code quality and preparing for React future versions.
*/

/*
Follow-up Questions + Answers:

Q1: What is React Strict Mode in Next.js?
A1: A development feature that highlights potential issues and unsafe practices.

Q2: How do you enable Strict Mode in Next.js?
A2: Either set `reactStrictMode: true` in next.config.js or wrap components in `<React.StrictMode>`.

Q3: Does it affect production builds?
A3: No, it only runs in development mode.

Q4: What issues does it help detect?
A4: Unsafe lifecycles, side effects, legacy API usage, deprecated patterns.

Q5: Should Strict Mode be enabled in production?
A5: No, it is meant for development only to catch issues early.
*/
