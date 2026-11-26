/* 22_sequential_vs_parallel_await.js

=====================================================
Sequential vs Parallel await
=====================================================

Definition (What I should say in the interview):
- "If I write await on each call one after another, the operations run **sequentially** - the
   second does not even start until the first finishes, so total time is the sum. If the calls
   are independent, I start them all first and then await them together with **Promise.all**, so
   they run concurrently and total time is roughly the slowest one. I only keep them sequential
   when one step needs the result of the previous one, or when I want to limit load."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Pattern                              | Total time      | Use when                     |
|--------------------------------------|-----------------|------------------------------|
| await a(); await b();                | a + b           | b depends on a               |
| await Promise.all([a(), b()])        | max(a, b)       | independent calls            |
| for...of with await                  | sum of all      | order matters / rate limits  |
| batches of Promise.all               | controlled      | many items, limited resources|

-----------------------------------------------------
Example
-----------------------------------------------------
const fetchUser = () => new Promise((r) => setTimeout(() => r('user'), 1000));
const fetchPosts = () => new Promise((r) => setTimeout(() => r('posts'), 1000));

async function sequential() {
  console.time('sequential');
  const user = await fetchUser();
  const posts = await fetchPosts();
  console.timeEnd('sequential');          // ~2000ms
}

async function parallel() {
  console.time('parallel');
  const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
  console.timeEnd('parallel');            // ~1000ms
}

sequential().then(parallel);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- array.forEach(async (x) => await save(x)) -> forEach does NOT wait; the function returns before
  saves finish and errors are unhandled. Use for...of (sequential) or Promise.all + map (parallel).
- Starting promises early without awaiting them: const a = fetchA(); const b = fetchB();
  await a; await b;  -> if b rejects before a is awaited, you may get an unhandled rejection.
  Prefer Promise.all.
- Promise.all over 10,000 DB queries at once can exhaust the connection pool -> batch them.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you run in parallel but not fail everything on one error?
A1: Use Promise.allSettled and inspect each result.

Q2: How to process 1000 items with max 10 at a time?
A2: Chunk the array into groups of 10 and await Promise.all per chunk, or use p-limit.

Q3: Is Promise.all truly parallel?
A3: The I/O waits overlap (concurrency); the JS callbacks themselves still run one by one.
*/
