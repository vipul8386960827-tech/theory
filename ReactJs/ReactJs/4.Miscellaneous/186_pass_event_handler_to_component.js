/* 186_pass_event_handler_to_component.js

1. Definition:
In React, you can pass event handler functions (like `onClick`, `onChange`, etc.) as props to a child component.  
This allows parent components to control what happens when an event occurs in the child.

2. Key Points to Highlight:
- Event handlers are just functions passed as props.  
- This helps achieve parent-to-child communication.  
- Encourages reusability: the same component can handle different behaviors depending on the handler passed.  
- Handlers should be named descriptively, often prefixed with "on" (e.g., `onSave`, `onDelete`).  

3. Real-life Analogy:
Think of a **TV remote**.  
- The TV (child component) doesn’t decide what to do when you press a button.  
- The remote (parent) sends the signal (event handler).  
- Depending on the remote’s design, pressing "Power" could turn the TV on, off, or even start a different mode.  

Similarly, the parent decides the action, and the child just triggers it.

4. Example:
function Button({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}

function App() {
  const handleClick = () => {
    alert("Button clicked from App!");
  };

  return <Button onClick={handleClick} />;
}

5. Possible Follow-up Interview Questions with Answers:

Q: Why pass event handlers instead of defining them in the child component?  
A: It keeps the child reusable and lets the parent control behavior, following the "lift state up" principle.

Q: Can event handlers be passed with arguments?  
A: Yes, by wrapping them in another function, e.g.,  
   `<Button onClick={() => handleClick(id)} />`.

Q: What happens if you don’t pass the handler?  
A: The child may try to call `undefined` (error), so it’s good practice to provide a fallback, e.g., `onClick = () => {}`.

Q: How does this pattern improve separation of concerns?  
A: The child focuses only on rendering and UI, while the parent decides the business logic.

*/
