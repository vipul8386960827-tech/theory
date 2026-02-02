/*
========================================
Question: Explain useState Hook in Detail
========================================

1. Definition:
- useState is a built-in React Hook that lets you add state 
  to functional components.  
- Before hooks, only class components could have state.  
- It returns a stateful value and a function to update it.

------------------------------------------------------------
2. Key Points to Highlight:
- useState preserves state between re-renders.  
- Updating state using the setter function triggers a re-render.  
- You can initialize state with a value or a function (lazy initialization).  
- You can manage multiple independent state variables by calling useState multiple times.  
- It works only inside functional components or custom hooks.  
- State updates can be **synchronous** or **batched** depending on context.  

------------------------------------------------------------
3. Syntax:
const [state, setState] = useState(initialValue);

- state → Current value of the state variable.
- setState → Function used to update state.
- initialValue → Initial value (can be primitive, object, array, or function).

------------------------------------------------------------
4. Examples:

// Example 1: Basic Counter
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

// Example 2: Lazy Initialization
const [expensiveState, setExpensiveState] = useState(() => {
  console.log("Initializing expensive state");
  return computeExpensiveValue();
});

// Example 3: Multiple useState calls
const [name, setName] = useState("");
const [age, setAge] = useState(0);

------------------------------------------------------------
5. Explanation of Behavior:
- Calling setState triggers React to re-render the component.  
- React preserves the state variable between renders.  
- useState updates are asynchronous in event handlers but can be synchronous in some cases (e.g., useEffect).  
- When updating state based on previous state, use the **functional updater** form:
  setCount(prevCount => prevCount + 1);

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: Can you use useState inside loops or conditions?  
A1: No, hooks must be called at the top level to preserve state order.

Q2: How do you update state when it depends on the previous state?  
A2: Use functional updater: setCount(prev => prev + 1).

Q3: Can useState hold objects or arrays?  
A3: Yes, but you must handle immutability manually using spread/rest operators.

Q4: Difference between useState and useReducer?  
A4: useReducer is preferred for complex state logic or when multiple state variables depend on each other.  

Q5: What happens if you initialize useState with a function?  
A5: The function runs **once** during initial render for lazy initialization, useful for expensive computations.
*/
