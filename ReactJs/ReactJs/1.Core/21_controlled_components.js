/* 21_controlled_components.js */
/*
Controlled Components in React – Interview-Ready Answer:

"In React, a controlled component is a form element (like input, textarea, select) 
whose value is controlled by React state. Instead of letting the DOM manage its own state, 
the value of the component is driven by React through props, and changes are handled via 
onChange handlers."

Key Points:

1️⃣ Value Controlled by React:
- The form element's value is set via a state variable.
- Any user input updates the state via an onChange event.
- React becomes the single source of truth for the input value.

2️⃣ Advantages:
- Easier to validate and manipulate input data.
- Enables conditional disabling, formatting, or transforming input.
- Keeps form state predictable and in sync with the component's state.

3️⃣ Real-life Analogies:

- Global Analogy: A driver following GPS instructions precisely rather than choosing their own route.
- India-specific Analogy: A train strictly following the timetable and signals instead of each driver deciding speed independently.
- Web Analogy: A search input whose value is always in React state; typing updates the state, and the state controls the input value.

4️⃣ Coding Example:

function NameForm() {
    const [name, setName] = React.useState("");

    const handleChange = (e) => {
        setName(e.target.value); // updates state on user input
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Submitted Name: " + name); // uses React state
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name}           // controlled by React state
                onChange={handleChange} 
                placeholder="Enter your name"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

// In this example:
// - The input value is fully controlled by React state (name).
// - Typing updates the state, and React updates the input.
// - No uncontrolled DOM value exists; React is the single source of truth.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: What is the difference between controlled and uncontrolled components?  
A1: Controlled components are driven by React state, while uncontrolled components maintain their own internal DOM state.

Q2: When should you use controlled components?  
A2: Use them when you need to validate, manipulate, or track form data in React state.

Q3: Can controlled components handle multiple inputs?  
A3: Yes, by using state objects or separate state variables for each input.

Q4: What are potential drawbacks?  
A4: May require more boilerplate code for larger forms, and frequent updates can impact performance if not optimized.

Q5: How do you reset a controlled component?  
A5: Reset the state variable controlling the input value, which automatically updates the input.
*/
