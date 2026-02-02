/* 262_defining_nested_function_components.js */

/*
=====================================
Defining Nested Function Components in React
=====================================

Definition:
Nested function components are React functional components defined **inside 
another functional component**. They are sometimes used for encapsulation 
or when a child component is closely tied to the parent.

-------------------------------------
Guidelines and Behavior:
-------------------------------------

1. **Re-Creation on Every Render**
   - Nested components are recreated every time the parent re-renders.
   - Can cause unnecessary re-renders of child components unless memoized.

2. **Props Passing**
   - Nested components can access parent props or state through closure.
   - Props can still be explicitly passed as usual.

3. **Performance Considerations**
   - If the nested component is heavy, memoization with `React.memo` is recommended.

4. **Use Cases**
   - Component is small and tightly coupled with parent.
   - Not reused elsewhere in the app.

-------------------------------------
Example:
-------------------------------------
function ParentComponent({ title }) {
  const [count, setCount] = React.useState(0);

  // Nested child component
  function Child() {
    return (
      <div>
        <p>{title}</p>
        <p>Count: {count}</p>
      </div>
    );
  }

  return (
    <div>
      <Child />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

-------------------------------------
Notes:
-------------------------------------
- If the child component is static and reused, define it outside the parent to 
  prevent re-creation on each render.
- Memoization can help improve performance for nested components that are costly to render.

-------------------------------------
Analogy:
-------------------------------------
- Nested Component = **assistant inside your office**:
  - Only exists while you (parent component) are present.
  - Every time you redo your setup, the assistant is recreated.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can nested components access parent state directly?  
A1: Yes, through closure or props passed down.

Q2: Are nested components recommended for large reusable components?  
A2: No, they should be defined outside to avoid re-creation and performance hits.

Q3: How can you optimize nested components?  
A3: Use `React.memo` or move them outside the parent if possible.

Q4: Does defining nested components violate React best practices?  
A4: Not inherently, but overusing them can lead to unnecessary renders and reduced performance.
*/
