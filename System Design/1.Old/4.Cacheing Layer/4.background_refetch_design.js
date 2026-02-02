/*  
===============================================================================
FRONTEND SYSTEM DESIGN — BACKGROUND REFETCH DESIGN
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- Background refetch is the process of **automatically fetching updated data** 
  in the background **without blocking the UI**.
- Ensures UI always has **fresh data** while still being fast and responsive.

##########################################
# WHY USE BACKGROUND REFETCH
##########################################
1. **Data freshness**
   - Keeps UI synchronized with server data.
2. **Improved UX**
   - Users see stale data immediately but updates are applied seamlessly.
3. **Reduced load**
   - Avoids repeated full-page refreshes or blocking UI for updates.

##########################################
# TRIGGERS FOR BACKGROUND REFETCH
##########################################
- Window/tab gains focus.
- Network reconnects after being offline.
- Configured interval polling (e.g., every 30s).
- After mutations that affect cached data.
- Dynamic key change for query (React Query) or resource URL (SWR).

##########################################
# DESIGN CONSIDERATIONS
##########################################
1. **Stale-while-revalidate**
   - Show cached data immediately (stale) while fetching fresh data.
2. **Deduplication**
   - Avoid multiple background fetches for the same resource simultaneously.
3. **Error handling**
   - Gracefully handle failures without blocking UI.
4. **Throttle / debounce**
   - Prevent excessive network requests during rapid user actions.
5. **Loading indicators**
   - Optional subtle UI feedback (spinner, skeleton) to indicate background update.

##########################################
# IMPLEMENTATION EXAMPLE — REACT QUERY
##########################################
import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
  const res = await fetch('/api/user');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

function UserProfile() {
  const { data, error, isLoading, isFetching } = useQuery(
    ['user'],
    fetchUser,
    {
      refetchOnWindowFocus: true, // background refetch on focus
      refetchInterval: 30000,     // background refetch every 30s
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      Username: {data.name}
      {isFetching && <span>Updating...</span>}
    </div>
  );
}

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “Background refetch keeps UI data fresh by fetching updates automatically 
  in the background based on focus, reconnect, or interval, without blocking 
  the user experience.”

##########################################
# INTERVIEW TIPS
##########################################
- Emphasize **stale-while-revalidate concept**.
- Discuss **deduplication and throttling**.
- Optional: Compare with SWR and manual polling approaches.

===============================================================================
END
===============================================================================
*/
