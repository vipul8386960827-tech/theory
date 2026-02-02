/*
========================================
Question: Explain useCallback Hook in Detail
========================================

1. Definition:
- useCallback is a React Hook that **memoizes a callback function**, 
  returning the same function instance between renders unless 
  its dependencies change.  
- It helps **optimize performance** by preventing unnecessary 
  re-creations of functions on every render.

------------------------------------------------------------
2. Key Points to Highlight:
- Useful when passing functions as props to child components, 
  especially with React.memo.  
- Accepts two arguments: the function to memoize and a dependency array.  
- Only re-creates the function if one of the dependencies changes.  
- Does not memoize the return value; only the function reference.  
- Helps reduce unnecessary re-renders in performance-sensitive apps.

------------------------------------------------------------
3. Syntax:
const memoizedCallback = useCallback(() => {
  // function body
}, [dependencies]);

- memoizedCallback → returned memoized function  
- dependencies → array of variables that trigger function recreation  

------------------------------------------------------------
4. Example:

import React, { useState, useCallback } from "react";

// Child component optimized with React.memo
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Memoize the function to prevent re-creation
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // empty array → never recreated

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default Parent;

------------------------------------------------------------
5. Behavior Explanation:
- Without useCallback, handleClick would be a new function 
  on every render → Child would re-render even with React.memo.  
- With useCallback, handleClick retains the same reference 
  until dependencies change → prevents unnecessary re-renders.  
- Very useful in large lists, memoized components, or expensive computations.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useCallback different from useMemo?  
A1: useCallback memoizes **functions**, useMemo memoizes **values/results**.

Q2: Can you use useCallback without React.memo?  
A2: Yes, but the performance benefit is mostly seen when passing 
    the callback to memoized child components.

Q3: What happens if you leave the dependency array empty?  
A3: The function is created once and never recreated during the component’s lifetime.

Q4: Can useCallback improve performance in all cases?  
A4: Not always; unnecessary use of useCallback can add memory overhead. Only use for memoized child props or expensive computations.
*/
