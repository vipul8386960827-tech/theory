/* 169_rules_for_hooks.js

=================================================
Rules for Using React Hooks
=================================================

There are **two main rules** + some best practices:

1. **Only Call Hooks at the Top Level**
   - Do not call hooks inside loops, conditions, or nested functions.  
   - Always use them at the top of your component so React can track the order consistently.

2. **Only Call Hooks from React Functions**
   - Hooks can only be used inside:
     - Functional components
     - Custom hooks
   - You cannot use hooks in regular JavaScript functions or class components.

-------------------------------------
Best Practices:
-------------------------------------
3. **Custom Hooks Naming Rule**
   - Always start custom hooks with `use` (e.g., `useAuth`, `useFetch`).

4. **Dependency Arrays**
   - When using `useEffect`, `useCallback`, or `useMemo`, always correctly manage dependencies 
     to avoid bugs or unnecessary re-renders.

5. **Avoid Conditional Hook Calls**
   - Instead of conditionally calling a hook, use conditions inside the hook itself.

-------------------------------------
Examples:
-------------------------------------

// ✅ Correct
function Example() {
  const [count, setCount] = React.useState(0); // top-level hook
  React.useEffect(() => {
    console.log("Effect runs");
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ❌ Wrong: Hook inside condition
function WrongExample() {
  if (true) {
    const [count, setCount] = React.useState(0); // ❌ invalid
  }
  return null;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of hooks like **steps in a recipe**:  
  - If you always follow the same order, the recipe works (React can track state).  
  - If you skip or shuffle steps, the dish is ruined (React gets confused).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why must hooks always be at the top level?  
A1: To ensure React can preserve hook state between re-renders in the correct order.

Q2: Why do custom hooks need to start with "use"?  
A2: So React’s linter can automatically check for correct hook usage.

Q3: What happens if you forget dependencies in useEffect?  
A3: You may get stale data, infinite loops, or missed updates.

Q4: Can you use hooks inside class components?  
A4: No, hooks are only for functional components or custom hooks.
*/
