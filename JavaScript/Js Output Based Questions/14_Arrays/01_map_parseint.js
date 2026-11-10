/*
==========================================================================================
QUESTION 1: ["1", "2", "3"].map(parseInt)
Topic: Arrays   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(String(["1", "2", "3"].map(parseInt)));
console.log(String(["10", "10", "10", "10"].map(parseInt)));
console.log(String(["1", "2", "3"].map(Number)));
console.log(String(["1", "2", "3"].map((s) => parseInt(s, 10))));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1,NaN,NaN
10,NaN,2,3
1,2,3
1,2,3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
map calls its callback with THREE arguments: (element, index, array).
parseInt accepts TWO parameters: (string, radix). So the INDEX becomes the RADIX:

["1", "2", "3"].map(parseInt)
  parseInt("1", 0) -> radix 0 means "not specified" -> base 10 -> 1
  parseInt("2", 1) -> radix 1 is invalid (must be 2..36) -> NaN
  parseInt("3", 2) -> base 2 only has digits 0 and 1; "3" is invalid -> NaN
  -> [1, NaN, NaN]

["10", "10", "10", "10"].map(parseInt)
  parseInt("10", 0) -> 10
  parseInt("10", 1) -> NaN (invalid radix)
  parseInt("10", 2) -> binary 10 = 2
  parseInt("10", 3) -> base-3 10 = 3
  -> [10, NaN, 2, 3]

.map(Number)
  Number takes only one argument and ignores the rest -> [1, 2, 3]

.map((s) => parseInt(s, 10))
  Explicit wrapper -> [1, 2, 3]

(String(...) is used so NaN prints clearly; JSON.stringify would show NaN as null.)

KEY RULE: Passing a function reference to map/forEach/filter passes (value, index, array); make sure the function doesn't use the extra arguments in an unexpected way.
COMMON MISTAKE: Answering [1, 2, 3].
FOLLOW-UP: What does ["1", "2", "3"].map(parseFloat) give?  [1, 2, 3] -- parseFloat has only one parameter.
*/
