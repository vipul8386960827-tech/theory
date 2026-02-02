/* 226_data_flow_in_react.js

=====================================
Data Flow in React
=====================================

Definition:
React follows a **unidirectional (one-way) data flow**, meaning data always flows 
from **parent components to child components** via props.  
This ensures predictable state management and easier debugging.

-------------------------------------
Key Points:
-------------------------------------
1. **Parent → Child**: Data is passed down via props.  
2. **Child → Parent**: Achieved indirectly by passing **callback functions** from parent to child.  
3. **State**: Maintained locally in components or globally via tools like Redux/Context.  
4. **Props**: Read-only in child; cannot be mutated directly.  

-------------------------------------
Guidelines:
-------------------------------------
- Always keep **state as close as possible** to where it’s needed.  
- Use callbacks to allow children to communicate with parents.  
- For app-wide state, use **Context API** or **Redux**.

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";

function Child({ count, increment }) {
  return <button onClick={increment}>Count: {count}</button>;
}

function Parent() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);

  return <Child count={count} increment={handleIncrement} />;
}

-------------------------------------
Analogy:
-------------------------------------
- Parent = **river source**  
- Child = **water mill**  
- Water (data) flows in one direction; the mill can influence flow only via controls (callbacks).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can child components modify props directly?  
A1: No, props are read-only; children can notify parents via callbacks.

Q2: What is the advantage of one-way data flow?  
A2: Predictable state changes, easier debugging, and clear data dependencies.

Q3: How can state be shared across multiple components?  
A3: Using React Context, Redux, or other state management libraries.

Q4: Can a parent component listen to changes in a child component's state?  
A4: Not directly; the child must notify the parent via callbacks or lifted state.
*/
