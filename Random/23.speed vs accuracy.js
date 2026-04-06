/*
In Frontend System Design, the decision is not binary; it is about
Perceived Performance vs. Data Integrity.

For a high-scale dashboard, prioritize:
- Speed for the UI (Responsiveness)
- Accuracy for the Data (Consistency)

This is achieved using a layered approach.


1. STRATEGY: "OPTIMISTIC UI WITH EVENTUAL CONSISTENCY"

The dashboard should never freeze while waiting for accurate data.
Instead, render quickly and improve accuracy over time.

Initial Load (Prioritize Speed):
- Serve stale data immediately from IndexedDB or local cache
- Gives instant context to the user
- Improves LCP (Largest Contentful Paint)

The Sync (Background Accuracy):
- Background workers fetch the latest ("true") data
- Once received, update the UI with high-accuracy data


2. WHEN TO PRIORITIZE ACCURACY (CRITICAL PATH)

For sensitive domains (financial data, medical data, system alerts),
accuracy is non-negotiable.

Tactics:
- Use loading skeletons for specific widgets instead of blocking the entire page
- Show indicators like "Syncing..." while waiting for accurate data

Technical Guardrail:
- Use version headers or timestamps in state
- Prevent race conditions:
  If an older (fast) response arrives after a newer (slow) one,
  discard the older response to maintain correctness


3. WHEN TO PRIORITIZE SPEED (EXPLORATION PATH)

For analytical dashboards (e.g., "users in last 30 days"),
speed is more important for user experience.

Data Sampling:
- Backend can return approximate/sampled data (e.g., 95% accuracy)
- Frontend should indicate this with a "Sampled Data" badge

Debounced Accuracy:
- During interactions (zoom, filters):
  Show low-resolution/approximate preview instantly (speed)
  Refine results once user stops interacting (accuracy)


4. ARCHITECTURAL IMPLEMENTATION

To balance speed and accuracy, design system as follows:

Frame & Navigation (Speed):
- Use static assets, code-splitting, and CSS containment
- Ensures fast initial rendering

Data Transforms (Speed):
- Use Web Workers for heavy computations (sorting, filtering)
- Prevents blocking the main thread and avoids UI jank

Financial/KPI Data (Accuracy):
- Use no-cache headers
- Apply strict validation before rendering

Real-time Streams (Balance):
- Use throttling/batching strategies
- Example: update UI every 1 second instead of every 10ms


SUMMARY:
Design for fast initial rendering using cached or approximate data,
then progressively improve accuracy while ensuring critical data
remains correct and consistent.

INTERVIEW ONE-LINER:
"Prioritize perceived performance using stale or approximate data for fast rendering,
while ensuring eventual consistency and strict accuracy for critical data using
background sync, versioning, and guarded updates."
*/
