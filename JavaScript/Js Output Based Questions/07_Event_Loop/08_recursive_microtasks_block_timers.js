/*
==========================================================================================
QUESTION 8: Microtasks that queue more microtasks
Topic: Event Loop   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

let count = 0;

setTimeout(() => console.log("timeout, count =", count), 0);

function loop() {
  if (count < 3) {
    count++;
    console.log("microtask", count);
    queueMicrotask(loop);
  }
}

queueMicrotask(loop);
console.log("sync done");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
sync done
microtask 1
microtask 2
microtask 3
timeout, count = 3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The event loop does not take a "snapshot" of the microtask queue. It keeps running
microtasks until the queue is COMPLETELY empty - including microtasks that were added while
draining. Only then does it move on to the next macrotask.

Step | Action                                     | Call Stack | Microtask Queue | Macrotask Queue
-----|--------------------------------------------|------------|-----------------|----------------
 1   | setTimeout(T)                              | global     | -               | T
 2   | queueMicrotask(loop)                       | global     | loop            | T
 3   | prints "sync done"                         | global     | loop            | T
 4   | loop: count=1, prints, queues loop         | loop       | loop            | T
 5   | loop: count=2, prints, queues loop         | loop       | loop            | T
 6   | loop: count=3, prints, queues loop         | loop       | loop            | T
 7   | loop: count is 3 -> does nothing           | loop       | -               | T
 8   | microtasks empty -> T prints count = 3     | T          | -               | -

KEY RULE: Microtasks added during the microtask checkpoint run in the same checkpoint, before
          any macrotask or rendering.
COMMON MISTAKE: Expecting the timeout to sneak in between microtasks (e.g. "count = 1").
FOLLOW-UP: Without the `count < 3` guard the page would freeze forever - timers, clicks and
          rendering would never get a turn (microtask starvation). A recursive setTimeout
          does NOT freeze the page, because each call yields back to the event loop.
*/
