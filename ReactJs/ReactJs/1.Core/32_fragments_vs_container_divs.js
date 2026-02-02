/*
Fragment vs Container Div in React – Interview-Ready Answer:

"In React, both Fragments and container divs can be used to wrap multiple elements, 
but they serve different purposes and have different impacts on the DOM."

Key Points:

1️⃣ Fragment:
- Syntax: <React.Fragment>...</React.Fragment> or shorthand <>...</>
- Does NOT render any actual DOM node.
- Keeps the DOM clean and avoids unnecessary wrapper elements.
- Useful when you want multiple elements to be siblings without extra divs.

2️⃣ Container Div:
- Syntax: <div>...</div>
- Adds an actual DOM node to the HTML structure.
- Can be styled or have props like className, id, or event handlers.
- Sometimes necessary when layout or styling requires a wrapper element.

3️⃣ Real-life Analogies:

- Global Analogy:
  - Fragment: Transparent folder to hold papers temporarily without adding extra physical layers.
  - Div: Actual box that wraps items and occupies space.

- India-specific Analogy:
  - Fragment: Serving multiple dishes on a thali plate without extra bowls.
  - Div: Using an extra bowl to hold multiple items.

- Web Analogy:
  - Fragment: Rendering <h1> and <p> as siblings directly in the DOM.
  - Div: Wrapping <h1> and <p> in a <div> which adds an extra DOM node.

4️⃣ Coding Example:

// Using Fragment
function FragmentExample() {
    return (
        <>
            <h1>Title</h1>
            <p>Description</p>
        </>
    );
}

// Using Container Div
function DivExample() {
    return (
        <div className="container">
            <h1>Title</h1>
            <p>Description</p>
        </div>
    );
}

// Explanation:
// - FragmentExample adds no extra DOM nodes; <h1> and <p> are siblings.
// - DivExample adds an extra <div> in the DOM, which may affect styling and layout.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: When should you prefer a Fragment over a div?  
A1: When you need multiple sibling elements without affecting the DOM structure.

Q2: Can you apply styles or attributes to a Fragment?  
A2: No, only <React.Fragment> can take a key; shorthand <> cannot take any props.

Q3: Does using too many divs affect performance?  
A3: It can slightly impact rendering and layout, especially in large lists, and can create "div soup".

Q4: Can Fragments be used in lists?  
A4: Yes, and <React.Fragment key={uniqueKey}> can be used to provide keys for list items.

Q5: Are container divs always bad?  
A5: No, use divs when you need styling, layout control, or event handlers.
*/
