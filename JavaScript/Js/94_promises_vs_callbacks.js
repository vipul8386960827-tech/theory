/*
94_promises_vs_callbacks.js – Interview-Ready Answer

"In JavaScript, both callbacks and promises are used to handle asynchronous 
operations, but they differ in syntax, readability, and error handling."

Key Points:

1️⃣ Callbacks:
- Functions passed as arguments to be executed after an async operation.
- Can lead to "callback hell" if nested deeply.
- Error handling requires explicit checks.

Example:
function fetchData(callback) {
    setTimeout(() => {
        const data = "Sample Data";
        callback(null, data); // first param for error
    }, 1000);
}

fetchData((err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});

2️⃣ Promises:
- Objects representing future completion or failure of async operations.
- Supports chaining via .then() and .catch().
- Avoids nested callbacks, easier to read and maintain.

Example:
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "Sample Data";
            resolve(data);
        }, 1000);
    });
}

fetchDataPromise()
    .then(data => console.log(data))
    .catch(err => console.error(err));

3️⃣ Real-Life Analogies:

Global Analogy:
- Callback: Calling a friend and waiting for them to reply before next step.
- Promise: Friend gives a guarantee to deliver the result; can attach actions once fulfilled.

India-specific Analogy:
- Callback: Waiting in line at passport office; each step depends on previous completion.
- Promise: Online application submission with guaranteed response; can track status.

Web Analogy:
- Callback: Ajax call with function passed to handle response.
- Promise: fetch() returns a promise, chain .then() to handle data.

4️⃣ Code Explanation:

- Callbacks require manually handling errors and nested operations.
- Promises provide built-in chaining and error propagation.
- Promises improve readability and maintainability for multiple async operations.

5️⃣ Example / Usage:

// Callback example
setTimeout(() => console.log("Callback executed"), 500);

// Promise example
new Promise(resolve => setTimeout(() => resolve("Promise resolved"), 500))
    .then(console.log);

6️⃣ Follow-Up Interview Questions:

Q1: Can promises replace callbacks entirely?  
A1: Yes, most async operations can use promises, though some APIs are callback-based.

Q2: Difference between resolve and reject in promises?  
A2: resolve = successful completion, reject = error/failure.

Q3: Can promises be chained?  
A3: Yes, .then() can chain multiple async steps; errors propagate to .catch().

Q4: What is async/await?  
A4: Syntactic sugar over promises for more readable async code.

Q5: How to convert a callback-based function to a promise?  
A5: Wrap the function inside new Promise((resolve, reject) => {...}).
*/
