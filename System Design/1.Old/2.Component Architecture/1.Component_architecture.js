/*  
===============================================================================
FRONTEND SYSTEM DESIGN — COMPONENT ARCHITECTURE & RENDERING STRATEGY
(CRISP, INTERVIEW-READY, ONLY WHAT THE INTERVIEWER WANTS TO HEAR)
===============================================================================

##########################################
# 1. COMPONENT ARCHITECTURE
##########################################

Definition:
- Component architecture is the **organization of UI into small, reusable, 
  independent units (components)** that encapsulate their own UI and logic.
- Helps in **scalability, maintainability, reusability, and performance**.

Key points to highlight in interview:
1. **Separation of Concerns**:
   - Presentational (Dumb) components → UI only, reusable
   - Container (Smart) components → API calls, state, business logic
2. **Global systems**:
   - Toasts, Modals, Theme, Error Boundaries, Caching
3. **Hierarchy**:
   - Pages → Containers → Presentational components → Utils/hooks
4. **Design principles**:
   - Keep components small and focused
   - Minimize prop drilling
   - Avoid unnecessary re-renders
   - Use smart vs dumb separation to improve readability and maintainability

Example you can mention:
- Smart component fetches product list → passes data to dumb ProductCard components for rendering.

One-liner for interview:
- “Component architecture is structuring the frontend into small, reusable, 
  and maintainable units where smart components handle logic and dumb 
  components handle UI.”

----------------------------------------
# 2. RENDERING STRATEGY
##########################################

Definition:
- Rendering strategy defines **how and when the UI updates** in the browser.

Types & when to use (Interview-ready):
1. **Client-Side Rendering (CSR)**:
   - Entire rendering happens in the browser.
   - Good for dynamic, user-interactive apps.
   - Example: React SPA
   - Pros: Fast interactions after initial load, rich client logic
   - Cons: Slower initial load, SEO challenges

2. **Server-Side Rendering (SSR)**:
   - HTML rendered on server and sent to client.
   - Good for SEO and fast first contentful paint.
   - Example: Next.js `getServerSideProps`
   - Pros: Better SEO, faster first load
   - Cons: Server load, slower interactivity

3. **Static Site Generation (SSG)**:
   - Pages pre-built at build time.
   - Good for blogs, docs, marketing sites.
   - Example: Next.js `getStaticProps`
   - Pros: Very fast, cacheable
   - Cons: Not good for frequently changing data

4. **Incremental Static Regeneration (ISR)**:
   - Pre-rendered pages with background updates.
   - Good for semi-dynamic content.
   - Example: Next.js ISR

5. **Hydration**:
   - Server-rendered HTML is “hydrated” with React to become interactive.
   - Important in SSR/SSG

Key points for interview:
- “Rendering strategy depends on use-case: CSR for dynamic apps, SSR/SSG for SEO and performance, ISR for hybrid.”
- “Hydration connects server HTML with client-side interactivity.”

----------------------------------------
# 3. WHAT INTERVIEWER WANTS TO HEAR
##########################################
1. Understanding of smart vs dumb component separation.
2. Awareness of global systems like toasts/modals/caching.
3. Clear knowledge of rendering strategies (CSR, SSR, SSG, ISR).
4. Ability to justify choice based on performance, SEO, and interactivity.
5. Knowledge of hydration and when it’s required.

===============================================================================
END
===============================================================================
*/
