/*
===============================================================================
NOTION — PAGE LOADING + CACHING (FAST PAGE SWITCHING)
===============================================================================

GOAL: clicking a page in the sidebar should feel INSTANT.

-------------------------------------------------------------------------------
1. CACHE-FIRST, THEN REVALIDATE (stale-while-revalidate)
-------------------------------------------------------------------------------
Open page →
  a) Read blocks from IndexedDB → render immediately (maybe slightly old)
  b) In parallel, GET /pages/:id?sinceVersion=<cached version>
  c) Server returns only the ops/blocks that changed → apply → done
  d) Subscribe over WebSocket for live updates

No cache (first visit) →
  GET /pages/:id → page block + FIRST 50 children → render
  then load the rest in chunks as the user scrolls.

-------------------------------------------------------------------------------
2. CHUNKED LOADING (big pages)
-------------------------------------------------------------------------------
- A 5,000-block page = large JSON. Don't block the first paint on it.
- First request: top ~50 blocks (what's on screen) → user can read/edit.
- Then: GET /pages/:id/blocks?cursor=... in the background or on scroll
  (IntersectionObserver sentinel near the bottom).
- Children of collapsed toggles are loaded only when expanded.

-------------------------------------------------------------------------------
3. PREFETCHING
-------------------------------------------------------------------------------
- Hover a sidebar link / page link for ~100ms → prefetch its first chunk.
- Keep the last ~10 visited pages hot in memory, the rest in IndexedDB.
- Use requestIdleCallback for background prefetching so it never competes
  with typing.

-------------------------------------------------------------------------------
4. CACHE LIMITS & EVICTION
-------------------------------------------------------------------------------
- Memory: LRU of ~10 pages; evict others (they stay in IndexedDB).
- IndexedDB: cap by size; evict least recently opened pages.
- On logout: CLEAR IndexedDB (privacy on shared computers).

-------------------------------------------------------------------------------
5. LOADING STATES
-------------------------------------------------------------------------------
- Skeleton blocks (same height as real ones → no layout shift / CLS).
- Show the title first (it's in the sidebar data already).
- Errors: "Couldn't load this page" + retry; if cached, show the cached
  version with a banner "You're viewing an offline copy".

-------------------------------------------------------------------------------
6. PUBLIC PAGES (SEO)
-------------------------------------------------------------------------------
- SSR/ISR: server renders the blocks to HTML (read-only, no editor JS).
- Add <title>, meta description and Open Graph tags (see Share/3.metaData).
- The editor bundle loads only if the viewer has edit permission.

Interview line:
"Pages open from the IndexedDB cache immediately, then I fetch only what
changed since the cached version. First visits load the visible blocks
first and the rest in chunks, and hovering a link prefetches it."
*/
