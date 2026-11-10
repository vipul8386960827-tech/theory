/*
==========================================================================================
QUESTION 8: The comma operator
Topic: Operators, typeof and Numbers   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

let x = (1, 2, 3);
console.log(x);

let y = (x++, x * 2);
console.log(x, y);

function f() {
  return (console.log("side effect"), "result");
}
console.log(f());

console.log((1, 2), 3);

let n = 1, m = 2;
console.log(n, m);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
4 8
side effect
result
2 3
1 2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The comma OPERATOR (expr1, expr2, ..., exprN) evaluates every expression from left to
right and returns the value of the LAST one.

let x = (1, 2, 3)
  1 and 2 are evaluated and thrown away -> x = 3

let y = (x++, x * 2)
  x++ runs first (x becomes 4), then x * 2 = 8 is the result -> "4 8"

return (console.log("side effect"), "result")
  console.log runs (prints "side effect"), then "result" is returned and printed.

console.log((1, 2), 3)
  Inside the call parentheses, commas normally SEPARATE ARGUMENTS. The inner (1, 2) is a
  parenthesised comma expression -> 2. So the call is console.log(2, 3) -> "2 3".

let n = 1, m = 2
  This comma is NOT the comma operator; it is part of the declaration syntax that
  declares multiple variables.

KEY RULE: The comma operator evaluates all operands left to right and yields the last one. Commas in argument lists, array literals and declarations are separators, not the operator.
COMMON MISTAKE: Answering 1 for (1, 2, 3), or printing "1 2 3" for console.log((1, 2), 3).
FOLLOW-UP: What is let z = 1, 2; ?  SyntaxError -- in a declaration the comma expects another identifier. let z = (1, 2); gives z = 2.
*/
