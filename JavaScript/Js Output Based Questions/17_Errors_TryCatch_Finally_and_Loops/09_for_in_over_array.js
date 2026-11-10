/*
==========================================================================================
QUESTION 9: for...in over an array
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const arr = [10, 20, 30];
arr.extra = 'x';

for (const i in arr) {
  console.log(i, typeof i);
}

for (const i in ['a', 'b']) {
  console.log(i + 1);
}

for (const v of arr) {
  console.log('of:', v);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
0 string
1 string
2 string
extra string
01
11
of: 10
of: 20
of: 30

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. for...in iterates over enumerable PROPERTY NAMES (keys), not values. Property names
   are always strings, so the indexes come out as '0', '1', '2' (typeof 'string').
2. It also includes any other enumerable own (and inherited!) properties, so the custom
   'extra' property is visited too.
3. Because i is a string, i + 1 is string concatenation: '0' + 1 -> '01', '1' + 1 -> '11'.
4. for...of uses the array iterator: it gives VALUES, only for the indexed elements, and
   ignores non-index properties like 'extra' -> 10, 20, 30.

KEY RULE: for...in = string keys (including extra/inherited enumerable ones);
for...of = values. Use for...of / forEach / a classic for loop for arrays.
COMMON MISTAKE: Expecting for...in to print 10, 20, 30, or expecting i + 1 to be 1, 2.
*/
