 /*
 Core idea:
 Never block the entire UI waiting for all data.
 Render whatever is available first, and progressively enhance.

 1. Component-level data fetching (split the UI)
 - Break page into independent components/widgets
 - Each component fetches its own data
 Example: Header, sidebar, and main content load separately

 2. Skeleton loaders (not spinners)
 - Show structure of UI while data is loading
 - Improves perceived performance
 Example: Grey boxes for cards, charts, lists

 3. Progressive rendering
 - Render critical/above-the-fold content first
 - Lazy load non-critical sections
 Example: Load hero + summary first, charts later

 4. Partial API responses / incremental data
 - Render with whatever fields are available
 - Enhance UI as more fields arrive
 Example: Show username first, then profile details later

 5. Conditional rendering
 - Show sections only when their data is ready
 - Avoid blocking entire page due to one slow API

 6. Suspense / loading boundaries (React)
 - Wrap components with separate loading states
 - Each section can load independently

 7. Cached data first
 - Show stale/cached data instantly
 - Revalidate in background and update UI

 Final idea:
 UI is built in layers →
 show structure → show partial data → hydrate with full data
 Goal: user sees something meaningful ASAP instead of waiting for everything
 */