/*
==========================================================================================
QUESTION 11: Functions are objects (properties on functions)
Topic: Functions   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function counter() {
  counter.count = (counter.count || 0) + 1;
  return counter.count;
}

counter();
counter();
console.log(counter());

console.log(counter.name, counter.length);
console.log(typeof counter, counter instanceof Object);

counter.description = "I count calls";
console.log(counter.description);

const anon = function () {};
console.log(anon.name);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
counter 0
function true
I count calls
anon

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Functions in JavaScript are first-class OBJECTS (callable objects). You can attach
arbitrary properties to them, and they have built-in ones like name and length.

1. First call: counter.count is undefined -> (undefined || 0) + 1 = 1.
   Second call -> 2. Third call -> 3, which is printed.
2. counter.name -> "counter"; counter.length -> 0 declared parameters.
3. typeof a function is "function" (a special typeof result), yet it is still an
   object, so instanceof Object -> true (Function.prototype inherits from
   Object.prototype).
4. A custom property can be added and read like on any object.
5. An anonymous function expression assigned to a variable gets its name INFERRED from
   the variable -> "anon".

KEY RULE: Functions are objects - they can hold properties (handy for static counters/caches), and typeof reports "function" for them.
COMMON MISTAKE: Thinking counter.count resets each call (it lives on the function object, not in a local variable), or thinking functions are not instances of Object.
*/
