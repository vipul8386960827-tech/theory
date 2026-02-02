/* 112_react_context_vs_react_redux.js */

/*
=====================================
React Context vs React Redux
=====================================

Definition:
- **React Context**: A built-in API that allows data to be passed deeply into the 
  component tree without manually passing props at every level.
- **React Redux**: A state management library built on top of Redux that uses Context 
  under the hood to provide a predictable global state container.

Both solve the "prop drilling" problem, but they differ in purpose and usage.

-------------------------------------
Key Differences:
-------------------------------------

1. **Purpose**
   - Context: For sharing simple, static data (e.g., theme, locale, authentication status).
   - Redux: For managing dynamic, complex, and frequently updated global state.

2. **Data Flow**
   - Context: Provides values directly to consumers without reducers or actions.
   - Redux: Enforces unidirectional data flow with actions, reducers, and a single store.

3. **Scalability**
   - Context: Works well for small to medium apps; can become inefficient with frequent 
     re-renders in large apps.
   - Redux: Designed for large-scale apps; supports middleware, dev tools, time-travel 
     debugging, and testability.

4. **Performance**
   - Context: Triggers re-renders of all consuming components when its value changes.
   - Redux: Optimized with `connect` or `useSelector` to minimize unnecessary re-renders.

5. **Debugging**
   - Context: No built-in debugging or dev tools.
   - Redux: Powerful developer tools (Redux DevTools) for inspecting state, actions, 
     and time-travel debugging.

6. **Async Side Effects**
   - Context: No built-in mechanism for async flows.
   - Redux: Handles async logic via middleware (redux-thunk, redux-saga, redux-observable).

-------------------------------------
When to Use:
-------------------------------------
- Use **Context** when:
  - You just need to pass static or rarely changing data.
  - Example: Theme, user locale, or current user details.

- Use **Redux** when:
  - Your app state is large, dynamic, and updated frequently.
  - You need advanced debugging, middleware, or predictable state transitions.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Context = **Family WhatsApp group**: Share simple info like "dinner at 8" 
  (lightweight, but all members get notified).
- Redux = **Government notice board**: Official, structured, everyone follows rules, 
  logs are maintained (predictable and scalable).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can Redux work without Context API?  
A1: No, Redux internally uses Context to provide the store to components.

Q2: Why not just use Context instead of Redux?  
A2: Context is not optimized for frequent updates or debugging; Redux adds tools, 
    structure, and middleware support.

Q3: Can Context and Redux be used together?  
A3: Yes, Redux already uses Context internally; developers may also use custom Contexts 
    for static data alongside Redux.

Q4: What’s the performance drawback of Context?  
A4: Every consumer re-renders when the context value changes, even if they don’t use 
    the updated part.  
*/
