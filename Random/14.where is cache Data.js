/*
🔵 WHERE CACHE DATA IS STORED (React Query / Client-side Caching)

📌 Definition:
Cached data is stored in memory (JavaScript runtime) inside a centralized
cache managed by the caching library (e.g., React Query).

---------------------------------------------------------------------

🧠 CORE IDEA:
“Cache lives in memory, managed centrally, not inside components”

- Stored in JS heap (browser memory)
- Managed globally by the library
- Shared across components

---------------------------------------------------------------------

📍 WHERE EXACTLY IS IT STORED?

- Inside the caching library’s internal store
- Not in:
  ❌ localStorage (by default)
  ❌ sessionStorage
  ❌ database

👉 Conceptually:

cache = {
  ["user", 1]: { name: "John" },
  ["posts"]: [...]
}

---------------------------------------------------------------------

⚡ CHARACTERISTICS:

✔ Very fast (in-memory access)
✔ Shared across components
✔ Automatically managed

❌ Lost on page refresh
❌ Not shared across tabs (by default)
❌ Not persistent unless configured

---------------------------------------------------------------------

👀 CAN WE VIEW THE CACHE?

👉 YES (very important for debugging)

1. React Query DevTools
   - Shows:
     ✔ Query keys
     ✔ Cached data
     ✔ Status (fresh/stale/loading)
     ✔ Last updated time

---

2. Programmatically:

const queryClient = useQueryClient();

const data = queryClient.getQueryData(["user", 1]);

👉 Access cached data directly

---------------------------------------------------------------------

🔄 CAN WE PERSIST CACHE?

👉 By default: ❌ No (in-memory only)

👉 But can be enabled:
- localStorage
- IndexedDB

(using persistence plugins)

---------------------------------------------------------------------

💡 ADVANCED INSIGHTS (INTERVIEW GOLD):

- “Cache is centralized and shared across components”
- “Stored in memory for fast access”
- “Cleared on refresh unless persisted”
- “DevTools help visualize and debug cache behavior”

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“Client-side cache in tools like React Query is stored in memory inside a centralized cache store. It is shared across components, not persisted by default, and can be inspected using DevTools or accessed programmatically.”

---------------------------------------------------------------------
*/