/* 
54_promise_states.js – Interview-Ready Answer

"A Promise in JavaScript can be in one of three states, which determine 
how it behaves and how you can handle its outcome."

1️⃣ Key Points to Highlight

1. Promise States:
- Pending: Initial state; neither fulfilled nor rejected.
- Fulfilled: Operation completed successfully; .then() executes.
- Rejected: Operation failed; .catch() executes.

2. Transition Rules:
- A promise can only transition from pending → fulfilled or pending → rejected.
- Once fulfilled or rejected, the state is immutable (cannot change again).

3. Examples

// Pending state example
const pendingPromise = new Promise((resolve, reject) => {
    // stays pending until resolve or reject is called
});

// Fulfilled state example
const fulfilledPromise = new Promise((resolve) => {
    setTimeout(() => resolve("Success!"), 1000);
});

fulfilledPromise.then(result => console.log(result)); // "Success!" after 1s

// Rejected state example
const rejectedPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject("Error!"), 1000);
});

rejectedPromise.catch(error => console.error(error)); // "Error!" after 1s

4️⃣ Real-Life Analogies

- Global Analogy: Promise = ordering food; pending = order placed, fulfilled = delivered, rejected = cancelled.
- India-specific Analogy: Promise = booking a cab; pending = waiting for driver, fulfilled = cab arrives, rejected = cab cancelled.
- Web Analogy: API request returns Promise; pending = waiting for response, fulfilled = response received, rejected = error occurred.

5️⃣ Code Explanation

- Pending is initial state; no value yet.
- Fulfilled executes .then() with resolved value.
- Rejected executes .catch() with error.
- State transition is one-way; once settled, it cannot change.

6️⃣ Example / Usage

const asyncTask = () => new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        if(success) resolve("Task completed");
        else reject("Task failed");
    }, 1000);
});

asyncTask()
  .then(msg => console.log("Fulfilled:", msg))
  .catch(err => console.error("Rejected:", err));

7️⃣ Follow-Up Interview Questions

Q1: Can a promise change state multiple times?  
A1: No, once fulfilled or rejected, it is immutable.

Q2: What is the default state of a Promise?  
A2: Pending.

Q3: How do you handle errors in Promises?  
A3: Using .catch() or the second parameter of .then().

Q4: Can a rejected Promise be handled like a fulfilled one?  
A4: No, rejected Promises must be handled with .catch().

Q5: What happens if you don’t handle a rejected Promise?  
A5: It results in an unhandled promise rejection warning/error.
*/
