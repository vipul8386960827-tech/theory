/* 41_include_polyfills_in_create_react_app.js

=====================================================
Including Polyfills in Create React App (CRA)
=====================================================

Definition:
Polyfills are JavaScript code that provide modern functionality on older browsers
that do not natively support certain features. In a CRA project, polyfills can be
added manually or via libraries to ensure cross-browser compatibility.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. Why Polyfills?
   - To support older browsers (e.g., IE11) that lack ES6+ features.
   - Examples: Promise, fetch, Array methods, Object methods.

2. Default Behavior in CRA
   - CRA includes some polyfills automatically.
   - But for custom or additional ones, you need to install them.

3. Ways to Add Polyfills
   a) Using core-js (Recommended)
      - Install: npm install core-js
      - Import in index.js:
          import "core-js/stable";
          import "regenerator-runtime/runtime";

   b) Using react-app-polyfill
      - Install: npm install react-app-polyfill
      - Import at the top of src/index.js:
          import "react-app-polyfill/ie11";
          import "react-app-polyfill/stable";

   c) Conditional Polyfills
      - Load polyfills only if the browser lacks support (dynamic import).

4. Example with CRA
   // src/index.js
   import "react-app-polyfill/ie11";
   import "react-app-polyfill/stable";
   import React from "react";
   import ReactDOM from "react-dom";
   import App from "./App";
   ReactDOM.render(<App />, document.getElementById("root"));

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Polyfills are like adapters in travel.
- If your device has a modern plug but the hotel has old sockets, the adapter (polyfill) makes them compatible.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the difference between a polyfill and a transpiler?  
A1: A transpiler (like Babel) converts modern JS syntax to older syntax, while a polyfill adds missing runtime features.

Q2: Why not always include all polyfills by default?  
A2: It increases bundle size; best to include only what's needed.

Q3: How does CRA handle polyfills for async/await?  
A3: Requires regenerator-runtime (included in react-app-polyfill/stable).

Q4: Can polyfills be tree-shaken?  
A4: Usually no, since polyfills patch global objects.
*/
