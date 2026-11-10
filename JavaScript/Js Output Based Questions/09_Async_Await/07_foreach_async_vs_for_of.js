/*
==========================================================================================
QUESTION 7: forEach with async callback vs for...of with await
Topic: Async / Await   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const items = [3, 1, 2];

async function withForEach() {
  items.forEach(async (item) => {
    await delay(item * 100);
    console.log("forEach item:", item);
  });
  console.log("forEach finished");
}

async function withForOf() {
  for (const item of items) {
    await delay(item * 100);
    console.log("for...of item:", item);
  }
  console.log("for...of finished");
}

(async () => {
  await withForEach();
  console.log("--- after awaiting withForEach ---");
  await delay(400); // let the forEach timers finish
  await withForOf();
})();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
forEach finished
--- after awaiting withForEach ---
forEach item: 1
forEach item: 2
forEach item: 3
for...of item: 3
for...of item: 1
for...of item: 2
for...of finished

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
forEach calls the callback for each item and IGNORES the return value. An async callback
returns a promise, forEach throws that promise away and moves on immediately. So:
  - all three callbacks start at the same time (all three timers start at ~0ms)
  - "forEach finished" prints before any item
  - `await withForEach()` cannot wait for the items either - withForEach's own promise
    resolves as soon as forEach returns
  - items print in order of their DELAY (1 -> 100ms, 2 -> 200ms, 3 -> 300ms), not array order

for...of runs inside the async function itself, so each `await` really pauses the loop:
item 3 waits 300ms, THEN item 1 waits 100ms, THEN item 2 waits 200ms -> array order,
sequentially (~600ms total).

Time   | Action                                         | Call Stack  | Microtask Queue | Macrotask Queue (timers)
-------|------------------------------------------------|-------------|-----------------|-------------------------
0ms    | forEach starts 3 callbacks, each awaits delay  | withForEach | -               | 300, 100, 200 pending
0ms    | prints "forEach finished"; withForEach resolves| -           | resume IIFE     | ...
0ms    | IIFE prints "--- after ..."; starts delay(400) | IIFE        | -               | +400 pending
100ms  | timer -> callback(1) resumes -> "item: 1"      | callback    | -               | ...
200ms  | "item: 2";  300ms: "item: 3"                   | callback    | -               | ...
400ms  | IIFE resumes, calls withForOf                  | withForOf   | -               | +300
700ms  | "for...of item: 3", then waits 100ms           |             |                 |
800ms  | "for...of item: 1", then waits 200ms           |             |                 |
1000ms | "for...of item: 2", "for...of finished"        |             |                 |

KEY RULE: forEach does not wait for async callbacks. Use for...of (sequential) or
          await Promise.all(items.map(async ...)) (parallel) instead.
COMMON MISTAKE: Expecting forEach to process items in array order and finish before
          "forEach finished".
*/
