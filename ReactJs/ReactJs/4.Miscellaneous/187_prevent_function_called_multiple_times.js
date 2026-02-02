/* 187_prevent_function_called_multiple_times.js

=====================================
Prevent Function Called Multiple Times
=====================================

Definition:
In React, event handlers or functions can sometimes be triggered multiple times 
(e.g., double-clicks, rapid typing, multiple renders).  
We prevent this to avoid duplicate API calls, unnecessary re-renders, 
or race conditions by using techniques like debouncing, throttling, 
disabling buttons, or stable references with hooks.

-------------------------------------
Key Points:
-------------------------------------
1. Causes:
   - Multiple re-renders attaching new handlers.
   - Double-clicks or repeated user actions.
   - Functions being re-created on every render.

2. Solutions:
   - Debounce: Delay execution until user stops triggering the event.
   - Throttle: Allow function to run at most once in a time window.
   - Disable UI (button disable) during processing.
   - Memoize handlers with `useCallback`.
   - Lock execution with `useRef`.

-------------------------------------
Guidelines:
-------------------------------------
- Use **debounce** for search inputs, autocomplete, or typing-heavy features.  
- Use **throttle** for scroll/resize events.  
- Use **loading flags** or `useRef` locks for API calls or form submissions.  

-------------------------------------
Example:
-------------------------------------
import React, { useState, useCallback } from "react";
import _ from "lodash";

function SearchBox() {
  const [query, setQuery] = useState("");

  // ✅ Debounced function: only runs after typing stops for 500ms
  const handleSearch = useCallback(
    _.debounce((q) => console.log("Searching:", q), 500),
    []
  );

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}

function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (loading) return; // safeguard against multiple calls
    setLoading(true);
    console.log("Submitted!");

    // simulate API call
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <button onClick={handleSubmit} disabled={loading}>
      {loading ? "Submitting..." : "Submit"}
    </button>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Imagine pressing the **elevator button**:  
- Pressing it once is enough to call the lift.  
- Pressing it 10 times doesn’t make it come faster.  
Similarly, we must ensure functions are executed only once as needed.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What is the difference between debounce and throttle?  
A1: Debounce delays execution until user stops triggering the event.  
    Throttle limits execution to once per fixed interval.

Q2: Why use `useCallback` in React?  
A2: To memoize functions so they aren’t recreated on every render, 
    preventing repeated binding and unnecessary calls.

Q3: How do you prevent duplicate API submissions on double-click?  
A3: Use a loading flag or disable the button until the request completes.

Q4: What problems occur if functions are triggered multiple times?  
A4: Performance issues, duplicate API calls, race conditions, 
    and potential inconsistent state.

*/
