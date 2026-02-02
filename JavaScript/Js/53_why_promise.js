/* 
53_why_promise.js – Interview-Ready Answer

"In JavaScript, Promises are used to handle asynchronous operations more 
cleanly than traditional callbacks, providing better readability, error 
handling, and composability."

1️⃣ Key Points to Highlight

1. Why Promises:
- Avoid callback hell (nested callbacks) for better code structure.
- Provide unified error handling via .catch().
- Allow chaining of async operations in a sequential manner.
- Integrate with modern async/await syntax for cleaner code.

2. Common Use Cases:
- Fetching data from APIs
- Reading files asynchronously
- Delayed operations (setTimeout wrapped in Promise)
- Any async operation that may succeed or fail

3. Examples

- Callback hell example:
setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
        console.log("Step 2");
        setTimeout(() => {
            console.log("Step 3");
        }, 1000);
    }, 1000);
}, 1000);

- Using Promise:
const step1 = () => new Promise(resolve => setTimeout(() => resolve("Step 1"), 1000));
const step2 = () => new Promise(resolve => setTimeout(() => resolve("Step 2"), 1000));
const step3 = () => new Promise(resolve => setTimeout(() => resolve("Step 3"), 1000));

step1()
  .then(msg => { console.log(msg); return step2(); })
  .then(msg => { console.log(msg); return step3(); })
  .then(msg => console.log(msg));

4️⃣ Real-Life Analogies

- Global Analogy: Promise = ordering food online; you get a notification when it arrives instead of constantly checking.
- India-specific Analogy: Promise = booking a cab; cab arrives (fulfilled) or is cancelled (rejected).
- Web Analogy: API call returns a Promise; then handles response, catch handles errors.

5️⃣ Code Explanation

- Promises wrap async logic and allow sequential execution via .then() chaining.
- .catch() centralizes error handling.
- Makes code easier to read, maintain, and debug.

6️⃣ Example / Usage

const fetchUser = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if(success) resolve({ id: 1, name: "Kaizer" });
        else reject("Failed to fetch user");
    }, 1000);
});

fetchUser()
  .then(user => console.log("User:", user))
  .catch(error => console.error("Error:", error));

7️⃣ Follow-Up Interview Questions

Q1: How does Promise improve code over callbacks?  
A1: Reduces nested callbacks, improves readability and maintainability.

Q2: Can Promises be used with async/await?  
A2: Yes, async/await is syntactic sugar over Promises.

Q3: What happens if a Promise is neither resolved nor rejected?  
A3: It remains pending indefinitely.

Q4: Difference between Promise.resolve() and new Promise()?  
A4: Promise.resolve() returns an already resolved Promise; new Promise() defines async logic.

Q5: Can you chain multiple async tasks with Promises?  
A5: Yes, using .then() to chain sequential tasks.
*/
