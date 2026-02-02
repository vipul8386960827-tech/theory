Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") {
    console.log(`${callback} is not a function`);
    return;
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== undefined && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

// Example usage 1: Filter even numbers
const arr = [1, 2, 3, 4, 5];
const even = arr.myFilter(v => v % 2 === 0);
console.log(even); // [2, 4]

// Example usage 2: Filter numbers greater than 3
const greaterThanThree = arr.myFilter(v => v > 3);
console.log(greaterThanThree); // [4, 5]

// Example usage 3: Using thisArg
const context = { threshold: 3 };
const filtered = arr.myFilter(function(v) {
  return v > this.threshold;
}, context);
console.log(filtered); // [4, 5]
