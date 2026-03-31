/*
🟡 REDUX TOOLKIT (RTK) – Deep Dive

📌 Definition:
Redux Toolkit is the official, recommended way to write Redux logic.
It simplifies Redux by reducing boilerplate, handling immutability internally,
and providing built-in tools for common use cases like async logic.

---------------------------------------------------------------------

🧠 CORE IDEA:
“Write less Redux code with better defaults and built-in best practices”

- Eliminates boilerplate
- Uses Immer for immutability
- Encourages modern patterns (slices, async thunks)

---------------------------------------------------------------------

⚙️ CORE FEATURES:

1. configureStore()
   → Simplified store setup
   → Automatically adds:
     - Redux DevTools
     - Middleware (like thunk)

2. createSlice() (MOST IMPORTANT)
   → Combines:
     - actions
     - reducers
     into one place

3. createAsyncThunk()
   → Handles async logic (API calls)

4. Built-in Immer
   → Lets you “mutate” state safely (actually creates immutable updates)

---------------------------------------------------------------------

🧩 HOW createSlice WORKS:

const userSlice = createSlice({
  name: "user",
  initialState: { name: "John" },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload; // looks mutable
    }
  }
});

👉 Internally:
- Generates action creators
- Generates reducer
- Uses Immer to return new immutable state

---------------------------------------------------------------------

🔄 INTERNAL FLOW (SIMPLIFIED):

Component → dispatch(action from slice)
        → store
        → slice reducer runs (with Immer)
        → new state created
        → selectors run
        → re-render if needed

---------------------------------------------------------------------

✅ WHEN TO USE REDUX TOOLKIT:

1. Any Redux-based application (default choice)
2. Medium to large-scale apps
3. When you want clean, maintainable Redux code
4. When handling async operations

---------------------------------------------------------------------

🚫 WHEN TO AVOID:

1. Very small apps
   → Overkill

2. When simpler tools suffice
   → Zustand / Context may be enough

---------------------------------------------------------------------

⚡ PROS:

✔ Drastically reduces boilerplate
✔ Built-in immutability (via Immer)
✔ Cleaner and more readable code
✔ Officially recommended by Redux team
✔ Built-in support for async logic
✔ Easy store setup

---------------------------------------------------------------------

❌ CONS:

✖ Still Redux underneath (concepts needed)
✖ Slight abstraction (less “raw” control)
✖ Can feel heavy for small apps
✖ Learning curve if new to Redux

---------------------------------------------------------------------

🔄 RENDERING BEHAVIOR:

✔ Same as Redux:
- Uses selectors
- Fine-grained subscriptions
- Re-renders only when selected slice changes

👉 RTK does NOT change rendering behavior,
it only simplifies how you write Redux logic

---------------------------------------------------------------------

⚠️ COMMON MISTAKES:

❌ Mutating deeply nested objects incorrectly
❌ Creating new objects unnecessarily in selectors
❌ Using RTK for server state (use React Query instead)
❌ Not splitting slices properly

---------------------------------------------------------------------

🧩 COMMON PATTERNS:

1. Feature-based slices
   → userSlice, productSlice, etc.

2. Using createAsyncThunk for API calls

3. Normalized state structure

4. Using selectors for accessing state

---------------------------------------------------------------------

💡 ADVANCED INSIGHTS (INTERVIEW GOLD):

- “RTK abstracts Redux complexity but keeps its core principles”
- “Immer allows writing mutable-looking logic safely”
- “RTK enforces best practices by default”
- “It reduces human error in writing reducers”
- “RTK doesn’t change how Redux works internally”

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“I prefer Redux Toolkit over plain Redux because it reduces boilerplate, handles immutability using Immer, and provides built-in tools like slices and async thunks, while still maintaining Redux’s predictable state management and fine-grained subscriptions.”

---------------------------------------------------------------------
*/
