/* 295_load_css_js_dynamically.js

=====================================================
Load CSS and JS Dynamically in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "You can dynamically add CSS and JS files to a webpage at runtime 
  by creating <link> or <script> elements and appending them to the DOM."

Key Points to Highlight:
- Useful for lazy-loading resources to improve performance
- Can conditionally load scripts/styles based on user actions
- For CSS: use <link rel="stylesheet">
- For JS: use <script src="...">

Examples:

// Dynamically load CSS
function loadCSS(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// Dynamically load JS
function loadJS(url, callback) {
  const script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  script.onerror = () => console.error('Error loading script:', url);
  document.body.appendChild(script);
}

loadCSS('styles.css');
loadJS('script.js', () => console.log('Script loaded successfully'));

Code Explanation:
- Create element (link/script)
- Set appropriate attributes (href/src, rel)
- Append to head or body
- onload and onerror handle success/failure

Real-Life Analogy:
- Like adding a new book or tool to your workspace only when you need it

Example / Usage:

// Conditional loading
if (userPrefersDarkMode) {
  loadCSS('dark-mode.css');
}

Follow-Up Interview Questions:
- Q1: Difference between static and dynamic loading?
  A1: Static: in HTML, loaded on page load; Dynamic: loaded via JS at runtime.
- Q2: Can dynamically loaded JS access DOM immediately?
  A2: Only after onload or after element appended.
- Q3: How to remove dynamically loaded CSS?
  A3: Find <link> element and remove it from document.head.
- Q4: Why use dynamic loading?
  A4: Reduce initial load, improve performance, conditionally load features.
- Q5: Can dynamically loaded scripts be async or defer?
  A5: Yes, set script.async = true or script.defer = true before appending.
*/
