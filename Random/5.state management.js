/*
 🟢 Local State
 Definition:
 State that is confined to a single component and not shared elsewhere.

 When to use:
 - UI-specific behavior (modals, dropdowns, input fields)
 - Temporary or short-lived state
 - When no other component needs access

 Tools:
 - useState, useReducer

 Drawbacks:
 - Not shareable across components
 - Leads to prop drilling if lifted too much
 - Hard to manage when app grows



 🟡 Global (Shared) State
 Definition:
 State that is shared across multiple components in the application.

 When to use:
 - Data needed in many places (user info, theme, auth state)
 - To avoid prop drilling
 - When multiple components depend on the same state

 Tools:
 - Context API (small/medium apps)
 - Redux / Zustand (large apps)

 Drawbacks:
 - Overuse can make app complex and hard to maintain
 - Unnecessary re-renders if not optimized
 - Boilerplate (especially in Redux)
 - Debugging can become difficult in large apps



 🔵 Server State
 Definition:
 State that comes from a backend/server and needs to be synced, cached, and updated.

 When to use:
 - API data (feeds, dashboards, user data)
 - Data that needs caching, refetching, or synchronization
 - When handling loading, error, and stale states

 Tools:
 - React Query / SWR

 Drawbacks:
 - Adds dependency on external libraries
 - Requires understanding of caching strategies
 - Can become complex with pagination, invalidation, and syncing
 - Not suitable for purely UI-related state
 */
