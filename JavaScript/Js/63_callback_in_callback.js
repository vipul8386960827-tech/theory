/* 
63_callback_in_callback.js – Interview-Ready Answer

"Callback in callback refers to nesting one callback function inside another, 
often used for sequential asynchronous operations. Excessive nesting leads 
to callback hell."

1️⃣ Key Points to Highlight

1. Definition:
- A function passed as an argument to another function, which itself calls 
  another function that also uses a callback.

2. Example (Nested Callbacks):

function step1(callback) {
    setTimeout(() => {
        console.log("Step 1");
        callback();
    }, 1000);
}

function step2(callback) {
    setTimeout(() => {
        console.log("Step 2");
        callback();
    }, 1000);
}

function step3() {
    setTimeout(() => {
        console.log("Step 3");
    }, 1000);
}

// Nested callbacks
step1(() => {
    step2(() => {
        step3();
    });
});

3. Problems:
- Deep nesting makes code hard to read.
- Difficult to handle errors.
- Hard to maintain and debug.

4. Solutions:
- Use Promises to flatten nested callbacks.
- Use async/await for sequential async operations.
- Break tasks into smaller reusable functions.

5. Real-Life Analogies

- Global Analogy: Asking multiple people to complete tasks sequentially, each waiting for the previous one.
- India-specific Analogy: Asking friends to deliver messages one after another.
- Web Analogy: Nested AJAX calls for sequential API requests.

6. Code Explanation

- Each function executes asynchronously after a delay.
- Callback ensures the next function runs only after the previous completes.
- Shows why nesting can quickly become complex with more steps.

7. Example / Usage with Promises (Refactored):

const step1Promise = () => new Promise(resolve => setTimeout(() => resolve("Step 1"), 1000));
const step2Promise = () => new Promise(resolve => setTimeout(() => resolve("Step 2"), 1000));
const step3Promise = () => new Promise(resolve => setTimeout(() => resolve("Step 3"), 1000));

step1Promise()
  .then(msg => { console.log(msg); return step2Promise(); })
  .then(msg => { console.log(msg); return step3Promise(); })
  .then(msg => console.log(msg));

8️⃣ Follow-Up Interview Questions

Q1: What is callback in callback?  
A1: Nested callbacks for sequential async operations.

Q2: Why is it problematic?  
A2: Leads to callback hell: unreadable, error-prone, and hard to maintain.

Q3: How can we avoid nested callbacks?  
A3: Using Promises or async/await.

Q4: Can arrow functions be used as callbacks?  
A4: Yes, commonly used to make callbacks concise.

Q5: Are all nested callbacks asynchronous?  
A5: Usually yes, but synchronous functions can also be nested as callbacks.
*/
