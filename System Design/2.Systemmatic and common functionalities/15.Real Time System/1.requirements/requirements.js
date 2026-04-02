/**
 * =======================================================================
 * FUNCTIONAL REQUIREMENTS (Single Graph Focus)
 * =======================================================================


 1. Real-Time Point Appending: The graph must support "streaming" data
    updates (Price/Volume) with sub-second latency via WebSockets.

 2. Historical Backfill: On-demand loading of past data as the user
    scrolls or zooms out (Lazy Loading / Infinite Scroll for the X-axis).

 3. Technical Indicator Layering: Ability to toggle overlays (Moving
    Averages, Bollinger Bands) without re-fetching the underlying data.

/**
 * =======================================================================
 * NON-FUNCTIONAL REQUIREMENTS (Performance is King here)
 * =======================================================================

 1. Frame Rate Stability (Jank-Free): Maintaining 60fps interaction
    (zoom/pan) even while the graph is receiving high-frequency updates.

 2. Data Decimation: To prevent browser crashes, use an algorithm (like
    LTTB - Largest Triangle Three Buckets) to downsample 10k points
    into 500 visual points for the current viewport.

 3. Low Battery/CPU Overhead: Throttling background updates when the
    tab is not active using the Page Visibility API.
 */