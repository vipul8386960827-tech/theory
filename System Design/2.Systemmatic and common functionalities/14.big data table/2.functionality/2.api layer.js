/*
================================================================
INFRASTRUCTURE / API LAYER (1M+ Rows)
================================================================

1. PAGINATION STRATEGY (The "Why")
- Use Cursor-based Pagination (?cursor=abc&limit=50) instead of Offset.
- Why: Offset (OFFSET 100,000) is O(n) and slow at DB level; Cursors are O(1).
- API Response must include 'total_count': Required to set the "fake" 
  scrollable height for the Virtualization engine.

2. REQUEST ORCHESTRATION & PERFORMANCE
- AbortController: Cancel "in-flight" requests if a user sorts/filters 
  rapidly to prevent Race Conditions (stale data overwriting new data).
- Debouncing: Delay API calls by ~300ms on search/filter inputs to 
  prevent slamming the server on every keystroke.
- JSON Streaming (Advanced): Mention for extremely large chunks to 
  avoid blocking the Main Thread during parsing.

3. DATA RESILIENCE & UX
- Adapter Pattern: Transform/Flatten raw API data into a UI-friendly 
  format before it hits the State. Decouples UI from Backend schema.
- SWR (Stale-While-Revalidate): Show cached rows immediately while 
  fetching updates in the background for a "zero-lag" feel.
- Retry Logic: Implement exponential backoff for failed chunk fetches 
  during scrolling so the whole table doesn't crash.
 
 
// Raw API Response
{ "u_id": 101, "prc": 500.5, "ts": "2026-04-01T10:00:00Z" }

// After the Adapter (What the Table sees)
{ 
  id: 101, 
  displayPrice: "$500.50", // Formatted once
  date: "Apr 1, 2026",      // Formatted once
  rawPrice: 500.5          // Kept for sorting logic
}

4. SECURITY & SCOPING
- Auth-Scoped Queries: Ensure data is filtered server-side based on 
  JWT/Session permissions so users only see authorized rows.

================================================================
TRANSITION TO DATA LAYER:
"Now that we've defined how we fetch data, I'll move to the 
Data Orchestration Layer to discuss Normalization and Caching."
================================================================
*/
