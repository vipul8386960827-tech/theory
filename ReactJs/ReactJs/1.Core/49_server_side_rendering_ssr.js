/* 49_server_side_rendering_ssr.js */
/*
=====================================
Server-Side Rendering (SSR) in React
=====================================

Definition:
Server-Side Rendering (SSR) is a technique where React components 
are rendered on the server into HTML before being sent to the client.  
The client then hydrates this HTML with React to make it interactive.  

-------------------------------------
Key Points:
-------------------------------------
- Improves performance and SEO (search engines can crawl HTML directly).  
- Faster first paint since the browser receives ready HTML.  
- After hydration, React attaches event listeners and makes the page dynamic.  
- Commonly used with frameworks like Next.js that simplify SSR.  
- SSR is heavier on the server because rendering happens there for every request.  

-------------------------------------
Example: Basic SSR Concept
-------------------------------------
1) Server renders React component into an HTML string:
   const html = ReactDOMServer.renderToString(<App />);

2) Server sends this HTML to the client:
   res.send(`
     <html>
       <body>
         <div id="root">${html}</div>
         <script src="/bundle.js"></script>
       </body>
     </html>
   `);

3) Client runs React on <div id="root"> to hydrate and make it interactive:
   ReactDOM.hydrate(<App />, document.getElementById("root"));

-------------------------------------
Real-Life Analogy:
-------------------------------------
SSR is like serving a fully cooked meal 🍛 to your guest (browser) instead 
of just raw ingredients (JavaScript code).  
The guest can eat right away (view HTML) and later get access to extra 
seasonings (React hydration for interactivity).  

-------------------------------------
Advantages of SSR:
-------------------------------------
1. Better SEO → search engines see full HTML.  
2. Faster time-to-first-byte (TTFB) → user sees content quicker.  
3. Good for content-heavy sites like blogs, e-commerce, news.  
4. Sharing links on social media shows previews (since HTML is ready).  

-------------------------------------
Limitations of SSR:
-------------------------------------
1. Higher server load (every request renders HTML).  
2. Slower interactions until hydration finishes.  
3. Complexity in setup compared to client-side rendering.  
4. Handling client-specific APIs (like localStorage) is trickier.  

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Difference between SSR and CSR (Client-Side Rendering)?
A1: SSR renders on server then hydrates on client. CSR renders entirely 
    in the browser after JS loads.  

Q2: What is hydration in SSR?
A2: Hydration is React attaching event listeners to server-rendered HTML 
    to make it interactive.  

Q3: How does SSR affect SEO?
A3: Since full HTML is sent, crawlers can index content easily.  

Q4: What frameworks support SSR with React?
A4: Next.js, Remix, Gatsby (partially).  

Q5: When would you avoid SSR?
A5: For highly interactive apps with little SEO need (like dashboards), 
    CSR or Static Site Generation (SSG) may be better.  
*/
