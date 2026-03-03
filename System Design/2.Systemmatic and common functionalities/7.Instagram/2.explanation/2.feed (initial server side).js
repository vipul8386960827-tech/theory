import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import FeedList from './FeedList';

export default async function FeedPage() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = null }) => {
      // Fetching the first 20 posts on the server
      const res = await fetch(`https://api.yoursite.com/posts?cursor=${pageParam}&limit=20`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store', 
      });
      return res.json();
    },
    initialPageParam: null,
  });

  return (
    <main>
      <h1>Your Feed</h1>
      {/* Passing the "frozen" data to the client components */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeedList />
      </HydrationBoundary>
    </main>
  );
}

/**
 * FEED ARCHITECTURE - STEP 1: THE SERVER-SIDE "PRE-BOOT"
 * * CONCEPT: We are performing a "Server-Side Prefetch".
 * * WHY NOT CLIENT-ONLY? 
 * If we use a simple useEffect or useQuery on the client, the user sees:
 * 1. White Screen -> 2. Loading Spinner -> 3. Data.
 * With this SSR approach, the user sees:
 * 1. Fully populated HTML with 20 posts immediately.
 */

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import FeedList from './FeedList';

export default async function FeedPage() {
  /**
   * 1. THE ISOLATED CACHE (QueryClient)
   * We create a NEW QueryClient for every single request. 
   * This is critical: If we shared a global QueryClient on the server, 
   * User A's data would leak into User B's cache. 
   * This instance lives only for the duration of this specific Page Render.
   */
  const queryClient = new QueryClient();

  /**
   * 2. SECURE AUTHENTICATION (The "Server Secret")
   * We access 'cookies()' directly from Next.js headers. 
   * In a secure app, the JWT is 'HttpOnly', meaning Client-side JS cannot see it.
   * By fetching on the server, we act as a "Secure Proxy"—we grab the token 
   * and attach it to our internal API call before the browser even wakes up.
   */
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  /**
   * 3. PREFETCHING THE INFINITE STREAM
   * We use 'prefetchInfiniteQuery' because our feed is a continuous scroll.
   * * - queryKey ['posts']: This is the unique ID for this data. It MUST match 
   * the key used in the Client-side FeedList exactly.
   * * - pageParam: For the very first load (Page 1), this is 'null'. 
   * The API will see 'null' and return the "latest" 20 posts.
   */
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = null }) => {
      // The Actual API Call
      const res = await fetch(`https://api.yoursite.com/posts?cursor=${pageParam}&limit=20`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        /**
         * cache: 'no-store' (DYNAMISM vs. SPEED)
         * Since the feed is personalized (based on your 'token'), we cannot 
         * cache this at the CDN/Server level. Every user must get their own 
         * fresh stream. 'no-store' tells Next.js: "Execute this fetch every time."
         */
        cache: 'no-store', 
      });

      if (!res.ok) throw new Error("Failed to fetch feed on server");
      return res.json();
    },
    initialPageParam: null,
  });

  /**
   * 4. DEHYDRATION (The "Freeze-Dry" Process)
   * At this point, queryClient.getQueryData(['posts']) is full of memes.
   * But we can't send a complex JS Class (QueryClient) to the browser.
   * * 'dehydrate(queryClient)' scans the cache and turns the data into 
   * a "Serialized JSON Snapshot". This includes:
   * - The Data itself.
   * - The Timestamp (when it was fetched).
   * - The Status (Success).
   */
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="feed-layout">
      {/* 5. THE HYDRATION BOUNDARY (The "Bridge")
        We wrap our Client Component (FeedList) in this Boundary.
        
        - state={dehydratedState}: We pass that JSON snapshot here.
        
        When the FeedList (Client Component) mounts:
        1. It calls useInfiniteQuery(['posts']).
        2. It checks the HydrationBoundary first.
        3. It finds the "Dehydrated" JSON.
        4. It "Rehydrates" (Thaws) that data into the BROWSER'S cache.
        5. RESULT: No network call is made for Page 1. It's instant.
      */}
      <HydrationBoundary state={dehydratedState}>
        <FeedList />
      </HydrationBoundary>
    </main>
  );
}
/**
 --------------------------------------------------------------------------------
 WHAT IS HAPPENING INSIDE FeedList
 --------------------------------------------------------------------------------

 FeedList is a Client Component ("use client").

 -------------------- SERVER SIDE (Initial Request) --------------------

 - Even though it is a Client Component, Next.js still renders it on the server
   during the initial request.

 - useInfiniteQuery runs.

 - It finds the prefetched data already inside the QueryClient cache.

 - It DOES NOT call the API again.

 - JSX renders using that cached data.

 - Final HTML with the first 20 posts is generated on the server
   and sent to the browser.

 At this stage:
   HTML exists.
   No event listeners exist.
   No interactivity yet.


 -------------------- CLIENT SIDE (Hydration Phase) --------------------

 - Browser receives the HTML.
 - React loads the JavaScript bundle.
 - Hydration starts.
 - React Query restores the cache from HydrationBoundary.
 - useInfiniteQuery runs again.
 - It sees fresh cached data.
 - No refetch for the first page.

 Now:
   Click events work.
   Scroll detection works.
   fetchNextPage works.
   State updates work.
   Full interactivity is active.

 --------------------------------------------------------------------------------
 FINAL SUMMARY

 Server builds the page.
 Client hydrates and activates it.
 --------------------------------------------------------------------------------
*/

/**
 =============================================================================
 HOW SSR + HYDRATION WORKS (Next.js App Router + React)
 =============================================================================

 ---------------------- 1️⃣ SERVER RENDER PHASE ----------------------

 - The entire page is rendered on the server.
 - All components run on the server.
 - JSX is converted into plain HTML.
 - Data (titles, content, etc.) is already inside the HTML.
 - The server sends this fully built HTML to the browser.

 At this moment in the browser:
   - The DOM is created from the HTML.
   - The content is visible immediately.
   - There are NO event listeners.
   - There is NO React state.
   - Hooks like useEffect have NOT run.
   - React is NOT attached yet.

 It is just static HTML.


 ---------------------- 2️⃣ CLIENT HYDRATION PHASE ----------------------

 - The JavaScript bundle loads in the browser.
 - React runs the components again.
 - React recreates the Virtual DOM.
 - React compares it with the existing real DOM.
 - If everything matches, hydration succeeds.

 During hydration, React:

   - Attaches event listeners (onClick, etc.)
   - Reconnects useState
   - Activates useEffect
   - Rebuilds the internal Fiber tree
   - Restores React Query cache (if using HydrationBoundary)
   - Takes ownership of the existing DOM

 IMPORTANT:
   React does NOT delete and recreate the DOM
   if the server and client output match.

 The DOM was created once (from server HTML).
 Hydration only connects React's logic to it.


 ---------------------- FINAL SUMMARY ----------------------

 Server:
   Builds the full HTML page.

 Client:
   Hydrates the page and activates interactivity.

 Think of it like:

   Server builds the body.
   Client attaches the brain.
 =============================================================================
*/