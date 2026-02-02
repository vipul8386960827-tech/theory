/* 180_browser_support_for_react_applications.js

=================================================
Browser Support for React Applications
=================================================

📌 Definition:
React supports all modern evergreen browsers out-of-the-box.  
Older browsers (like IE11) require polyfills and transpilation.  
From React 18 onward, IE11 is no longer supported.  

-------------------------------------------------
✅ Supported Browsers:
-------------------------------------------------
1. Modern Browsers:
   - Chrome, Firefox, Edge, Safari, Opera

2. Mobile Browsers:
   - iOS Safari, Chrome for Android, Samsung Internet, Android WebView

3. Older Browsers:
   - IE11 not supported in React 18+
   - Use `react-app-polyfill` for legacy support if needed

-------------------------------------------------
✅ Adding Support for Older Browsers:
-------------------------------------------------
- Use Babel for transpiling ES6+ to ES5
- Add polyfills (e.g., Promise, Map, Set, Object.assign)
- Example:
  import "react-app-polyfill/ie11";
  import "react-app-polyfill/stable";

-------------------------------------------------
⚠️ Important Notes:
-------------------------------------------------
- Always test React apps on target browsers (especially mobile).
- Without polyfills, modern React features may break in older browsers.
- Evergreen browser focus means smaller bundles and faster apps.

-------------------------------------------------
🔎 Follow-Up Interview Questions:
-------------------------------------------------
Q1: Does React 18 support Internet Explorer?  
A1: No, IE11 support was officially dropped.  

Q2: How do we ensure a React app runs in older browsers?  
A2: By using Babel for transpilation and polyfills for missing APIs.  

Q3: Why are polyfills important?  
A3: They allow React apps to run on browsers that lack modern JS features.  

Q4: What’s the advantage of targeting evergreen browsers?  
A4: Better performance, smaller bundles, and reduced maintenance.  

*/
