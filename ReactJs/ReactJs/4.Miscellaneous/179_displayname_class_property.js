/* 179_displayname_class_property.js

=================================================
displayName Class Property in React
=================================================

📌 Definition:
- `displayName` is a special property in React components.  
- It defines the name shown in **React DevTools** or error messages.  
- Useful for debugging, especially with Higher-Order Components (HOCs) or anonymous components.

-------------------------------------
✅ Example with Class Component:
-------------------------------------
class MyButton extends React.Component {
  render() {
    return <button>Click Me</button>;
  }
}

MyButton.displayName = "CustomButton";

// In React DevTools → Component appears as "CustomButton"

-------------------------------------
✅ Example with Functional Component:
-------------------------------------
const Greeting = () => <h1>Hello</h1>;
Greeting.displayName = "FriendlyGreeting";

// In React DevTools → Component appears as "FriendlyGreeting"

-------------------------------------
✅ Example with Higher-Order Components (HOC):
-------------------------------------
function withLogger(WrappedComponent) {
  function Enhanced(props) {
    return <WrappedComponent {...props} />;
  }
  Enhanced.displayName = `WithLogger(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return Enhanced;
}

const MyComponent = () => <div>Test</div>;
const EnhancedComponent = withLogger(MyComponent);

// In React DevTools → "WithLogger(MyComponent)"

-------------------------------------
⚠️ Important Notes:
-------------------------------------
- By default, React uses the function/class name for debugging.  
- If a component is anonymous, React shows it as `Unknown` → `displayName` fixes that.  
- Extremely useful when building HOCs, because the wrapped component’s name would otherwise be hidden.

-------------------------------------
🔎 Follow-Up Interview Questions:
-------------------------------------
Q1: When do you need `displayName` in React?  
A1: When components are anonymous or wrapped in HOCs, for better debugging.  

Q2: What name does React use if `displayName` is not set?  
A2: It falls back to the function/class name; if unavailable, it shows `Unknown`.  

Q3: How does `displayName` help in debugging HOCs?  
A3: It allows combining both the HOC name and the wrapped component’s name for clarity.  

*/
