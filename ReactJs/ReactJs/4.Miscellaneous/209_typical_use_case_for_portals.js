/* 209_typical_use_case_for_portals.js

=====================================
Typical Use Case for Portals in React
=====================================

Definition:
**Portals** in React allow rendering a component's children into a **DOM node outside** 
the parent component hierarchy.  
They are used to **break out of parent styles or stacking contexts**, while still keeping 
React state and event handling intact.

-------------------------------------
Key Points:
-------------------------------------
1. Created using `ReactDOM.createPortal(children, domNode)`.  
2. Keeps React’s **event system** intact, even though DOM is moved.  
3. Commonly used for **modals, tooltips, dropdowns, and popovers**.  
4. Helps prevent **CSS overflow or z-index issues** that occur in parent containers.  

-------------------------------------
Guidelines:
-------------------------------------
- Always render portals **inside a stable DOM node**, like `document.body`.  
- Maintain accessibility and focus management for modals or dialogs.  
- Combine with React state to control visibility.  

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";
import ReactDOM from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)"
    }}>
      <div style={{
        backgroundColor: "#fff",
        margin: "100px auto",
        padding: "20px",
        width: "300px"
      }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Content</h2>
      </Modal>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Portals are like **sending a message to another room**:  
- Even though the sender is in one room (component hierarchy), the message (UI) 
  appears somewhere else (different DOM node).  
- Event handling and context still works as if it were in the original room.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why use portals instead of normal component rendering?  
A1: To avoid CSS issues like `overflow: hidden` or z-index stacking problems in parent containers.  

Q2: Do portals break React’s event system?  
A2: No, events propagate through React as if the component was in its original tree.  

Q3: Can you use multiple portals in an app?  
A3: Yes, each portal can render to any DOM node independently.  

Q4: Are portals compatible with server-side rendering (SSR)?  
A4: Yes, but the target DOM node must exist on the client side.  

*/
