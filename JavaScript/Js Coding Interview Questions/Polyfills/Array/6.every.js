Array.prototype.myEvery = function(callback, thisArg) {
  if (typeof callback !== "function") return console.warn(`${callback} is not a valid function`);

  for (let i = 0; i < this.length; i++) {
    if (i in this && !callback.call(thisArg, this[i], i, this)) {
      return false; // stop immediately if callback returns false
    }
  }

  return true; // all elements passed the test
};

// Example usage:
const arr = [2, 4, 6, 8];

// Check if all numbers are even
console.log(arr.myEvery(v => v % 2 === 0)); // true

// Check if all numbers are greater than 5
console.log(arr.myEvery(v => v > 5)); // false

// Using thisArg
const context = { threshold: 1 };
console.log(arr.myEvery(function(v) { return v > this.threshold }, context)); // true
