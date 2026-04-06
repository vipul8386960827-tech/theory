/*Core principle:
 Prioritize perceived performance (fast UI) + eventual consistency (correct data over time)

 1. Optimistic UI
 - Update UI immediately before server response
 - Rollback if API fails
 Example: Like button updates instantly

 2. Stale-While-Revalidate (SWR pattern)
 - Show cached data immediately
 - Fetch fresh data in background
 - Update UI when new data arrives

 3. Polling / Real-time updates
 - Polling: fetch data at intervals (dashboards)
 - WebSockets/SSE: real-time updates (chat, trading apps)

 4. Prevent stale updates (race conditions)
 - Use timestamps / versioning
 - Only update state if response is the latest

 5. Loading & fallback states
 - Use skeleton loaders instead of blocking UI
 - Render partial UI when possible

 6. Error handling & retries
 - Retry failed requests (exponential backoff)
 - Show non-blocking error states

 Final idea:
 Combine all → fast UI + eventually correct data
 Frontend doesn't ensure strong consistency,
 it ensures good UX despite delays or inconsistencies
 */
