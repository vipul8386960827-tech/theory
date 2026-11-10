/*
==========================================================================================
QUESTION 7: Chained assignment a.x = a = { ... }
Topic: Objects and References   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

let a = { n: 1 };
let b = a;

a.x = a = { n: 2 };

console.log(a.x);
console.log(JSON.stringify(a));
console.log(JSON.stringify(b));
console.log(b.x === a);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
{"n":2}
{"n":1,"x":{"n":2}}
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Assignment is right-associative:  a.x = a = { n: 2 }  means  a.x = (a = { n: 2 }).
BUT the LEFT side of an assignment is evaluated (resolved to a reference) BEFORE the
right side.

Let OLD = the object { n: 1 } (both a and b point to it).

1. Evaluate the left target of the outer assignment: a.x
   -> a currently points to OLD, so the target is "property x of OLD".
   This target is fixed now, even if a changes later.
2. Evaluate the right side: (a = { n: 2 })
   -> creates NEW = { n: 2 } and makes a point to NEW. The expression's value is NEW.
3. Perform the outer assignment: OLD.x = NEW

Final state:
  a  -> NEW = { n: 2 }                (NEW has no x property)
  b  -> OLD = { n: 1, x: NEW }

  a.x            -> undefined
  JSON(a)        -> {"n":2}
  JSON(b)        -> {"n":1,"x":{"n":2}}
  b.x === a      -> true (both are NEW)

KEY RULE: In an assignment, the target reference on the left is determined first; the right side is evaluated after. Changing a variable on the right doesn't redirect an already-resolved target.
COMMON MISTAKE: Answering { n: 2 } for a.x, thinking a = {...} happens first and then a.x is set on the new object.
FOLLOW-UP: What about let x = 1; let y = x = 5; ?  Both are 5 -- with plain variables there's no surprise; the trap only appears when the target is a property of the variable being reassigned.
*/
