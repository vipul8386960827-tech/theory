/*
==========================================================================================
QUESTION 10: ASI - return followed by a new line
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Easy
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
    debug: true
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
1. Automatic Semicolon Insertion (ASI): `return` is a "restricted production" - if a line
   break follows the word return, JavaScript inserts a semicolon right there.
2. So getConfig() is actually:
       return;            // returns undefined
       { debug: true };   // unreachable code, parsed as a BLOCK with a label `debug:`
                          // and the expression `true` - not an object!
   No syntax error occurs, the function just returns undefined.
3. getConfigFixed() has the `{` on the same line as return, so the object literal is
   returned -> .debug is true.

KEY RULE: Never put a line break between `return` (also throw/break/continue, and before
postfix ++/--) and its value.
COMMON MISTAKE: Answering { debug: true } for getConfig().
*/
