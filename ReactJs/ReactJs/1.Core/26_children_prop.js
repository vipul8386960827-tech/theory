/*
Children Props in React – Interview-Ready Answer:

"In React, the `children` prop is a special prop automatically passed to components that 
represents any child elements nested inside the component. It allows components to be 
composable and reusable by rendering whatever is placed between their opening and closing tags."

Key Points:

1️⃣ Purpose:
- Enables component composition.
- Allows passing JSX, elements, or even functions as children.
- Provides flexibility to create reusable wrapper components.

2️⃣ How it Works:
- Any content between a component's opening and closing tags is accessible via `props.children`.
- Can be rendered directly or manipulated inside the component.

3️⃣ Real-life Analogies:

- Global Analogy: A gift box (component) can hold any gift (children) inside it.  
- India-specific Analogy: A thali (plate component) can contain any variety of dishes (children) depending on the meal.  
- Web Analogy: A Modal component can render different content inside it, passed as children.

4️⃣ Coding Example:

function Card({ children }) {
    return <div className="card">{children}</div>;
}

// Usage with JSX content as children
<Card>
    <h2>Title</h2>
    <p>This is a description inside the card.</p>
</Card>

// Usage with another component as children
<Card>
    <Button>Click Me</Button>
</Card>

// In this example:
// - Card does not care what children are; it just renders them inside a div.
// - children can be plain text, JSX elements, or other components.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Can `children` be a function?  
A1: Yes, this is called the "function-as-children" pattern, useful for render props.

Q2: Can a component have multiple children?  
A2: Yes, `props.children` can be a single element, multiple elements (array), or null.

Q3: How do you iterate over children?  
A3: Using React.Children.map(props.children, child => ...) to safely handle single or multiple children.

Q4: Are `children` read-only?  
A4: Yes, children should not be modified; you can clone them using React.cloneElement if needed.

Q5: Can you pass props to children?  
A5: Directly no, but you can use React.cloneElement to inject additional props to child elements.
*/
