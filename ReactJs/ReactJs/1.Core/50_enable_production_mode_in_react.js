/*
=====================================
Enable Production Mode in React
=====================================

Definition:
In React, production mode is a mode where development-only warnings, 
extra checks, and debugging helpers are removed.  
This reduces bundle size and improves runtime performance.  

React itself doesn’t have a "switch" — instead, production mode is enabled 
through the build process (like Webpack, Vite, or CRA) by setting 
NODE_ENV = "production".

-------------------------------------
Key Points:
-------------------------------------
- Development mode:
  - Includes helpful warnings (like prop type issues).
  - Has extra runtime checks for React internals.
  - Slower performance, larger bundle.  
- Production mode:
  - Removes warnings/debug info.
  - Optimized bundle for speed and size.
  - Minified JavaScript.

-------------------------------------
How to Enable Production Mode:
-------------------------------------

1) Using Create React App (CRA):
   npm run build
   // This automatically sets NODE_ENV to "production"
   // and creates an optimized build in the /build folder.

2) With Webpack:
   In webpack.config.js:
   module.exports = {
     mode: "production", // enables production optimizations
   };

3) Manually set environment variable:
   Linux / macOS:
   NODE_ENV=production npm run start
   Windows (PowerShell):
   set NODE_ENV=production && npm run start

-------------------------------------
Real-Life Analogy:
-------------------------------------
Development mode is like driving a car 🚗 with all the sensors on 
(showing errors and warnings).  
Production mode is like switching to a sport mode 🏎️ where sensors 
are off for maximum performance.  

-------------------------------------
Example Check in Code:
-------------------------------------
if (process.env.NODE_ENV === "production") {
  console.log("App running in production mode");
} else {
  console.log("App running in development mode");
}

-------------------------------------
Advantages of Production Mode:
-------------------------------------
1. Smaller bundle size → faster load.  
2. Faster runtime performance.  
3. No unnecessary dev warnings in console.  
4. Better user experience due to optimizations.  

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: How does React know whether to run in dev or prod mode?
A1: React checks the value of process.env.NODE_ENV during build.  

Q2: What happens if I forget to build in production mode?
A2: Users get larger bundle sizes and worse performance, plus dev warnings 
    might leak to production.  

Q3: Is production mode enough for security?
A3: No. Production mode improves performance but you still need 
    other security practices (input validation, escaping, etc).  

Q4: Does production mode remove dead code?
A4: Yes, most bundlers (like Webpack with Terser) perform tree-shaking 
    and minification during production build.  

Q5: How do I verify my React app is running in production?
A5: Check process.env.NODE_ENV or ensure you built the app using 
    `npm run build` (CRA) or equivalent build tool config.  
*/
