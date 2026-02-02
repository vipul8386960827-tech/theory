/*
A Pure Component in React is a class component that automatically does a shallow comparison 
of props and state inside `shouldComponentUpdate`. It only re-renders when props or state 
actually change, which helps improve performance by avoiding unnecessary re-renders.


---

📌 Real-life Examples:

- **Global analogy (Light switch):**
  If the light is already ON and you flip the switch to ON again, nothing happens.  
  Pure Component works the same way — no re-render unless something changes.

- **India-specific analogy (Tiffin service):**
  If today’s tiffin already has dal, the delivery guy won’t deliver dal again.  
  Pure Component behaves like that — no duplicate work unless data changes.

- **Web analogy:**
  Normal component = re-renders every time parent updates.  
  Pure Component = re-renders only if props/state are different.


---

📌 Possible Follow-Up Questions & Answers:

Q1: How do you create a Pure Component?  
A1: By extending `React.PureComponent` instead of `React.Component`.

Q2: What is the difference between Component and PureComponent?  
A2: `Component` always re-renders when parent updates,  
while `PureComponent` re-renders only after shallow comparison of props/state.

Q3: Can Pure Components prevent all unnecessary renders?  
A3: No, they only do shallow comparison. For nested objects or arrays, 
you may need manual optimization.

Q4: Can function components be pure?  
A4: Yes, by wrapping them in `React.memo`, which works like PureComponent for functions.

Q5: When should you avoid Pure Components?  
A5: When working with deeply nested data, because shallow comparison 
may not detect changes properly.
*/

/*


--------------------------------------------------



That used to be true earlier, but with modern React we can achieve the same behavior 
in function components using `React.memo`.

- In class components → we use `React.PureComponent`.
- In function components → we wrap the component with `React.memo`. 

`React.memo` works like PureComponent — it does a shallow comparison of props 
and only re-renders if the props actually change.


---

📌 Real-life Examples:

- **Global analogy (Security check):**
  PureComponent = security guard checking IDs before allowing entry.  
  React.memo = same security check, but for function components.

- **India-specific analogy (Dabba service):**
  If you order roti and sabzi yesterday and the order is unchanged today, 
  the service won’t re-deliver it. That’s how `React.memo` avoids re-rendering.

- **Web analogy:**
  Normal function component = always re-renders when parent updates.  
  Function component with `React.memo` = re-renders only if props actually change.


---

📌 Possible Follow-Up Questions & Answers:

Q1: Can function components be pure?  
A1: Yes, by using `React.memo`. It makes a function component behave like a PureComponent.

Q2: Is `React.memo` the same as PureComponent?  
A2: Yes, both do shallow comparison of props. The only difference is that PureComponent 
is for classes, while `React.memo` is for functions.

Q3: Can `React.memo` handle deep objects?  
A3: By default no, it does shallow comparison. For deep objects, you can pass a custom 
comparison function to `React.memo`.

Q4: Should we wrap all function components with `React.memo`?  
A4: No, it’s best for components that re-render frequently with the same props. 
Unnecessary use can add overhead.

Q5: What happens if parent updates but props don’t change?  
A5: With `React.memo`, the child function component won’t re-render, saving performance.
*/
