/*
==========================================================================================
QUESTION 9: setTimeout(0) waits for blocking code
Topic: Event Loop   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const start = Date.now();

setTimeout(() => {
  const waited = Date.now() - start;
  console.log("timeout fired, waited at least 200ms:", waited >= 200);
}, 0);

Promise.resolve().then(() => {
  console.log("promise, waited at least 200ms:", Date.now() - start >= 200);
});

while (Date.now() - start < 200) {
  // busy-wait: block the main thread for 200ms
}

console.log("blocking loop done");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
blocking loop done
promise, waited at least 200ms: true
timeout fired, waited at least 200ms: true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
JavaScript has ONE call stack. The timer may expire after ~0ms, but its callback can only run
when the call stack is empty - and the while loop keeps the stack busy for 200ms.

Time   | Action                                  | Call Stack  | Microtask Queue | Macrotask Queue
-------|-----------------------------------------|-------------|-----------------|----------------
0ms    | setTimeout(T, 0) registered             | global      | -               | -
0ms    | .then(P) queued                         | global      | P               | -
~1ms   | timer expires -> T is ready, but the    | global      | P               | T
       |   stack is still busy with the loop     | (while...)  |                 |
200ms  | loop ends, prints "blocking loop done"  | global      | P               | T
200ms  | stack empty -> run P (prints true)      | P           | -               | T
200ms  | run T (prints true)                     | T           | -               | -

Both callbacks had to wait the full 200ms, and the promise still beats the timer.

KEY RULE: The delay of setTimeout is a minimum. Nothing asynchronous can interrupt
          synchronous code that is running - callbacks wait for the stack to be empty.
COMMON MISTAKE: Believing setTimeout(fn, 0) runs fn "after 0ms" or in parallel with the loop.
FOLLOW-UP: This is why long synchronous work freezes the UI: clicks, timers and rendering are
          all macrotasks/steps waiting for the same single thread.
*/
