/*  
===============================================================================
FRONTEND SYSTEM DESIGN — SWR VS REACT QUERY
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- Both SWR and React Query are **libraries for managing server state** in React.
- They handle **data fetching, caching, revalidation, and background updates** automatically.
- Key difference: React Query has **more built-in features for mutations, pagination, and dev tools**, 
  while SWR is **lighter and simpler**.

##########################################
# COMPARISON TABLE
##########################################
| Feature                     | SWR                              | React Query                             |
|-------------------------------|---------------------------------|----------------------------------------|
| Library Size                  | Lightweight                     | Slightly heavier                        |
| Primary Focus                 | Fetching and caching             | Fetching, caching, mutations, queries  |
| Mutations / POST/PUT/DELETE   | Manual / custom                  | Built-in `useMutation` hook            |
| Query Invalidation             | Manual via `mutate()`            | Built-in `invalidateQueries()`         |
| Pagination / Infinite Query    | Manual                           | Built-in hooks (`useInfiniteQuery`)    |
| DevTools                       | Minimal                          | Full DevTools support                   |
| Stale-While-Revalidate         | Yes                              | Yes                                     |
| Background Refetch             | Yes (focus, reconnect)           | Yes (focus, reconnect, interval)       |
| Learning Curve                 | Easier                          | Slightly steeper                        |

##########################################
# WHEN TO USE SWR
##########################################
- Smaller apps where **only fetching and caching** is needed.
- Prefer simplicity and lightweight solution.
- Focus on **stale-while-revalidate** pattern.

##########################################
# WHEN TO USE REACT QUERY
##########################################
- Complex apps with **mutations, pagination, dynamic queries**.
- Need **built-in devtools** for debugging.
- Need advanced features like **query invalidation, retries, optimistic updates**.

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “SWR is a lightweight library focused on stale-while-revalidate caching and background updates, 
  suitable for simpler apps. React Query is more feature-rich, supporting mutations, pagination, 
  and advanced cache invalidation, making it better for complex applications.”

##########################################
# INTERVIEW TIPS
##########################################
- Mention **stale-while-revalidate** for both.
- Highlight **mutation and dev tools advantages in React Query**.
- Optional: Discuss **team/project size** and **complexity** as deciding factors.

===============================================================================
END
===============================================================================
*/
