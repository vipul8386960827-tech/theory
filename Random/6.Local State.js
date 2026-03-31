/*
🟢 LOCAL STATE (Deep Dive)

📌 Definition:
State that is owned, managed, and used within a single component (or a very small, tightly coupled subtree).
It is not intended to be shared across distant components.

---------------------------------------------------------------------

🧠 CORE IDEA:
Keep state as close as possible to where it is used.
This is called "state colocation" and is a key principle in scalable frontend design.

---------------------------------------------------------------------

⚙️ COMMON TOOLS:
- useState → for simple state (booleans, inputs, small objects)
- useReducer → for complex state logic (multiple transitions, dependent updates)

---------------------------------------------------------------------

✅ WHEN TO USE LOCAL STATE:

1. UI-specific behavior
   - Modal open/close
   - Dropdown toggle
   - Tabs switching

2. Form inputs / temporary data
   - Input values
   - Checkbox states
   - Form drafts

3. Ephemeral (short-lived) state
   - Tooltip visibility
   - Hover states
   - Animations

4. State used by only ONE component
   - No sharing required

5. Performance-sensitive areas
   - Keeps re-renders isolated to a small part of the UI

---------------------------------------------------------------------

🚫 WHEN TO AVOID LOCAL STATE:

1. When multiple components need the same data
   → Leads to lifting state up or duplication

2. When state is passed through many layers
   → Causes prop drilling

3. When state must stay in sync across components
   → Hard to maintain consistency

4. When data comes from backend (API data)
   → Should be treated as server state instead

5. When state logic becomes too complex
   → Hard to manage with just useState

---------------------------------------------------------------------

⚡ PROS (WHY IT’S PREFERRED BY DEFAULT):

✔ Simple and easy to implement
✔ No external dependencies
✔ Encapsulated (reduces side effects)
✔ Improves component reusability
✔ Better performance (limited re-renders)
✔ Easier to debug (small scope)

---------------------------------------------------------------------

❌ CONS (LIMITATIONS):

✖ Not shareable across components
✖ Leads to prop drilling when lifted
✖ Can make parent components bloated
✖ Difficult to scale in large applications
✖ Risk of duplicate state in different components
✖ Hard to synchronize multiple instances

---------------------------------------------------------------------

🔄 LIFECYCLE BEHAVIOR (IMPORTANT DETAIL):

- Initialized when component mounts
- Updated on user interaction or logic
- Reset when component unmounts

👉 Implication:
- Forms reset when component reloads
- Modals lose state when closed (if unmounted)

---------------------------------------------------------------------

🧩 COMMON PATTERNS:

1. State Colocation
   → Keep state near usage

2. Lifting State Up
   → Share state between sibling components

3. Derived State
   → Compute values instead of storing them
   (avoid unnecessary duplication)

---------------------------------------------------------------------

⚠️ COMMON MISTAKES:

❌ Storing derived values instead of computing them
❌ Lifting state too high unnecessarily
❌ Using local state for global concerns (auth, theme)
❌ Duplicating same state in multiple components
❌ Not normalizing complex state

---------------------------------------------------------------------

🚨 SCALING SIGNALS (WHEN TO REFACTOR):

If you notice:
- Too much prop drilling
- Same data in many components
- Frequent lifting of state
- Difficulty syncing state

👉 Then move to:
- Context API (medium scale)
- Global state (Redux/Zustand)
- Server state (React Query)

---------------------------------------------------------------------

💡 ADVANCED INSIGHTS (INTERVIEW GOLD):

- “Local state minimizes the blast radius of updates”
- “Over-lifting state is a common anti-pattern”
- “Local state works best when ownership is clearly defined”
- “It should be the default starting point before scaling”

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“I start with local state to keep components simple and performant. I colocate state near where it’s used, and only move to global or server state when sharing or synchronization becomes necessary.”

---------------------------------------------------------------------
*/
