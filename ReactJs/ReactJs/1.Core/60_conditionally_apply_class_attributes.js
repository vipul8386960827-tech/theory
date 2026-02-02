/*
=====================================
Conditionally Applying Class Attributes in React
=====================================

Definition:
In React, you can conditionally add CSS classes to elements based on 
state, props, or any logic.  
This allows dynamic styling of components.

-------------------------------------
Key Points:
-------------------------------------
- Use JavaScript expressions inside curly braces {} for className.  
- Ternary operator or logical && is commonly used.  
- Can combine multiple classes dynamically.  
- Libraries like "classnames" can simplify complex conditional logic.

-------------------------------------
Example 1: Ternary Operator
-------------------------------------
function Button({ isPrimary }) {
  return (
    <button className={isPrimary ? "btn btn-primary" : "btn btn-secondary"}>
      Click Me
    </button>
  );
}

-------------------------------------
Example 2: Using Logical AND
-------------------------------------
function Alert({ isError }) {
  return (
    <div className={`alert ${isError && "alert-error"}`}>
      {isError ? "Error occurred!" : "All good!"}
    </div>
  );
}
// If isError is false, "alert" is the only class applied.

-------------------------------------
Example 3: Using Template Literals with Multiple Conditions
-------------------------------------
function Card({ isSelected, isDisabled }) {
  return (
    <div className={`card ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}>
      Card Content
    </div>
  );
}

-------------------------------------
Example 4: Using "classnames" Library
-------------------------------------
// npm install classnames
import classNames from "classnames";

function Badge({ isActive, isWarning }) {
  const badgeClass = classNames("badge", {
    "active": isActive,
    "warning": isWarning
  });

  return <span className={badgeClass}>Badge</span>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Conditionally applying classes is like putting on a coat 🧥 only if 
it’s cold or wearing sunglasses 🕶️ only if sunny — styling adapts to conditions.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you conditionally apply multiple classes without using a library?
A1: Yes, use template literals or array join:
   className={`class1 ${condition && "class2"}`}

Q2: Why is className used instead of class?
A2: "class" is a reserved keyword in JavaScript; React uses className for JSX.

Q3: Can conditional classes affect performance?
A3: Negligible for most cases; className changes trigger re-render of the element.

Q4: How do you handle complex conditional styling?
A4: Use "classnames" library or CSS modules with computed class names.

Q5: Can inline styles replace conditional classes?
A5: Yes, but class-based styling is preferred for maintainability and reusability.
*/
