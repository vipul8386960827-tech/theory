/*
==========================================================================================
QUESTION 2: The Promise executor runs synchronously
Topic: Event Loop   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log("1");

const p = new Promise((resolve) => {
  console.log("2");
  resolve("3");
  console.log("4");
});

p.then((value) => console.log(value));

console.log("5");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
2
4
5
3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The function you pass to `new Promise(...)` (the executor) is called IMMEDIATELY and
SYNCHRONOUSLY by the constructor. Only the .then callbacks are asynchronous.

Step | Action                                    | Call Stack       | Microtask Queue | Macrotask Queue
-----|-------------------------------------------|------------------|-----------------|----------------
 1   | prints "1"                                | global           | -               | -
 2   | new Promise -> executor runs now,         | global, executor | -               | -
     |   prints "2"                              |                  |                 |
 3   | resolve("3") -> p is now fulfilled        | global, executor | -               | -
     |   (no .then yet, so nothing is queued)    |                  |                 |
 4   | prints "4" - resolve() does NOT stop the  | global, executor | -               | -
     |   executor, it is not a `return`          |                  |                 |
 5   | p.then(cb) -> p already fulfilled, so the | global           | cb("3")         | -
     |   callback is queued as a microtask       |                  |                 |
 6   | prints "5"                                | global           | cb("3")         | -
 7   | stack empty -> run microtask, prints "3"  | cb               | -               | -

KEY RULE: The executor is synchronous; resolve() just changes state and does not exit the
          function. .then callbacks are always asynchronous (microtasks).
COMMON MISTAKE: Answering 1 5 2 4 3 (thinking the whole promise body is async) or 1 2 3 4 5
          (thinking resolve() calls .then immediately).
*/
