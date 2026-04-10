/*
HYBRID APPROACH (HTTP + WebSocket) IN CHAT APP — ADVANTAGES OVER PURE WEBSOCKETS

1. BETTER RELIABILITY
   - Initial data (chat history, user info) fetched via HTTP → more stable
   - WebSocket only used for real-time updates → reduces dependency on a single connection

2. EASY FALLBACK
   - If WebSocket fails, app can still work using HTTP polling
   - Pure WebSocket apps completely break if connection drops

3. SIMPLER SCALING
   - HTTP requests are stateless → easy to scale with load balancers/CDNs
   - WebSockets require sticky sessions or special infra → harder to scale alone

4. PERFORMANCE OPTIMIZATION
   - Heavy data (old messages, media) via HTTP (better caching)
   - Real-time small updates (new messages, typing) via WebSocket
   - Avoids overloading WebSocket with large payloads

5. CACHING BENEFITS
   - HTTP responses can be cached (browser/CDN)
   - WebSocket data cannot be cached easily

6. BETTER ERROR HANDLING
   - HTTP has built-in status codes (200, 404, 500)
   - Easier debugging compared to WebSocket-only systems

7. RESOURCE EFFICIENCY
   - WebSocket connections are kept open → consume memory
   - Hybrid reduces number of always-open connections

8. SECURITY & CONTROL
   - HTTP endpoints easier to secure (auth, rate limiting)
   - Hybrid lets you separate concerns (auth via HTTP, live updates via WS)

9. FLEXIBILITY IN FEATURES
   - Uploads (images, files) better handled via HTTP
   - WebSocket not ideal for large file transfers

10. GRACEFUL DEGRADATION
   - App can still function (slower) if real-time layer fails
   - Pure WebSocket → no fallback → poor UX

SUMMARY:
Hybrid = Use HTTP for stable, heavy, cacheable operations
         + WebSocket for fast, real-time communication

This gives better scalability, reliability, and maintainability compared to using only WebSockets.
*/
