/*
==========================================================================================
QUESTION 11: splice vs slice
Topic: Arrays   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const arr = [1, 2, 3, 4, 5];

const sliced = arr.slice(1, 3);
console.log(JSON.stringify(sliced), JSON.stringify(arr));

const spliced = arr.splice(1, 2);
console.log(JSON.stringify(spliced), JSON.stringify(arr));

const inserted = arr.splice(1, 0, "a", "b");
console.log(JSON.stringify(inserted), JSON.stringify(arr));

console.log(JSON.stringify(arr.slice(-2)));
console.log(JSON.stringify(arr.splice(-1)), JSON.stringify(arr));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[2,3] [1,2,3,4,5]
[2,3] [1,4,5]
[] [1,"a","b",4,5]
[4,5]
[5] [1,"a","b",4]

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
slice(start, end)              -> returns a COPY of elements from start up to (but NOT
                                  including) end. Does NOT modify the array.
splice(start, deleteCount, ...items) -> MODIFIES the array: removes deleteCount elements
                                  starting at start, inserts items there, and returns an
                                  array of the REMOVED elements.

arr.slice(1, 3)
  indexes 1 and 2 -> [2, 3]; arr unchanged [1, 2, 3, 4, 5]

arr.splice(1, 2)
  the second argument is a COUNT, not an end index: remove 2 items starting at index 1
  -> removed [2, 3]; arr becomes [1, 4, 5]

arr.splice(1, 0, "a", "b")
  remove 0 items, insert "a", "b" at index 1 -> returns [] (nothing removed)
  arr becomes [1, "a", "b", 4, 5]

arr.slice(-2)
  negative = count from the end -> last 2 -> [4, 5]

arr.splice(-1)
  no deleteCount -> remove everything from index length-1 to the end -> [5]
  arr becomes [1, "a", "b", 4]

KEY RULE: slice(start, end) copies and never mutates; splice(start, count, ...items) mutates and returns what it removed.
COMMON MISTAKE: Treating splice's second argument as an end index (expecting [2] to be removed), or expecting splice to return the new array.
FOLLOW-UP: Non-mutating splice?  arr.toSpliced(1, 2) (ES2023) returns a new array and leaves arr intact.
*/
