/*
🟡 HOW REDUX WORKS (Behind the Scenes Deep Dive)

📌 High-Level Flow:
Component → dispatch(action) → store → reducer → new state → notify subscribers → re-render

---------------------------------------------------------------------

🧠 CORE IDEA:
Redux follows a unidirectional data flow:
- State is read via selectors
- State is updated via dispatching actions
- Reducers compute the next state immutably

---------------------------------------------------------------------

⚙️ STEP-BY-STEP INTERNAL FLOW:

1. 📥 Component Subscribes (useSelector)

   const user = useSelector(state => state.user);

   → React-Redux registers this component as a subscriber
   → Stores:
     - selector function
     - last selected value (user)

---------------------------------------------------------------------

2. 📤 Action is Dispatched

   dispatch({ type: "user/updateName", payload: "Mike" });

   → Action is a plain object
   → Sent to the Redux store

---------------------------------------------------------------------

3. 🏪 Store Receives Action

   → Store calls the root reducer:
     newState = reducer(currentState, action)

---------------------------------------------------------------------

4. 🔁 Reducers Execute

   function reducer(state, action) {
     switch (action.type) {
       case "user/updateName":
         return {
           ...state,
           user: { ...state.user, name: action.payload }
         };
     }
   }

   → IMPORTANT:
   ✔ Must return a NEW object (immutability)
   ✔ No direct mutation

---------------------------------------------------------------------

5. 🧠 New State is Stored

   → Redux replaces old state with new state
   → Keeps reference to new state object

---------------------------------------------------------------------

6. 📢 Store Notifies Subscribers

   → All subscribed components are notified:
     “State might have changed”

---------------------------------------------------------------------

7. 🔍 Selectors Re-run (CRITICAL STEP)

   For each subscriber:

   const newSelectedValue = selector(newState);

   → Example:
   state => state.user

---------------------------------------------------------------------

8. ⚖️ Comparison Happens

   Redux compares:

   previousSelectedValue === newSelectedValue

   👉 If SAME reference:
      ❌ No re-render

   👉 If DIFFERENT:
      ✅ Trigger re-render

---------------------------------------------------------------------

9. 🔄 React Re-renders Component

   → Only components with changed selected slice update

---------------------------------------------------------------------

⚡ WHY THIS IS EFFICIENT:

✔ Fine-grained subscriptions (selectors)
✔ Immutability enables fast reference checks
✔ Avoids unnecessary re-renders
✔ Predictable update flow

---------------------------------------------------------------------

🧩 INTERNAL MECHANISMS:

1. Subscription List
   → Redux keeps a list of listeners (components)

2. Listener Notification
   → On every dispatch, all listeners are notified

3. Selector Memoization (optional)
   → Libraries like Reselect optimize derived data

---------------------------------------------------------------------

⚠️ IMPORTANT EDGE CASES:

❌ Returning new objects unnecessarily:
   → Causes unwanted re-renders

❌ Mutating state:
   → Breaks change detection

❌ Combining multiple values in selector:
   → Creates new object → always re-renders

---------------------------------------------------------------------

🔄 REDUX VS CONTEXT (INTERNAL DIFFERENCE):

Context:
→ Broadcasts entire value
→ No selector comparison
→ All consumers re-render

Redux:
→ Notifies all, but selectively re-renders
→ Uses selector + reference comparison

---------------------------------------------------------------------

💡 ADVANCED INSIGHTS (INTERVIEW GOLD):

- “Redux notifies all subscribers but lets them decide whether to re-render”
- “Selectors act as filters between store updates and UI”
- “Immutability is key for efficient change detection”
- “Redux separates update logic (reducers) from UI”
- “Subscription is per selector, not per store”

---------------------------------------------------------------------

🎯 INTERVIEW ONE-LINER:

“Redux works by dispatching actions to a centralized store, where reducers produce a new immutable state. Subscribed components use selectors to extract specific slices, and only re-render if their selected data changes based on reference comparison.”

---------------------------------------------------------------------
*/
