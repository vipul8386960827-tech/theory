/* 68_purpose_of_unmountcomponentatnode.js

=====================================================
Purpose of ReactDOM.unmountComponentAtNode
=====================================================

Definition:
`ReactDOM.unmountComponentAtNode(container)` is a React DOM API used to **unmount a mounted React component** from a specific DOM node.
It removes the component and cleans up its event handlers, state, and associated DOM elements.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Usage
   - Useful when you want to **programmatically remove a React component** from the DOM.
   - Often used in testing, modals, or dynamically rendered components outside of the main app root.

2. Behavior
   - Invokes `componentWillUnmount()` lifecycle method for class components.
   - Cleans up internal React data structures for the component.
   - Returns `true` if a component was unmounted, `false` otherwise.

3. Requirements
   - You must provide the **same DOM node** where the component was initially rendered using `ReactDOM.render`.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React from "react";
import ReactDOM from "react-dom";

function Modal() {
  return <div>Modal Content</div>;
}

const container = document.getElementById("modal-root");

// Mount the component
ReactDOM.render(<Modal />, container);

// Later, unmount the component
ReactDOM.unmountComponentAtNode(container);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of React component mounting like **placing a toy in a box**.
- `unmountComponentAtNode` = **removing the toy** and cleaning up all small parts associated with it.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if you call unmountComponentAtNode on an empty node?  
A1: Returns false; nothing is unmounted.

Q2: Does it work for functional components as well?  
A2: Yes, it works for both functional and class components.

Q3: How is this different from removing the DOM node manually?  
A3: Removing manually bypasses React cleanup, possibly causing memory leaks and lingering event listeners.

Q4: When is it recommended to use unmountComponentAtNode?  
A4: When dynamically rendering and later removing components outside of the main React tree, like modals or notifications.

*/
