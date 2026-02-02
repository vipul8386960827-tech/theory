/*  
===============================================================================
FRONTEND SYSTEM DESIGN — CACHE INVALIDATION (REACT QUERY / SWR)
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- Cache invalidation is the process of marking cached data as **stale** so that 
  it will be **refetched from the server**.
- Important to ensure **fresh and accurate data** in the UI.

##########################################
# WHEN CACHE INVALIDATES
##########################################
1. **Time-based expiration**
   - Cached data becomes stale after a specified `staleTime` or `cacheTime`.
   - Example in React Query:
     ```js
     useQuery(['user'], fetchUser, { staleTime: 5000 });
     ```
     → Data is considered fresh for 5 seconds, then marked stale.

2. **Manual invalidation**
   - Using functions like `queryClient.invalidateQueries(['user'])`.
   - Forces React Query to refetch and update cache.

3. **Automatic revalidation triggers**
   - Window focus (when user comes back to the tab)
   - Network reconnect (after offline)
   - Interval polling (if configured)
   - Mutations affecting the cached resource
     - Example: Updating user profile → invalidate ['user'] query

4. **Dynamic key change**
   - If query key changes, old cache is not reused.
   - Example: ['user', 1] → ['user', 2] triggers fetch for the new key.

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “Cache invalidates based on time, manual triggers, window focus, network reconnect, 
  mutations, or key changes. This ensures React Query/SWR always provides fresh data.”

##########################################
# INTERVIEW TIPS
##########################################
- Explain **difference between stale vs cached data**.
- Mention **automatic vs manual invalidation**.
- Optional: Give example of **updating a user profile** and invalidating cache.

===============================================================================
END
===============================================================================
*/
