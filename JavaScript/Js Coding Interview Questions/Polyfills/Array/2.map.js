Array.prototype.myMap = function(cb, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // skip holes but include undefined values
      result[i] = cb.call(thisArg, this[i], i, this);
    }
  }
  return result;
};


// Example usage:
const arr = [1, 2, 3, 4, 5];
const doubled = arr.myMap(v => v * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
