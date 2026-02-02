/* 164_react_memo_function.js

=====================================
React.memo Function
=====================================

Definition:
`React.memo` is a higher-order component (HOC) that **memoizes** a functional component, 
preventing unnecessary re-renders if its props have not changed.

-------------------------------------
Key Points:
-------------------------------------

1. Purpose:
   - Optimizes performance by re-rendering only when props change.
   - Similar to `PureComponent` but for functional components.

2. How it works:
   - React compares the previous and next props (shallow comparison).
   - If props are the same, React reuses the rendered output instead of re-rendering.

3. Syntax:
-------------------------------------
import React from "react";

const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});
-------------------------------------

4. With Custom Comparison:
You can pass a comparison function to control when re-renders should happen.

-------------------------------------
const MyComponent = React.memo(
  function MyComponent({ value }) {
    return <div>{value}</div>;
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);
-------------------------------------

5. When to Use:
   - For components with **expensive rendering logic**.
   - When props rarely change.
   - In lists where many items are rendered.

6. When NOT to Use:
   - For very small or frequently updating components (can add overhead).
   - If props always change (memoization gives no benefit).

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";

const Child = React.memo(({ count }) => {
  console.log("Child re-rendered");
  return <p>Count: {count}</p>;
});

function App() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(false);

  return (
    <div>
      <Child count={count} />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOther(!other)}>Toggle Other State</button>
    </div>
  );
}
// "Child" will only re-render when count changes.

-------------------------------------
Analogy:
-------------------------------------
- React.memo = **sticky note for props**.
- If the note (props) hasn’t changed, React reuses it instead of writing it again.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How is React.memo different from useMemo?  
A1: React.memo is for memoizing entire components; useMemo is for memoizing values/computations inside components.

Q2: Does React.memo do deep or shallow comparison of props?  
A2: Shallow comparison only.

Q3: Can React.memo be used with components receiving children?  
A3: Yes, but children also undergo shallow comparison.

Q4: What is the performance trade-off of React.memo?  
A4: It adds comparison overhead, so it’s best for components with expensive renders and stable props.
*/
