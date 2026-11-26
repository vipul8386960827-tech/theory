/* 1_error_first_callbacks.js

=====================================================
Error-First Callbacks
=====================================================

Definition (What I should say in the interview):
- "Error-first callback is the **Node.js convention** for async callbacks: the **first argument
   is always the error** (null or undefined if everything went fine) and the following
   arguments are the result. Core modules like fs, dns and crypto follow it. As a caller I must
   check the error first and return early, otherwise I end up using undefined data. It is
   also the pattern that util.promisify expects when converting callbacks to promises."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Signature -> callback(err, result1, result2...).
2. err is null/undefined on success, an Error object on failure.
3. Always "if (err) return ..." -> the return stops the rest of the code from running.
4. The callback should be called exactly once (never both error and success).
5. util.promisify() works only with functions that follow this convention.

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');
const util = require('util');

fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Could not read config:', err.code); // e.g. ENOENT
    return;                                            // stop here
  }
  console.log('Config:', JSON.parse(data));
});

// Writing my own error-first function
function divide(a, b, cb) {
  if (b === 0) return cb(new Error('Division by zero'));
  cb(null, a / b);
}
divide(10, 2, (err, result) => {
  if (err) return console.error(err.message);
  console.log(result); // 5
});

// Converting to a promise
const readFileAsync = util.promisify(fs.readFile);
readFileAsync('config.json', 'utf8').then(console.log).catch(console.error);

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Forgetting "return" after cb(err) -> callback is called twice (error + success).
- Throwing inside an async callback instead of passing the error -> try/catch outside cannot catch it.
- Passing a string instead of an Error object -> no stack trace.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is the error the first argument and not the last?
A1: Because the number of result arguments can vary, but there is always exactly one error slot.
    Putting it first forces the developer to look at it before using the result.

Q2: What happens if a callback is called twice?
A2: Bugs like "Cannot set headers after they are sent" in Express or double DB writes.
    That is why we always return after calling the callback with an error.

Q3: Are error-first callbacks still used today?
A3: In legacy code and some core APIs yes, but in new code I prefer promises/async-await
    (fs/promises, util.promisify) because errors propagate with try/catch.
*/
