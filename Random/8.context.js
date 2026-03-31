/*
🟡 CONTEXT API (Deep Dive – Global State using React Context)

📌 Definition:
A built-in React feature that allows you to share state across components
without manually passing props at every level (avoids prop drilling).

It provides a way to create a “global-like” state within a subtree.

---------------------------------------------------------------------

🧠 CORE IDEA:
“Provide once, consume anywhere within the tree.”

Instead of:
Parent → Child → Grandchild (prop drilling)

You do:
Provider (top) → Consumers (anywhere below)

---------------------------------------------------------------------

⚙️ BASIC CONCEPTS:

1. createContext()
   → Creates a context object

2. Provider
   → Wraps components and provides value

3. Consumer / useContext()
   → Access the value inside components

---------------------------------------------------------------------

✅ WHEN TO USE CONTEXT:

1. Low-frequency global state
   - Theme (dark/light)
   - Auth user (basic info)
   - Language/locale

2. Avoiding prop drilling
   - When state passes through many layers

3. Small to medium applications
   - Where full state libraries are overkill

4. Static or rarely changing data

---------------------------------------------------------------------

🚫 WHEN TO AVOID CONTEXT:

1. High-frequency updates
   → Causes many re-renders

2. Large-scale state management
   → Hard to organize and scale

3. Complex business logic
   → No built-in structure like reducers/middleware

4. Server state (API data)
   → Use React Query instead

---------------------------------------------------------------------

⚡ PROS:

✔ Built into React (no extra library)
✔ Eliminates prop drilling
✔ Simple to implement for small use cases
✔ Good for global UI state
✔ Easy to integrate

---------------------------------------------------------------------

❌ CONS (VERY IMPORTANT):

✖ Re-render problem:
   - When context value changes,
     ALL consumers re-render

✖ No fine-grained subscriptions:
   - Cannot subscribe to only part of state (by default)
   {
  user: { name: "John" },
  theme: "dark"
}
  now in this A just uses name and B just uses theme now theme is changed than it will still re render A
  it is because useContext subscribe to the entire object and react basically checks if reference has been 
  changed not the specific values

✖ Can become messy at scale:
   - Large context = hard to maintain

✖ Not optimized for frequent updates

✖ Tight coupling:
   - Components depend directly on context structure

---------------------------------------------------------------------

🔄 RENDERING BEHAVIOR (CRITICAL):

- Context uses reference comparison
- If value changes → all consumers re-render

Example problem:
- Updating a small field re-renders entire subtree

👉 This is the biggest limitation

---------------------------------------------------------------------

🛠️ OPTIMIZATION TECHNIQUES:

1. Context Splitting
   → Create multiple contexts instead of one large context

   ❌ Bad:
   - One AppContext with everything

   ✅ Good:
   - AuthContext
   - ThemeContext
   - UIContext

---

2. Memoizing Value

   const value = useMemo(() => ({ user, setUser }), [user]);

   → Prevents unnecessary re-renders due to new object reference

---

3. useReducer inside Context

   → Helps structure logic for complex state

---

4. Custom Hooks

   → Wrap useContext for cleaner usage

---------------------------------------------------------------------

🧩 COMMON PATTERNS:

1. Provider at top-level (App)
2. Feature-based providers
3. Custom hooks for consumption
4. Combining Context + useReducer

---------------------------------------------------------------------

⚠️ COMMON MISTAKES:

❌ Putting frequently changing state in context
❌ Creating a single giant context
❌ Not memoizing context value
❌ Using context for server state
❌ Overusing context instead of local state

---------------------------------------------------------------------

🚨 SCALING LIMITATIONS:

As app grows:
- Re-renders increase
- Context becomes hard to manage
- Debugging becomes difficult

👉 This is where:
- Redux / Zustand becomes better

---------------------------------------------------------------------

💡 ADVANCED INSIGHTS (INTERVIEW GOLD):

- “Context solves prop drilling, not state management complexity”
- “It broadcasts updates to all consumers”
- “Best suited for low-frequency global state”
- “Context is not a full replacement for Redux”
- “Granularity is the main limitation”

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“I use Context API to avoid prop drilling for low-frequency global state like theme or auth. I avoid putting frequently changing data in it because it causes unnecessary re-renders, and I split contexts to keep things scalable.”

---------------------------------------------------------------------
*/
