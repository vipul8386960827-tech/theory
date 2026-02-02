/* 32_ismounted_antipattern_solution.js

=====================================
isMounted() Antipattern & Solution in React
=====================================

Definition:
Using `isMounted()` to check if a component is still mounted before updating 
state is considered an **antipattern** in React. Instead, React recommends 
cancelling subscriptions or async tasks in the cleanup phase to avoid memory leaks 
or updating unmounted components.

-------------------------------------
Key Points:
-------------------------------------
1. Why isMounted() is an antipattern
   - Encourages manual tracking of mount state.
   - Leads to more complex and error-prone code.
   - React's lifecycle methods provide better alternatives.

2. Recommended Solution
   - Use **cleanup functions** in `useEffect` (functional components).
   - Cancel async operations, timers, or subscriptions in the cleanup.
   - Ensures no state update happens after unmount automatically.

-------------------------------------
Example (Functional Component):
-------------------------------------
import React, { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => {
        if (!isCancelled) {
          setData(json);
        }
      });

    return () => {
      // Cleanup
      isCancelled = true;
    };
  }, []);

  return <div>{data ? data.title : "Loading..."}</div>;
}

export default DataFetcher;

-------------------------------------
Analogy:
-------------------------------------
- Object form = trying to send a message to someone after they left the room.
- Cleanup = canceling the message so no one gets confused.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you still use class components without isMounted?  
A1: Yes, use flags in componentWillUnmount to cancel async tasks.

Q2: Why is isMounted considered unsafe?  
A2: It breaks React’s declarative paradigm and can hide memory leaks.

Q3: How do cleanup functions in useEffect replace isMounted?  
A3: They automatically run on unmount, preventing unwanted state updates.

Q4: Are there other scenarios where isMounted was used?  
A4: Commonly used in AJAX calls, timers, or subscriptions in class components.
*/
