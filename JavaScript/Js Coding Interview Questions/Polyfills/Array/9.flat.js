/* 
Array.prototype.flat Polyfill using recursion and spread operator

Problem Explanation:
- Recursively flattens an array up to a given depth.
- Default depth = 1.
- Supports depth = Infinity for complete flattening.
- Uses spread operator instead of concat for cleaner code.

*/

Array.prototype.myFlat = function(depth) {
  if(depth === undefined) depth = 1; // default depth
  if(depth < 1) return [...this];    // shallow copy if depth < 1

  let flatten = function(arr, d) {
    let res = [];
    for(let i = 0; i < arr.length; i++){
      if(Array.isArray(arr[i]) && d !== 0){
        // recursively flatten and spread into res
        res.push(...flatten(arr[i], d === Infinity ? Infinity : d - 1));
      } else {
        res.push(arr[i]);
      }
    }
    return res;
  }

  return flatten(this, depth);
};

/* 
Example / Usage:

console.log([1, [2, 3], [4, [5]]].myFlat()); 
// Output: [1, 2, 3, 4, [5]]

console.log([1, [2, [3, [4]]]].myFlat(2)); 
// Output: [1, 2, 3, [4]]

console.log([1, [2, [3, [4]]]].myFlat(Infinity)); 
// Output: [1, 2, 3, 4]

console.log([1, [2, [3]]].myFlat(0)); 
// Output: [1, [2, [3]]]

console.log([1, 2, 3].myFlat()); 
// Output: [1, 2, 3]

*/
