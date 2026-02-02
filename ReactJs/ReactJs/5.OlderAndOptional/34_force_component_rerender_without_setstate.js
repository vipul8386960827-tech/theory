/* 34_force_component_rerender_without_setstate.js

=====================================
Force Component Rerender Without setState
=====================================

Definition:
In React, components re-render when their **state** or **props** change. Sometimes, 
you might want to force a re-render without changing the state explicitly.

-------------------------------------
Key Points:
-------------------------------------

1. Using forceUpdate() (Class Components)
   - Class components have a built-in method `forceUpdate()` to trigger a render.
   - Does not modify `this.state`.
   Example:
     class MyComponent extends React.Component {
       forceRender = () => {
         this.forceUpdate();
       }
       render() {
         return <button onClick={this.forceRender}>Rerender</button>;
       }
     }

2. Using useReducer in Functional Components
   - Functional components don’t have forceUpdate.
   - You can use `useReducer` to force a re-render by updating dummy state.
   Example:
     import React, { useReducer } from "react";

     function MyComponent() {
       const [, forceUpdate] = useReducer(x => x + 1, 0);
       return <button onClick={forceUpdate}>Rerender</button>;
     }

3. Using key prop
   - Changing the `key` of a component will remount it, causing a re-render.
   Example:
     <MyComponent key={someValue} />

-------------------------------------
Analogy:
-------------------------------------
- Forcing rerender = hitting "refresh" on a web page without changing content, 
  just to recompute/render UI.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Is using forceUpdate recommended?  
A1: No, it bypasses React's state mechanism and can cause performance issues.

Q2: Can you force re-render in functional components?  
A2: Yes, using `useReducer` or changing a key prop.

Q3: What’s the difference between setState and forceUpdate?  
A3: setState updates state and schedules render; forceUpdate triggers render without state change.

Q4: Are there any other ways to rerender without setState?  
A4: Changing props from a parent component, or updating context values.
*/
