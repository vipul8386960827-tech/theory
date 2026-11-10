/*
==========================================================================================
QUESTION 4: Rest in array and object destructuring
Topic: Destructuring, Spread and Rest   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const [first, , third, ...others] = [1, 2, 3, 4, 5];
console.log(first, third, JSON.stringify(others));

const [p, ...empty] = [42];
console.log(p, JSON.stringify(empty));

const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(a, JSON.stringify(rest));

function sum(label, ...nums) {
  return label + ": " + nums.reduce((t, n) => t + n, 0);
}
console.log(sum("total", 1, 2, 3));
console.log(sum.length);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1 3 [4,5]
42 []
1 {"b":2,"c":3}
total: 6
1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
[first, , third, ...others] = [1, 2, 3, 4, 5]
  first  -> index 0 -> 1
  (the empty slot skips index 1)
  third  -> index 2 -> 3
  ...others collects EVERYTHING remaining into a new array -> [4, 5]

[p, ...empty] = [42]
  Nothing remains for the rest element -> it is an EMPTY ARRAY, never undefined.

{ a, ...rest } = { a: 1, b: 2, c: 3 }
  a -> 1; rest gets a NEW object with the remaining own enumerable properties
  -> { b: 2, c: 3 }

function sum(label, ...nums)
  Rest parameters gather the remaining ARGUMENTS into a real array -> [1, 2, 3] -> 6.

sum.length -> 1
  Function.length counts parameters BEFORE the first rest/default parameter, so the
  rest parameter isn't counted.

KEY RULE: Rest collects "everything else" into a new array/object (empty if nothing is left) and must be the LAST element of the pattern.
COMMON MISTAKE: Expecting empty to be undefined, or sum.length to be 2.
FOLLOW-UP: What about const [...r, last] = [1, 2, 3]?  SyntaxError: Rest element must be last element.
*/
