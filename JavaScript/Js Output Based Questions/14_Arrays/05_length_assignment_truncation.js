/*
==========================================================================================
QUESTION 5: Assigning to array.length
Topic: Arrays   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const arr = [1, 2, 3, 4, 5];

arr.length = 2;
console.log(JSON.stringify(arr));

arr.length = 4;
console.log(arr.length, String(arr), 3 in arr);

arr.length = 0;
console.log(arr.length, arr[0]);

try {
  arr.length = -1;
} catch (e) {
  console.log(e.name + ": " + e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[1,2]
4 1,2,, false
0 undefined
RangeError: Invalid array length

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
length is a writable property, and assigning to it CHANGES the array.

arr.length = 2
  Shrinking DELETES every element with index >= 2. Elements 3, 4, 5 are gone for good.
  -> [1, 2]

arr.length = 4
  Growing does NOT create elements; it only adds HOLES (empty slots).
  -> [1, 2, <2 empty items>]
  String(arr) -> join(",") prints holes as "" -> "1,2,,"
  3 in arr -> false (index 3 doesn't actually exist)
  (The deleted 3, 4, 5 do NOT come back.)

arr.length = 0
  A common way to empty an array IN PLACE (every reference to it sees the empty array).
  arr[0] -> undefined.

arr.length = -1
  length must be an integer between 0 and 2^32 - 1 -> RangeError: Invalid array length

KEY RULE: Setting length smaller truncates (permanently removes) elements; setting it larger only adds holes.
COMMON MISTAKE: Expecting the old elements to reappear after increasing length again, or expecting undefined values (instead of holes).
FOLLOW-UP: arr = [] vs arr.length = 0?  arr = [] rebinds the variable (other references still see the old array); arr.length = 0 empties the shared array itself.
*/
