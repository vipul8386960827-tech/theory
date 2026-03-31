/*
🔵 SERVER STATE (Deep Dive)

📌 Definition:
State that comes from a backend/server and needs to be fetched, cached,
synchronized, and kept up-to-date with the server.

It is NOT owned by the frontend—it is a “source of truth” on the server.

---------------------------------------------------------------------

🧠 CORE IDEA:
“Server is the source of truth, frontend is a cache/view layer”

- Data lives on backend
- Frontend fetches and displays it
- Needs syncing, caching, and revalidation

---------------------------------------------------------------------

⚙️ COMMON TOOLS:

1. React Query (TanStack Query) → Most recommended
2. SWR → Lightweight alternative
3. (Not Redux by default)

---------------------------------------------------------------------

✅ WHEN TO USE SERVER STATE:

1. API data
   - User profile
   - Feed data
   - Dashboard stats

2. Data that needs caching
   - Avoid refetching repeatedly

3. Data that changes over time
   - Needs refetching / syncing

4. Shared across multiple components but owned by backend

---------------------------------------------------------------------

🚫 WHEN TO AVOID (IMPORTANT):

1. Pure UI state
   → modal open/close

2. Temporary frontend-only data
   → form input

3. Static data that doesn’t change

---------------------------------------------------------------------

⚡ PROS:

✔ Built-in caching
✔ Automatic refetching
✔ Background updates
✔ Deduplication of requests
✔ Handles loading & error states
✔ Sync with server easily

---------------------------------------------------------------------

❌ CONS:

✖ Requires understanding of caching strategies
✖ Can be complex with pagination/infinite scroll
✖ Debugging cache issues can be tricky
✖ Extra library dependency

---------------------------------------------------------------------

🔄 CORE PROBLEMS SERVER STATE SOLVES:

1. Caching
   → Avoid repeated API calls

2. Stale Data Handling
   → Know when data is outdated

3. Refetching
   → On focus, interval, or manual trigger

4. Deduplication
   → Same request made once, reused

5. Synchronization
   → Keep UI consistent with backend

---------------------------------------------------------------------

🔁 HOW IT WORKS (SIMPLIFIED FLOW):

Component → request data
         → library checks cache

👉 If cached:
   → return cached data immediately

👉 If not:
   → fetch from API
   → store in cache

Later:
→ background refetch updates data

---------------------------------------------------------------------

🧩 IMPORTANT CONCEPTS:

1. Cache Key
   → Unique identifier for data

   Example:
   ["user", userId]

---

2. Stale vs Fresh Data
   → Determines if refetch is needed

---

3. Invalidation
   → Mark data as outdated

---

4. Refetching Triggers
   - Window focus
   - Network reconnect
   - Interval polling

---

5. Pagination / Infinite Scroll
   → Special handling for large datasets

---------------------------------------------------------------------

⚠️ COMMON MISTAKES:

❌ Storing server data in Redux unnecessarily
❌ Refetching same data multiple times
❌ Not handling loading/error states
❌ Ignoring cache invalidation
❌ Mixing server state with UI state

---------------------------------------------------------------------

🚨 WHY NOT REDUX FOR SERVER STATE?

Redux:
- No built-in caching
- Manual loading/error handling
- No automatic refetching

👉 Leads to:
- Boilerplate
- Bugs
- Poor performance

---------------------------------------------------------------------

💡 ADVANCED INSIGHTS (INTERVIEW GOLD):

- “Server state is asynchronous and external”
- “It requires caching and synchronization”
- “Frontend acts as a cache layer”
- “Invalidation is the hardest problem”
- “React Query abstracts server state complexity”

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“I treat API data as server state and use tools like React Query to handle caching, background refetching, and synchronization, instead of managing it manually in Redux.”

---------------------------------------------------------------------
*/
