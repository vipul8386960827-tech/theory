/*
==========================================================================================
QUESTION 6: arr[10] = x and non-index properties
Topic: Arrays   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const arr = [1, 2, 3];
arr[10] = 99;

console.log(arr.length);
console.log(arr[5]);
console.log(arr.filter(() => true).length);

arr["foo"] = "bar";
arr[-1] = "minus";
arr["2"] = "two";
console.log(arr.length);
console.log(arr[2]);
console.log(JSON.stringify(Object.keys(arr)));
console.log(arr.at(-1));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
11
undefined
4
11
two
["0","1","2","10","foo","-1"]
99

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Arrays are objects with a special length property. When you assign to an INDEX that is
>= length, length becomes index + 1.

arr[10] = 99
  length -> 11. Indexes 3..9 are HOLES (not undefined values).
arr[5] -> undefined (missing index)
arr.filter(() => true).length -> filter skips holes -> only 1, 2, 3, 99 -> 4

arr["foo"] = "bar"
  "foo" is not an array index -> it's an ordinary property. length unchanged.
arr[-1] = "minus"
  -1 is NOT a valid array index (indexes are 0..2^32-2). It is stored as a normal
  property named "-1". length unchanged. arr[-1] does NOT mean "last element".
arr["2"] = "two"
  "2" IS a canonical index string, so it's identical to arr[2] -> replaces 3.

length -> still 11
Object.keys -> integer indexes first in ascending order (0, 1, 2, 10), then other keys
  in insertion order ("foo", "-1").

arr.at(-1)
  .at() supports negative indexes, counting from the END: index length - 1 = 10 -> 99.
  Note it ignores the "-1" property we created.

KEY RULE: Only non-negative integer keys are array indexes and affect length. Negative or string keys become ordinary object properties. Use arr.at(-1) for the last element.
COMMON MISTAKE: Thinking arr[-1] reads the last element (as in Python), or that arr["foo"] increases length.
FOLLOW-UP: What does arr.length print after arr[4294967295] = 1?  Still 11 -- 2^32 - 1 is not a valid index, so it's a normal property.
*/
