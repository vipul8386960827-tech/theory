/*
Stateless Components in React – Interview-Ready Answer:

"In React, stateless components are components that do not manage or hold their own state. 
They are primarily used to receive data via props and render UI. Stateless components 
are often implemented as functional components."

Key Points:

1️⃣ Purpose:
- Simplify components that only depend on props.
- Promote reusability and easier testing.
- Do not require lifecycle methods (unless using Hooks in functional components).

2️⃣ How It Works:
- Accept props as input.
- Return JSX to render UI.
- No internal state or setState; behavior is purely derived from props.

3️⃣ Real-life Analogies:

- Global Analogy: A calculator display – it only shows the result based on input but does not store data.
- India-specific Analogy: A price tag at a shop – it just shows the price (props) without storing any information.
- Web Analogy: A Button component that receives text and onClick handler as props but has no internal state.

4️⃣ Coding Example:

// Stateless Functional Component
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Kaizer" />

// Explanation:
// - Greeting component does not hold state.
// - It renders based on the "name" prop provided.
// - No lifecycle methods are needed; simpler and easy to test.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Can stateless components use hooks?  
A1: Yes, functional components (stateless) can use hooks like useState and useEffect, making them stateful if needed.

Q2: Are stateless components always functional?  
A2: Typically yes, but class components without state or lifecycle methods can also be considered stateless.

Q3: What is the advantage of stateless components?  
A3: They are simpler, easier to maintain, and promote separation of concerns.

Q4: Can stateless components have side-effects?  
A4: Yes, using useEffect hook in functional components, you can perform side-effects.

Q5: Should you convert class components to stateless if they don’t use state?  
A5: Yes, it is a good practice for cleaner and simpler code.
*/
