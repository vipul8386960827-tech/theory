/*  
===============================================================================
FRONTEND SYSTEM DESIGN — HTTP CACHING (ETag, max-age)
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- HTTP caching is a mechanism where **responses from a server are stored (cached)** 
  to reduce network requests, improve performance, and reduce latency.
- Common headers controlling caching: **ETag** and **Cache-Control: max-age**.

##########################################
# ETag (Entity Tag)
##########################################
- A **unique identifier** (hash or version) for a specific resource on the server.
- Browser sends **If-None-Match: ETag** header on subsequent requests.
- Server response:
  1. If ETag matches → 304 Not Modified → browser uses cached version.
  2. If ETag differs → 200 OK → new resource returned.
- Benefits:
  - Avoids downloading unchanged data.
  - Reduces bandwidth and speeds up load.

##########################################
# max-age
##########################################
- Defined in `Cache-Control` header:
  - Example: `Cache-Control: max-age=3600` → cache valid for 1 hour.
- Browser can **serve cached response** without contacting server until max-age expires.
- After expiration → revalidation occurs (optional).

##########################################
# HOW IT WORKS TOGETHER
##########################################
1. Server sends response with:
   - `ETag: "xyz123"`
   - `Cache-Control: max-age=3600`
2. Browser caches the response.
3. If user revisits within 1 hour → browser uses cache directly.
4. After 1 hour → browser sends **If-None-Match: "xyz123"** to server.
   - If unchanged → 304 Not Modified → uses cached data.
   - If changed → 200 OK → updates cache with new data.

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “HTTP caching with ETag and max-age reduces unnecessary network requests. 
  max-age defines cache lifetime, and ETag allows conditional requests 
  to ensure data is fresh without re-downloading unchanged resources.”

##########################################
# INTERVIEW TIPS
##########################################
- Explain **difference between client cache and server cache**.
- Mention **304 responses** for efficient revalidation.
- Optional: Discuss **Cache-Control directives** like no-cache, must-revalidate.

===============================================================================
END
===============================================================================
*/
