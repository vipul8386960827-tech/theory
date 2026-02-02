/*
================================
Frontend Folder Structure
(Next.js Dashboard)
================================

/app
  /dashboard
    page.tsx          // Dashboard page (route entry)
    layout.tsx        // Dashboard layout (sidebar, header)

  /login
    page.tsx          // Auth page (already handled)

/components
  /layout
    Sidebar.tsx
    Header.tsx

  /ui
    Card.tsx
    Table.tsx
    Chart.tsx

/features
  /dashboard
    DashboardContainer.tsx   // Connects UI with data/state
    DashboardFilters.tsx

/lib
  apiClient.ts        // API calls
  queryKeys.ts        // Cache keys

/store
  dashboardStore.ts   // Global state (filters, selections)

/utils
  formatters.ts
  constants.ts
*/
