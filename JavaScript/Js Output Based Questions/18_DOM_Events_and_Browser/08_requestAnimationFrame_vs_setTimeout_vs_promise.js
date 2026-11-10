/*
==========================================================================================
QUESTION 8: requestAnimationFrame vs setTimeout vs Promise
Topic: DOM Events and Browser   |   Difficulty: Hard
==========================================================================================
Browser only. What will be the output of the following code?
*/

console.log('sync start');

setTimeout(() => console.log('timeout'), 0);

requestAnimationFrame(() => {
  console.log('rAF');
  Promise.resolve().then(() => console.log('microtask inside rAF'));
});

Promise.resolve().then(() => console.log('promise'));

queueMicrotask(() => console.log('queueMicrotask'));

console.log('sync end');

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
sync start
sync end
promise
queueMicrotask
timeout
rAF
microtask inside rAF

(GUARANTEED: the first four lines, and 'microtask inside rAF' right after 'rAF'.
 The relative order of 'timeout' and 'rAF' is NOT guaranteed - 'timeout' first is the
 most common result, but 'rAF' can come first if a frame is due right away.)

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Synchronous code first: 'sync start', 'sync end'.
2. When the script finishes, the microtask queue is drained in FIFO order:
   'promise', then 'queueMicrotask'.
3. setTimeout(fn, 0) queues a macrotask that runs on a following event-loop turn
   (as soon as possible, subject to a minimum delay).
4. requestAnimationFrame callbacks run in the "update the rendering" step, right before
   the browser paints the next frame (typically every ~16.7ms at 60Hz). This step is not
   a timer, so it is not ordered relative to setTimeout - it depends on when the next
   frame is scheduled. Usually the timeout task runs first.
5. After the rAF callback returns, the stack is empty, so its microtask runs
   immediately -> 'microtask inside rAF' directly after 'rAF'.

KEY RULE: sync -> all microtasks -> then tasks (setTimeout) and rendering (rAF) in
event-loop order. rAF is tied to frames, not to a timer queue.
COMMON MISTAKE: Putting 'timeout' or 'rAF' before the promise callbacks, or claiming the
timeout/rAF order is always fixed.
*/
