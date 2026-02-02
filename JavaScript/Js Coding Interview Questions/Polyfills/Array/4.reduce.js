Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== "function") {
    console.log(`${callback} is not a function`);
    return;
  }

  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    while (startIndex < this.length && this[startIndex] === undefined) {
      startIndex++;
    }
    accumulator = this[startIndex];
    startIndex++;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (this[i] !== undefined) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

const arr = [1, 2, 3, 4, 5];
const sum = arr.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15
