/*
===============================================================================
NOTION — PERFORMANCE (EDITOR-SPECIFIC)
===============================================================================

-------------------------------------------------------------------------------
1. THE METRIC THAT MATTERS: INP (Interaction to Next Paint)
-------------------------------------------------------------------------------
- INP replaced FID as a Core Web Vital in March 2024.
- Measures the delay from EVERY interaction (each keystroke, click) to the
  next paint. Good: ≤ 200ms. For an editor, aim for < 50ms per keystroke.
- Other vitals: LCP ≤ 2.5s (page open), CLS ≤ 0.1 (no jumping blocks).

-------------------------------------------------------------------------------
2. KEEP EACH KEYSTROKE CHEAP
-------------------------------------------------------------------------------
| Work on keystroke                | Strategy                                   |
|----------------------------------|--------------------------------------------|
| Update the block's text          | Sync, but only ONE block re-renders        |
|                                  |  (per-block subscription, file 3)          |
| Send to server                   | Debounced into a transaction (200ms)       |
| Write to IndexedDB               | Async, batched with the transaction        |
| Update search index / word count | Web Worker, or requestIdleCallback         |
| Recalculate the table of contents| Debounce ~500ms                            |
| Presence cursor                  | Throttled ~80ms                            |

Rule: NOTHING heavy runs synchronously inside the input handler.
Use scheduler.yield() / setTimeout(0) to break up long tasks (> 50ms).

-------------------------------------------------------------------------------
3. BUNDLE SIZE
-------------------------------------------------------------------------------
- Route-level code splitting: editor, settings, database views separately.
- Block-level lazy loading: code highlighter, KaTeX, embeds, charts load
  only when a page contains that block type (file 6).
- Public read-only pages don't load the editor at all.

-------------------------------------------------------------------------------
4. NETWORK & ASSETS
-------------------------------------------------------------------------------
- Images: uploaded to S3 via signed URL, served from a CDN, resized per
  device (srcset), AVIF/WebP, loading="lazy", width/height reserved (no CLS).
- <link rel="preconnect"> to the API, realtime and CDN origins.
- HTTP/2 or HTTP/3, Brotli compression.
- Service worker caches the app shell → app opens even offline.

-------------------------------------------------------------------------------
5. MEMORY
-------------------------------------------------------------------------------
- LRU of pages in memory (file 18).
- Yjs docs for closed pages are destroyed (doc.destroy()).
- Unsubscribe WebSocket channels for closed pages.

-------------------------------------------------------------------------------
6. MEASURE IN PRODUCTION
-------------------------------------------------------------------------------
- web-vitals library → send INP / LCP / CLS to analytics, segmented by
  page size (blocks count) and device.
- Custom metric: "keystroke-to-paint" via performance.mark/measure.
- Performance budget in CI: fail the build if the editor bundle > X KB.

Interview line:
"For an editor, INP is the key metric. A keystroke updates exactly one block;
sync, persistence, indexing and presence are debounced, throttled or moved to
a worker, so nothing heavy runs inside the input handler."
*/
