/*
 STALE-WHILE-REVALIDATE USING INDEXEDDB (EXPLANATION)

 Core Idea:
 Serve data instantly from local cache (IndexedDB),
 while simultaneously fetching fresh data in the background,
 and updating the cache + UI if needed.

 STEP 1: User requests data
 Example: dashboard data, table data, feed, etc.

 STEP 2: Check IndexedDB first (CACHE READ)
 - Look for existing data using a key (e.g., "users", "dashboard-data")
 - If data exists → treat it as "stale but usable"

 STEP 3: Return cached data immediately (STALE)
 - UI renders instantly with cached data
 - No loading spinner (or minimal)
 - This improves perceived performance drastically

 STEP 4: Trigger background fetch (REVALIDATE)
 - Make a network request to get fresh/latest data
 - This runs in parallel without blocking UI

 STEP 5: Compare old vs new data
 - Check if fresh data is different from cached data
 - Comparison strategies:
   • Deep equality (simple but expensive)
   • Versioning (preferred: server sends version/timestamp)
   • Hash comparison

 STEP 6: If data is unchanged
 - Do nothing
 - Avoid unnecessary re-renders

 STEP 7: If data is changed
 - Update IndexedDB with fresh data
 - Notify the UI layer (state update / event / store update)
 - UI re-renders with latest data

 STEP 8: Subsequent requests
 - Always repeat same flow:
   1. Instant cache response
   2. Background revalidation

 WHY THIS SCALES WELL:

 1. Avoids blocking UI
 - No waiting for API before rendering
 - Main thread stays responsive

 2. Reduces network load
 - Cached data reused across sessions
 - Fewer redundant API calls

 3. Handles large datasets efficiently
 - IndexedDB stores large structured data (unlike memory limits)

 4. Better UX
 - Instant load + silent updates feels smooth

 IMPORTANT DESIGN CONSIDERATIONS:

 Cache Invalidation:
 - Add TTL (time-to-live) if data becomes too old
 - Or rely on versioning from backend

 Consistency:
 - UI might briefly show stale data
 - Acceptable for most dashboards, feeds, analytics

 Update Mechanism:
 - Use state management (Redux, Zustand, etc.) or event system
 - So UI updates automatically after revalidation

 Error Handling:
 - If background fetch fails → keep showing stale data
 - Never break UI because network failed

 SUMMARY (INTERVIEW ONE-LINER):
 "We first serve data from IndexedDB for instant rendering,
 then revalidate in the background, update the cache,
 and refresh the UI only if the data has changed."
 */

/*
PROBLEM:
In stale-while-revalidate, the user sees cached (stale) data instantly.
This can mislead the user into thinking the data is fresh and up-to-date.


HOW TO HANDLE THIS:

1. LAST UPDATED TIMESTAMP
Store a timestamp along with cached data in IndexedDB and show it in the UI
(e.g., "Last updated: 2 mins ago").
This makes it clear that the data may not be real-time.

2. BACKGROUND LOADING INDICATOR
Even while showing cached data, indicate that fresh data is being fetched.
This can be a small spinner, "Refreshing..." text, or subtle progress bar.
This signals that the UI is not final yet.

3. SOFT UI UPDATE
When fresh data arrives, update the UI smoothly and optionally show a small
notification like "Updated".
This helps users notice that data has changed without being disruptive.

4. AVOID FOR CRITICAL DATA
For highly sensitive or real-time data (e.g., payments, bank balance, trading),
do not rely on stale data first. Always fetch fresh data before displaying.

5. TTL (TIME-TO-LIVE)
Attach an expiry time to cached data. If the data is too old (e.g., older than
5 minutes), skip showing it and fetch fresh data instead.

6. VISUAL DIFFERENTIATION
Optionally mark cached data visually (e.g., "Offline data" or dimmed UI) so
users understand it's not live.

7. MANUAL REFRESH OPTION
Provide a refresh button so users can explicitly fetch the latest data if needed.


SUMMARY:
Show cached data instantly for performance, but clearly communicate that it may
not be fresh using timestamps, loading indicators, and smooth updates.

INTERVIEW ONE-LINER:
"We show cached data instantly, indicate background revalidation, display last
updated timestamps, and update the UI only when fresh data arrives to avoid
misleading the user."
*/
