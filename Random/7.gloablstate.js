/*
🟡 GLOBAL (SHARED) STATE (Deep Dive)

📌 Definition:
State that is shared across multiple components in an application and is accessible from different parts of the component tree.
It is used when multiple components depend on the same data.

---------------------------------------------------------------------

🧠 CORE IDEA:
Avoid prop drilling and centralize shared data so multiple components can access and stay in sync.

---------------------------------------------------------------------

⚙️ COMMON TOOLS:

1. Context API
   - Built into React
   - Best for small to medium scale shared state

2. State Management Libraries
   - Redux → predictable, scalable, more boilerplate
   - Zustand → lightweight, minimal boilerplate
   - (Others exist but these are most common in interviews)

---------------------------------------------------------------------

✅ WHEN TO USE GLOBAL STATE:

1. Data needed across many components
   - Auth/user data
   - Theme (dark/light mode)
   - Language/locale

2. Avoiding prop drilling
   - When state has to pass through many layers

3. Cross-component communication
   - Sidebar state, notifications, global UI flags

4. Synchronization requirement
   - Multiple components must always reflect same data

---------------------------------------------------------------------

🚫 WHEN TO AVOID GLOBAL STATE:

1. For component-specific state
   → Use local state instead

2. For server/API data
   → Use server state tools (React Query)

3. For small apps with minimal sharing
   → Adds unnecessary complexity

4. When state changes very frequently and affects many components
   → Can cause performance issues

---------------------------------------------------------------------

⚡ PROS (WHY GLOBAL STATE IS USEFUL):

✔ Eliminates prop drilling
✔ Centralized data management
✔ Easier synchronization across components
✔ Improves consistency across UI
✔ Scales better than lifting state repeatedly

---------------------------------------------------------------------

❌ CONS (IMPORTANT LIMITATIONS):

✖ Overuse leads to unnecessary complexity
✖ Can cause widespread re-renders if not optimized
✖ Debugging becomes harder in large apps
✖ Boilerplate (especially with Redux)
✖ Tight coupling between components and global store
✖ Harder to reason about data flow if poorly structured

---------------------------------------------------------------------

🔄 RENDERING BEHAVIOR (CRITICAL DETAIL):

- When global state updates:
  → All subscribed components re-render

👉 Problem:
- If not optimized, many components re-render unnecessarily

👉 Solutions:
- Selective subscriptions (Redux selectors, Zustand selectors)
- Splitting context into smaller pieces
- Memoization

---------------------------------------------------------------------

🧩 COMMON PATTERNS:

1. Context Splitting
   → Avoid one large context, create multiple smaller ones

2. Selector Pattern
   → Subscribe only to required slice of state

3. Store Normalization (Redux)
   → Avoid deeply nested state

4. Global UI State vs Business State separation

---------------------------------------------------------------------

⚠️ COMMON MISTAKES:

❌ Putting everything in global state
❌ Using global state for local UI logic
❌ Storing server data in Redux unnecessarily
❌ Creating a single giant store/context
❌ Not optimizing re-renders

---------------------------------------------------------------------

🚨 SCALING SIGNALS (WHEN TO INTRODUCE GLOBAL STATE):

If you notice:
- Deep prop drilling
- Same state needed in many places
- Frequent lifting of state
- Difficulty syncing UI across components

👉 Then global state is justified

---------------------------------------------------------------------

💡 ADVANCED INSIGHTS (INTERVIEW GOLD):

- “Global state increases the blast radius of updates”
- “It should be introduced only when necessary”
- “Over-centralization is a common anti-pattern”
- “Fine-grained subscriptions are key for performance”
- “Global state is about access, not ownership”

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“I use global state when multiple components need shared access to the same data. I avoid overusing it and ensure only necessary parts of the app subscribe to prevent unnecessary re-renders.”

---------------------------------------------------------------------
*/
