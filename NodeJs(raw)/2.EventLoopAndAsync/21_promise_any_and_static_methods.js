/* 21_promise_any_and_static_methods.js

=====================================================
Promise.any and Other Static Methods
=====================================================

Definition (What I should say in the interview):
- "Promise.any takes several Promises and resolves with the **first one that fulfills**, ignoring
   rejections. Only if **all of them reject** does it reject, with an **AggregateError** that
   holds every reason in its errors array. It is the opposite of Promise.all in a sense - all
   fails fast on an error, any succeeds fast on a success. I use it for things like trying
   multiple mirrors or replicas and taking whichever answers first successfully."

-----------------------------------------------------
Static Methods Overview
-----------------------------------------------------
| Method                   | Purpose                                                   |
|--------------------------|-----------------------------------------------------------|
| Promise.resolve(v)       | wrap a value in a fulfilled Promise (or return v if it is one) |
| Promise.reject(e)        | create an already rejected Promise                        |
| Promise.any([...])       | first fulfillment; AggregateError if all reject           |
| Promise.all / allSettled / race | see the previous file                              |
| Promise.withResolvers()  | returns { promise, resolve, reject } (Node 22+)           |
| Promise.try(fn)          | run fn, sync throw becomes rejection (very new, Node 23+) |

-----------------------------------------------------
race vs any
-----------------------------------------------------
- race -> first to SETTLE wins (a fast rejection makes race reject).
- any  -> first to FULFILL wins (rejections are ignored until all fail).

-----------------------------------------------------
Example
-----------------------------------------------------
const ok = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
const fail = (ms, msg) => new Promise((_, j) => setTimeout(() => j(new Error(msg)), ms));

(async () => {
  console.log(await Promise.any([fail(10, 'mirror1 down'), ok(50, 'mirror2'), ok(80, 'mirror3')]));
  // mirror2

  try {
    await Promise.any([fail(10, 'a'), fail(20, 'b')]);
  } catch (e) {
    console.log(e instanceof AggregateError, e.errors.map((x) => x.message));
    // true [ 'a', 'b' ]
  }

  const { promise, resolve } = Promise.withResolvers();   // Node 22+
  setTimeout(() => resolve('resolved from outside'), 10);
  console.log(await promise);                             // resolved from outside
})();

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Promise.any([]) rejects immediately with an AggregateError (nothing can fulfill).
- Promise.resolve(existingPromise) returns the same Promise object, it does not wrap twice.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When was Promise.any added?
A1: ES2021; available in Node 15 and later.

Q2: Real use case for Promise.resolve?
A2: Normalizing a function that may return a value or a Promise, so callers can always use .then.

Q3: What is withResolvers useful for?
A3: When resolve/reject must be called from outside the executor, e.g. wrapping an event-based API.
*/
