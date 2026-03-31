/*
🔵 CACHING LAYER (Concept + Implementation)

📌 Definition:
A caching layer is a mechanism that stores previously fetched data temporarily
so that future requests for the same data can be served faster without calling the server again.

It sits between the UI (frontend) and the API (backend).

---------------------------------------------------------------------

🧠 CORE IDEA:
“Don’t fetch the same data again if we already have it”

- Reduce network calls
- Improve performance
- Provide faster UI response

---------------------------------------------------------------------

📍 WHERE IT SITS:

UI Component
   ↓
Caching Layer (React Query / SWR)
   ↓
Backend API

---------------------------------------------------------------------

⚙️ HOW IT IS IMPLEMENTED (FRONTEND):

1. Using a Caching Library (Most Common)

Example: React Query

useQuery({
  queryKey: ["user", id],   // unique identifier
  queryFn: fetchUser,       // API function
  staleTime: 5000           // caching rule
});

👉 What happens:
- queryKey → identifies cached data
- queryFn → fetches data if not cached
- staleTime → controls freshness

---------------------------------------------------------------------

2. INTERNAL WORKING (SIMPLIFIED):

Step 1:
Component requests data

Step 2:
Caching layer checks:
→ “Do I already have this data?”

   ✔ YES → return cached data instantly
   ❌ NO  → call API

Step 3:
If API is called:
→ store response in cache

Step 4:
Future requests:
→ reuse cached data

---------------------------------------------------------------------

3. CENTRALIZED CACHE STORE:

- Cache is NOT stored per component
- It is stored globally inside the library

👉 Example (conceptually):

cache = {
  ["user", 1]: { name: "John" },
  ["posts"]: [...]
}

---------------------------------------------------------------------

4. CACHE KEY (VERY IMPORTANT):

- Unique identifier for each data set

Example:
["user", 1]
["posts", page]

👉 Same key = same cache entry

---------------------------------------------------------------------

5. CACHE LIFECYCLE:

- Fetch → Store → Use → Become stale → Refetch → Update

---------------------------------------------------------------------

⚡ KEY FEATURES:

✔ Instant data retrieval (cache hit)
✔ Reduced API calls
✔ Shared data across components
✔ Background updates (sync with server)

---------------------------------------------------------------------

🚫 WITHOUT CACHING:

Component → API → Server (every time)

❌ Slow
❌ Repeated calls
❌ Poor performance

---------------------------------------------------------------------

💡 ADVANCED INSIGHT:

- Frontend acts as a “temporary data store”
- Cache is invalidated or refreshed when data becomes stale
- Libraries handle complexity like deduplication and refetching

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“A caching layer stores previously fetched API data and serves it from memory to avoid redundant network calls. It is implemented using libraries like React Query, where we define cache keys and fetching logic, and the library manages a centralized cache internally.”

---------------------------------------------------------------------
*/
