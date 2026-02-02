/* 245_strict_mode_in_react.js

=====================================
Strict Mode in React
=====================================

Definition:
**React Strict Mode** is a development tool that helps detect potential problems in 
an application. It activates additional checks and warnings for its descendants 
without affecting production builds.

Key Points:
1. Only runs in **development mode**; does not impact production performance.
2. Highlights:
   - Unsafe lifecycle methods
   - Deprecated APIs usage
   - Side-effects in render phase
   - Detects unexpected side-effects by double-invoking certain functions
3. Helps prepare code for **future React releases** and best practices compliance.

Example:
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

Analogy:
- Strict Mode = **training wheels** on a bike; it alerts you of potential mistakes 
  during development, but is removed in production.

Follow-Up Interview Questions:
Q1: Does Strict Mode affect production builds?  
A1: No, it only runs in development mode.

Q2: Can Strict Mode detect all bugs?  
A2: No, it highlights only potential problems and unsafe patterns.

Q3: Can we wrap only part of the app in Strict Mode?  
A3: Yes, it can be applied to specific components or the entire app.

Q4: Why does Strict Mode sometimes double-invoke functions?  
A4: To detect unexpected side-effects in render or state initialization.
*/
