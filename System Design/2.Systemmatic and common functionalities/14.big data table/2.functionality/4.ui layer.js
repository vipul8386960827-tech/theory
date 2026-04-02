/* ========================================================================
   THE BODY (UI LAYER): 1M-ROW VIRTUALIZED VIEWPORT
   ========================================================================

   1. THE PHANTOM SCROLLBAR (Native Experience)
   -----------------------------------------------------------
   - Component: <div class="scroll-container" />
   - Style: overflow-y: auto; height: 800px; position: relative;
   - Child: <div class="phantom-spacer" /> 
   - Math: spacerHeight = masterIds.length * rowHeight (e.g., 50,000,000px)
   - Why: This tricks the browser into showing a tiny, proportional 
     scrollbar that allows the user to "flick" through 1M rows.

   2. THE WINDOW CALCULATOR (The Slice)
   -----------------------------------------------------------
   - Logic: Listen to 'onScroll' and calculate:
     - startIndex = Math.floor(scrollTop / rowHeight)
     - endIndex = startIndex + Math.ceil(viewportHeight / rowHeight)
   - Buffer: We render +10/-10 rows outside the visible area.
   - Why: This keeps the DOM tree shallow (~30 nodes) while 
     providing a "prefetch" safety margin for fast scrolling.

   3. GPU-ACCELERATED POSITIONING (The Move)
   -----------------------------------------------------------
   - Component: <div class="visible-window-wrapper" />
   - Style: transform: translateY(startIndex * rowHeight);
   - Why: Instead of positioning 1M divs, we move the *entire* visible window of 30 rows using the GPU (Composite Layer). 
     This prevents "Layout Thrashing" and keeps scrolling at 60fps.

   4. THE REACTIVE ROW (Observation & Signal)
   -----------------------------------------------------------
   - Logic: Each <Row /> receives an ID from the 'masterIds' slice.
   - Action: const data = byId.get(id);
   - State A (Data Found): Render Name, Price, Status, etc.
   - State B (Data Missing): 
     - Render <SkeletonShimmer />.
     - Dispatch signal: dispatch('NEED_DATA', id).
   - Why: The UI doesn't care if data comes from IndexedDB or API. 
     It just renders what's in the Map and asks for what's missing.

   5. THE INFINITE SENTINEL (The Trigger)
   -----------------------------------------------------------
   - Component: <div id="bottom-sentinel" /> (1px invisible div)
   - Logic: IntersectionObserver watches this div.
   - Action: When it enters the viewport -> dispatch('FETCH_NEXT_PAGE').
   - Why: This automates the "Ingestion" of the next 50-row chunk 
     without the UI needing to manage cursors or API states.
   ======================================================================== */
