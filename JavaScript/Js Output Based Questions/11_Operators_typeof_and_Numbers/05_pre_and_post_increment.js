/*
==========================================================================================
QUESTION 5: Pre-increment vs post-increment
Topic: Operators, typeof and Numbers   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

let a = 1;
let b = a++ + ++a;
console.log(a, b);

let i = 0;
const r = i++ + i++ + ++i;
console.log(i, r);

let c = 5;
c = c++;
console.log(c);

let s = "5";
s++;
console.log(s, typeof s);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3 4
3 4
5
6 number

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
x++ (postfix): returns the OLD value, then increments x.
++x (prefix) : increments x first, then returns the NEW value.
Operands are evaluated strictly left to right.

let b = a++ + ++a;           (a starts at 1)
  a++  -> returns 1, a becomes 2
  ++a  -> a becomes 3, returns 3
  b = 1 + 3 = 4, a = 3        -> "3 4"

const r = i++ + i++ + ++i;   (i starts at 0)
  i++ -> 0 (i = 1)
  i++ -> 1 (i = 2)
  ++i -> 3 (i = 3)
  r = 0 + 1 + 3 = 4, i = 3    -> "3 4"

c = c++;
  1. c++ evaluates to the OLD value 5, and sets c to 6.
  2. Then the assignment writes that old value 5 back into c.
  -> c is 5. (The increment is overwritten.)

s++ with s = "5"
  ++/-- always apply ToNumber: "5" -> 5 -> 6. s is now the NUMBER 6.
  (Unlike s += 1, which would give the string "51".)

KEY RULE: Postfix returns the value before the change, prefix returns the value after; side effects happen immediately as each operand is evaluated.
COMMON MISTAKE: Answering 6 for c = c++, believing the increment happens "after the statement".
FOLLOW-UP: let x = 1; x = x++ + x;  What is x?  3 -- x++ gives 1 (x becomes 2), then + x reads 2, so 1 + 2 = 3.
*/
