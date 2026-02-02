/* 22_uncontrolled_components.js */
/*
Uncontrolled Components in React – Interview-Ready Answer:

"Uncontrolled components are form elements (like input, textarea, select) that maintain 
their own internal state instead of being controlled by React state. The DOM itself handles 
the value, and React only accesses it when needed, usually via refs."

Key Points:

1️⃣ Value Managed by DOM:
- The input value is stored in the DOM, not in React state.
- You can access the value using a React ref only when needed.
- React does not re-render or track the value on every change.

2️⃣ Advantages:
- Less boilerplate code compared to controlled components.
- Useful when you don’t need to monitor every change.
- Ideal for simple forms or when integrating with non-React libraries.

3️⃣ Real-life Analogies:

- Global Analogy: A car where the driver controls the speed independently, and the dashboard only reads the speed when needed.
- India-specific Analogy: A local train where passengers manage their own luggage, and staff checks it occasionally.
- Web Analogy: A file input where React doesn’t track the selected file until form submission.

4️⃣ Coding Example:

function FileUpload() {
    const fileInputRef = React.useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Selected file: " + fileInputRef.current.files[0].name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="file" 
                ref={fileInputRef}   // uncontrolled, DOM manages value
            />
            <button type="submit">Upload</button>
        </form>
    );
}

// In this example:
// - The input value is not stored in React state.
// - React accesses the value only via the ref when the form is submitted.
// - No state updates occur on every change, making it "uncontrolled".

5️⃣ Possible Follow-Up Questions & Answers:

Q1: When should you use uncontrolled components?  
A1: For simple forms, file inputs, or when you don’t need to track every change in state.

Q2: Can uncontrolled components be converted to controlled?  
A2: Yes, by adding a state variable and onChange handler to manage the input value.

Q3: Are uncontrolled components less performant?  
A3: They can be more performant for large forms since React doesn’t re-render on every change.

Q4: How do you reset an uncontrolled component?  
A4: By manually setting the DOM element value or using the ref to clear it.

Q5: Can you combine controlled and uncontrolled components in the same form?  
A5: Yes, but it’s better to avoid mixing them for clarity and maintainability.
*/
