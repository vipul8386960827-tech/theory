/* 16_common_mistake_function_called_every_render.js

=====================================
Common Mistake: Function Called Every Render in React
=====================================

Definition:
In React, a common mistake is **calling a function directly inside the JSX** or component body, 
which causes it to execute on **every render**, rather than being invoked only on an event.

-------------------------------------
Key Points:
-------------------------------------
1. Happens often when writing: `<button onClick={myFunction()}>Click</button>`  
   instead of `<button onClick={myFunction}>Click</button>`.
2. Leads to:
   - Unnecessary computations on every render.
   - Potential infinite loops if the function updates state.
3. Should pass **function reference** to event handlers, not the result of function execution.

-------------------------------------
Example of Wrong Usage:
-------------------------------------
function Counter() {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      {/* Wrong: Calls increment on every render 
      <button onClick={increment()}>Increment</button>
    </div>
  );
}

-------------------------------------
Correct Usage:
-------------------------------------
function Counter() {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div>
      <h2>{count}</h2>
      {/* Correct: Pass function reference 
      <button onClick={increment}>Increment</button>

      {/* Or inline arrow function 
      <button onClick={() => setCount(count + 1)}>Increment Inline</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Wrong: Like pressing a button automatically every second whether you want it or not.
- Correct: Press the button yourself, triggering the action only when needed.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why does calling the function directly inside JSX cause issues?  
A1: Because it executes on every render, not just on the event, causing unnecessary updates.

Q2: How to pass parameters to event handler without calling it immediately?  
A2: Use an arrow function: `<button onClick={() => handleClick(param)}>Click</button>`.

Q3: Can this mistake affect performance?  
A3: Yes, especially if the function is heavy or causes state updates, leading to render loops.

Q4: Is this mistake specific to class or functional components?  
A4: It can occur in both; the principle is to pass a function reference, not the return value.
*/
