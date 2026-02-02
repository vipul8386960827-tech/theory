/*
Lifting State Up in React – Interview-Ready Answer:

"Lifting state up is a React pattern used when multiple components need to share the same 
state. Instead of each component maintaining its own state, the state is moved to the nearest 
common parent. This way, the parent becomes the single source of truth, and children receive 
the state and setter functions via props."

Key Points:

1️⃣ Purpose:
- Ensures data consistency between multiple components.
- Avoids duplicating state across components.
- Provides a single source of truth for shared data.

2️⃣ How it Works:
- Identify the closest common ancestor of the components needing shared state.
- Move the state and its setter function to that ancestor.
- Pass the state and setter to child components via props.
- Children update the state using the setter function provided by the parent.

3️⃣ Real-life Analogies:

- Global Analogy: A manager keeps a master schedule for a team; team members update and read 
  from it to stay in sync.
- India-specific Analogy: Railway station master controlling train timings for all platforms; 
  each platform updates or reads schedule from the master to avoid conflicts.
- Web Analogy: Two input fields for Celsius and Fahrenheit temperatures; the parent maintains 
  the temperature state, and both inputs receive it via props.

4️⃣ Coding Example:

function TemperatureConverter() {
    const [temperature, setTemperature] = React.useState(0);

    return (
        <div>
            <CelsiusInput temp={temperature} onTempChange={setTemperature} />
            <FahrenheitInput temp={temperature} onTempChange={setTemperature} />
        </div>
    );
}

function CelsiusInput({ temp, onTempChange }) {
    return (
        <input 
            value={temp} 
            onChange={(e) => onTempChange(Number(e.target.value))} 
            placeholder="Celsius"
        />
    );
}

function FahrenheitInput({ temp, onTempChange }) {
    const fahrenheit = (temp * 9/5) + 32;
    return (
        <input 
            value={fahrenheit} 
            onChange={(e) => onTempChange((Number(e.target.value) - 32) * 5/9)} 
            placeholder="Fahrenheit"
        />
    );
}

// Explanation:
// - Temperature state is held in the parent (TemperatureConverter).
// - Both inputs receive state and setter via props.
// - Updating one input updates the shared state, reflecting changes in the other input.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: When should you lift state up?  
A1: When multiple components need to share or synchronize the same piece of state.

Q2: Can state be lifted across unrelated components?  
A2: No, lifting requires a common ancestor. For unrelated components, use Context or state 
   management libraries.

Q3: What are alternatives to lifting state up for global data?  
A3: React Context, Redux, Zustand, Recoil, or other state management solutions.

Q4: Does lifting state up affect performance?  
A4: It can increase re-renders if the parent state changes frequently. Memoization can help.

Q5: Can state be lifted multiple levels up?  
A5: Yes, the state should be lifted to the nearest common ancestor that covers all dependent 
   components.
*/
