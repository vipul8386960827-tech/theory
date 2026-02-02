/*
className vs class in React – Interview-Ready Answer:

"In React, `className` is used instead of `class` to assign CSS classes to elements. 
This is because `class` is a reserved keyword in JavaScript, and JSX is syntactic sugar 
for JavaScript function calls."

Key Points:

1️⃣ Why className:
- JSX is transformed to `React.createElement()` calls.
- Using `class` would conflict with the JS reserved keyword.
- React expects `className` in props to set the HTML class attribute.

2️⃣ How it Works:
- `<div className="container"></div>` in JSX becomes:
  React.createElement('div', { className: 'container' }, null)
- React then renders it as `<div class="container"></div>` in the actual DOM.

3️⃣ Real-life Analogies:

- Global Analogy: Using a nickname (`className`) instead of your real name (`class`) 
  in a system to avoid conflicts.
- India-specific Analogy: Using "Raj" instead of "Raja" in a registry where "Raja" is reserved.
- Web Analogy: JSX is JS, so use `className` to safely map to HTML `class`.

4️⃣ Coding Example:

function App() {
    return (
        <div className="container">
            <h1 className="title">Hello React</h1>
        </div>
    );
}

// Explanation:
// - `className` sets the HTML `class` attribute.
// - Using `class` in JSX will throw a syntax warning/error.
// - React converts `className` prop to `class` in the actual DOM.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Can you use `class` instead of `className` in JSX?  
A1: No, `class` is a reserved JS keyword; JSX requires `className`.

Q2: Does `className` work with dynamic expressions?  
A2: Yes, you can use template literals or expressions: <div className={`box ${isActive ? 'active' : ''}`}></div>

Q3: Is `className` only for HTML elements?  
A3: Yes, for custom React components, `className` is just a prop and you can use it however you want.

Q4: Can you apply multiple classes?  
A4: Yes, by separating them with spaces: className="class1 class2".

Q5: Is `style` prop similar to `className`?  
A5: No, `style` is an object for inline styles, whereas `className` maps to CSS classes.
*/
