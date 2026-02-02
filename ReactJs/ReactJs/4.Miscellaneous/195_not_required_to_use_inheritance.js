/* 195_not_required_to_use_inheritance.js

=====================================
Not Required to Use Inheritance in React
=====================================

Definition:
In React, **composition** is preferred over **inheritance** for reusing code.  
Instead of extending components, React encourages combining smaller components together.

-------------------------------------
Key Points:
-------------------------------------
1. React components are **composable**; you can nest and reuse them easily.  
2. Inheritance can lead to complex hierarchies and rigid structures.  
3. Composition allows flexibility: props, children, higher-order components, hooks.  
4. Common patterns for code reuse:
   - **Props and children** (passing components or render functions)
   - **Higher-Order Components (HOCs)**
   - **Custom Hooks**
   - **Render Props**

-------------------------------------
Guidelines:
-------------------------------------
- Prefer **composition** over inheritance for sharing behavior.  
- Use inheritance only if a very specific scenario requires it (rare).  
- Keep components small, reusable, and declarative.

-------------------------------------
Example:
-------------------------------------
import React from "react";

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function Toolbar() {
  return (
    <div>
      <Button onClick={() => alert("Save clicked")}>Save</Button>
      <Button onClick={() => alert("Cancel clicked")}>Cancel</Button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Composition is like **LEGO blocks**:  
- You can build anything by combining small pieces.  
- Inheritance is like a **family tree of machines**, rigid and hard to extend without breaking things.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why is composition preferred over inheritance in React?  
A1: It allows flexible, reusable, and maintainable components without complex hierarchies.  

Q2: Can you give an example where inheritance might still be used?  
A2: Rare cases like extending a base component with shared behavior, but hooks and HOCs usually replace this.  

Q3: How do render props help with composition?  
A3: They allow passing functions as props to dynamically determine what a component renders.  

Q4: What’s the difference between HOCs and render props?  
A4: HOCs wrap a component to inject behavior, while render props pass functions to determine render output dynamically.  

*/
