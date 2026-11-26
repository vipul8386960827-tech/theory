/* 5_await_inside_foreach_does_not_wait.js

=====================================================
Scenario: await inside forEach does not wait
=====================================================

The Question (how the interviewer asks it):
- "This function saves each item with await inside forEach, then logs
  'All saved'. But 'All saved' prints first, and sometimes the caller reads
  data before the saves finish. What is wrong?"

What the interviewer is checking:
- Do you know forEach ignores the promise returned by an async callback?
- Do you know for...of (sequential) and Promise.all + map (parallel)?
- Can you choose between sequential and parallel for the use case?
- Do you notice the errors from forEach callbacks become unhandled?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain: an async callback returns a promise. forEach calls the
   callback and throws away that promise. It does not wait for it.
2. So forEach finishes at once, the function goes on, and the outer await
   has nothing to wait for.
3. Also, if a save fails, the error is not caught by the outer try/catch;
   it becomes an unhandled rejection.
4. Fix 1, sequential (order matters, or the API is rate-limited):
   use for...of with await.
5. Fix 2, parallel (independent items, faster): map to promises and
   await Promise.all (or Promise.allSettled to keep going on errors).
6. For many items, parallel with a limit (see scenario 4).

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY
async function saveAll(items) {
  items.forEach(async (item) => {
    await saveItem(item); // forEach does not wait for this
  });
  console.log("All saved"); // prints before any save finishes
}

// FIX 1: sequential, one after another
async function saveAllSequential(items) {
  for (const item of items) {
    await saveItem(item);
  }
  console.log("All saved");
}

// FIX 2: parallel, all at the same time
async function saveAllParallel(items) {
  await Promise.all(items.map((item) => saveItem(item)));
  console.log("All saved");
}

// FIX 3: parallel, but do not stop on the first failure
async function saveAllSettled(items) {
  const results = await Promise.allSettled(items.map(saveItem));
  const failed = results.filter((r) => r.status === "rejected");
  console.log(`Saved ${results.length - failed.length}, failed ${failed.length}`);
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "forEach does not understand promises. It calls the async callback and
  ignores the returned promise, so nothing waits and errors are not caught.
  If order matters, I use for...of with await, which runs one by one. If the
  items are independent, I use await Promise.all(items.map(...)) to run them
  in parallel, or allSettled if I want all results even when some fail."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Writing "await items.forEach(...)": forEach returns undefined, so await
  does nothing.
- Using map with async but forgetting Promise.all, so you get an array of
  pending promises.
- Using Promise.all for 1000 items with no limit and overloading the server.
- Using for...of when items are independent, making the code much slower.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Do filter, reduce and some have the same problem?
A1: Yes. filter with an async callback gets a promise (always truthy), so
    it keeps every item. reduce can work only if you await the accumulator
    each step. Usually it is clearer to use for...of or Promise.all.

Q2: What does for await...of do?
A2: It loops over async iterables (like streams or async generators) and
    awaits each value. For a normal array of promises it awaits each one in
    order, but the promises are already running in parallel.

Q3: Promise.all vs allSettled here?
A3: Promise.all rejects at the first failure (others keep running but their
    results are lost). allSettled always waits for all and gives status for
    each, which is better for "save what you can and report failures".
*/
