/* 11_promise_all_race_allsettled.js

=====================================================
Promise.all vs Promise.race vs Promise.allSettled
=====================================================

Definition (What I should say in the interview):
- "All three take an array of Promises and run them concurrently, they differ in when they settle.
   **Promise.all** resolves with all values once every Promise fulfills, but rejects immediately
   on the first rejection. **Promise.allSettled** waits for all of them and never rejects - it
   gives me a status and value or reason for each. **Promise.race** settles as soon as the first
   Promise settles, whether that is success or failure, which is handy for timeouts."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Method        | Resolves when              | Rejects when               | Result                     |
|---------------|----------------------------|----------------------------|----------------------------|
| all           | all fulfill                | first rejection (fail fast)| array of values (in order) |
| allSettled    | all settle                 | never                      | [{status, value/reason}]   |
| race          | first settles (fulfilled)  | first settles (rejected)   | that single value/reason   |

-----------------------------------------------------
Example
-----------------------------------------------------
const wait = (ms, val, fail) => new Promise((res, rej) =>
  setTimeout(() => (fail ? rej(new Error(val)) : res(val)), ms));

(async () => {
  console.log(await Promise.all([wait(100, 'a'), wait(50, 'b')]));
  // [ 'a', 'b' ]   (input order, not finish order)

  try { await Promise.all([wait(100, 'a'), wait(50, 'boom', true)]); }
  catch (e) { console.log('all rejected:', e.message); }        // all rejected: boom

  const r = await Promise.allSettled([wait(10, 'ok'), wait(20, 'bad', true)]);
  console.log(r.map((x) => x.status));                          // [ 'fulfilled', 'rejected' ]

  // race as a timeout
  try { await Promise.race([wait(500, 'slow api'), wait(100, 'timeout', true)]); }
  catch (e) { console.log(e.message); }                         // timeout
})();

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Promise.all does NOT cancel the other Promises on failure; they keep running.
- Use allSettled for "best effort" work like sending notifications to many users.
- Empty array: all/allSettled resolve with [], race stays pending forever.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does Promise.all run things in parallel?
A1: It runs them concurrently - the operations were already started; all just waits on them.

Q2: How to limit concurrency with Promise.all for 10,000 items?
A2: Process in batches or use a library like p-limit, otherwise you may overload the DB or API.

Q3: What is a real use case for race?
A3: Timeouts - racing a request against a timer that rejects.
*/
