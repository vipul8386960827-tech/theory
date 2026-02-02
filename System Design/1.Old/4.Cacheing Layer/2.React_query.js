/*  
===============================================================================
FRONTEND SYSTEM DESIGN — REACT QUERY
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- React Query is a **React library for fetching, caching, and managing server state**.
- It helps manage **async data** (REST APIs, GraphQL) without manually handling loading, error,
  or cache logic.
- Provides features like caching, background updates, pagination, and retries.

##########################################
# KEY FEATURES
##########################################
1. **Caching**
   - Stores fetched data in memory, keyed by query keys.
   - Reuses cached data to reduce network requests.

2. **Automatic Refetching / Revalidation**
   - Refetches on:
     - Window focus
     - Network reconnect
     - Interval polling (configurable)
   - Keeps UI data fresh automatically.

3. **Loading & Error State Management**
   - Returns `isLoading`, `isFetching`, `error`, and `data` from hooks.

4. **Mutations**
   - Handles POST/PUT/DELETE requests.
   - Updates cache automatically after mutation for UI consistency.

5. **Pagination & Infinite Queries**
   - Supports large datasets efficiently.

6. **DevTools**
   - React Query DevTools to visualize cache, queries, and mutations.

##########################################
# EXAMPLE USAGE
##########################################
import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
  const res = await fetch('/api/user');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

function UserProfile() {
  const { data, error, isLoading } = useQuery(['user'], fetchUser);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>Username: {data.name}</div>;
}

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “React Query simplifies server state management by caching, automatic refetching, 
  and managing loading/error states. It reduces boilerplate and improves UX 
  with fresh, consistent data.”

##########################################
# INTERVIEW TIPS
##########################################
- Explain **difference from Context/Redux**: React Query is for server state, not local UI state.
- Highlight **cache-first, background fetching, and mutations**.
- Optional: Mention **DevTools and performance optimizations**.

===============================================================================
END
===============================================================================
*/

