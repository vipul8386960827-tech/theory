/*
==========================================================================================
QUESTION 6: Spread vs destructuring - how much of the generator runs?
Topic: Generators and Iterators   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function* gen() {
  try {
    console.log('A');
    yield 1;
    console.log('B');
    yield 2;
    console.log('C');
  } finally {
    console.log('closed');
  }
}

const [first] = gen();
console.log('first =', first);

console.log('max =', Math.max(...gen()));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
A
closed
first = 1
A
B
C
closed
max = 2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Generators are LAZY: code only runs when someone asks for the next value.

const [first] = gen();
1. Destructuring needs only one value, so it calls next() once -> logs 'A', gets 1.
2. Destructuring then sees that the iterator is not done, so it CLOSES it by calling
   iterator.return(). That runs the pending finally block -> logs 'closed'.
3. 'B' and 'C' never run. Then 'first = 1' is printed.

Math.max(...gen())
4. Spread needs ALL values, so it keeps calling next(): 'A' (1), 'B' (2), 'C', then the
   body ends - the finally block runs on normal completion -> 'closed'.
5. The collected values [1, 2] are passed to Math.max -> 'max = 2'.

KEY RULE: Consumers pull values one at a time. Destructuring/for...of with break/early
exit call return() on the iterator (triggering finally); spread consumes everything.
COMMON MISTAKE: Thinking the whole generator body (A, B, C) runs for `const [first]`.
*/
