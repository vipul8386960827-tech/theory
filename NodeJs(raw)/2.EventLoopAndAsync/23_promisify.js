/* 23_promisify.js

=====================================================
util.promisify
=====================================================

Definition (What I should say in the interview):
- "util.promisify converts a function that follows the **error-first callback** style, meaning
   its last argument is a callback (err, value), into a function that **returns a Promise**. That
   way I can use older callback APIs with async/await. Today many core modules already have
   Promise versions like fs/promises and timers/promises, so I use promisify mostly for
   third-party or legacy callback code."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Works only with the (err, value) last-argument callback convention.
2. If err is truthy -> Promise rejects; otherwise resolves with value.
3. Callbacks with multiple result values: only the first is used unless the function defines
   util.promisify.custom (e.g. dns.lookup gives { address, family }).
4. Methods that use "this" need binding: promisify(obj.method).bind(obj).
5. Reverse direction: util.callbackify(asyncFn).

-----------------------------------------------------
Example
-----------------------------------------------------
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

// Custom legacy function
function getUser(id, cb) {
  setTimeout(() => (id ? cb(null, { id, name: 'Ravi' }) : cb(new Error('id required'))), 50);
}
const getUserAsync = util.promisify(getUser);

(async () => {
  const src = await readFile(__filename, 'utf8');
  console.log('file length:', src.length);

  console.log(await getUserAsync(1));          // { id: 1, name: 'Ravi' }

  try { await getUserAsync(0); }
  catch (e) { console.log(e.message); }        // id required
})();

-----------------------------------------------------
Manual Version (good to know how it works)
-----------------------------------------------------
const myPromisify = (fn) => (...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (err, value) => (err ? reject(err) : resolve(value))));

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Promisifying a function whose callback is not error-first, e.g. setTimeout(cb, ms) - the
  argument order is wrong. Node defines a custom version for it, or use timers/promises.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Do you still need promisify for fs?
A1: No, use require('fs/promises') or fs.promises.

Q2: What is util.promisify.custom?
A2: A symbol a function can define to tell promisify which Promise-returning version to use.

Q3: What happens if the original function throws synchronously?
A3: The returned Promise rejects with that error.
*/
