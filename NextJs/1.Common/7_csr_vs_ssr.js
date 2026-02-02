/* 7_csr_vs_ssr */
/*
1. Definition
---------------------------------------------------------
CSR (Client-Side Rendering):
- Rendering happens in the browser.
- Server sends minimal HTML + JavaScript.
- JS executes → UI is rendered on the client.

SSR (Server-Side Rendering):
- Rendering happens on the server.
- Server sends fully rendered HTML for each request.
- Browser displays content immediately, then hydrates.
*/

/*
2. Rendering Flow
---------------------------------------------------------
CSR Flow:
1. Browser requests page
2. Server sends empty/minimal HTML + JS
3. JS loads
4. React renders UI in browser

SSR Flow:
1. Browser requests page
2. Server renders HTML
3. Fully populated HTML sent to browser
4. JS hydrates the page
*/

/*
3. Performance (Initial Load)
---------------------------------------------------------
CSR:
- Slower first content paint
- Faster after JS is loaded
- Blank screen possible initially

SSR:
- Faster first content paint
- Content visible immediately
- Slightly slower navigation after hydration
*/

/*
4. SEO
---------------------------------------------------------
CSR:
- Poor SEO by default
- Search engines may struggle with JS-heavy pages

SSR:
- Excellent SEO
- Search engines receive ready HTML
*/

/*
5. Server Load
---------------------------------------------------------
CSR:
- Less load on server
- Most work done on client

SSR:
- Higher server load
- Each request triggers server rendering
*/

/*
6. Caching
---------------------------------------------------------
CSR:
- Harder to cache meaningful HTML
- Mostly caches JS bundles

SSR:
- HTML can be cached (CDN, edge)
- Improves performance significantly
*/

/*
7. User Experience
---------------------------------------------------------
CSR:
- Fast transitions after initial load
- SPA-like smooth interactions

SSR:
- Faster first impression
- Slight delay during hydration
*/

/*
8. Security
---------------------------------------------------------
CSR:
- API keys must be handled carefully
- Logic runs in browser

SSR:
- Sensitive logic can stay on server
- Better control over secrets
*/

/*
9. Real-world Use Cases
---------------------------------------------------------
CSR:
- Dashboards
- Authenticated apps
- Internal tools
- Apps where SEO is not important

SSR:
- Blogs
- Marketing websites
- E-commerce product pages
- SEO-critical pages
*/

/*
10. CSR vs SSR (One-liner for Interviews)
---------------------------------------------------------
"CSR renders UI in the browser using JavaScript, while SSR renders
HTML on the server and sends it to the client for faster initial
load and better SEO."
*/

/*
11. Possible Follow-up Interview Questions
---------------------------------------------------------
Q1: Is SSR always better than CSR?
A: No, SSR improves SEO and initial load but increases server cost.

Q2: Can an app use both CSR and SSR?
A: Yes, frameworks like Next.js support hybrid rendering.

Q3: What is hydration?
A: The process where client-side JS attaches event listeners
   to server-rendered HTML.

Q4: Does SSR eliminate the need for client-side JS?
A: No, JS is still required for interactivity.

Q5: Is SSR slower than CSR?
A: SSR is faster for first load but may be slower for each request.
*/
