/*
Props in React are short for “properties” and are used to pass data 
from a parent component to a child component.  
Props are read-only, meaning the child cannot modify them directly.


---

📌 Real-life Examples:

- **Global analogy (Gift delivery):**
  Parent gives a gift to a child. The child receives it but cannot change it.  
  Props work the same way — data flows from parent to child.

- **India-specific analogy (Roti from Tiffin service):**
  The tiffin service provides a fixed meal (props) to the customer.  
  The customer can use it, but cannot change what’s inside.

- **Web analogy:**
  `<Button label="Click Me" />` → the `label` prop is passed from parent.  
  The Button component uses it to display text.


---

📌 Possible Follow-Up Questions & Answers:

Q1: Can a child component modify props?  
A1: No, props are read-only. To change data, the child should notify the parent to update state.

Q2: How are props different from state?  
A2: Props are passed from parent and immutable; state is managed inside the component and can change.

Q3: Can props have default values?  
A3: Yes, using `defaultProps` in class components or default values in destructuring for function components.

Q4: Can props be functions?  
A4: Yes, you can pass functions as props to allow children to trigger parent actions (callback pattern).

Q5: Can props be used for styling?  
A5: Yes, props can be passed to determine CSS classes, inline styles, or dynamic rendering.
*/
