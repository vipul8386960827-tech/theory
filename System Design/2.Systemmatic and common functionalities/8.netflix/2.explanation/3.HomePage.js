/**
 * ARCHITECTURAL LOGIC: DESKTOP HOME PAGE (High Performance)
 * * * 1. INITIAL LOAD STRATEGY (Above-the-Fold)
 * - Goal: Minimize LCP (Largest Contentful Paint).
 * - Action: The server sends the first 3-5 rows (SSR/Streaming) immediately.
 * - Why: We want the user to see the 'Hero Banner' and 'My List' without a loading spinner.
 * * * 2. DATA PAGINATION (Incremental Fetching)
 * - Goal: Avoid "The Big Payload" (loading 1000+ movies at once).
 * - Logic: Use 'Cursor-based' pagination.
 * - Trigger: Attach an 'IntersectionObserver' to a sentinel (empty div) at the bottom.
 * - Action: When the sentinel is 200px from the viewport, fetch the next 5-row "chunk."
 * * * 3. LAYOUT STABILITY (Preventing CLS)
 * - Problem: Images loading in can cause the page to "jump" (Cumulative Layout Shift).
 * - Solution: Use 'Skeleton Screens' with fixed aspect-ratio containers (e.g., 16:9).
 * - Result: The browser reserves space for the movie card before the image arrives.
 * * * 4. IMAGE OPTIMIZATION (Desktop-Specific)
 * - Strategy: Use 'srcset' and 'sizes' attributes.
 * - Logic: Let the browser decide—request a 400px image for a small grid,
 * or an 800px image for a focused/expanded hover state.
 * - Format: Use Next-gen formats (WebP/AVIF) for faster decoding on Chrome/Edge.
 * * * 5. EVENT DEBOUNCING (Scroll Performance)
 * - Problem: Rapid mouse-wheel scrolling can choke the Main Thread.
 * - Solution: If using manual scroll listeners (rarely needed with IntersectionObserver),
 * wrap callbacks in a 'requestAnimationFrame' or 'debounce' function.
 */
