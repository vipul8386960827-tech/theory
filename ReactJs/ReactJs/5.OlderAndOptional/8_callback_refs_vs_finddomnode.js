/* 8_callback_refs_vs_finddomnode.js

=====================================
Callback Refs vs findDOMNode in React
=====================================

Definition:
Refs in React can be created using **callback refs** or the older **findDOMNode()** method.  
Both provide access to DOM nodes, but their usage and safety differ.

-------------------------------------
Key Points:
-------------------------------------

1. Callback Refs:
   - A function is passed to the `ref` attribute.
   - React calls this function with the DOM element when mounted, or `null` when unmounted.
   - Preferred modern approach.
   - Example: `ref={el => this.input = el}`

2. findDOMNode():
   - A ReactDOM method to access a component’s underlying DOM node.
   - Works for class components but **not recommended** for strict mode or functional components.
   - Deprecated in React StrictMode due to potential issues with component encapsulation.

3. Comparison:
   - Callback refs are safer, work in strict mode, and support functional components.
   - findDOMNode breaks encapsulation and can cause issues in concurrent rendering.

-------------------------------------
Example:
-------------------------------------
import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';

// Using Callback Ref
class CallbackRefExample extends Component {
  handleFocus = () => {
    this.inputElement.focus();
  }

  render() {
    return (
      <div>
        <input ref={el => (this.inputElement = el)} />
        <button onClick={this.handleFocus}>Focus Input</button>
      </div>
    );
  }
}

// Using findDOMNode (Not recommended)
class FindDOMNodeExample extends Component {
  handleFocus = () => {
    const node = ReactDOM.findDOMNode(this.inputRef);
    node.focus();
  }

  render() {
    return (
      <div ref={ref => (this.inputRef = ref)}>
        <input type="text" />
        <button onClick={this.handleFocus}>Focus Input</button>
      </div>
    );
  }
}

-------------------------------------
Analogy:
-------------------------------------
- Callback ref = giving someone the exact **address** of a house.  
- findDOMNode = guessing the location based on the building type—less safe and reliable.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can callback refs be used in functional components?  
A1: Yes, functional components support callback refs and `useRef()` hook.

Q2: Why is findDOMNode discouraged?  
A2: It breaks encapsulation, doesn’t work with StrictMode, and may fail in concurrent mode.

Q3: Can callback refs be null?  
A3: Yes, React calls the callback with `null` when the component unmounts.

Q4: When would you use findDOMNode today?  
A4: Rarely; only for legacy class components when ref forwarding is not possible.
*/
