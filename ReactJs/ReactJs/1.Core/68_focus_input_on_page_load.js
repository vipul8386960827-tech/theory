/*
=====================================
Focus Input on Page Load in React
=====================================

Definition:
To automatically focus an input element when a React component 
mounts, we use the useRef hook to get a reference to the input 
and use useEffect to call the focus() method on it.

-------------------------------------
Key Points:
-------------------------------------
- useRef stores a reference to a DOM element.  
- useEffect with empty dependency array [] ensures focus runs once after mount.  
- Works for text inputs, textareas, and other focusable elements.  

-------------------------------------
Example 1: Focus Input on Mount
-------------------------------------
import React, { useRef, useEffect } from "react";

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focus input on mount
  }, []);

  return <input ref={inputRef} type="text" placeholder="Type here..." />;
}

-------------------------------------
Example 2: Using Class Component
-------------------------------------
import React from "react";

class AutoFocusInputClass extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus(); // Focus input after component mounts
  }

  render() {
    return <input ref={this.inputRef} type="text" placeholder="Type here..." />;
  }
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Auto-focusing an input is like highlighting the first box on a form 🖊️ 
so the user can start typing immediately.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can multiple inputs be auto-focused at once?
A1: No, only one element can have focus at a time. You can programmatically switch focus.

Q2: What happens if you call focus before component mounts?
A2: It will fail; the DOM element does not exist yet, so focus() won’t work.

Q3: Can you focus elements other than inputs?
A3: Yes, any focusable element (textarea, button, select, etc.) can be focused.

Q4: Can you use setTimeout for delayed focus?
A4: Yes, for scenarios where DOM is dynamically loaded or animations are involved.

Q5: Why use useRef instead of document.querySelector?
A5: useRef is the React way, ensures safe access to the element and avoids direct DOM manipulation outside React.
*/
