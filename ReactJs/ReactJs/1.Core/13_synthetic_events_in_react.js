/*
Synthetic events in React are React’s wrapper around native browser events.  
They provide a consistent interface across all browsers, normalizing differences 
so that event handling works the same everywhere.  
Synthetic events work like native events but are pooled for performance.


---

📌 Real-life Examples:

- **Global analogy (Translator):**
  Synthetic event = a translator who converts different languages into a single language 
  so everyone understands it the same way.  
  Native event = different people speaking different languages.

- **India-specific analogy (Railway announcement system):**
  Native station announcements = different stations may have different formats or languages.  
  Synthetic event = central system standardizes announcements so all passengers hear it uniformly.

- **Web analogy:**
  A click on a button triggers a SyntheticEvent in React:  
  `onClick={(e) => console.log(e.target)}` works the same in Chrome, Firefox, and Safari.


---

📌 Possible Follow-Up Questions & Answers:

Q1: Why does React use SyntheticEvent?  
A1: To ensure consistent behavior across all browsers and improve performance through event pooling.

Q2: Can you prevent default behavior in SyntheticEvent?  
A2: Yes, using `e.preventDefault()`, just like native events.

Q3: Can SyntheticEvent be used asynchronously?  
A3: No, SyntheticEvent is pooled. To use it asynchronously, you need to call `e.persist()`.

Q4: What properties does SyntheticEvent have?  
A4: It includes common properties like `type`, `target`, `currentTarget`, `preventDefault()`, `stopPropagation()`, etc.

Q5: Is SyntheticEvent the same as native event?  
A5: No, it wraps the native event but provides a consistent API for all browsers.
*/
