/* 
Array.prototype.every Polyfill

Problem Explanation:
- every() tests whether **all elements** in the array pass the test implemented by the provided function.
- Returns **true** if callback returns true for all elements.
- Returns **false** if callback returns false for any element.
- Does **not** mutate the original array.

Edge cases:
1. Empty array returns true.
2. Callback receives three arguments: (element, index, array).
3. Can accept `thisArg` to set the `this` inside callback.

*/

Array.prototype.myEvery = function(callback, thisArg) {
  for(let i = 0; i < this.length; i++){
    if(i in this){ // skip holes in sparse arrays
      if(!callback.call(thisArg, this[i], i, this)){
        return false; // stop at first falsy callback result
      }
    }
  }
  return true; // all elements passed
};

/* 
Example / Usage:

console.log([2, 4, 6].myEvery(x => x % 2 === 0)); 
// Output: true  (all even)

console.log([2, 3, 6].myEvery(x => x % 2 === 0)); 
// Output: false (3 is not even)

console.log([].myEvery(x => x > 0)); 
// Output: true (empty array returns true)

console.log([1, 2, 3].myEvery(function(x){ return x < this.limit }, {limit: 5})); 
// Output: true (thisArg works)

*/
