/*
=====================================
Combining Inline Style Objects in React
=====================================

Definition:
In React, inline styles are applied using the `style` prop, which 
accepts a JavaScript object. Multiple style objects can be combined 
to apply conditional or reusable styling.

-------------------------------------
Key Points:
-------------------------------------
- `style` prop expects a JS object with camelCased properties.  
- Combine multiple style objects using the spread operator `{...}`.  
- Conditional styles can be applied dynamically.  
- Useful for small, component-specific styles without external CSS.  

-------------------------------------
Example 1: Combining Two Style Objects
-------------------------------------
function Box() {
  const baseStyle = {
    width: "200px",
    height: "200px",
    backgroundColor: "lightblue"
  };

  const extraStyle = {
    border: "2px solid navy",
    borderRadius: "10px"
  };

  return <div style={{ ...baseStyle, ...extraStyle }}>Hello</div>;
}

-------------------------------------
Example 2: Conditional Styles
-------------------------------------
function Button({ isPrimary }) {
  const baseStyle = {
    padding: "10px 20px",
    fontSize: "16px"
  };

  const primaryStyle = {
    backgroundColor: "blue",
    color: "white"
  };

  const secondaryStyle = {
    backgroundColor: "gray",
    color: "black"
  };

  return (
    <button style={{ 
      ...baseStyle, 
      ...(isPrimary ? primaryStyle : secondaryStyle) 
    }}>
      Click Me
    </button>
  );
}

-------------------------------------
Example 3: Using Style Functions
-------------------------------------
function getBoxStyle(isActive) {
  return {
    width: "150px",
    height: "150px",
    backgroundColor: isActive ? "green" : "red",
    border: "1px solid black"
  };
}

function Box({ isActive }) {
  return <div style={getBoxStyle(isActive)}>Box</div>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Combining inline style objects is like layering clothes 👕🧥:  
- base clothes = baseStyle  
- additional layer = extraStyle  
- conditional layer = based on weather (dynamic styles).

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can later properties override earlier ones?
A1: Yes, in `{ ...obj1, ...obj2 }`, properties in obj2 overwrite obj1.

Q2: Can you combine more than two style objects?
A2: Yes, you can spread multiple objects: `{ ...obj1, ...obj2, ...obj3 }`.

Q3: Is it better to use inline styles or CSS classes?
A3: Inline styles are good for dynamic small styles; CSS classes are better for static or reusable styles.

Q4: Can inline styles handle pseudo-classes like :hover?
A4: No, inline styles cannot; you need CSS classes or styled-components.

Q5: Are inline styles performant?
A5: Generally yes, but excessive inline styling can hurt readability and maintainability.
*/
