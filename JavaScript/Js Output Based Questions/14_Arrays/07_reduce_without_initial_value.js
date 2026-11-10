/*
==========================================================================================
QUESTION 7: reduce without an initial value
Topic: Arrays   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log([1, 2, 3].reduce((acc, x) => acc + x));
console.log([1, 2, 3].reduce((acc, x) => acc + x, ""));
console.log([].reduce((acc, x) => acc + x, 0));

let calls = 0;
console.log([5].reduce(() => { calls++; return "never"; }));
console.log("calls:", calls);

try {
  [].reduce((acc, x) => acc + x);
} catch (e) {
  console.log(e.name + ": " + e.message);
}

const words = ["a", "b", "c"];
console.log(words.reduce((acc, w, i) => acc + w + i));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
6
123
0
5
calls: 0
TypeError: Reduce of empty array with no initial value
ab1c2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
arr.reduce(callback)            -> acc starts as arr[0], iteration starts at index 1
arr.reduce(callback, initial)   -> acc starts as initial, iteration starts at index 0

[1, 2, 3].reduce((acc, x) => acc + x)
  acc = 1 -> 1 + 2 = 3 -> 3 + 3 = 6

[1, 2, 3].reduce(..., "")
  acc = "" -> "" + 1 = "1" -> "12" -> "123" (string concatenation)

[].reduce(..., 0)
  Empty array with an initial value -> the callback never runs -> returns 0

[5].reduce(cb)   (single element, no initial value)
  acc = 5, there is nothing left to iterate -> returns 5 WITHOUT calling cb -> calls: 0

[].reduce(cb)    (empty, no initial value)
  There is no first element to use as acc -> TypeError: Reduce of empty array with
  no initial value

words.reduce((acc, w, i) => acc + w + i)
  No initial value, so acc = "a" and the loop starts at index 1:
  i = 1: "a" + "b" + 1 = "ab1"
  i = 2: "ab1" + "c" + 2 = "ab1c2"
  (Index 0 is never passed to the callback.)

KEY RULE: Always pass an initial value to reduce. Without it, the first element is the accumulator, the index starts at 1, and an empty array throws.
COMMON MISTAKE: Answering 0 or undefined for [].reduce(cb), or "a0b1c2" for the last line.
FOLLOW-UP: What does [[1], [2]].reduce((a, b) => a.concat(b)) give?  [1, 2].
*/
