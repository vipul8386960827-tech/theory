/* 255_react_hydration.js */

/*
=====================================
React Hydration
=====================================

Definition:
**Hydration** is the process in React where a server-rendered HTML 
(SSR/SSG) is attached to React's virtual DOM on the client side. 
It makes the static HTML interactive by binding event listeners and enabling 
React's lifecycle methods.

-------------------------------------
Key Points:
-------------------------------------

1. **Purpose**
   - Converts static HTML generated on the server into a fully interactive React app.
   - Avoids re-rendering the entire DOM from scratch on the client, improving performance.

2. **Usage**
   - Commonly used with SSR frameworks like Next.js or Gatsby.
   - Hydration occurs via `ReactDOM.hydrate` (React 17) or `ReactDOM.hydrateRoot` (React 18+).

3. **Difference Between Render and Hydrate**
   - `ReactDOM.render`: Creates a new DOM tree.
   - `ReactDOM.hydrate`: Attaches React to an existing DOM tree without replacing it.

4. **Server-Side Rendering (SSR) Requirement**
   - Server must send pre-rendered HTML.
   - Hydration ensures that the client-side React app matches the server HTML.

5. **Potential Issues**
   - **Mismatch warnings**: If server and client HTML differ.
   - Event listeners must be correctly bound after hydration.
   - Initial state must match between server and client to avoid inconsistencies.

-------------------------------------
Example:
-------------------------------------
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// React 18+ Hydration
const root = ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <App />
);

-------------------------------------
Notes:
-------------------------------------
- Hydration improves **performance** by avoiding full re-render.
- It enables **SEO benefits** as server sends fully rendered HTML.
- Ensure **state consistency** between server and client to prevent React warnings.

-------------------------------------
Analogy:
-------------------------------------
- Hydration = **plugging in a pre-assembled machine**:
  - Machine is built (HTML from server).
  - React plugs in event handlers and logic to make it fully functional on the client.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: When should you use React Hydration instead of render?  
A1: When using server-side rendering or static site generation to attach React to existing HTML.

Q2: What happens if server HTML and client markup don’t match?  
A2: React logs a warning and may re-render parts of the DOM to reconcile differences.

Q3: Can hydration be used with client-only apps?  
A3: No, hydration is meant for SSR/SSG. Client-only apps use `ReactDOM.render` or `createRoot`.

Q4: How does hydration impact SEO?  
A4: Hydrated HTML allows search engines to see fully rendered content immediately, improving SEO.
*/
