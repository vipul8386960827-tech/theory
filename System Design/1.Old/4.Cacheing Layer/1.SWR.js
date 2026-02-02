/*  
===============================================================================
FRONTEND SYSTEM DESIGN — SWR
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- SWR stands for **“stale-while-revalidate”**.
- It is a **React hook library for data fetching** developed by Vercel.
- Provides caching, revalidation, focus tracking, and fast UI updates automatically.

##########################################
# HOW SWR WORKS
##########################################
1. **Stale Data First**
   - Returns cached data immediately (stale) for fast UI updates.
2. **Revalidate in Background**
   - Fetches latest data from the server and updates the cache/UI.
3. **Automatic Revalidation**
   - Refetches data when window is focused or network reconnects.
4. **Deduplication**
   - Prevents multiple identical requests from firing simultaneously.

##########################################
# EXAMPLE USAGE
##########################################
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

function UserProfile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>Username: {data.name}</div>;
}

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “SWR provides a stale-while-revalidate strategy: it shows cached data immediately 
  while fetching fresh data in the background. It simplifies data fetching, caching, 
  and revalidation in React apps.”

##########################################
# INTERVIEW TIPS
##########################################
- Explain **stale-while-revalidate strategy**.
- Highlight **focus revalidation and automatic caching**.
- Compare briefly with **React Query** if asked (both handle server state efficiently).

===============================================================================
END
===============================================================================
*/


/*  
===============================================================================
DEEP DIVE — SWR CODE EXAMPLE
===============================================================================

import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

function UserProfile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>Username: {data.name}</div>;
}

##########################################
# HOW SWR WORKS IN THIS CODE
##########################################

1. **useSWR('/api/user', fetcher)**

- This is the core hook that handles **fetching, caching, and revalidation** automatically.
- Parameters:
  - First: '/api/user' → the **key** for caching. SWR uses this as the cache identifier.
  - Second: `fetcher` → function that tells SWR how to fetch data (returns a promise).

2. **CACHE**

- SWR maintains an **internal cache** (in-memory) keyed by '/api/user'.
- When the hook runs:
  - It checks if cached data exists for '/api/user'.
  - If yes, it **returns stale data immediately** for fast UI rendering.

3. **STALE-WHILE-REVALIDATE**

- After returning cached data, SWR **revalidates** by calling the fetcher in the background.
- Once new data arrives:
  - Cache is updated.
  - Component using the hook is **re-rendered automatically** with fresh data.

4. **REVALIDATION TRIGGERS**

- SWR automatically revalidates in these cases:
  - Window gains focus (e.g., user switches back to the tab)
  - Network reconnects after offline
  - Interval polling (if configured)
  - Manual `mutate()` call

5. **ERROR & LOADING HANDLING**

- SWR tracks:
  - `error` → if fetcher fails.
  - `isLoading` → initial fetch in progress.
- After first render:
  - If cached data exists, it may render immediately while `isLoading` can still be false.
  - After background fetch, `data` is updated and component re-renders.

6. **HOW IT ALL COMES TOGETHER**

Step by step:
- Component mounts → SWR checks cache:
  - If cache exists → renders stale data immediately.
  - Calls fetcher in background → fetches '/api/user'.
- Fetch completes → cache updated → component re-renders with fresh data.
- Subsequent mounts:
  - SWR returns cached data instantly.
  - Background revalidation ensures data is always fresh.

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “In SWR, the hook manages caching and stale-while-revalidate automatically. 
  It returns cached data immediately, fetches fresh data in the background, 
  updates the cache, and triggers a re-render. It also revalidates on focus, 
  network reconnect, or manual mutation.”

===============================================================================
END
===============================================================================
*/
