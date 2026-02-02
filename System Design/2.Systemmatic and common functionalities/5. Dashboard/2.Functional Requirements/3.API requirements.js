/*
================================
API Choice: REST vs GraphQL
================================

1. REST
   - Simple and widely adopted
   - Each endpoint returns fixed data
   - Easy to cache and monitor
   - Works well if dashboard widgets have predictable data needs

2. GraphQL
   - Allows querying exactly what each widget needs
   - Reduces over-fetching / under-fetching
   - More complex: requires schema, resolvers, caching
   - Useful when dashboard becomes highly dynamic

3. Decision for this dashboard
   - Prefer REST initially:
     - Dashboard widgets mostly need fixed data
     - Simple to implement and maintain
     - Compatible with React Query caching
   - GraphQL can be introduced later:
     - If dashboard grows more dynamic
     - To reduce multiple REST calls and over-fetching

4. Tie-in with state management
   - Since most state is server-driven, REST + React Query suffices
   - Redux is not required, as we avoid unnecessary client-side state
*/
