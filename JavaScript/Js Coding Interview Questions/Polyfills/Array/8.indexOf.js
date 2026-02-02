Array.prototype.myIndexOf = function(searchElement, fromIndex = 0) {
  if (fromIndex < 0) fromIndex = Math.max(0, this.length + fromIndex);

  for (let i = fromIndex; i < this.length; i++) {
    if (i in this && this[i] === searchElement) return i;
  }

  return -1;
};

/* Example usage */
const arr = [1, 2, , 3, 2, 5]; // index 2 is a hole

console.log(arr.myIndexOf(2));        // 1
console.log(arr.myIndexOf(2, 2));     // 4
console.log(arr.myIndexOf(3));        // 3
console.log(arr.myIndexOf(5));        // 5
console.log(arr.myIndexOf(4));        // -1
console.log(arr.myIndexOf(undefined)); // -1 (hole skipped)
console.log(arr.myIndexOf(1, -10));   // 0
