/* 55_inline_ref_callbacks_not_recommended.js

=====================================================
Inline Ref Callbacks in React (Why Not Recommended)
=====================================================

Definition:
In React, refs are used to directly access DOM elements or React elements.  
While you can define a ref callback inline (inside JSX), doing so is **not recommended**  
because it causes unnecessary re-creation of functions and re-invocations on every render.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Inline Ref Callback (Problematic)**
   - Example:
     <input ref={(el) => { this.inputEl = el; }} />
   - This creates a new function every time the component re-renders.
   - As a result:
     - React first sets the ref to `null`
     - Then immediately calls it again with the DOM element
     - This can cause performance overhead.

2. **Better Approach (Define Once)**
   - Define the ref callback as a class method or use `React.createRef`.
   - Example (using createRef):
     this.inputEl = React.createRef();
     <input ref={this.inputEl} />

3. **Why Avoid Inline Callbacks**
   - Performance issues due to unnecessary re-creation.
   - Can trigger unnecessary mounting/unmounting behavior.
   - Makes debugging harder.

4. **Modern React Recommendation**
   - Prefer `React.createRef` (for class components).
   - Prefer `useRef` (for function components with hooks).

-----------------------------------------------------
Example: Inline Callback (❌ Not Recommended)
-----------------------------------------------------
class InlineRefExample extends React.Component {
  render() {
    return (
      <input ref={(el) => { this.inputEl = el; }} />
    );
  }
}

-----------------------------------------------------
Example: Using createRef (✅ Recommended)
-----------------------------------------------------
import React from "react";

class BetterRefExample extends React.Component {
  constructor(props) {
    super(props);
    this.inputEl = React.createRef();
  }

  focusInput = () => {
    this.inputEl.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.inputEl} />
        <button onClick={this.focusInput}>Focus</button>
      </div>
    );
  }
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Inline ref callbacks are like **ordering a new duplicate key every time you open a door**.  
- Using `createRef` or `useRef` is like **keeping one key and reusing it whenever needed**.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why is using inline ref callbacks not recommended?  
A1: They create a new function on each render, leading to unnecessary unmount/remount of refs.  

Q2: What is the difference between `createRef` and `useRef`?  
A2: `createRef` is used in class components; `useRef` is used in functional components with hooks.  

Q3: Can inline callbacks cause memory leaks?  
A3: Not directly, but they can lead to unnecessary re-renders and performance issues.  

Q4: When would you still use a callback ref?  
A4: When you need custom logic while setting/unsetting a ref.  
*/
