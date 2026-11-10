/*
==========================================================================================
QUESTION 5: async function returning a value vs returning a promise
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

async function one() {
  return 1;
}

async function two() {
  return Promise.resolve(2);
}

one().then((v) => console.log(v));
two().then((v) => console.log(v));

Promise.resolve()
  .then(() => console.log('a'))
  .then(() => console.log('b'))
  .then(() => console.log('c'))
  .then(() => console.log('d'));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
a
b
2
c
d

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Count microtask "ticks":

Synchronous phase:
- one() returns a promise already fulfilled with 1. .then -> job J1 queued.
- two() returns its own promise P2. Its body returned ANOTHER promise (Promise.resolve(2)).
  Resolving a promise with a thenable is not immediate: the engine queues a job
  (NewPromiseResolveThenableJob) T1 that will call inner.then(resolveP2).
  P2 is still pending, so two().then(...) just waits.
- Promise.resolve().then(a) -> job A queued.
Queue: [J1, T1, A]

Tick 1: J1 logs '1'. T1 calls inner.then(...) -> inner is fulfilled, so job R queued.
        A logs 'a' -> queues B.            Queue: [R, B]
Tick 2: R resolves P2 with 2 -> P2's handler job J2 queued. B logs 'b' -> queues C.
                                           Queue: [J2, C]
Tick 3: J2 logs '2'. C logs 'c' -> queues D.
Tick 4: D logs 'd'.

So returning a promise from an async function costs 2 extra microtask ticks compared to
returning a plain value.

KEY RULE: Resolving a promise with another promise/thenable takes extra microtask ticks
(one to call .then on it, one for that .then to fire).
COMMON MISTAKE: Answering 1, 2, a, b, c, d - assuming `return Promise.resolve(2)` is
the same as `return 2`.
FOLLOW-UP: With `return await Promise.resolve(2)` the 2 appears one tick earlier:
1, a, 2, b, c, d.
*/
