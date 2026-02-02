/*
Limitations of React – Interview-Ready Answer:

"React is powerful, but like any technology, it has limitations. Knowing them shows you 
understand when React may not be the best fit."

------------------------------------------------
1️⃣ Limitations of React
------------------------------------------------
1. Library, Not a Full Framework  
   - React only handles UI layer.  
   - Developers need to integrate routing (React Router), state management (Redux/Zustand), and APIs separately.  

2. Learning Curve  
   - JSX, hooks, and state management concepts can be confusing for beginners.  
   - Especially difficult when moving from class components to hooks.  

3. Frequent Updates  
   - React evolves quickly, so developers must continuously adapt.  
   - Some libraries break with new releases.  

4. SEO Challenges  
   - React apps are client-side rendered by default.  
   - Can hurt SEO unless SSR/SSG frameworks like Next.js are used.  

5. Boilerplate and Setup  
   - Large applications often require complex setup (state management, tooling, bundlers).  

6. Performance Issues in Large Apps  
   - Frequent re-renders if components are not optimized with memoization, useCallback, etc.  

7. Overhead for Small Projects  
   - Using React for very simple/static websites can be overkill compared to plain HTML/CSS/JS.  

------------------------------------------------
2️⃣ Real-Life Analogies
------------------------------------------------
- Global: Buying Lego for a single toy – too much overhead for a small need.  
- India-specific: Using a full cricket stadium 🏟️ just to play gully cricket – React may be overkill for small apps.  
- Web analogy: Installing a CMS for a static landing page – unnecessary complexity.  

------------------------------------------------
3️⃣ Example (SEO Limitation)
------------------------------------------------
import React from 'react';

function Blog() {
  return <h1>My Blog Post</h1>;
}

// If rendered client-side only:
// - Search engine bots may not see full HTML content immediately.
// - SEO ranking may be affected.
// Solution: Use Next.js for Server-Side Rendering (SSR).

------------------------------------------------
4️⃣ Possible Follow-Up Questions
------------------------------------------------
Q1: How can React’s SEO limitations be solved?  
A1: By using Next.js, Gatsby, or server-side rendering.  

Q2: How to reduce re-renders in large React apps?  
A2: Use memoization (`React.memo`, `useMemo`, `useCallback`) and efficient state management.  

Q3: Why do people say React is “just a library”?  
A3: Because it focuses only on UI rendering, while routing, state, and data handling need external libraries.  

Q4: When is React *not* the right choice?  
A4: For static websites, very simple apps, or cases where SEO is critical without SSR.  
*/
