/* 9_string_refs_legacy.js

=====================================
String Refs (Legacy) in React
=====================================

Definition:
String refs are an older way to assign a reference to a DOM element or component 
using a **string identifier**. React internally stored these refs and made them accessible via `this.refs`.

-------------------------------------
Key Points:
-------------------------------------

1. Syntax:
   - Example: `<input ref="myInput" />`
   - Access: `this.refs.myInput`

2. Drawbacks:
   - Not type-safe.
   - Breaks encapsulation.
   - Not compatible with functional components.
   - Harder to reason about, especially in large apps.

3. Modern Alternative:
   - Use **callback refs** or **`createRef()`** for better safety and clarity.

-------------------------------------
Example:
-------------------------------------
import React, { Component, createRef } from 'react';

class StringRefExample extends Component {
  focusInput = () => {
    // Legacy string ref access
    this.refs.myInput.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref="myInput" />
        <button onClick={this.focusInput}>Focus Input</button>
      </div>
    );
  }
}

// Modern approach using createRef
class ModernRefExample extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  focusInput = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.focusInput}>Focus Input</button>
      </div>
    );
  }
}

-------------------------------------
Analogy:
-------------------------------------
- String refs = writing the **name of a friend** on a sticky note to find them later.  
- Modern refs = giving a **direct phone number** or key, safer and reliable.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can string refs be used in functional components?  
A1: No, they are legacy and only work in class components.

Q2: Why did React discourage string refs?  
A2: They are less predictable, break encapsulation, and have performance issues.

Q3: When should you prefer createRef over callback refs?  
A3: Use `createRef()` in class components for simplicity; use callback refs when you need more control.

Q4: Are string refs still supported?  
A4: They work in older versions but are deprecated and should be avoided in modern apps.
*/
