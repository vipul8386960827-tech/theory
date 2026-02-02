/* 242_wrapper_component.js

=====================================
Wrapper Component in React
=====================================

Definition:
A Wrapper Component is a React component used to **wrap other components** to provide 
additional functionality, styling, or context without modifying the wrapped component directly.

Key Points:
1. Can be used for:
   - Layout purposes (e.g., div, section, card wrappers)
   - Providing context or theming
   - Adding common behavior (e.g., logging, authentication checks)
2. Often implemented using **children props** to render nested components.
3. Helps keep code DRY by reusing common patterns across components.

Example:
function CardWrapper({ children }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <CardWrapper>
      <h1>Hello World</h1>
      <p>This content is inside a wrapper component.</p>
    </CardWrapper>
  );
}

Analogy:
- Wrapper Component = gift box; the gift inside (child component) remains the same, 
  but the box adds presentation and protection.

Follow-Up Interview Questions:
Q1: Can wrapper components manipulate children props?
A1: Yes, they can clone children and pass additional props using React.cloneElement.

Q2: How do wrapper components differ from higher-order components (HOCs)?
A2: Wrapper components render JSX around children directly, while HOCs return a new component function.

Q3: Are wrapper components reusable?
A3: Yes, they are ideal for reusing layouts, styles, or behaviors across multiple components.

Q4: Can multiple wrapper components be nested?
A4: Yes, they can be stacked to combine different behaviors or styles.
*/
