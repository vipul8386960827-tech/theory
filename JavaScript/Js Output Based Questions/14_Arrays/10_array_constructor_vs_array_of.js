/*
==========================================================================================
QUESTION 10: Array(3) vs Array.of(3)
Topic: Arrays   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(Array(3).length, 0 in Array(3));
console.log(JSON.stringify(Array.of(3)));
console.log(JSON.stringify(Array(3, 4)));
console.log(JSON.stringify(Array("3")));

console.log(Array(3).map((_, i) => i).length, 0 in Array(3).map((_, i) => i));
console.log(JSON.stringify(Array.from({ length: 3 }, (_, i) => i)));
console.log(JSON.stringify([...Array(3)].map((_, i) => i)));
console.log(JSON.stringify(Array(3).fill(0)));

try {
  Array(2.5);
} catch (e) {
  console.log(e.name + ": " + e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3 false
[3]
[3,4]
["3"]
3 false
[0,1,2]
[0,1,2]
[0,0,0]
RangeError: Invalid array length

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The Array constructor behaves differently depending on its arguments:
  - exactly ONE argument that is a NUMBER -> it is the LENGTH; creates that many HOLES
  - anything else -> the arguments become the elements

Array(3)       -> length 3, all holes (0 in Array(3) is false) -> [ <3 empty items> ]
Array.of(3)    -> Array.of always treats arguments as elements -> [3]
Array(3, 4)    -> two arguments -> elements -> [3, 4]
Array("3")     -> one argument but a STRING -> element -> ["3"]

Array(3).map((_, i) => i)
  map SKIPS holes, so the callback never runs; the result is still 3 holes.
  -> length 3, 0 in result is false. (A very common bug!)

Array.from({ length: 3 }, (_, i) => i)
  Array.from reads indexes 0..2 from the array-like (each undefined) and maps them
  -> [0, 1, 2]

[...Array(3)].map(...)
  Spread uses the iterator, which turns holes into real undefined values, so map now
  visits every index -> [0, 1, 2]

Array(3).fill(0) -> fill writes every index, including holes -> [0, 0, 0]

Array(2.5)
  A single number argument must be a valid integer length -> RangeError.

KEY RULE: Array(n) creates n holes and map skips holes. Use Array.from({ length: n }, fn), Array(n).fill(v), or Array.of for single numeric elements.
COMMON MISTAKE: Expecting Array(3).map((_, i) => i) to be [0, 1, 2].
FOLLOW-UP: What is new Array(3).join("-")?  "--" -- 3 holes joined by 2 separators.
*/
