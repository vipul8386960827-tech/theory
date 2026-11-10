/*
==========================================================================================
QUESTION 12: Frozen arrays - silent failure vs thrown error
Topic: Object Property Tricks   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code? (non-strict mode)
*/

const arr = Object.freeze([1, 2, 3]);

arr[0] = 100;
arr.length = 0;
console.log(arr.join(","), arr.length);

try {
  arr.push(4);
  console.log("push worked");
} catch (e) {
  console.log("push:", e.name);
}

try {
  arr.sort((x, y) => y - x);
  console.log("sort worked");
} catch (e) {
  console.log("sort:", e.name);
}

const sortedCopy = [...arr].sort((x, y) => y - x);
console.log(sortedCopy.join(","), "|", arr.join(","));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1,2,3 3
push: TypeError
sort: TypeError
3,2,1 | 1,2,3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Arrays are objects, so Object.freeze works on them: indices and length become read-only and
no new elements can be added.

1. arr[0] = 100 and arr.length = 0
   These are plain ASSIGNMENTS written by our code. In non-strict mode a failed assignment
   is silently ignored -> the array is still [1, 2, 3] with length 3.

2. arr.push(4)
   Built-in array methods are specified to perform their writes in "throw on failure" mode,
   regardless of whether YOUR code is strict. push tries to add index 3 to a non-extensible
   object -> TypeError ("Cannot add property 3, object is not extensible").

3. arr.sort(...)
   sort mutates in place, and writing to a frozen index fails -> TypeError
   (pop, shift, unshift, splice, reverse, fill behave the same way).

4. [...arr] creates a NEW, unfrozen array -> sorting the copy works; the original is intact.

KEY RULE: Direct assignments to a frozen object fail silently (non-strict), but mutating
          built-in methods like push/sort ALWAYS throw on a frozen array.
COMMON MISTAKE: Assuming push also fails silently because the code is not in strict mode.
FOLLOW-UP: Non-mutating methods (map, filter, slice, concat, toSorted) work fine on a frozen
          array because they return a new array.
*/
