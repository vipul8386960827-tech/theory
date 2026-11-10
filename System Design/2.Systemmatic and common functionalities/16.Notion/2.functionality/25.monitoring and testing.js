/*
===============================================================================
NOTION — MONITORING (OBSERVABILITY) + TESTING STRATEGY
===============================================================================

-------------------------------------------------------------------------------
1. WHAT TO MONITOR
-------------------------------------------------------------------------------
| Signal                         | Why                                         |
|--------------------------------|---------------------------------------------|
| Editor crashes (per block type)| Error boundary per block reports to Sentry  |
|                                |  with block type + page size                |
| Sync failures / rejected txs   | Data-loss risk → alert on spikes            |
| Outbox length & oldest age     | Growing outbox = users' edits not saving    |
| Reconnect rate                 | Realtime server or network problems         |
| Catch-up "410 too old" rate    | Clients offline longer than server history  |
| INP / LCP / CLS (real users)   | Typing latency & page open speed            |
| Keystroke-to-paint (custom)    | Editor-specific responsiveness              |
| CRDT doc size per page         | Memory growth, tombstone cleanup needed     |

Tools: Sentry (errors + source maps), web-vitals → analytics,
       custom metrics via performance.mark/measure, feature flags for
       gradual rollout (turn off a broken block type remotely).

-------------------------------------------------------------------------------
2. PRIVACY IN LOGS
-------------------------------------------------------------------------------
- NEVER send page content in error reports. Send ids, block types and counts.

-------------------------------------------------------------------------------
3. TESTING STRATEGY
-------------------------------------------------------------------------------
- Unit (Jest/Vitest): applyOp, inverseOf, keyBetween, splitSpans,
  paste-to-blocks → pure functions, easy to test exhaustively.
- Property-based / fuzz tests: random concurrent op sequences applied in
  different orders → all replicas must end up IDENTICAL (convergence).
- Integration (React Testing Library): Enter splits a block, slash menu
  keyboard navigation, undo after paste.
- E2E (Playwright): TWO browser contexts editing the same page; go offline
  (context.setOffline(true)), edit, come back online → both converge.
- Accessibility: axe-core in CI.
- Visual regression for block rendering.

Interview line:
"I monitor sync health, not just errors: outbox length and rejected
transactions tell me if users are losing edits. For testing, the
collaboration logic gets convergence tests with random operation orders, plus
a two-browser Playwright test that goes offline and back."
*/
