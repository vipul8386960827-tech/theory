/*  
===============================================================================
FRONTEND SYSTEM DESIGN — CONTROLLED vs UNCONTROLLED COMPONENTS
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# 1. CONTROLLED COMPONENTS
##########################################
- Form input elements whose value is controlled by React state.
- React state is the single source of truth.
- Every change in input triggers onChange → updates state → re-renders input.

Key points to highlight in interview:
- Enables validation, formatting, and conditional rendering in real-time.
- Easier to test and predict behavior.
- Suitable for forms where state needs to be read, validated, or submitted.

Example:
function ControlledInput() {
  const [value, setValue] = React.useState("");
  return (
    <input 
      type="text" 
      value={value} 
      onChange={e => setValue(e.target.value)} 
    />
  );
}

Good line to say:
- “Controlled components keep the form state in React, giving full control 
  over input values and validation.”

##########################################
# 2. UNCONTROLLED COMPONENTS
##########################################
- Form inputs whose state is managed by the DOM, not React.
- React reads value only when needed via ref.

Key points to highlight in interview:
- Simpler for simple forms where real-time validation is not needed.
- Useful for file inputs, third-party libraries, or uncontrolled elements.

Example:
function UncontrolledInput() {
  const inputRef = React.useRef();
  const handleSubmit = () => {
    alert(inputRef.current.value);
  };
  return <input ref={inputRef} type="text" />;
}

Good line to say:
- “Uncontrolled components let the DOM manage input state, and React reads it only when needed.”

##########################################
# 3. KEY DIFFERENCES (INTERVIEW-READY)
##########################################
| Feature               | Controlled Component           | Uncontrolled Component      |
|-----------------------|--------------------------------|----------------------------|
| State source          | React state                    | DOM                        |
| Updates on change     | Every change triggers render   | Read on demand             |
| Validation / formatting | Easy / real-time               | Hard / post-read           |
| Use case              | Complex forms needing control  | Simple forms or file input |
| Ref needed?           | No                             | Yes                        |

##########################################
# 4. ONE-LINE SUMMARY FOR INTERVIEW
##########################################
- “Controlled components store state in React for full control and predictability.  
  Uncontrolled components let the DOM handle state and React reads it only when needed.”

##########################################
# 5. WHAT INTERVIEWER WANTS TO HEAR
##########################################
1. Understanding of React state vs DOM state.
2. Ability to justify choice:
   - Controlled → validation, formatting, conditional rendering, testing.
   - Uncontrolled → simple forms, file inputs, third-party libraries.
3. Awareness of pros and cons (control vs simplicity/performance).

===============================================================================
END
===============================================================================
*/
