/* 47_programmatically_trigger_click_event.js

=====================================================
Programmatically Triggering a Click Event in React
=====================================================

Definition:
Sometimes we need to simulate a button click (or any element’s click event) using JavaScript/React  
without requiring direct user interaction.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Refs are used** to directly access DOM nodes in React.  
2. We can call `.click()` on the referenced DOM element.  
3. This is useful for file uploads, hidden buttons, or automation.  
4. Avoid overusing this — React prefers declarative state changes.

-----------------------------------------------------
Example 1: Triggering a Button Click
-----------------------------------------------------
import React, { useRef } from "react";

function TriggerClickExample() {
  // create a reference
  const buttonRef = useRef(null);

  const handleTriggerClick = () => {
    // programmatically trigger click
    buttonRef.current.click();
  };

  return (
    <div>
      <button ref={buttonRef} onClick={() => alert("Button Clicked!")}>
        Hidden Button
      </button>
      <button onClick={handleTriggerClick}>Trigger Click</button>
    </div>
  );
}

-----------------------------------------------------
Explanation of Example 1:
-----------------------------------------------------
- `buttonRef` holds a reference to the hidden button.  
- Clicking "Trigger Click" programmatically calls `.click()` on the hidden button.  
- React fires the click event handler (`alert("Button Clicked!")`).  

-----------------------------------------------------
Example 2: File Upload Button
-----------------------------------------------------
import React, { useRef } from "react";

function FileUploadExample() {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // open file dialog
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} style={{ display: "none" }} />
      <button onClick={handleUploadClick}>Upload File</button>
    </div>
  );
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Imagine you want to ring a doorbell but you have a **remote control**.  
- Instead of pressing the bell directly, you press the remote, which triggers the same action.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: When should you avoid programmatically triggering clicks?  
A1: When you can achieve the same behavior declaratively with state/props.

Q2: What’s a real-world use case of this technique?  
A2: Opening hidden file inputs, simulating clicks in testing, automating flows.

Q3: How would you test programmatic clicks in React?  
A3: Use React Testing Library’s `fireEvent.click(element)` or `userEvent.click(element)`.

Q4: Can this approach be used with non-button elements?  
A4: Yes, any clickable DOM element (`div`, `a`, `input`) supports `.click()`.  
*/
