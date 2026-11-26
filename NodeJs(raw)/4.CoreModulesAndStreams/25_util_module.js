/* 25_util_module.js

=====================================================
util Module
=====================================================

Definition (What I should say in the interview):
- "The util module is a collection of helper functions that Node itself uses internally. The ones
   I actually use are **util.promisify** to convert error-first callback functions into
   promise-returning functions, **util.inspect** to print deeply nested objects for debugging,
   **util.format** for printf-style strings, **util.types** for reliable type checks, and
   util.parseArgs / util.styleText in newer Node versions."

-----------------------------------------------------
Key Functions
-----------------------------------------------------
| Function                     | Purpose                                          |
|------------------------------|--------------------------------------------------|
| promisify(fn)                | callback (err, val) API -> returns a Promise      |
| callbackify(asyncFn)         | opposite: async fn -> callback style             |
| inspect(obj, { depth })      | readable string of any object (used by console)  |
| format('%s is %d', a, b)     | printf-style formatting                          |
| types.isPromise / isDate ... | reliable type checks                             |
| isDeepStrictEqual(a, b)      | deep equality without assert                     |
| deprecate(fn, msg)           | warn once when a deprecated function is called   |
| inherits(Child, Parent)      | old-style inheritance (use class extends now)    |

-----------------------------------------------------
Example
-----------------------------------------------------
const util = require('util');
const dns = require('dns');

// promisify a callback API
const lookup = util.promisify(dns.lookup);
lookup('nodejs.org').then((r) => console.log('IP:', r.address)).catch(console.error);

// inspect nested objects (console.log stops at depth 2)
const deep = { a: { b: { c: { d: { e: 1 } } } } };
console.log(deep);                                   // { a: { b: { c: [Object] } } }
console.log(util.inspect(deep, { depth: null, colors: true }));

// format
console.log(util.format('%s has %d items: %j', 'cart', 3, { total: 99 }));
// cart has 3 items: {"total":99}

// deep equality
console.log(util.isDeepStrictEqual({ x: [1, 2] }, { x: [1, 2] })); // true

// mark old function as deprecated
const oldFn = util.deprecate(() => 'old', 'oldFn() is deprecated, use newFn()');
oldFn();   // prints DeprecationWarning once

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- promisify only works with error-first callbacks where the callback is the LAST argument.
- Many core modules already have promise versions (fs/promises, dns/promises, timers/promises),
  so I prefer those over promisify.
- Custom objects can control their inspect output with [util.inspect.custom]().

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How does promisify work internally?
A1: It returns a function that creates a new Promise, calls the original with all args plus a
    callback that rejects on err and resolves on the value.

Q2: Why does console.log show [Object]?
A2: console.log uses util.inspect with default depth 2; pass depth: null to see everything.
*/
