/* 184_component_props_default_true.js

1. Definition:
In React, if you pass a prop without assigning a value, it is treated as `true`.  
This is shorthand syntax in JSX and works specifically for boolean props.

2. Key Points to Highlight:
- `<MyComp active />` is the same as `<MyComp active={true} />`.  
- If the prop is missing completely, it will be `undefined`, not `false`.  
- You must explicitly pass `false` if you want to disable a feature.  
- This mirrors HTML boolean attributes (like `<input disabled />`).  

3. Real-life Analogy:
Think of a **light switch in a hotel room**:  
- If the switch is turned ON → it’s true.  
- If the switch is explicitly turned OFF → it’s false.  
- If the switch doesn’t exist in the room → it’s undefined.  

Similarly, `<Button primary />` means “switch ON primary styling,”  
while `<Button />` means no such switch was provided at all.

4. Example:
function Button({ primary }) {
  return (
    <button style={{ color: primary ? "blue" : "black" }}>
      Click Me
    </button>
  );
}

// Usage:
<Button primary />         // primary = true
<Button primary={true} />  // also true
<Button />                 // primary = undefined
<Button primary={false} /> // explicitly false

5. Possible Follow-up Interview Questions with Answers:

Q: How is JSX shorthand for boolean props similar to HTML?  
A: In HTML, `<input disabled />` is equivalent to `disabled="true"`. React follows the same convention for boolean props.

Q: What’s the difference between not passing a prop vs passing `false`?  
A: If the prop is missing, its value is `undefined`. If you pass `false`, it’s explicitly set to `false`. Components can use `undefined` to apply default behavior.

Q: Why might you use boolean shorthand?  
A: It makes JSX cleaner and more readable, especially for flags like `disabled`, `checked`, `open`, etc.

Q: How can you set default values for boolean props?  
A: You can use default props or destructuring with a default, e.g.,  
   `function MyComp({ visible = false }) { ... }`.

*/
