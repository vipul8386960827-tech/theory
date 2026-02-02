/*
Portals in React – Interview-Ready Answer:

"In React, Portals provide a way to render children into a DOM node that exists outside 
the DOM hierarchy of the parent component. This is useful for UI elements like modals, 
tooltips, or popovers that need to visually break out of their parent container."


--------------------------------------------------------------------------------
🔍 How Portals Work Behind the Scenes (Internal React Behavior)
--------------------------------------------------------------------------------

1️⃣ React creates a special Fiber node of type `HostPortal`.  
2️⃣ This Fiber remains inside the **React component tree** (logical tree).  
3️⃣ During the commit phase, React switches the DOM mount target from the parent DOM 
   to the portal's container DOM node.  
4️⃣ Reconciliation, context, and event bubbling work as if the portal component is still 
   a normal child in the React tree.  
5️⃣ DOM placement is the only thing that changes — the element is physically inserted 
   into the DOM node you pass to `createPortal`.  
6️⃣ Events bubble through the **React tree**, not the physical DOM tree, because React 
   uses its own synthetic event system.


--------------------------------------------------------------------------------
🆚 Difference Between React Tree and DOM Tree (In Context of Portals)
--------------------------------------------------------------------------------

React Tree (Fiber Tree):
- Represents the logical hierarchy of components.
- Portals stay attached to their parent component in this tree.
- Context, props, memoization, and lifecycle methods work normally.
- Event bubbling follows this tree.

DOM Tree:
- Represents the actual HTML nodes rendered in the browser.
- Portals break the physical parent-child relationship.
- Portal children are mounted into a completely different DOM container.
- DOM hierarchy no longer matches the React hierarchy.

In short:
✔ React tree remains the same  
✘ DOM tree diverges  
This is the core reason portals work without breaking React behavior.


--------------------------------------------------------------------------------
Key Points:
--------------------------------------------------------------------------------

1️⃣ Purpose:
- Render components outside their parent DOM hierarchy.
- Useful for modals, tooltips, dropdowns, or overlays.
- Ensures proper z-index stacking and positioning.

2️⃣ How It Works:
- Syntax: ReactDOM.createPortal(child, container)
- `child` – React element to render
- `container` – DOM node where the element will be rendered
- Event bubbling works normally; events inside the portal propagate to ancestors 
  in React tree.

3️⃣ Real-life Analogies:

- Global Analogy: Sending a letter through a special courier that delivers it outside your 
  neighborhood.
- India-specific Analogy: Booking a wedding hall (modal) outside your home but 
  controlling it via your family (parent component).
- Web Analogy: Rendering a modal outside a scrollable div so it appears above all content.

4️⃣ Coding Example:

// App Component
import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children }) {
    const modalRoot = document.getElementById('modal-root');
    return ReactDOM.createPortal(
        <div className="modal">
            {children}
        </div>,
        modalRoot
    );
}

function App() {
    const [show, setShow] = React.useState(false);

    return (
        <div>
            <button onClick={() => setShow(true)}>Open Modal</button>
            {show && (
                <Modal>
                    <h2>Modal Title</h2>
                    <button onClick={() => setShow(false)}>Close Modal</button>
                </Modal>
            )}
        </div>
    );
}

// HTML:
// <div id="root"></div>
// <div id="modal-root"></div>

// Explanation:
// - Modal content is rendered into #modal-root, outside the App's DOM hierarchy.
// - The modal still behaves as a React component, with state and events handled normally.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Can events inside portals propagate to parent components?  
A1: Yes, React events propagate through the React component tree, even if the DOM hierarchy is different.

Q2: Can portals be used with class components?  
A2: Yes, portals work with both class and functional components.

Q3: What are typical use-cases for portals?  
A3: Modals, tooltips, dropdown menus, notifications, and popovers.

Q4: Can you have multiple portals?  
A4: Yes, you can render different components into different DOM nodes using multiple portals.

Q5: Does using portals affect React state or lifecycle methods?  
A5: No, the component rendered via a portal behaves like a normal React component with full state and lifecycle support.
*/
