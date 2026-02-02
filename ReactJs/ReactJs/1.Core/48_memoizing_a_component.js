/*
=====================================
Memoization in React
=====================================

Definition:
Memoization in React means caching the result of a component render 
or function calculation so React can skip re-execution if inputs 
(props or dependencies) have not changed.  
It is used for performance optimization.

-------------------------------------
Key Points:
-------------------------------------
- React.memo → memoizes functional components to prevent unnecessary re-renders.  
- useMemo → memoizes the result of an expensive calculation.  
- useCallback → memoizes a function reference so children relying on it don’t re-render.  
- Works best when components are pure (same input = same output).  
- Useful for performance optimization in large lists, expensive renders, or frequent updates.  

-------------------------------------
Example 1: React.memo with Component
-------------------------------------
const Child = React.memo(function Child({ value }) {
  console.log("Child rendered");
  return <div>{value}</div>;
});

function Parent({ count }) {
  return <Child value={count} />;
}
// Child re-renders only if "value" changes.

-------------------------------------
Example 2: useMemo for Expensive Calculation
-------------------------------------
function Expensive({ num }) {
  const result = React.useMemo(() => {
    console.log("Expensive calculation running");
    return num * 2;
  }, [num]);

  return <div>Result: {result}</div>;
}

-------------------------------------
Example 3: useCallback for Stable Function Reference
-------------------------------------
function Parent() {
  const [count, setCount] = React.useState(0);

  const handleClick = React.useCallback(() => {
    console.log("Clicked!");
  }, []);

  return <Child onClick={handleClick} />;
}
// Without useCallback, onClick would be a new function every render,
// causing Child to re-render even if props don’t change.

-------------------------------------
Real-Life Analogy:
-------------------------------------
Memoization is like keeping your exam notes 📘 in a notebook.  
Instead of re-reading the whole textbook every time, you reuse 
the notes if the syllabus (dependencies) hasn’t changed.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: When should you avoid memoization?
A1: Avoid for cheap computations or simple components, as memoization 
    itself has overhead.

Q2: Difference between React.memo and useMemo?
A2: React.memo prevents re-renders of a component.  
    useMemo caches the result of a calculation inside a component.

Q3: How is useCallback different from useMemo?
A3: useCallback memoizes a function, while useMemo memoizes any computed value.

Q4: Does React.memo do deep comparison of props?
A4: No, it does a shallow comparison by default. For deep comparison, 
    you must provide a custom comparison function.

Q5: What happens if dependencies in useMemo/useCallback are not correct?
A5: Incorrect dependency arrays may cause stale values or unnecessary recomputation.
*/
