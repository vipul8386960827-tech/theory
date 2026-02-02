/*
========================================
Question: Explain useRef Hook in Detail
========================================

1. Definition:
- useRef is a React Hook that returns a **mutable ref object** 
  whose `.current` property persists across renders.  
- It is commonly used to **access DOM nodes**, **store mutable values**, 
  or **persist values without causing re-renders**.

------------------------------------------------------------
2. Key Points to Highlight:
- useRef does **not trigger re-renders** when the .current value changes.  
- Can store any value: DOM elements, timers, previous state, or any mutable object.  
- Useful for managing focus, measuring DOM elements, or keeping previous props/state.  
- Works in functional components only.

------------------------------------------------------------
3. Syntax:
const refContainer = useRef(initialValue);

- refContainer → object with a `.current` property  
- initialValue → initial value of refContainer.current  

------------------------------------------------------------
4. Examples:

// Example 1: Access DOM element
import React, { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // focus DOM input
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// Example 2: Persist mutable value across renders
import React, { useRef, useState } from "react";

function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => setCount(c => c + 1), 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

------------------------------------------------------------
5. Behavior Explanation:
- Ref object persists between renders, unlike normal variables.  
- Changing ref.current does not trigger a re-render.  
- Ideal for storing mutable data or DOM references in functional components.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useRef different from useState?  
A1: useRef does not cause re-renders when updated; useState does.

Q2: Can useRef be used for storing previous props/state?  
A2: Yes, it’s a common pattern to persist previous values across renders.

Q3: How is useRef different from callback refs?  
A3: useRef is simpler and mutable; callback refs provide more control but are called during render.

Q4: When would you prefer useRef over useState?  
A4: For mutable values that do not affect rendering or to reference DOM elements directly.
*/
