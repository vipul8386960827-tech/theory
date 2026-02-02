/* 
52_promise.js – Interview-Ready Answer

"In JavaScript, a Promise represents the eventual completion (or failure) 
of an asynchronous operation and its resulting value."

1️⃣ Key Points to Highlight

1. Definition:
- Promise is an object representing the eventual outcome of async operations.
- Has three states:
  - Pending: initial state, neither fulfilled nor rejected
  - Fulfilled: operation completed successfully
  - Rejected: operation failed

2. Syntax:

const promise = new Promise((resolve, reject) => {
    // async operation
    if(success) resolve(result);
    else reject(error);
});

3. Examples

// Basic example
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if(success) resolve("Data loaded");
        else reject("Error occurred");
    }, 1000);
});

promise
    .then(data => console.log(data)) // "Data loaded"
    .catch(error => console.error(error));

// Promise chaining
const promise2 = new Promise((resolve) => resolve(5));
promise2
    .then(val => val * 2)
    .then(val => val + 3)
    .then(val => console.log(val)); // 13

4️⃣ Real-Life Analogies

- Global Analogy: Promise = ordering food online; pending = waiting, fulfilled = delivered, rejected = cancelled.
- India-specific Analogy: Promise = booking a cab; pending = cab on its way, fulfilled = cab arrives, rejected = cab cancelled.
- Web Analogy: API call returns Promise; then handles success, catch handles error.

5️⃣ Code Explanation

- Promise constructor takes a function with resolve and reject.
- `resolve(value)` moves promise to fulfilled; `reject(error)` moves it to rejected.
- `.then()` handles fulfillment; `.catch()` handles rejection.
- Can chain multiple `.then()` for sequential async processing.

6️⃣ Example / Usage

/*
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if(success) resolve({ id: 1, name: "Kaizer" });
        else reject("Failed to fetch data");
    }, 1000);
});

fetchData
    .then(user => console.log("User:", user))
    .catch(error => console.error("Error:", error));

7️⃣ Follow-Up Interview Questions

Q1: Difference between callback and Promise?  
A1: Promise avoids callback hell, more readable and chainable.

Q2: Can a Promise be in multiple states?  
A2: No, it transitions once from pending to fulfilled or rejected.

Q3: What is Promise.all()?  
A3: Waits for all promises to fulfill, rejects if any fail.

Q4: What is Promise.race()?  
A4: Resolves/rejects as soon as the first promise settles.

Q5: Difference between .then(success, failure) and .then().catch()?  
A5: .catch() handles errors in the entire chain, safer for chaining.
*/
