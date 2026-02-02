/* 
66_promise_race.js – Interview-Ready Answer

"Promise.race is a method in JavaScript that takes an array (or iterable) 
of promises and returns a single promise that settles as soon as the 
first promise in the array resolves or rejects."

1️⃣ Key Points to Highlight

1. Definition:
- Accepts an array of promises.
- Resolves or rejects with the value of the first settled promise.
- Other promises continue executing but their results are ignored.

2. Use Cases:
- Implementing timeouts for async operations.
- Getting the fastest response among multiple API calls.
- Competitive async tasks where only the first result matters.

3. Syntax Example

const promise1 = new Promise(resolve => setTimeout(resolve, 500, "one"));
const promise2 = new Promise(resolve => setTimeout(resolve, 100, "two"));

Promise.race([promise1, promise2])
  .then(value => console.log("First settled:", value)) // "two"
  .catch(err => console.error("Error:", err));

4. Real-Life Analogies

- Global Analogy: Promise.race = racing friends to complete a task; first finisher wins.
- India-specific Analogy: Promise.race = fastest auto-rickshaw to pick you up.
- Web Analogy: Fetching data from multiple servers and using whichever responds first.

5. Code Explanation

- promise2 resolves first after 100ms; promise1 resolves after 500ms.
- Promise.race resolves immediately with promise2’s value.
- Other promises continue but their results are ignored in the race.

6. Example / Usage

const apiCall1 = fetch("/api/server1");
const apiCall2 = fetch("/api/server2");

Promise.race([apiCall1, apiCall2])
  .then(response => console.log("First server response:", response))
  .catch(err => console.error("Error:", err));

7️⃣ Follow-Up Interview Questions

Q1: How is Promise.race different from Promise.all?  
A1: Promise.race resolves/rejects with the first settled promise; Promise.all waits for all promises.

Q2: Does Promise.race cancel remaining promises?  
A2: No, remaining promises continue executing; only the first result is used.

Q3: Can Promise.race be used for timeouts?  
A3: Yes, by racing a timeout promise against an async operation.

Q4: What happens if the first promise rejects?  
A4: The returned promise rejects immediately with that error.

Q5: Can non-promise values be used in Promise.race?  
A5: Yes, they are treated as resolved promises.
*/
