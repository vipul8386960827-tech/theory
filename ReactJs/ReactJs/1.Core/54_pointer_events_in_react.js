/*
=====================================
Pointer Events in React
=====================================

Definition:
Pointer events in React are a set of events that handle input from
mouse, touch, pen, or stylus devices.  
They unify multiple input types under a single event system, unlike 
traditional mouse or touch events.

-------------------------------------
Key Points:
-------------------------------------
- React supports pointer events like:
  - onPointerDown
  - onPointerUp
  - onPointerMove
  - onPointerEnter
  - onPointerLeave
  - onPointerOver
  - onPointerOut
  - onPointerCancel
- Pointer events are normalized across input devices.  
- Useful for gestures, drag-and-drop, drawing apps, and interactive UIs.  
- Work consistently with touch, pen, and mouse without separate handlers.  

-------------------------------------
Example 1: Basic Pointer Event
-------------------------------------
function PointerComponent() {
  const handlePointerDown = (e) => {
    console.log(`Pointer down at x:${e.clientX}, y:${e.clientY}`);
  };

  return (
    <div
      style={{ width: "200px", height: "200px", background: "lightblue" }}
      onPointerDown={handlePointerDown}
    >
      Click or touch here
    </div>
  );
}

-------------------------------------
Example 2: Handling Multiple Pointer Types
-------------------------------------
function DragBox() {
  const handlePointerMove = (e) => {
    console.log(`Pointer type: ${e.pointerType}, x:${e.clientX}, y:${e.clientY}`);
  };

  return (
    <div
      style={{ width: "150px", height: "150px", background: "salmon" }}
      onPointerMove={handlePointerMove}
    >
      Move mouse, touch, or pen here
    </div>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Pointer events are like having a single universal remote 📺 that controls
TV, sound system, and AC — one interface works for multiple devices.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Difference between pointer events and mouse/touch events?
A1: Pointer events unify mouse, touch, and pen inputs, so you don’t need separate handlers.

Q2: What is e.pointerType?
A2: Indicates the type of input device: "mouse", "pen", or "touch".

Q3: Are pointer events supported on all browsers?
A3: Modern browsers support them; some older browsers may require fallbacks.

Q4: How to cancel pointer events?
A4: Use onPointerCancel event or call e.preventDefault() in handlers.

Q5: Can pointer events replace onDrag/onTouch handlers?
A5: Yes, they can simplify gesture handling across devices.
*/
