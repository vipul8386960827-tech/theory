/*
==========================================================================================
QUESTION 3: sort() and reverse() mutate the array
Topic: Arrays   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const nums = [3, 1, 2];
const sorted = nums.sort();
console.log(JSON.stringify(nums), JSON.stringify(sorted), sorted === nums);

const letters = ["a", "b", "c"];
const reversed = letters.reverse();
reversed.push("z");
console.log(JSON.stringify(letters));

const original = [3, 1, 2];
const safe = original.toSorted();
console.log(JSON.stringify(original), JSON.stringify(safe));

const copy = [...original].sort();
console.log(JSON.stringify(original), JSON.stringify(copy));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[1,2,3] [1,2,3] true
["c","b","a","z"]
[3,1,2] [1,2,3]
[3,1,2] [1,2,3]

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
nums.sort()
  Sorts IN PLACE and returns a reference to the SAME array (not a copy).
  So nums is sorted, sorted is just another name for it, and sorted === nums is true.

letters.reverse()
  Also in place and returns the same array. reversed.push("z") therefore changes
  letters too -> ["c", "b", "a", "z"].

original.toSorted()   (ES2023, all modern browsers)
  The non-mutating version: returns a NEW sorted array and leaves original untouched.
  Similar newer methods: toReversed(), toSpliced(), with(index, value).

[...original].sort()
  The classic pattern before ES2023: copy first, then sort the copy.

KEY RULE: sort, reverse, splice, push, pop, shift, unshift, fill and copyWithin mutate the array. sort/reverse return the same array, not a copy.
COMMON MISTAKE: Writing const sorted = arr.sort() and assuming arr is unchanged (a classic bug, e.g. sorting React state directly).
FOLLOW-UP: Which methods never mutate?  map, filter, slice, concat, flat, toSorted, toReversed, toSpliced, with, reduce, join.
*/
