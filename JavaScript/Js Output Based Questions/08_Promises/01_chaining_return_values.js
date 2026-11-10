/*
==========================================================================================
QUESTION 1: What does each .then receive?
Topic: Promises   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => {
    console.log(x);
  })
  .then((x) => {
    console.log(x);
    return x * 2;
  })
  .then((x) => console.log(x));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
2
undefined
NaN

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Every .then returns a NEW promise that is resolved with whatever its callback RETURNS.
A callback with a block body `{ ... }` and no return statement returns undefined.

Step | Callback running            | Receives  | Returns           | Call Stack | Microtask Queue | Macrotask Queue
-----|-----------------------------|-----------|-------------------|------------|-----------------|----------------
 0   | (sync) chain is built       | -         | -                 | global     | then#1          | -
 1   | x => x + 1                  | 1         | 2 (implicit,      | then#1     | then#2          | -
     |                             |           |  arrow expression)|            |                 |
 2   | x => { console.log(x) }     | 2         | undefined         | then#2     | then#3          | -
     |   prints 2                  |           |                   |            |                 |
 3   | x => { log; return x*2 }    | undefined | undefined * 2=NaN | then#3     | then#4          | -
     |   prints undefined          |           |                   |            |                 |
 4   | x => console.log(x)         | NaN       | undefined         | then#4     | -               | -
     |   prints NaN                |           |                   |            |                 |

KEY RULE: The value passed down a chain is the RETURN value of the previous callback.
          No return -> undefined.
COMMON MISTAKE: Answering 2, 2, 4 - assuming the value "flows through" a callback that only
          logs it.
*/
