/*
==========================================================================================
QUESTION 9: async/await mixed with setTimeout
Topic: Async / Await   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

console.log("1");

setTimeout(() => console.log("2"), 0);

async function main() {
  console.log("3");
  await new Promise((resolve) =>
    setTimeout(() => {
      console.log("4");
      resolve();
    }, 0)
  );
  console.log("5");
  await null;
  console.log("6");
}

main().then(() => console.log("7"));

Promise.resolve().then(() => console.log("8"));

console.log("9");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
3
9
8
2
4
5
6
7

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Names: T2 = first timer, T4 = timer inside main's awaited promise, M8 = the .then logging 8.

Step | Action                                             | Call Stack | Microtask Queue | Macrotask Queue
-----|----------------------------------------------------|------------|-----------------|----------------
 1   | prints "1"                                         | global     | -               | -
 2   | setTimeout(T2)                                     | global     | -               | T2
 3   | main(): prints "3"; the executor runs sync and     | main       | -               | T2, T4
     |   schedules T4; main awaits a PENDING promise ->   |            |                 |
     |   pauses (nothing queued yet!)                     |            |                 |
 4   | main().then(cb7) -> main's promise pending,        | global     | -               | T2, T4
     |   cb7 just registered                              |            |                 |
 5   | .then(M8) queued                                   | global     | M8              | T2, T4
 6   | prints "9"                                         | global     | M8              | T2, T4
 7   | drain: M8 prints "8"                               | M8         | -               | T2, T4
 8   | T2: prints "2"                                     | T2         | -               | T4
 9   | T4: prints "4", resolve() -> main's resume queued  | T4         | main-resume     | -
10   | main resumes: prints "5"; await null -> pause      | main       | main-resume2    | -
11   | main resumes: prints "6"; main returns -> its      | main       | cb7             | -
     |   promise fulfills -> cb7 queued                   |            |                 |
12   | cb7: prints "7"                                    | cb7        | -               | -

KEY RULE: An await on a promise that is resolved inside a timer pauses the function until
          that timer runs; everything after it waits too.
COMMON MISTAKE: Printing "5" right after "8" (main is waiting on T4, not on a microtask), or
          printing "2" after "4" (T2 was queued first).
*/
