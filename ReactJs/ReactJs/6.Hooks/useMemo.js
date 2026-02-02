/*
========================================
Question: Explain useMemo Hook in Detail
========================================

1. Definition:
- useMemo is a React Hook that **memoizes the result of a computation**, 
  returning a cached value unless its dependencies change.  
- Helps **optimize performance** by avoiding expensive recalculations 
  on every render.

------------------------------------------------------------
2. Key Points to Highlight:
- Accepts two arguments: a function that returns a value, and a dependency array.  
- Only recomputes the value when a dependency changes.  
- Useful for expensive calculations, filtering large arrays, or computing derived data.  
- Unlike useCallback, it memoizes **values**, not functions.  
- Should not be overused; unnecessary memoization can add complexity.  

------------------------------------------------------------
3. Syntax:
const memoizedValue = useMemo(() => {
  // expensive calculation
  return value;
}, [dependencies]);

- memoizedValue → cached result of the function  
- dependencies → array of variables that trigger recomputation  

------------------------------------------------------------
4. Example:

import React, { useState, useMemo } from "react";

function FibonacciCalculator() {
  const [num, setNum] = useState(10);
  const [count, setCount] = useState(0);

  // Memoize the expensive fibonacci calculation
  const fib = useMemo(() => {
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    return fibonacci(num);
  }, [num]); // only recompute when num changes

  return (
    <div>
      <p>Fibonacci of {num} is {fib}</p>
      <button onClick={() => setNum(num + 1)}>Next Fibonacci</button>
      <p>Other Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Counter</button>
    </div>
  );
}

export default FibonacciCalculator;

------------------------------------------------------------
5. Behavior Explanation:
- Without useMemo, the fibonacci function would recompute 
  on every render, even when unrelated state changes (like count).  
- useMemo caches the computed value and only recomputes when dependencies change.  
- Improves performance in expensive calculations or large datasets.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useMemo different from useCallback?  
A1: useMemo memoizes **values/results**, useCallback memoizes **functions**.

Q2: Can useMemo be used for side effects?  
A2: No, useMemo is only for memoizing values; side effects should use useEffect.

Q3: What happens if dependency array is empty?  
A3: The function runs once during initial render and result is cached forever.

Q4: Should useMemo be used everywhere?  
A4: No, only use for expensive calculations. Overuse can add memory overhead and complexity.
*/
