Object.prototype.myKeys = function () {
  if (this === null || this === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const obj = Object(this);
  const keys = [];

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(key);
    }
  }

  return keys;
};

// Example usage
const obj = { a: 1, b: 2, c: 3 };
console.log(obj.myKeys()); // ["a", "b", "c"]

// Example with primitive string
console.log("hi".myKeys()); // ["0", "1"]

// Example with number
console.log((123).myKeys()); // []
