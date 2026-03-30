/*
Built high-performance front-end applications using Next.js

// Next.js usage:
- Used advanced routing system (file-based routing) for scalable page structure
- Implemented Server-Side Rendering (SSR) to pre-render pages on the server
  -> This improves SEO because search engines receive fully rendered HTML
  -> Also improves initial load performance (faster First Contentful Paint)

// Data fetching:
- Used efficient data-fetching strategies (SSR / server-side fetching)
  -> Reduced client-side API calls
  -> Improved performance and reduced loading time
  -> Ensured data is available before page render

// State management (Redux):
- Used Redux for global state management in complex UI applications
  -> Managed shared state like authentication, cart, user data, etc.
  -> Ensured predictable state updates across components
  -> Improved maintainability and scalability of application state
  -> Helps in SSR hydration consistency (server + client state match)

// Important clarification:
- Redux does NOT directly improve SEO
- SEO improvement comes from SSR + pre-rendering in Next.js
- Redux helps indirectly by maintaining consistent state and avoiding UI mismatch
*/
