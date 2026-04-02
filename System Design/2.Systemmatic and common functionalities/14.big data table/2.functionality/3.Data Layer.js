/* ========================================================================
   THE BRAIN: 1M-ROW DATA LAYER ARCHITECTURE (40-Min Interview Version)
   ========================================================================

   1. RELATIONAL STORAGE (Normalization)
   -----------------------------------------------------------
   - Map (byId): Stores actual row objects. Ensures O(1) updates/deletes.
   - Array (masterIds): Stores only IDs. Manages the "Source of Truth" order.
   - Why: Decouples UI sequence from data. Editing Row #999,999 is instant
     and won't block the main thread with an O(N) array search.

   2. VIEW INDEXING (Multi-State Management)
   -----------------------------------------------------------
   - Strategy: Use separate arrays for 'masterIds' and 'searchIds'.
   - Why: Enables "Non-Destructive Filtering." Users can search, view 
     results, and clear search to return to their exact scroll position 
     instantly (Zero-Latency Revert).

   3. TRANSACTIONAL INGESTION (The Pipeline)
   -----------------------------------------------------------
   - Pattern: Atomic Upsert. Merge new 50-row chunks into the Map, then 
     append IDs to the active Index array.
   - Cursor: Use "ID-based Cursors" (Seek Pagination). The DB finds the 
     next 50 rows after ID X in O(1) time, even at the 1-millionth row.
   - Guard: Bottom Sentinel (1px Div). Only trigger the next "Transaction" 
     when the previous one is fully committed to avoid race conditions.
   - Top Sync: Head-Check on launch; if IDs mismatch, fetch the delta and
     'unshift' into masterIds to keep the scroll history intact.

   4. RESILIENT OPTIMISM (Reliability)
   -----------------------------------------------------------
   - Undo Buffer: Store the 'rowData' and its 'originalIndex' in a Map 
     before performing an optimistic delete.
   - Background Sync: Offload API calls to a Service Worker so the 
     action persists even if the user closes the tab immediately.
   - Rollback: On server failure, use `splice(index, 0, id)` to re-inject 
     the row into its exact original coordinate (Positional Integrity).

   5. HYBRID PERSISTENCE & SLIDING WINDOW (Scaling & Memory)
   -----------------------------------------------------------
   - L1/L2 Cache: Map = RAM (Fast), IndexedDB = Disk (Massive/Persistent).
   - Warm Boot: On launch, hydrate the UI from IndexedDB immediately while 
     performing a "Head-Check" API call to fetch any new delta rows.
   - Sliding Window: Maintain a flat RAM footprint by evicting row objects 
     from the Map once a threshold (e.g., 5k rows) is hit, while keeping 
     the ID in the masterIds array to preserve scrollbar height.
   - Re-hydration: If the UI requests an ID from masterIds not found in 
     the Map, the Brain triggers a background 'Get' from IndexedDB (L2) 
     to re-populate the Map (L1) without a network request.
   ======================================================================== */