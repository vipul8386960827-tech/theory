/*
🟡 REDUX (Deep Dive – Global State Management Library)

📌 Definition:
A predictable state management library that stores the entire application state
in a single centralized store and allows components to access specific slices of it
using selectors (fine-grained subscriptions).

---------------------------------------------------------------------

🧠 CORE IDEA:
“Single source of truth + predictable state updates”

- State is stored in one global store
- State is immutable (never mutated directly)
- Updates happen via actions → reducers

---------------------------------------------------------------------

⚙️ CORE CONCEPTS:

1. Store
   → Central place where all state lives

2. Actions
   → Plain objects describing “what happened”

3. Reducers
   → Pure functions that take current state + action → return new state

4. Dispatch
   → Function used to send actions

5. Selectors (VERY IMPORTANT)
   → Used to read specific slices of state

---------------------------------------------------------------------

✅ WHEN TO USE REDUX:

1. Large-scale applications
   - Complex state shared across many components

2. When fine-grained subscriptions are needed
   - Avoid unnecessary re-renders

3. Complex state transitions
   - Multiple actions affecting same state

4. Debugging and predictability are important
   - Time-travel debugging

5. When app logic grows significantly

---------------------------------------------------------------------

🚫 WHEN TO AVOID REDUX:

1. Small or simple applications
   → Overkill

2. Mostly local UI state
   → useState is enough

3. Server state management
   → Use React Query instead

4. When minimal shared state exists

---------------------------------------------------------------------

⚡ PROS:

✔ Fine-grained subscriptions (via selectors)
✔ Predictable state updates (pure reducers)
✔ Centralized state management
✔ Powerful debugging tools (Redux DevTools)
✔ Scales well for large apps
✔ Middleware support (async logic, logging)

---------------------------------------------------------------------

❌ CONS (IMPORTANT):

✖ Boilerplate (though reduced with Redux Toolkit)
✖ Learning curve (actions, reducers, store setup)
✖ Overkill for small apps
✖ Can lead to over-centralization
✖ Requires discipline (immutability, structure)

---------------------------------------------------------------------

🔄 RENDERING BEHAVIOR (CRITICAL):

- Components use selectors to subscribe to specific state

Example:
const user = useSelector(state => state.user);

👉 Only re-renders if `user` changes

✔ Fine-grained subscription
✔ Prevents unnecessary re-renders

---------------------------------------------------------------------

🧩 COMMON PATTERNS:

1. Redux Toolkit (modern standard)
   → Simplifies boilerplate

2. Slice-based architecture
   → Divide store into logical pieces

3. Normalized state
   → Avoid deeply nested structures

4. Selector functions
   → Efficient state access

---------------------------------------------------------------------

⚠️ COMMON MISTAKES:

❌ Storing everything in Redux
❌ Using Redux for local UI state
❌ Putting server/API data unnecessarily
❌ Mutating state directly
❌ Creating overly complex reducers

---------------------------------------------------------------------

🚨 SCALING CHARACTERISTICS:

- Works very well for large applications
- Maintains predictable behavior as complexity grows
- Requires proper structure to stay maintainable

---------------------------------------------------------------------

💡 ADVANCED INSIGHTS (INTERVIEW GOLD):

- “Redux provides fine-grained subscriptions via selectors”
- “It separates read (selectors) from write (dispatch)”
- “Immutability enables efficient change detection”
- “Redux is more about predictability than just sharing state”
- “Redux solves performance issues seen in Context”

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“I use Redux for large-scale applications where state is complex and widely shared. It provides fine-grained subscriptions via selectors, ensuring only relevant components re-render, and keeps state updates predictable through reducers.”

---------------------------------------------------------------------
*/
