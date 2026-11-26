/* 8_execution_order.js

=====================================================
Execution Order (Output-Based Questions)
=====================================================

Definition (What I should say in the interview):
- "When I solve an execution order question, I follow a fixed priority: first all **synchronous
   code**, then the **process.nextTick queue**, then the **Promise microtask queue**, and only then
   the event loop phases - **timers, poll (I/O), check (setImmediate), close**. After every
   macrotask callback I drain microtasks again. And I remember that code inside an async function
   runs synchronously until the first await."

-----------------------------------------------------
Priority Cheat Sheet
-----------------------------------------------------
1. Synchronous code (including the body of new Promise(executor) and async fn until first await)
2. process.nextTick queue
3. Promise microtasks (.then, await continuation, queueMicrotask)
4. timers -> poll (I/O) -> check (setImmediate) -> close
   (microtasks drained after EACH callback)

-----------------------------------------------------
Example (classic interview puzzle)
-----------------------------------------------------
console.log('A');

setTimeout(() => console.log('B'), 0);
setImmediate(() => console.log('C'));

new Promise((resolve) => {
  console.log('D');                        // executor is sync
  resolve();
}).then(() => console.log('E'));

(async () => {
  console.log('F');                        // sync until await
  await null;
  console.log('G');                        // microtask
})();

process.nextTick(() => console.log('H'));
console.log('I');

// Output:
// A D F I     (sync)
// H           (nextTick)
// E G         (promises, in order they were queued)
// B C or C B  (timer vs immediate is NOT guaranteed in the main module - say this in the interview)

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Forgetting that the Promise executor runs synchronously.
- Putting the code after await before other sync code.
- Claiming setTimeout 0 vs setImmediate order is fixed in the main module.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Where does a nextTick scheduled inside a .then callback run?
A1: After the whole Promise microtask queue is drained (V8 drains it fully), then Node runs the tick.

Q2: Two setTimeouts with 0ms - what order?
A2: In the order they were scheduled (FIFO in the timers queue).

Q3: What is your strategy if the puzzle is long?
A3: Write out separate columns: sync, nextTick, promise, timers, check, and fill them step by step.
*/
