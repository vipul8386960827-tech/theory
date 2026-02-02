/* 
Array.prototype.slice Polyfill

Problem Explanation:
- slice() returns a **shallow copy** of a portion of an array into a new array.
- Arguments: slice(start, end)
  - start: starting index (default 0, can be negative)
  - end: ending index (default array.length, can be negative, non-inclusive)
- Does **not mutate** the original array.

Edge cases:
1. Negative indices count from the end of the array.
2. If end < start, returns empty array.
3. If start or end exceeds array bounds, adjusts to valid range.

*/

Array.prototype.mySlice = function(start = 0, end = this.length) {
  let result = [];

  // handle negative indices
  let len = this.length;
  let s = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  let e = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);

  for(let i = s; i < e; i++){
    if(i in this){ // handle sparse arrays
      result.push(this[i]);
    }
  }

  return result;
};

/* 
Example / Usage:

console.log([1, 2, 3, 4].mySlice(1, 3)); 
// Output: [2, 3]

console.log([1, 2, 3, 4].mySlice(-3, -1)); 
// Output: [2, 3]

console.log([1, 2, 3, 4].mySlice(2)); 
// Output: [3, 4] (end defaults to length)

console.log([1, 2, 3].mySlice()); 
// Output: [1, 2, 3] (shallow copy)

console.log([1, 2, 3, 4].mySlice(3, 1)); 
// Output: [] (end < start)

*/
