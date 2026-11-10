/*
==========================================================================================
QUESTION 6: Lexical scope vs where the function is called
Topic: Scope and Closures   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const value = "global";

function printValue() {
  console.log(value);
}

function wrapper() {
  const value = "local";
  printValue();
}

wrapper();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
global

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. JavaScript uses LEXICAL (static) scoping: a function's outer scope is fixed by where
   the function is WRITTEN in the source code, not by where it is called from.
2. printValue is written at the top level, so its scope chain is:
       printValue's local scope -> global scope
   wrapper's scope is NOT part of that chain.
3. wrapper() declares its own `value = "local"` and calls printValue().
4. printValue looks for `value`: not in its own scope -> next is the global scope ->
   finds "global".

KEY RULE: Scope is determined at author time (lexical scoping). The call site affects `this`, never variable lookup.
COMMON MISTAKE: Answering "local", which would be dynamic scoping (used by some other languages, not JavaScript).
FOLLOW-UP: Move the declaration of printValue inside wrapper (after `const value = "local"`)? -> "local", because now wrapper's scope is lexically its parent.
*/
