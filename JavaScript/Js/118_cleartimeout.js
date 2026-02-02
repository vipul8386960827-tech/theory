/*
118_cleartimeout.js – Interview-Ready Answer

"In JavaScript, clearTimeout() is used to cancel a timeout previously set 
by setTimeout(), preventing the associated callback from executing."

Key Points:

1️⃣ Definition:
- setTimeout() schedules a function to run after a specified delay.
- clearTimeout(timeoutId) cancels the scheduled function.
- timeoutId is the value returned by setTimeout().

2️⃣ Syntax Example:

// Schedule a function to run after 3 seconds
const timeoutId = setTimeout(() => {
    console.log("This will not run if cleared");
}, 3000);

// Cancel the timeout before it executes
clearTimeout(timeoutId);

console.log("Timeout cleared successfully");

3️⃣ Real-Life Analogies:

Global Analogy: Setting an alarm but turning it off before it rings.
India-specific Analogy: Booking a cab but canceling it before pickup.
Web Analogy: Scheduling an API call to run later, then deciding to cancel it.

4️⃣ Code Explanation:

- setTimeout returns a unique ID representing the scheduled action.
- Passing this ID to clearTimeout stops the callback from executing.
- Useful for controlling delayed actions, avoiding unnecessary operations.

5️⃣ Example / Usage:

// Example: Auto-saving draft after delay
let saveTimeout = setTimeout(() => {
    console.log("Auto-saving draft...");
}, 5000);

// User types more, cancel previous save
clearTimeout(saveTimeout);

// Schedule new save after latest input
saveTimeout = setTimeout(() => {
    console.log("Auto-saving draft after latest input...");
}, 5000);

6️⃣ Follow-Up Interview Questions:

Q1: Can clearTimeout cancel multiple timeouts?  
A1: No, each setTimeout returns a separate ID; call clearTimeout on each one individually.

Q2: What happens if clearTimeout is called with an invalid ID?  
A2: Nothing happens; no error is thrown.

Q3: Difference between clearTimeout and clearInterval?  
A3: clearTimeout cancels a single delayed execution; clearInterval stops repeated execution.

Q4: Can setTimeout with 0ms delay be canceled?  
A4: Yes, clearTimeout can cancel it if called before the callback executes.

Q5: Can clearTimeout be called after the function has executed?  
A5: No effect; the callback has already run.
*/
