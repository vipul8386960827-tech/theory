/* 46_conditional_rendering_in_react.js */
/*
Conditional Rendering in React – Interview-Ready Answer

Definition:
Conditional rendering in React means rendering UI elements dynamically
based on conditions, just like using if/else in JavaScript.
It allows us to show different components or content depending
on the state or props.

------------------------------------------------
Key Points:
- React supports multiple ways to handle conditional rendering:
  1. if/else statements
  2. Ternary operator (?:)
  3. Logical AND (&&)
  4. Switch statements
  5. Immediately Invoked Functions (IIFE)

------------------------------------------------
Examples:

// 1️⃣ if/else approach
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome Back!</h1>;
  } else {
    return <h1>Please Sign In</h1>;
  }
}

// 2️⃣ Ternary operator
function Greeting({ isLoggedIn }) {
  return (
    <h1>{isLoggedIn ? "Welcome Back!" : "Please Sign In"}</h1>
  );
}

// 3️⃣ Logical AND (short-circuit)
function Notification({ hasMessages }) {
  return (
    <div>
      {hasMessages && <p>You have new messages!</p>}
    </div>
  );
}

// 4️⃣ Switch statement
function Status({ status }) {
  switch (status) {
    case "loading":
      return <p>Loading...</p>;
    case "success":
      return <p>Data loaded successfully!</p>;
    case "error":
      return <p>Error fetching data.</p>;
    default:
      return <p>Idle</p>;
  }
}

------------------------------------------------
Real-Life Analogy:
- Think of it like a movie theater 🎥:
  - If you have a ticket → you get inside.
  - If not → you are stopped at the gate.
  Just like React shows different UI depending on conditions.

------------------------------------------------
Possible Follow-Up Questions with Answers:

Q1: Which conditional rendering technique is most readable?
A1: For small checks, ternary or && operator is fine.
    For complex logic, if/else or switch is more readable.

Q2: Can we use functions for conditional rendering?
A2: Yes, we can move logic into helper functions to keep JSX clean.

Q3: What is the performance impact of conditional rendering?
A3: Minimal. React only renders the necessary parts
    based on the condition.

Q4: How do you handle multiple complex conditions?
A4: Use switch statements or separate smaller components.

Q5: Can hooks be used for conditional rendering?
A5: Hooks themselves cannot be used conditionally,
    but the data/state from hooks can decide what gets rendered.
*/
