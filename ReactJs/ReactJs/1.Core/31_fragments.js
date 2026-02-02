/*
Fragments in React – Interview-Ready Answer:

"In React, Fragments allow you to group multiple elements without adding extra nodes to the 
DOM. This helps avoid unnecessary wrapper divs and keeps the DOM clean."

Key Points:

1️⃣ Purpose:
- Return multiple elements from a component without an extra wrapper element.
- Helps reduce unnecessary DOM nodes.
- Improves performance and avoids layout issues caused by extra divs.

2️⃣ How It Works:
- Two syntaxes: <React.Fragment>...</React.Fragment> or shorthand <>...</>
- Fragment does not render any actual DOM element; it’s invisible in the DOM.
- Useful when rendering lists or multiple sibling elements.

3️⃣ Real-life Analogies:

- Global Analogy: A folder to hold documents temporarily without adding an extra folder to the filing system.
- India-specific Analogy: Serving multiple dishes on a thali plate without using separate plates.
- Web Analogy: Grouping multiple <li> items in a map function without adding an extra <div> wrapper.

4️⃣ Coding Example:

function App() {
    return (
        <>
            <h1>Title</h1>
            <p>This is a paragraph.</p>
        </>
    );
}

// Equivalent using React.Fragment
function App2() {
    return (
        <React.Fragment>
            <h1>Title</h1>
            <p>This is a paragraph.</p>
        </React.Fragment>
    );
}

// In this example:
// - No extra <div> is added to the DOM.
// - Both <h1> and <p> are rendered as siblings in the DOM.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Can you add keys to fragments?  
A1: Yes, when rendering a list of fragments, use <React.Fragment key={uniqueKey}>.

Q2: Can shorthand <>...</> take keys or attributes?  
A2: No, only <React.Fragment> can accept keys or attributes.

Q3: Does using fragments improve performance?  
A3: Slightly, because it avoids extra DOM nodes.

Q4: Are fragments necessary in functional components?  
A4: Only when returning multiple sibling elements without a parent wrapper.

Q5: Can fragments be nested?  
A5: Yes, fragments can be nested like any other React element.
*/
