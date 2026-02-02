Array.prototype.myConcat = function(...args) {
  let result = [...this]; // copy original array

  for(let i = 0; i < args.length; i++){
    result.push(args[i]); // push array or value as-is
  }

  return result;
};

/* 
Example / Usage:

console.log([1, 2].myConcat([3, 4], 5, [6])); 
// Output: [1, 2, [3, 4], 5, [6]]  <-- nested arrays are NOT flattened

console.log([1].myConcat(2, 3, [4, 5])); 
// Output: [1, 2, 3, [4, 5]]

console.log([].myConcat([1, 2], [3])); 
// Output: [[1, 2], [3]]

console.log([1, 2].myConcat()); 
// Output: [1, 2] (unchanged)

*/
