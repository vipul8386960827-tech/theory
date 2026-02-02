/* 37_listen_to_state_changes.js

=====================================
Listening to State Changes in React
=====================================

Definition:
In React, components can react to state changes via lifecycle methods in class components
or hooks in functional components. React automatically re-renders the component whenever
its state changes, allowing you to "listen" and respond to updates.

-------------------------------------
Key Points:
-------------------------------------

1. Class Components
   - Use `componentDidUpdate(prevProps, prevState)` to detect state changes.
   - Example:
       componentDidUpdate(prevProps, prevState) {
         if (prevState.count !== this.state.count) {
           console.log("Count changed:", this.state.count);
         }
       }

2. Functional Components
   - Use `useEffect` with state variable as dependency.
   - Example:
       useEffect(() => {
         console.log("Count changed:", count);
       }, [count]);

3. Observing State
   - React re-renders when state changes.
   - You can perform side effects in response to state updates via lifecycle or hooks.

-------------------------------------
Analogy:
-------------------------------------
- Think of state as a thermostat. Every time the temperature changes (state), a sensor
  triggers an alert (componentDidUpdate / useEffect) to take action.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you listen to state changes without re-rendering?  
A1: Not directly; React's model ties state changes to re-rendering, but useRef or Redux subscriptions can help.

Q2: How do you avoid infinite loops in componentDidUpdate?  
A2: Always compare previous state/props with current before performing updates.

Q3: Can useEffect run on every render?  
A3: Yes, if no dependency array is provided, it runs after every render.

Q4: Why is it recommended to include dependencies in useEffect?  
A4: To ensure the effect runs only when specific state or props change, preventing unnecessary executions.
*/
