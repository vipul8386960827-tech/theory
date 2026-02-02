/* 87_purpose_of_rendertonodestream.js

=====================================================
Purpose of renderToNodeStream in React
=====================================================

Definition:
`renderToNodeStream` is a method provided by React for server-side rendering (SSR). 
It allows rendering a React component to a Node.js readable stream instead of generating 
the entire HTML string at once. This enables streaming HTML to the client progressively.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Streaming SSR
   - Instead of waiting for the full HTML, the server can send HTML chunks to the client as they are ready.
   - Improves perceived performance by allowing the browser to start parsing and displaying content sooner.

2. Use Cases
   - Large applications with complex components.
   - Faster Time-To-First-Byte (TTFB) for users.
   - Incremental hydration in React 18+.

3. How It Works
   - `renderToNodeStream(<App />)` returns a readable Node.js stream.
   - You pipe this stream to the HTTP response:
     ```
     const stream = renderToNodeStream(<App />);
     stream.pipe(res);
     ```

4. Difference from renderToString
   - `renderToString` renders the entire HTML at once (blocking).
   - `renderToNodeStream` streams HTML incrementally, non-blocking.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- renderToString = filling a bucket completely before pouring water.
- renderToNodeStream = pouring water from a bucket while still filling it; users start seeing water immediately.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why use renderToNodeStream instead of renderToString?  
A1: For faster initial render and streaming HTML to the client progressively.

Q2: Can renderToNodeStream be used with React 18 Suspense?  
A2: Yes, especially with streaming SSR to incrementally hydrate components.

Q3: Are there drawbacks to using renderToNodeStream?  
A3: Slightly more complex server code; handling backpressure and errors requires care.

Q4: How does this improve SEO and performance?  
A4: Crawlers and users receive HTML faster, improving perceived load time and SEO indexing.
*/
