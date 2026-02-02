/* 
65_promise_all.js – Interview-Ready Answer

"Promise.all is a method in JavaScript that takes an array (or iterable) 
of promises and returns a single promise that resolves when all promises 
resolve, or rejects if any promise rejects."

1️⃣ Key Points to Highlight

1. Definition:
- Accepts an array of promises.
- Resolves with an array of results in the same order.
- Rejects immediately if any promise in the array rejects.

2. Use Cases:
- Running multiple async tasks in parallel.
- Waiting for all tasks to complete before proceeding.
- Aggregating results from multiple API calls.

3. Syntax Example

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, "foo"));

Promise.all([promise1, promise2, promise3])
  .then(values => console.log(values)) // [3, 42, "foo"]
  .catch(err => console.error("Error:", err));

4. Real-Life Analogies

- Global Analogy: Promise.all = waiting for all friends to arrive before starting a trip.
- India-specific Analogy: Promise.all = waiting for all participants to complete registration before event begins.
- Web Analogy: Fetching multiple API endpoints simultaneously and using all results together.

5. Code Explanation

- promise1 resolves immediately, promise2 is a value (treated as resolved), promise3 resolves after 1s.
- Promise.all waits for all to complete.
- If any promise rejects, the returned promise rejects instantly.

6. Example / Usage

const apiCall1 = fetch("/api/user");
const apiCall2 = fetch("/api/posts");
const apiCall3 = fetch("/api/comments");

Promise.all([apiCall1, apiCall2, apiCall3])
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(data => console.log("All API data:", data))
  .catch(err => console.error("Error fetching APIs:", err));

7️⃣ Follow-Up Interview Questions

Q1: What happens if one promise rejects in Promise.all?  
A1: The returned promise rejects immediately with that error.

Q2: Does Promise.all preserve order?  
A2: Yes, the resolved values are in the same order as the input array.

Q3: Can Promise.all accept non-promise values?  
A3: Yes, non-promise values are treated as resolved promises.

Q4: How is Promise.all different from Promise.race?  
A4: Promise.all waits for all promises to settle; Promise.race resolves/rejects as soon as the first promise settles.

Q5: What if the input array is empty?  
A5: Returns a promise resolved with an empty array.
*/
