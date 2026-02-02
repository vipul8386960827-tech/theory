/* 
64_promise_chaining.js – Interview-Ready Answer

"Promise chaining allows multiple asynchronous operations to be executed 
in sequence, where each subsequent operation waits for the previous 
promise to resolve or reject."

1️⃣ Key Points to Highlight

1. Definition:
- Attaching multiple .then() handlers to a promise to perform sequential operations.
- Each .then() returns a new promise for the next step.
- Errors can be handled with a single .catch() at the end.

2. Benefits:
- Avoids callback hell.
- Improves readability and maintainability.
- Supports sequential async flows.

3. Syntax Example

const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(5), 1000);
});

promise
  .then(result => {
      console.log("Step 1:", result); // 5
      return result * 2;
  })
  .then(result => {
      console.log("Step 2:", result); // 10
      return result + 3;
  })
  .then(result => {
      console.log("Step 3:", result); // 13
  })
  .catch(err => console.error("Error:", err));

4. Real-Life Analogies

- Global Analogy: Promise chaining = finishing one task, then passing result to next task in order.
- India-specific Analogy: Paying at a canteen in steps: order → pay → receive food sequentially.
- Web Analogy: Sequential API calls: login → fetch user data → fetch user posts.

5. Code Explanation

- Each .then() waits for the previous promise to resolve.
- Returning a value from .then() passes it to the next .then().
- Errors propagate down the chain to the .catch() handler.

6. Example / Usage

const fetchNumber = () => new Promise(resolve => setTimeout(() => resolve(2), 500));

fetchNumber()
  .then(num => {
      console.log("Initial number:", num); // 2
      return num * 3;
  })
  .then(num => {
      console.log("After multiplication:", num); // 6
      return num - 1;
  })
  .then(num => console.log("Final result:", num)) // 5
  .catch(err => console.error("Promise error:", err));

7️⃣ Follow-Up Interview Questions

Q1: How does promise chaining help avoid callback hell?  
A1: By allowing sequential async tasks in a linear, readable manner instead of nested callbacks.

Q2: Can errors in intermediate .then() blocks be caught?  
A2: Yes, any error in the chain propagates to the nearest .catch().

Q3: Does each .then() return a promise?  
A3: Yes, enabling chaining.

Q4: Can you mix synchronous and asynchronous operations in a chain?  
A4: Yes, synchronous returns are automatically wrapped in resolved promises.

Q5: How do you stop a promise chain early?  
A5: By throwing an error or returning a rejected promise, which will jump to .catch().
*/
