/*
==========================================================================================
QUESTION 9: Shared state on the prototype (primitive vs array)
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function Counter() {}
Counter.prototype.count = 0;
Counter.prototype.items = [];

const c1 = new Counter();
const c2 = new Counter();

c1.count++;
c1.items.push('x');

console.log(c1.count, c2.count);
console.log(c1.items.length, c2.items.length);
console.log(c1.hasOwnProperty('count'), c1.hasOwnProperty('items'));

c2.items = ['own'];
c1.items.push('y');
console.log(c2.items.length, Counter.prototype.items.length);

Counter.prototype = { count: 100 };
const c3 = new Counter();
console.log(c3.count, c2.count, c1 instanceof Counter);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1 0
1 1
true false
1 2
100 0 false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. c1.count++ means c1.count = c1.count + 1. READING c1.count finds 0 on the prototype,
   but WRITING creates an OWN property count = 1 on c1. c2 still reads the prototype's
   0 -> '1 0'.
2. c1.items.push('x') only READS c1.items (finds the prototype's array) and then mutates
   that single shared array. No own property is created -> both see length 1.
3. So c1 has own 'count' but not own 'items' -> true false.
4. c2.items = ['own'] creates an own property on c2 (length 1). c1.items still points to
   the shared prototype array, which now has 'x' and 'y' -> '1 2'.
5. Replacing Counter.prototype with a new object only affects objects created AFTER:
   c3 gets the new prototype (count 100). c2 keeps its old prototype (count 0).
   instanceof checks the CURRENT Counter.prototype, which is not in c1's chain -> false.

KEY RULE: Assignment creates/updates an own property (shadowing); mutation of a
reference found on the prototype changes the shared object. Never put mutable arrays or
objects on a prototype - initialise them in the constructor.
COMMON MISTAKE: Answering '1 1' for count, or '1 0' for items.
*/
