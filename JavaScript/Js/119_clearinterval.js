/* 119_clearinterval.js */
/*
119_clearinterval.js – Interview-Ready Answer

"In JavaScript, clearInterval() is used to stop a repeated action previously 
set up using setInterval(), preventing further execution of the callback."

Key Points:

1️⃣ Definition:
- setInterval() schedules a function to run repeatedly at specified intervals.
- clearInterval(intervalId) cancels the repeated execution.
- intervalId is the value returned by setInterval().

2️⃣ Syntax Example:

// Schedule a function to run every 2 seconds
const intervalId = setInterval(() => {
    console.log("This will stop if cleared");
}, 2000);

// Cancel the interval after 5 seconds
setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval cleared successfully");
}, 5000);

3️⃣ Real-Life Analogies:

Global Analogy: Repeated alarm every morning, then deciding to stop it permanently.
India-specific Analogy: Watering plants every day but stopping it temporarily.
Web Analogy: Polling API every few seconds and stopping it when no longer needed.

4️⃣ Code Explanation:

- setInterval returns a unique ID representing the scheduled repeated action.
- Passing this ID to clearInterval stops all future executions.
- Useful for controlling repeated tasks and avoiding unnecessary processing.

5️⃣ Example / Usage:

// Example: Updating clock every second
const clockInterval = setInterval(() => {
    const now = new Date();
    console.log(`Time: ${now.toLocaleTimeString()}`);
}, 1000);

// Stop clock after 10 seconds
setTimeout(() => {
    clearInterval(clockInterval);
    console.log("Clock stopped");
}, 10000);

6️⃣ Follow-Up Interview Questions:

Q1: Can clearInterval cancel multiple intervals?  
A1: No, each setInterval returns a separate ID; call clearInterval on each individually.

Q2: What happens if clearInterval is called with an invalid ID?  
A2: Nothing happens; no error is thrown.

Q3: Difference between clearTimeout and clearInterval?  
A3: clearTimeout cancels a single delayed execution; clearInterval stops repeated execution.

Q4: Can setInterval with 0ms delay be canceled?  
A4: Yes, clearInterval can cancel it if called before the first callback executes.

Q5: Can clearInterval be called after the function has executed several times?  
A5: Yes, it stops all future executions but does not affect past executions.
*/
