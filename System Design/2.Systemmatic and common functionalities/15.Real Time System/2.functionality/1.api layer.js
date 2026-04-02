/**
 * =======================================================================
 * THE API LAYER: ARCHITECTURAL THEORY
 * =======================================================================
 */

/* * 1. HYDRATION (The "Initial Snapshot")
 * ------------------------------------
 * Theory: Sockets are a "delta" stream (only new data). To show a 
 * meaningful graph on Page Load, we MUST call a REST API first.
 * - Endpoint: GET /candles?limit=500
 * - Purpose: Fills the chart with the last 500 candles so the UI 
 * isn't blank while waiting for the first WebSocket "tick".
 */

/* * 2. BACKFILLING (The "Lazy Load")
 * -------------------------------
 * Theory: We don't load 10 years of data at once (Memory Management). 
 * - Logic: When the user scrolls to the left edge of the chart, 
 * the frontend triggers a REST call for the "Previous Block".
 * - Endpoint: GET /candles/history?before={first_visible_timestamp}
 * - Result: We prepend this data to the existing array.
 */

/* * 3. RECONCILIATION (The "Gap Filler")
 * ------------------------------------
 * Theory: If the WebSocket disconnects for 10s, we lose 10s of data.
 * - Logic: Upon "onReconnect", we compare 'Last Received Timestamp' 
 * with 'Current Time'. If a gap exists, we fetch the missing "hole".
 * - Endpoint: GET /candles/missed?since={last_ts}
 * - Result: Ensures the Bitcoin line remains continuous/unbroken.
 */

/* * 4. DOWNSAMPLING (The "Resolution Switch")
 * -----------------------------------------
 * Theory: If the user views a "1-Year" chart, we shouldn't fetch 
 * 1-minute candles (it would be millions of points).
 * - Logic: The API must support an 'interval' param (1m, 5m, 1h, 1d).
 * - Result: Reduces payload size and keeps the browser from crashing.
 */

/* * 5. PROTOCOL CHOICE (Optimization)
 * ---------------------------------
 * Theory: JSON is verbose. In a high-frequency trading environment, 
 * we suggest binary formats (Protocol Buffers) or Brotli compression.
 * - Result: Lower latency and faster "Time to First Meaningful Paint".
 */