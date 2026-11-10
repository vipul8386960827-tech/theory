/*
==========================================================================================
QUESTION 3: Swapping with destructuring (and the missing-semicolon trap)
Topic: Destructuring, Spread and Rest   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);

let x = 1, y = 2;
try {
  console.log(x, y)
  [x, y] = [y, x]
  console.log(x, y)
} catch (e) {
  console.log(e.name + ": " + e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
2 1
1 2
TypeError: Cannot set properties of undefined (setting '2')

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Part 1: [a, b] = [b, a]
  1. The right side is evaluated first: a NEW array [2, 1] is created.
  2. Then it is destructured into a and b -> a = 2, b = 1.
  No temporary variable needed -> "2 1".

Part 2: the missing semicolon
  Automatic Semicolon Insertion (ASI) does NOT insert a semicolon before a line that
  starts with "[" (or "(", "`", "+", "-", "/"), because the code can be a valid
  continuation. So the engine reads:

     console.log(x, y)[x, y] = [y, x]

  1. console.log(x, y) runs -> prints "1 2" and returns undefined.
  2. [x, y] is now a PROPERTY ACCESS with a comma expression inside: (x, y) -> 2.
     So it is:  undefined[2] = [y, x]
  3. Assigning a property on undefined -> TypeError.
  The last console.log never runs.

KEY RULE: Destructuring swap [a, b] = [b, a] works because the right side is fully evaluated first. If you skip semicolons, put one before a line starting with [ or (.
COMMON MISTAKE: Answering "2 1" for the second block -- not noticing the previous line has no semicolon.
FOLLOW-UP: Does the swap work for object properties?  Yes: [obj.a, obj.b] = [obj.b, obj.a]; any assignable target works in a destructuring assignment.
*/
