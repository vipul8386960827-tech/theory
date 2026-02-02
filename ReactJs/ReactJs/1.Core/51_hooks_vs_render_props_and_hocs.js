/*
=====================================
Hooks vs Render Props vs Higher-Order Components (HOCs)
=====================================

Definition:
These are three different patterns in React for reusing logic 
between components.

-------------------------------------
Hooks:
-------------------------------------
- Introduced in React 16.8.  
- Allow using state and lifecycle features in functional components.  
- Logic reuse happens by extracting into custom hooks.  
- Syntax is clean and avoids extra nesting.  
- Example: useState, useEffect, useContext, custom hooks.  

Code Example:
function useCounter(initial = 0) {
  const [count, setCount] = React.useState(initial);
  const increment = () => setCount(count + 1);
  return { count, increment };
}

function CounterComponent() {
  const { count, increment } = useCounter(0);
  return <button onClick={increment}>Count: {count}</button>;
}

-------------------------------------
Render Props:
-------------------------------------
- A technique where a component takes a function as a prop 
  and calls it to render something.  
- Used to share logic by rendering children through a function.  
- Downsides: can cause "wrapper hell" due to many nested functions.  

Code Example:
function Counter({ children }) {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);
  return children({ count, increment });
}

// Usage:
<Counter>
  {({ count, increment }) => (
    <button onClick={increment}>Count: {count}</button>
  )}
</Counter>

-------------------------------------
Higher-Order Components (HOCs):
-------------------------------------
- A function that takes a component and returns a new component 
  with additional props or logic.  
- Used widely before hooks for reusing logic.  
- Downsides: wrapper hell, prop name collisions, harder debugging.  

Code Example:
function withCounter(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [count, setCount] = React.useState(0);
    const increment = () => setCount(count + 1);
    return (
      <WrappedComponent count={count} increment={increment} {...props} />
    );
  };
}

// Usage:
function Button({ count, increment }) {
  return <button onClick={increment}>Count: {count}</button>;
}
const EnhancedButton = withCounter(Button);

-------------------------------------
Comparison:
-------------------------------------
1. Hooks
   - Pros: Clean, no nesting, reusable logic, easier testing.
   - Cons: Only work in functional components, must follow rules of hooks.

2. Render Props
   - Pros: Explicit logic sharing via function-as-child.
   - Cons: Leads to deeply nested JSX ("wrapper hell").

3. HOCs
   - Pros: Can wrap existing components, logic reuse without touching internals.
   - Cons: Prop collisions, wrapper hell, harder to trace props.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Hooks = reusable tools in your pocket 🛠️ you can use anywhere.  
- Render Props = asking a chef 👨‍🍳 to give you a dish by providing 
  your own recipe function.  
- HOCs = factory 🏭 that takes a product (component) and returns 
  an upgraded product.  

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Which pattern is preferred today?
A1: Hooks are the modern standard since React 16.8. They replaced 
    most use cases of HOCs and Render Props.

Q2: Are HOCs or Render Props still useful?
A2: Yes, some older libraries still use them, and you may encounter them 
    in legacy codebases.

Q3: Do hooks completely remove the need for HOCs?
A3: Mostly yes, but HOCs can still be useful in cases like code-splitting 
    with React.lazy or certain third-party patterns.

Q4: Can we combine these patterns?
A4: Yes. For example, a library may provide an HOC but internally use hooks.  

Q5: Which is better for performance?
A5: Hooks are generally more performant because they avoid creating 
    new wrapper components or deeply nested render functions.
*/
