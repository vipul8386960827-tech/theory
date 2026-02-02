/* 
62_promise_rules.js – Interview-Ready Answer

"Promises in JavaScript follow certain rules that define their behavior 
and how they transition between states."

1️⃣ Key Points to Highlight

1. Promise States:
- Pending: Initial state; neither fulfilled nor rejected.
- Fulfilled: Operation completed successfully; calls .then().
- Rejected: Operation failed; calls .catch().

2. Rules:

- A promise can only transition from pending → fulfilled or pending → rejected.
- Once a promise is fulfilled or rejected, its state is immutable.
- .then() and .catch() always return a new promise, enabling chaining.
- Multiple .then() handlers can be attached; all will execute when resolved.
- Rejected promises propagate down the chain until caught.

3. Examples

const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Success"), 1000);
});

// Chaining example
promise
  .then(res => {
      console.log(res); // "Success"
      return "Next step";
  })
  .then(res => console.log(res)); // "Next step"

const rejectedPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject("Error occurred"), 1000);
});

rejectedPromise
  .catch(err => console.error(err)) // "Error occurred"
  .then(() => console.log("Recovered from error"));

4️⃣ Real-Life Analogies

- Global Analogy: Promise = online order; pending = order placed, fulfilled = delivered, rejected = cancelled.
- India-specific Analogy: Promise = cab booking; pending = waiting, fulfilled = cab arrives, rejected = cab cancelled.
- Web Analogy: API call returns Promise; pending = waiting response, fulfilled = data received, rejected = error.

5. Code Explanation

- Promises have strict state transitions.
- Once settled, cannot change state.
- Enables predictable async code and chaining.
- catch() propagates errors and allows recovery.

6. Example / Usage

const asyncTask = () => new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        if(success) resolve("Task done");
        else reject("Task failed");
    }, 1000);
});

asyncTask()
  .then(msg => console.log("Fulfilled:", msg))
  .catch(err => console.error("Rejected:", err));

7️⃣ Follow-Up Interview Questions

Q1: Can a fulfilled Promise become rejected later?  
A1: No, a settled promise cannot change its state.

Q2: Can multiple .then() handlers be attached?  
A2: Yes, all attached handlers execute once the promise is fulfilled.

Q3: What is the default state of a new Promise?  
A3: Pending.

Q4: How do errors propagate in promise chains?  
A4: Unhandled rejections propagate down until caught by .catch().

Q5: What happens if you don’t attach a .catch() to a rejected Promise?  
A5: Unhandled Promise rejection warning occurs.
*/
