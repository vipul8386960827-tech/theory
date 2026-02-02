/* 171_flux_vs_redux.js

=================================================
Flux vs Redux
=================================================

Flux and Redux are both **state management patterns/libraries** for JavaScript apps.  
Redux was inspired by Flux but provides a more opinionated and predictable structure.

-------------------------------------
1. Data Flow
-------------------------------------
- **Flux**: Multiple stores, each handling part of the state. Data flows in a unidirectional loop.
- **Redux**: Single store as the "single source of truth". State is immutable.

-------------------------------------
2. Stores
-------------------------------------
- **Flux**: Many stores; each store is mutable.
- **Redux**: One store; state is immutable and updated via reducers.

-------------------------------------
3. Reducers vs Stores
-------------------------------------
- **Flux**: Stores contain both state and logic.
- **Redux**: Reducers are pure functions that return new state; no logic in the store.

-------------------------------------
4. Actions
-------------------------------------
- **Flux**: Actions are objects or functions, dispatched to multiple stores.
- **Redux**: Actions are plain objects with a `type` field, dispatched to the single store.

-------------------------------------
5. Dispatcher
-------------------------------------
- **Flux**: Requires a central dispatcher to broadcast actions.
- **Redux**: No dispatcher; uses `store.dispatch()` directly.

-------------------------------------
6. Debugging
-------------------------------------
- **Flux**: Harder to debug with multiple mutable stores.
- **Redux**: Easier debugging with tools like Redux DevTools and time-travel debugging.

-------------------------------------
Analogy:
-------------------------------------
- Flux = Many offices (stores) in a company, each handling its own tasks, but harder to track.  
- Redux = One central office (store), with strict processes (reducers), making it easier to track changes.

-------------------------------------
Example in Redux:
-------------------------------------
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

store.dispatch({ type: "INCREMENT" });

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why is Redux considered more predictable than Flux?  
A1: Because it enforces a single store, immutability, and pure reducers.

Q2: Can you use multiple stores in Redux?  
A2: No, Redux enforces a single store; but you can split state with multiple reducers.

Q3: Why doesn’t Redux need a dispatcher like Flux?  
A3: Because the store itself handles action dispatching.

Q4: Which is easier for debugging and why?  
A4: Redux, due to immutability, time-travel debugging, and strict structure.
*/
