/*
==========================================================================================
QUESTION 5: setTimeout scheduled inside a .then
Topic: Event Loop   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => {
  console.log("3");
  setTimeout(() => console.log("4"), 0);
});

Promise.resolve().then(() => console.log("5"));

console.log("6");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
6
3
5
2
4

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Let T2/T4 be the timer callbacks and M3/M5 be the promise callbacks.

Step | Action                                     | Call Stack | Microtask Queue | Macrotask Queue
-----|--------------------------------------------|------------|-----------------|----------------
 1   | prints "1"                                 | global     | -               | -
 2   | setTimeout(T2)                             | global     | -               | T2
 3   | .then(M3) on resolved promise              | global     | M3              | T2
 4   | .then(M5) on resolved promise              | global     | M3, M5          | T2
 5   | prints "6"                                 | global     | M3, M5          | T2
 6   | run M3: prints "3", schedules T4           | M3         | M5              | T2, T4
     |   (T4 goes to the BACK of the macrotask    |            |                 |
     |    queue, behind T2)                       |            |                 |
 7   | run M5: prints "5"                         | M5         | -               | T2, T4
 8   | microtasks empty -> run T2: prints "2"     | T2         | -               | T4
 9   | run T4: prints "4"                         | T4         | -               | -

KEY RULE: A setTimeout created inside a microtask is still a macrotask; it waits behind every
          macrotask that was already queued.
COMMON MISTAKE: Putting "4" right after "3" (it is not synchronous), or before "2" (it was
          scheduled later than T2).
*/
