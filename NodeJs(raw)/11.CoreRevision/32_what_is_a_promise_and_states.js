/* 19_what_is_a_promise_and_states.js

=====================================================
What is a Promise? (and its States)
=====================================================

Definition (What I should say in the interview):
- "A Promise is an object that represents the **eventual result of an async operation**. It is
   in one of three states: **pending** at the start, then either **fulfilled** with a value or
   **rejected** with a reason. Once it moves out of pending it is **settled** and can never change
   again. I consume it with .then, .catch, .finally or await, and the callbacks always run
   asynchronously as microtasks, even if the Promise is already settled."

-----------------------------------------------------
States
-----------------------------------------------------
            resolve(value)
  pending -----------------> fulfilled  (value)
     |
     +---------------------> rejected   (reason)
             reject(err) or throw inside executor

- fulfilled and rejected together are called "settled".
- Calling resolve/reject again after settling is silently ignored.

-----------------------------------------------------
Example
-----------------------------------------------------
const p = new Promise((resolve, reject) => {
  console.log('1. executor runs immediately');
  setTimeout(() => {
    resolve('data');
    reject(new Error('ignored'));             // no effect, already settled
  }, 100);
});

console.log('2. state now: pending');

p.then((v) => console.log('3. fulfilled with', v))
 .catch((e) => console.log('never runs', e))
 .finally(() => console.log('4. finally always runs'));

// Output:
// 1. executor runs immediately
// 2. state now: pending
// 3. fulfilled with data
// 4. finally always runs

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- A throw inside the executor rejects the Promise automatically.
- resolve(anotherPromise) makes it "follow" that Promise - this is why "resolved" is not the same as "fulfilled".
- Since Node 15, an unhandled rejection crashes the process by default -> always add .catch or try/catch.
- You can see the state with util.inspect(p) -> Promise { 'data' } / Promise { <pending> }.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between resolved and fulfilled?
A1: Resolved means its fate is locked in (it may follow another pending Promise); fulfilled means it has a value.

Q2: Does .then run synchronously if the Promise is already fulfilled?
A2: No, it is always queued as a microtask.

Q3: What are the advantages over callbacks?
A3: Chaining, single error path, composition with Promise.all, and async/await support.
*/
