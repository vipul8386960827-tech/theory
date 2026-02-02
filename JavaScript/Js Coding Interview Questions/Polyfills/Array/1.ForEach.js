Array.prototype.myForEach = function (cb, thisArg) {
  if (typeof cb !== "function") {
    console.log(`${cb} is not a function`);
    return;
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // console.log(thisArg);
      cb.call(thisArg, this[i], i, this);
    }
  }
};

const arr = [1, 2, 3];
arr.myForEach(
  function (v, i) {
    console.log(i, v * this.factor);
  },
  { factor: 3 } // this is thisArg we generally dont use it because we use arrow functions here
);
