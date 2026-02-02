/*
========================================
Question: Explain useSyncExternalStore Hook in Detail
========================================

1. Definition:
- useSyncExternalStore is a React Hook introduced in **React 18** 
  to subscribe to **external stores** in a way that is compatible 
  with **concurrent rendering**.  
- It ensures React components remain **consistent and predictable** 
  when external state updates occur.

------------------------------------------------------------
2. Key Points to Highlight:
- Designed for integrating **state management libraries** like Redux, Zustand, or any custom store.  
- Provides a **stable snapshot** of external state for rendering.  
- Handles subscription, re-rendering, and ensures the value is consistent with concurrent mode.  
- Accepts **subscribe** and **getSnapshot** functions, plus an optional server snapshot for SSR.

------------------------------------------------------------
3. Syntax:
const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);

- subscribe → function to listen to store changes (returns unsubscribe)  
- getSnapshot → function that returns the current store value  
- getServerSnapshot → optional function for server-side rendering snapshot  

------------------------------------------------------------
4. Example:

import React, { useSyncExternalStore } from "react";

// Simple external store
const store = {
  value: 0,
  listeners: new Set(),
  increment() {
    this.value += 1;
    this.listeners.forEach(listener => listener());
  },
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  getSnapshot() {
    return this.value;
  }
};

function Counter() {
  const count = useSyncExternalStore(
    store.subscribe,     // subscribe to store updates
    store.getSnapshot    // get current value
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => store.increment()}>Increment</button>
    </div>
  );
}

export default Counter;

------------------------------------------------------------
5. Behavior Explanation:
- React calls getSnapshot to get the current value for rendering.  
- Whenever store changes, the subscribe listener triggers a re-render.  
- Ensures consistency even with concurrent rendering and server-side hydration.  
- Optional getServerSnapshot helps avoid hydration mismatches during SSR.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useSyncExternalStore different from useState/useReducer?  
A1: It subscribes to **external stores**, not internal component state.

Q2: Can useSyncExternalStore be used with Redux?  
A2: Yes, it is recommended for React 18 to read Redux state safely with concurrent rendering.

Q3: Why do we need getSnapshot?  
A3: Provides the current store value for React to render consistently.

Q4: How does it handle concurrent rendering?  
A4: React ensures the snapshot is consistent during render even if updates occur mid-render.
*/
