/* 178_default_props.js */
/* 178_default_props.js

=================================================
Default Props in React
=================================================

📌 Definition:
- Default props are fallback values for component props when none are provided.  
- They help avoid `undefined` values and make components more predictable.

-------------------------------------
✅ Example with Functional Component:
-------------------------------------
function Button({ label, color }) {
  return <button style={{ backgroundColor: color }}>{label}</button>;
}

Button.defaultProps = {
  label: "Click Me",
  color: "blue",
};

// Usage:
// <Button />            → Renders with label "Click Me" and blue background
// <Button label="Save"/> → Renders with label "Save" and blue background

-------------------------------------
✅ Example with Class Component:
-------------------------------------
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

Greeting.defaultProps = {
  name: "Guest",
};

// Usage:
// <Greeting />          → Renders "Hello, Guest"
// <Greeting name="John"/> → Renders "Hello, John"

-------------------------------------
⚠️ Important Notes:
-------------------------------------
- In modern React, you can also use **destructuring with default values**:
  function Button({ label = "Click Me", color = "blue" }) { ... }
- `defaultProps` do **not** apply if the prop is explicitly passed as `null`.

-------------------------------------
🔎 Follow-Up Interview Questions:
-------------------------------------
Q1: Do default props apply if a prop is explicitly set to `undefined`?  
A1: Yes, they do.  

Q2: Why might destructuring defaults be preferred over `defaultProps` in function components?  
A2: Cleaner syntax, no risk of deprecation, and works naturally with ES6.  

Q3: How do default props behave in TypeScript with `interface` or `type`?  
A3: You typically use optional props with `?` and assign defaults in destructuring.  

*/
