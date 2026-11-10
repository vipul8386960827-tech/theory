/*
==========================================================================================
QUESTION 12: Comparing two Dates with ==, ===, <=, getTime()
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const a = new Date(2024, 0, 1);
const b = new Date(2024, 0, 1);

console.log(a == b);
console.log(a === b);
console.log(a <= b && a >= b);
console.log(a.getTime() === b.getTime());
console.log(+a === +b);
console.log(a - b);
console.log(typeof (a - b), typeof (a + 1));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
false
false
true
true
true
0
number string

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. a and b are two different Date OBJECTS. == and === between two objects compare
   references, not contents -> false and false.
2. Relational operators (<, >, <=, >=) convert objects to primitives using the "number"
   hint. For a Date that is valueOf() -> its timestamp in milliseconds. Both have the
   same timestamp, so a <= b and a >= b are both true -> true.
3. getTime() returns the timestamp numbers; comparing numbers -> true.
4. Unary + also converts to a number -> true.
5. Subtraction converts both to numbers -> 0.
6. a - b is a number. But a + 1: the + operator uses the "default" hint, and Dates
   prefer STRING for the default hint -> "Mon Jan 01 2024 ... 1" -> typeof 'string'.

KEY RULE: Never compare dates with == or ===. Compare a.getTime() === b.getTime() (or
+a === +b). <, >, - work because they convert to numbers.
COMMON MISTAKE: Answering true for a == b because "they're the same date".
*/
