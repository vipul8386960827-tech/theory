/* 42_polyfills */
/*
Key Points (Interviewer Keywords + Explanation):
1. Polyfills – JavaScript code that adds support for features
   not available in older browsers or environments.

2. Next.js Usage – Next.js automatically includes some polyfills
   (like fetch) for modern browser support, but you can add custom ones.

3. Implementation – Add custom polyfills in a file (e.g., polyfills.js)
   and import it in _app.js or entry point.

4. Use Cases – Browser compatibility for features like:
   - Promise
   - Array methods (flat, find, includes)
   - Object methods (assign, entries)
   - Fetch API or Web APIs

5. Benefits – Ensures the application works across all target browsers,
   improving stability and UX.
*/

/*
Definition (Using Specific Terms):
Polyfills in Next.js are scripts that emulate modern JavaScript or Web API
features in environments where they are not natively supported. They
can be global (for all pages) and ensure backward compatibility.
*/

/*
Code Example (Adding Custom Polyfills):

// 1. Create a polyfills.js file
import "core-js/features/array/includes"; // polyfill Array.includes
import "core-js/features/promise";        // polyfill Promise
import "whatwg-fetch";                    // polyfill fetch for old browsers

// 2. Import in _app.js
// pages/_app.js or app/layout.js
import "../polyfills";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
*/

/*
Important Notes:
- Only add polyfills for features actually used to avoid bloating bundle.
- Next.js supports automatic polyfills for some modern features in browsers.
- Use libraries like core-js or whatwg-fetch for reliable polyfills.
- Polyfills can also be conditionally loaded for specific browsers if needed.
*/

/*
Follow-up Questions + Answers:

Q1: What is a polyfill?
A1: JavaScript code that adds support for features missing in older browsers.

Q2: How do you add a polyfill in Next.js?
A2: Create a polyfills.js file and import it in _app.js or layout.js.

Q3: Why are polyfills important?
A3: Ensures app works across all target browsers, improving compatibility.

Q4: Which features usually need polyfills?
A4: Promises, Array/Object methods, fetch, ES6+ features not supported in old browsers.

Q5: Can Next.js handle polyfills automatically?
A5: Some modern features are polyfilled automatically; custom polyfills can be added as needed.
*/
