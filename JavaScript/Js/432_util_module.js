/* 432_util_module.js

=====================================================
Util Module in Node.js
=====================================================

What I should say in the interview:
- "The `util` module in Node.js provides helper functions to make 
   debugging, formatting, and working with asynchronous code easier. 
   It includes utilities for string formatting, object inspection, 
   converting callback-based functions to promises, and inheritance."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **util.format()** → Similar to `printf`, allows string formatting.
2. **util.inspect()** → Converts objects into readable strings, useful for debugging.
3. **util.promisify()** → Converts callback-style functions to promises.
4. **util.callbackify()** → Converts promises back to callback style.
5. **util.types** → Provides type-checking utilities.
6. **util.inherits()** → Helps set up prototype inheritance (older style, not often used now).
7. **Deprecation utilities** → `util.deprecate()` marks functions as deprecated.

-----------------------------------------------------
Basic Example (util.format)
-----------------------------------------------------
const util = require('util');

console.log(util.format('Hello %s, your score is %d', 'Alice', 95));
// Output: Hello Alice, your score is 95

-----------------------------------------------------
Example (util.inspect)
-----------------------------------------------------
const obj = { name: 'John', age: 30, nested: { a: 1, b: 2 } };
console.log(util.inspect(obj, { showHidden: false, depth: 2, colors: true }));

-----------------------------------------------------
Example (util.promisify)
-----------------------------------------------------
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

readFile('example.txt', 'utf8')
  .then(data => console.log('File:', data))
  .catch(err => console.error(err));

-----------------------------------------------------
Example (util.callbackify)
-----------------------------------------------------
async function asyncFn() {
  return 'Hello from async function';
}

const callbackFn = util.callbackify(asyncFn);

callbackFn((err, result) => {
  if (err) throw err;
  console.log(result);
});

-----------------------------------------------------
Example (util.deprecate)
-----------------------------------------------------
const deprecatedFunction = util.deprecate(() => {
  console.log('This is deprecated');
}, 'deprecatedFunction is deprecated. Use newFunction instead.');

deprecatedFunction();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Debugging complex objects with `util.inspect`.
- Converting older callback-based APIs into Promise-based ones.
- Logging formatted messages.
- Handling deprecations in libraries.
- Type checking for advanced cases.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `util.promisify` is very useful when working with older Node.js 
   APIs that still use callbacks.
2. `util.inspect` is often used in debugging, logging, and testing.
3. `util.inherits` is rarely needed in modern code (ES6 classes are preferred).
4. Deprecation helps in migration when APIs evolve.
5. Type utilities help validate objects without external libraries.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the `util` module as a **Swiss Army knife** for Node.js:
  - It doesn’t do one big thing but provides small tools 
    that make working with Node.js smoother and faster.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between `util.promisify` and writing `new Promise` manually?  
A1: `util.promisify` automatically wraps standard callback-style functions 
    into promises, reducing boilerplate code.

Q2: When would you use `util.inspect` instead of `console.log`?  
A2: `util.inspect` gives more control over depth, colors, and hidden properties, 
    making it better for debugging complex objects.

Q3: Is `util.inherits` still recommended in modern Node.js code?  
A3: No, ES6 classes and `extends` should be preferred for inheritance.

Q4: How can `util.deprecate` help in library development?  
A4: It warns users that a function is outdated and suggests alternatives, 
    allowing smoother API migrations.

Q5: Can you promisify every function with `util.promisify`?  
A5: No, it only works with standard Node.js-style callbacks `(err, result)`. 
    Functions with multiple callback arguments may need manual promisification.
*/
