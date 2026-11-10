/*
==========================================================================================
QUESTION 7: Automatic Semicolon Insertion after return
Topic: Functions   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function getConfig() {
  return
  {
    debug: true
  };
}

function getConfigFixed() {
  return {
    debug: true,
  };
}

console.log(getConfig());
console.log(getConfigFixed().debug);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. `return` is a "restricted production": if a line break follows the `return` keyword,
   Automatic Semicolon Insertion (ASI) inserts a semicolon right after it. getConfig
   is effectively:
       return;          // returns undefined
       {                // unreachable block statement
         debug: true    // a LABEL "debug:" followed by the expression `true`
       }
   No syntax error occurs because `{ debug: true }` is valid as a block with a label.
2. getConfig() -> undefined.
3. getConfigFixed has the `{` on the same line as return, so the object literal is
   the return value -> .debug is true.

KEY RULE: Never put a line break between `return` and the value it should return (same applies to throw, break, continue, ++/--, and arrow `=>`).
COMMON MISTAKE: Answering "{ debug: true }" for the first call.
*/
