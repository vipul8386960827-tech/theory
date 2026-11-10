/*
==========================================================================================
QUESTION 3: arguments syncing with parameters (sloppy mode vs default params)
Topic: Functions   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

function simple(a) {
  arguments[0] = 99;
  console.log(a);
  a = 5;
  console.log(arguments[0]);
}

function withDefault(a = 0) {
  arguments[0] = 99;
  console.log(a);
}

function strictFn(a) {
  "use strict";
  arguments[0] = 99;
  console.log(a);
}

simple(1);
withDefault(1);
strictFn(1);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
99
5
1
1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. simple(1): In non-strict mode, a function with a "simple" parameter list (no
   defaults, no rest, no destructuring) gets a MAPPED arguments object - arguments[i]
   and the i-th parameter are two names for the same slot.
     arguments[0] = 99 -> a also becomes 99 -> prints 99
     a = 5            -> arguments[0] also becomes 5 -> prints 5

2. withDefault(1): Having a default value makes the parameter list non-simple, so the
   arguments object is UNMAPPED (just a copy of the passed values). Changing
   arguments[0] does not affect a -> prints 1.

3. strictFn(1): In strict mode arguments is always unmapped -> prints 1.

KEY RULE: arguments and named parameters are linked only in sloppy mode AND only when the parameter list is simple.
COMMON MISTAKE: Answering "1, 1, ..." for the first call (assuming arguments is always a copy) or "99" for all calls (assuming it is always linked).
*/
