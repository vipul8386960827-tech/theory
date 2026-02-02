/* 231_async_mode_vs_concurrent_mode.js

=====================================
Async Mode vs Concurrent Mode in React
=====================================

Definition:
- **Async Mode**: Introduced in older experimental React versions to allow React to interrupt 
  rendering and work on high-priority updates first. It was a precursor to modern **Concurrent Mode**.  
- **Concurrent Mode**: Newer approach in React that allows multiple tasks to be processed 
  simultaneously without blocking the main thread, improving UI responsiveness.

-------------------------------------
Key Points:
-------------------------------------
1. **Async Mode**:
   - React could pause rendering if more urgent updates arrived.  
   - Limited API support, experimental.  
   - Goal: avoid UI blocking during large renders.

2. **Concurrent Mode**:
   - Officially introduced in React 18 as **Concurrent Features**.  
   - Allows **interruptible rendering** and **non-blocking UI**.  
   - Works with `useTransition`, `Suspense`, and `startTransition`.  
   - Prioritizes urgent updates (like typing or clicks) over non-urgent updates (like rendering a list).

3. **Benefits**:
   - Smooth and responsive UI.
   - Allows React to prepare updates in the background.
   - Better handling of slow networks or heavy computation.

-------------------------------------
Guidelines:
-------------------------------------
- Use **Concurrent Mode** features for apps with heavy or async UI rendering.  
- Avoid using Async Mode now; it’s deprecated.  
- Leverage `Suspense` and `startTransition` for asynchronous data and transitions.

-------------------------------------
Example:
-------------------------------------
import React, { useState, useTransition } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // High-priority update
    setCount(count + 1);

    // Low-priority update
    startTransition(() => {
      // simulate heavy rendering
      for (let i = 0; i < 1000000; i++) {}
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me ({count})</button>
      {isPending && <p>Loading...</p>}
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Async Mode = **chef preparing a dish** but stops to attend urgent orders.  
- Concurrent Mode = **kitchen with multiple chefs** handling urgent and non-urgent orders efficiently without blocking service.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Is Async Mode still used in React?  
A1: No, it’s deprecated and replaced by Concurrent Mode.

Q2: What are some React 18 features that rely on Concurrent Mode?  
A2: `startTransition`, `useTransition`, and improved `Suspense`.

Q3: How does Concurrent Mode improve UX?  
A3: It prioritizes urgent updates and renders non-urgent ones in the background, making the UI responsive.

Q4: Can you mix concurrent and blocking updates?  
A4: Yes, React automatically prioritizes updates; developers can mark low-priority updates using `startTransition`.
*/
