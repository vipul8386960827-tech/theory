/*  
===============================================================================
FRONTEND SYSTEM DESIGN — RERENDERS, MEMO, useCallback, useMemo
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# 1. RERENDERS IN REACT
##########################################
- React components re-render when:
  1. Their state changes.
  2. Their props change.
- Frequent unnecessary re-renders can impact performance, especially in large component trees.

Good line to say:
- “React re-renders a component when state or props change. Optimizing renders 
  is important for performance.”

##########################################
# 2. React.memo
##########################################
- React.memo is a higher-order component that memoizes a component.
- Prevents re-render if props have not changed.
- Best for functional components that receive props but don’t always need to update.

Example:
const Child = React.memo(({ value }) => {
  console.log("Child rendered");
  return <div>{value}</div>;
});

Good line to say:
- “React.memo avoids unnecessary re-renders by memoizing components based on props.”

##########################################
# 3. useCallback
##########################################
- useCallback(fn, deps) memoizes a function.
- Useful when passing callbacks to child components to prevent unnecessary re-renders.
- Function reference stays the same between renders unless dependencies change.

Example:
const handleClick = useCallback(() => {
  console.log("Clicked");
}, [dependency]);

Good line to say:
- “useCallback prevents functions from being recreated on every render, helping memoized child components.”

##########################################
# 4. useMemo
##########################################
- useMemo(() => value, deps) memoizes a computed value.
- Prevents expensive calculations on every render.
- Recomputes only when dependencies change.

Example:
const expensiveValue = useMemo(() => computeHeavy(value), [value]);

Good line to say:
- “useMemo avoids recalculating expensive computations on every render, improving performance.”

##########################################
# 5. WHEN TO USE (INTERVIEW-READY SUMMARY)
##########################################
- Rerenders → Know why and when they happen.
- React.memo → Wrap components to skip re-render if props unchanged.
- useCallback → Memoize functions passed as props.
- useMemo → Memoize expensive computations.

Practical advice for interview:
- “I use memo, useCallback, and useMemo judiciously. Overuse can hurt readability and memory. Focus on performance bottlenecks.”

===============================================================================
END
===============================================================================
*/
