/* 204_when_to_use_refs.js

=====================================
When to Use Refs in React
=====================================

Definition:
Refs (short for **references**) provide a way to directly access and interact with 
DOM elements or React component instances. They bypass the normal React data flow.

-------------------------------------
When to Use Refs:
-------------------------------------

1. **Managing Focus, Text Selection, or Media Playback**
   - Example: focusing an input field when a page loads or after form submission.
   - Example: controlling video or audio play/pause.

   Example:
   const inputRef = useRef(null);
   useEffect(() => { inputRef.current.focus(); }, []);
   <input ref={inputRef} />

2. **Triggering Imperative Animations**
   - Useful when you need to trigger manual animations using third-party libraries
     (e.g., GSAP, D3.js).

3. **Integrating with Third-Party DOM Libraries**
   - When you use non-React libraries that need direct DOM manipulation.
   - Example: accessing a chart DOM node for initialization.

4. **Storing Mutable Values That Don’t Trigger Re-Renders**
   - Refs can store values like timers, previous state, or counters 
     without causing the component to re-render.

   Example:
   const timerId = useRef(null);
   timerId.current = setTimeout(...);

5. **Accessing Child Components (Class Components Only)**
   - Rare now, but refs can call methods on child class components.

-------------------------------------
When NOT to Use Refs:
-------------------------------------
- Don’t use refs to **replace state**.
- Don’t use refs for **data flow** between components.
- Don’t use refs for **derived values** (use props or state instead).

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of refs like a **remote control** for a TV.
  - You normally watch TV using the app (state/props).
  - But sometimes you need to override (turn on/off directly with the remote).
  - That’s when refs are useful—direct control.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What is the difference between state and refs?  
A1: State changes trigger re-renders, refs don’t. Refs are for direct access 
    and storing mutable values.

Q2: Can refs be used with functional components?  
A2: Yes, with `useRef`. In older React, refs were mostly used with class components.

Q3: What is a common pitfall of using refs?  
A3: Overusing refs leads to breaking React’s declarative model 
    and makes components harder to maintain.

Q4: What is the difference between `createRef` and `useRef`?  
A4: `createRef` creates a new ref each render (used in class components), 
    while `useRef` preserves the same ref object across renders (used in functional components).
*/
