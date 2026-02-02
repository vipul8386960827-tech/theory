/*
========================================
Question: Explain useEffect Hook in Detail
========================================

1. Definition:
- useEffect is a built-in React Hook that lets you perform 
  side effects in functional components.  
- Side effects include data fetching, subscriptions, timers, 
  manually changing the DOM, and logging.  
- It replaces lifecycle methods like componentDidMount, 
  componentDidUpdate, and componentWillUnmount in class components.

------------------------------------------------------------
2. Key Points to Highlight:
- Runs after the component renders.  
- Can run conditionally using the dependency array.  
- Can return a cleanup function to avoid memory leaks.  
- Multiple useEffect hooks can be used in a single component.  
- Avoids blocking UI; runs asynchronously after painting.  

------------------------------------------------------------
3. Syntax:
useEffect(() => {
  // effect code here
  return () => {
    // cleanup code here
  };
}, [dependencies]);

- effect code → runs after render.
- cleanup code → optional, runs before unmount or next effect run.
- dependencies → array of values; effect runs only when they change.

------------------------------------------------------------
4. Examples:

// Example 1: Component Did Mount (runs once)
import React, { useEffect, useState } from "react";

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(res => res.json())
      .then(json => setData(json));
  }, []); // empty array → runs once after first render

  return <div>{data ? data.title : "Loading..."}</div>;
}

// Example 2: Dependency array (runs when `count` changes)
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count updated: ${count}`);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Example 3: Cleanup function (unsubscribe or clear timer)
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return <p>Seconds: {seconds}</p>;
}

------------------------------------------------------------
5. Behavior Explanation:
- Without dependency array: runs after every render.  
- Empty dependency array: runs once (componentDidMount).  
- With dependencies: runs when any value in the array changes.  
- Cleanup function runs before effect re-runs or before unmounting.  
- Multiple useEffects run in order they are defined.  

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: Can you use async directly in useEffect?  
A1: No, the callback should not be async. Use an inner async function.

Q2: Why do we need a cleanup function?  
A2: To avoid memory leaks with subscriptions, timers, or event listeners.

Q3: Difference between useEffect and useLayoutEffect?  
A3: useLayoutEffect runs synchronously after DOM mutations, before painting; useEffect runs after painting asynchronously.

Q4: What happens if you omit the dependency array?  
A4: The effect runs after **every render**, which may cause performance issues.

Q5: Can useEffect replace all lifecycle methods?  
A5: Yes, with careful usage of dependency arrays and cleanup functions.
*/
