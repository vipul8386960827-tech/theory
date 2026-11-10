/*
==========================================================================================
QUESTION 8: Sequential awaits vs Promise.all
Topic: Async / Await   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code? (times are rounded to the nearest 100ms)
*/

const wait = (ms, label) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`${label} done`);
      resolve(label);
    }, ms)
  );

const elapsed = (start) => "~" + Math.round((Date.now() - start) / 100) * 100 + "ms";

async function sequential() {
  const start = Date.now();
  const a = await wait(200, "seq-A");
  const b = await wait(100, "seq-B");
  console.log("sequential:", a, b, elapsed(start));
}

async function parallel() {
  const start = Date.now();
  const [a, b] = await Promise.all([wait(200, "par-A"), wait(100, "par-B")]);
  console.log("parallel:", a, b, elapsed(start));
}

(async () => {
  await sequential();
  await parallel();
})();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
seq-A done
seq-B done
sequential: seq-A seq-B ~300ms
par-B done
par-A done
parallel: par-A par-B ~200ms

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A promise starts its work when it is CREATED, not when it is awaited.

sequential():
  wait(200) is created, and the function awaits it. Only after 200ms does the next line run
  and CREATE wait(100). Total = 200 + 100 = ~300ms; A always finishes before B.

parallel():
  Both wait(...) calls run while building the array, so both timers start at the same time.
  B (100ms) finishes first and logs first, but Promise.all returns results in INPUT order
  [par-A, par-B]. Total = max(200, 100) = ~200ms.

Time (relative) | Action                                 | Call Stack | Microtask Queue | Macrotask Queue
----------------|----------------------------------------|------------|-----------------|----------------
seq 0ms         | timer A(200) started; await            | sequential | -               | A pending
seq 200ms       | A fires: "seq-A done"; resolve         | timer A    | resume seq      | -
seq 200ms       | resume: timer B(100) started; await    | sequential | -               | B pending
seq 300ms       | B fires: "seq-B done" -> resume, log   | timer B    | resume seq      | -
par 0ms         | timers A(200) AND B(100) both started  | parallel   | -               | A, B pending
par 100ms       | B fires: "par-B done"                  | timer B    | (all internals) | A pending
par 200ms       | A fires: "par-A done" -> all fulfilled | timer A    | resume parallel | -
par 200ms       | prints [par-A, par-B] (input order)    | parallel   | -               | -

KEY RULE: Independent async operations should be started together and awaited with
          Promise.all; awaiting one after another makes them sequential.
COMMON MISTAKE: Thinking Promise.all's result order follows completion order (B before A).
FOLLOW-UP: `const pa = wait(200, "A"); const pb = wait(100, "B"); await pa; await pb;` is also
          parallel (~200ms), because both promises were created before the first await.
*/
