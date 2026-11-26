/* 14_catchasync_wrapper.js

=====================================================
catchAsync Wrapper (asyncHandler)
=====================================================

Definition (What I should say in the interview):
- "In Express 4, if an async route handler rejects, Express does not catch it, so the request
   hangs and we get an unhandled rejection. **catchAsync** is a small **higher-order function**
   that takes my async handler and returns a new middleware which calls it and attaches
   **.catch(next)**. That way any rejected promise is forwarded to the central error handler,
   and I do not need to write try/catch in every controller."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Takes fn, returns (req, res, next) => ...
2. Promise.resolve(fn(...)) also works if fn is not async.
3. .catch(next) is the same as .catch(err => next(err)).
4. Keeps controllers focused on the happy path.
5. Not needed in Express 5 (rejections are forwarded automatically).

-----------------------------------------------------
Example
-----------------------------------------------------
// utils/catchAsync.js
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = catchAsync;

// controllers/userController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id); // if this rejects -> next(err)
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ status: 'success', data: { user } });
});

// routes
router.get('/users/:id', userController.getUser);

-----------------------------------------------------
Before vs After
-----------------------------------------------------
Before: every handler has  try { ... } catch (err) { next(err); }
After:  wrap once with catchAsync(...) and only write the success logic.

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Calling the function instead of passing it: catchAsync(handler()) -> wrong, pass handler.
- Wrapping but forgetting the central error middleware -> errors reach Express default handler.
- Needing local handling (e.g. rollback a transaction) -> still use try/catch inside for that part.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is catchAsync called a higher-order function?
A1: It takes a function as an argument and returns a new function.

Q2: Why Promise.resolve(fn(...))?
A2: So it also works if fn is a normal function returning a value. Note a SYNC throw from a
    non-async fn happens before Promise.resolve - Express itself catches that one.

Q3: Alternatives?
A3: The express-async-errors package (patches Express 4 router), or upgrading to Express 5.
*/
