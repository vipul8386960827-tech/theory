/*
ReactDOMServer – Interview-Ready Answer

Definition:  
`react-dom/server` is a React package that enables **server-side rendering (SSR)**.  
It converts React components into static HTML strings on the server, which are sent to the client.  
This improves **initial load performance** and **SEO**, since search engines can crawl HTML directly.  

------------------------------------------------
Key Points:
- Part of React’s ecosystem for SSR.  
- Works on Node.js server environments.  
- Supports methods like `renderToString`, `renderToStaticMarkup`, and `renderToPipeableStream`.  
- Used by frameworks like **Next.js** and **Remix**.  
- HTML is first rendered on the server, then React hydrates it on the client for interactivity.  

------------------------------------------------
Code Examples:

1️⃣ renderToString (includes React IDs for hydration):
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const html = ReactDOMServer.renderToString(<App />);
console.log(html);
// Output: <div data-reactroot="">...App HTML...</div>

2️⃣ renderToStaticMarkup (lighter HTML, no React IDs):
const staticHtml = ReactDOMServer.renderToStaticMarkup(<App />);
console.log(staticHtml);
// Output: <div>...App HTML...</div>

3️⃣ renderToPipeableStream (React 18+ streaming SSR):
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    pipe(res); // Streams chunks to client
  }
});

------------------------------------------------
Real-Life Analogy:
- ReactDOM (client) = Chef 👨‍🍳 cooking in front of you (client builds UI live).  
- ReactDOMServer = Chef prepares food in kitchen 🏠 (server pre-renders HTML).  
- Streaming SSR = Food truck 🍲 serving food bit by bit as it’s ready.  

------------------------------------------------
Possible Follow-Up Questions:

Q1: What’s the difference between renderToString and renderToStaticMarkup?  
A1: `renderToString` includes React-specific attributes for hydration, while `renderToStaticMarkup` generates plain static HTML without React IDs.  

Q2: Why is ReactDOMServer useful for SEO?  
A2: Because it renders full HTML before sending it to the browser, making content visible to search engines immediately.  

Q3: What’s new in React 18 for SSR?  
A3: Streaming SSR with `renderToPipeableStream`, which sends chunks of HTML progressively for faster load times.  

Q4: How does hydration work with ReactDOMServer?  
A4: After HTML is rendered on the server, React attaches event listeners on the client using `hydrateRoot`.  

Q5: Can ReactDOMServer be used in React Native?  
A5: No, it is specific to web rendering; React Native has its own renderer.  
*/
