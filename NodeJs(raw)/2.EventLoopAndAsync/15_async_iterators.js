/* 15_async_iterators.js

=====================================================
Async Iterators and for await...of
=====================================================

Definition (What I should say in the interview):
- "An async iterator is an object with a [Symbol.asyncIterator] method whose next() returns a
   **Promise** of { value, done }. The for await...of loop consumes it one item at a time,
   waiting for each value. In Node this is really useful for **streams**, reading files line by
   line, and paginated APIs, because I can process large data piece by piece with simple code
   and natural backpressure, instead of loading everything into memory."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Sync iterator: next() -> { value, done }. Async iterator: next() -> Promise<{ value, done }>.
2. Easiest way to create one: an **async generator** (async function* name() { yield ... }).
3. Readable streams are async iterable in Node (since v10).
4. Items are processed **sequentially**, not in parallel.
5. break / return inside for await calls the iterator's return(), which cleans up (e.g. destroys stream).

-----------------------------------------------------
Example 1 (async generator for pagination)
-----------------------------------------------------
async function* fetchPages() {
  for (let page = 1; page <= 3; page++) {
    await new Promise((r) => setTimeout(r, 100));     // pretend API call
    yield [`item${page}a`, `item${page}b`];
  }
}

(async () => {
  for await (const items of fetchPages()) {
    console.log(items);
  }
})();
// [ 'item1a', 'item1b' ]  then [ 'item2a', 'item2b' ]  then [ 'item3a', 'item3b' ]

-----------------------------------------------------
Example 2 (read a big file line by line)
-----------------------------------------------------
const fs = require('fs');
const readline = require('readline');

async function countLines(path) {
  const rl = readline.createInterface({ input: fs.createReadStream(path) });
  let n = 0;
  for await (const line of rl) n++;
  return n;
}
countLines(__filename).then((n) => console.log('lines:', n));

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Using for await on an array of Promises expecting parallel speed - it still awaits one by one
  in order. Use Promise.all for parallel.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How does for await help with backpressure on streams?
A1: The stream only reads the next chunk when the loop asks for it, so a slow consumer slows the producer.

Q2: How do you handle errors in for await?
A2: Wrap the loop in try/catch; a stream 'error' becomes a rejected next() and is thrown in the loop.

Q3: Can you use for await on a normal array?
A3: Yes, it awaits each element, but for plain values it is pointless overhead.
*/
