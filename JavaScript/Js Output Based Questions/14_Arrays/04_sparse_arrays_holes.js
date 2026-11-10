/*
==========================================================================================
QUESTION 4: Holes in sparse arrays
Topic: Arrays   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const arr = [1, , 3];

console.log(arr.length);
console.log(arr[1], 1 in arr);

let calls = 0;
arr.forEach(() => calls++);
console.log("forEach calls:", calls);

const doubled = arr.map((x) => x * 2);
console.log(doubled.length, 1 in doubled, JSON.stringify(Object.keys(doubled)));

for (const v of arr) console.log("for...of:", v);

console.log(JSON.stringify(arr));
console.log(JSON.stringify(Array.from(arr)), 1 in Array.from(arr));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
undefined false
forEach calls: 2
3 false ["0","2"]
for...of: 1
for...of: undefined
for...of: 3
[1,null,3]
[1,null,3] true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
[1, , 3] has a HOLE at index 1: there is NO property "1" at all. It is not the same
as storing undefined there (console shows it as "empty" / "<1 empty item>").

arr.length -> 3 (length counts the hole)
arr[1]     -> reading a missing property gives undefined
1 in arr   -> false, the index does not exist

forEach skips holes -> the callback runs only for indexes 0 and 2 -> 2 calls.
(Same for map, filter, some, every, reduce.)

map skips holes but PRESERVES them in the result:
  doubled is [2, <hole>, 6] -> length 3, 1 in doubled is false, keys ["0","2"].

for...of uses the array ITERATOR, which reads every index from 0 to length-1
  -> it visits the hole and yields undefined. (Spread [...arr] does the same.)

JSON.stringify(arr) -> holes become null -> [1,null,3]

Array.from(arr) also iterates every index, so it converts the hole into a REAL
undefined element -> 1 in Array.from(arr) is true. (JSON shows that undefined as null.)

KEY RULE: Holes are missing indexes. forEach/map/filter/reduce/Object.keys skip them; for...of, spread, Array.from, join and JSON treat them as undefined.
COMMON MISTAKE: Expecting forEach to run 3 times, or thinking [1, , 3] is identical to [1, undefined, 3].
FOLLOW-UP: Does includes find the hole?  [1, , 3].includes(undefined) is true, but [1, , 3].indexOf(undefined) is -1 (indexOf skips holes).
*/
