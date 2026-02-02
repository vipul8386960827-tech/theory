// Full Promise constructor polyfill
function MyPromise(executor) {
  this.state = "pending"; // Internal state: 'pending', 'fulfilled', 'rejected'
  this.value = undefined; // Holds resolved value
  this.reason = undefined; // Holds rejection reason
  this.onFulfilledCallbacks = []; // Callbacks for fulfilled state
  this.onRejectedCallbacks = []; // Callbacks for rejected state

  const resolve = (value) => {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.forEach((fn) => fn());
    }
  };

  const reject = (reason) => {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn());
    }
  };

  try {
    executor(resolve, reject); // Execute the executor immediately
  } catch (err) {
    reject(err);
  }
}

// then method for chaining
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };

  const promise2 = new MyPromise((resolve, reject) => {
    if (this.state === "fulfilled") {
      setTimeout(() => {
        try {
          const x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
    } else if (this.state === "rejected") {
      setTimeout(() => {
        try {
          const x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
    } else if (this.state === "pending") {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      });
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      });
    }
  });
  return promise2;
};

// catch method
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// Helper function to handle returned promises (Promises/A+ spec)
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) return reject(new TypeError("Chaining cycle detected"));

  if (x && (typeof x === "object" || typeof x === "function")) {
    let called = false;
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
}

// Example usage
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});

promise
  .then((result) => {
    console.log(result); // "Success!" after 1s
    return "Next step";
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
