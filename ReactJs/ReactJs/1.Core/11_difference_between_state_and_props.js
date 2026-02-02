/* 11_difference_between_state_and_props.js */
/*
State is data that is managed within a component and can change over time, 
causing the component to re-render. Props are data passed from a parent component 
to a child component and are read-only inside the child.

In short: state = internal and mutable, props = external and immutable.


---

📌 Real-life Examples:

- **Global analogy (Fan):**
  State = fan speed controlled by the user.  
  Prop = brand or model of the fan passed from the manufacturer.

- **India-specific analogy (Tiffin service):**
  State = number of rotis you consume (changes over time).  
  Prop = fixed menu provided by the tiffin service (cannot be changed).

- **Web analogy:**
  State = counter value updated on button click.  
  Prop = label passed to a Button component to display text.


---

📌 Possible Follow-Up Questions & Answers:

Q1: Can props change within a component?  
A1: No, props are read-only. Changes must come from the parent.

Q2: Can state be passed to child components?  
A2: Yes, state can be passed as props to children.

Q3: Can props be used to initialize state?  
A3: Yes, but subsequent state changes are independent of the prop unless explicitly synced.

Q4: Which one triggers re-rendering?  
A4: Both state and props changes can trigger re-renders of the component.

Q5: Are props always objects?  
A5: Props can be any JavaScript data type: string, number, object, array, function, etc.
*/
