/* 251_capture_phase_events.js */

/*
=====================================
Capture Phase Events in React
=====================================

Definition:
React supports the **capture phase** of event propagation in addition to the 
default bubble phase. In the capture phase, events propagate **from the root 
down to the target element** before reaching the target, allowing interception 
early in the event flow.

-------------------------------------
Key Points:
-------------------------------------

1. Event Phases in React:
   - **Capture Phase:** Root → target (top-down)
   - **Bubble Phase:** Target → root (bottom-up, default)

2. Using Capture Phase:
   - Add the **Capture** suffix to the event handler, e.g., `onClickCapture`.
   - Useful for intercepting events before child elements handle them.

3. Why Capture Phase is Useful:
   - Handle events at parent level before they reach children.
   - Prevent certain child behaviors or implement global logic.

-------------------------------------
Example:
-------------------------------------
import React from 'react';

function Example() {
  const handleParentCapture = () => {
    console.log("Parent capture phase triggered");
  };

  const handleChildClick = () => {
    console.log("Child click triggered");
  };

  return (
    <div onClickCapture={handleParentCapture} style={{ padding: '20px', border: '1px solid black' }}>
      <button onClick={handleChildClick}>Click Me</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Think of capture phase like reading a message before it reaches the recipient:
  you can intercept or inspect it early (top-down), unlike bubble phase where it is 
  handled after reaching the target (bottom-up).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What is the difference between capture and bubble phases?  
A1: Capture phase propagates top-down (root → target), bubble phase propagates bottom-up (target → root).

Q2: How do you attach a capture phase handler in React?  
A2: By using `onEventCapture` (e.g., `onClickCapture`) instead of `onClick`.

Q3: Can you stop propagation in capture phase?  
A3: Yes, using `event.stopPropagation()` stops further event propagation.

Q4: Are all React events supported in capture phase?  
A4: Most synthetic events support capture phase by adding the "Capture" suffix.
*/
