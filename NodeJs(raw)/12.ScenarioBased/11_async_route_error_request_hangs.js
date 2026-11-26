/* 11_async_route_error_request_hangs.js

=====================================================
Scenario: Async Route Throws and the Request Hangs
=====================================================

The Question (how the interviewer asks it):
- "An async Express route throws an error, but the client never gets a
  response - the request just hangs until it times out. Why, and how do you
  fix it?"

What the interviewer is checking:
- Do you know Express 4 does NOT catch rejected promises from async handlers?
- Do you know how next(err) and error-handling middleware work?
- Do you know the catchAsync wrapper pattern and that Express 5 fixes this?
- Can you design one central place for error responses?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Explain the cause: in Express 4, an async handler returns a promise.
   Express ignores that promise, so if it rejects, next(err) is never called
   and no response is sent. (In new Node it may also crash the process as an
   unhandled rejection.)
2. Quick fix: try/catch in the route and call next(err).
3. Better fix: a small catchAsync wrapper so I don't repeat try/catch in
   every route (or the `express-async-errors` package).
4. Best fix: upgrade to Express 5. It forwards rejected promises from
   handlers and middleware to next(err) automatically.
5. Add ONE error-handling middleware (4 arguments) at the end, after all
   routes. It sends a proper status and JSON, and logs the error.
6. Separate operational errors (404, validation, 401) from bugs; hide
   internal details from the client in production.
7. Also set a server/request timeout so a hanging request does not wait
   forever.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD (Express 4): rejection is ignored -> request hangs
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id); // throws on bad id
  res.json(user);
});

// GOOD: wrapper that sends any rejection to next()
const catchAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/users/:id', catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json(user);
}));

// Central error middleware - MUST have 4 params, registered LAST
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  req.log?.error({ err }, 'request failed');
  if (res.headersSent) return next(err);   // let Express close it
  res.status(status).json({
    status: 'error',
    message: status < 500 ? err.message : 'Something went wrong',
  });
});

// Express 5: no wrapper needed - async errors go to next(err) automatically

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "In Express 4, an async route returns a promise that Express does not
  watch, so when it rejects, next is never called and the request hangs. I
  fix it with a catchAsync wrapper that does .catch(next), or by upgrading to
  Express 5, which handles rejected promises automatically. Then a single
  error-handling middleware with four arguments, placed after all routes,
  sends the correct status code and logs the error."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Writing the error middleware with 3 params - Express treats it as normal
  middleware, not an error handler.
- Registering the error middleware BEFORE the routes.
- Catching the error but only console.log-ing it, with no response sent.
- Sending err.stack or DB error messages to the client in production.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does a synchronous throw work in Express 4 but an async one does not?
A1: Express wraps the handler call in try/catch, so a sync throw is caught
    and passed to next(err). An async function never throws synchronously;
    it returns a rejected promise, and Express 4 does not check it.

Q2: What does res.headersSent check in the error handler?
A2: If the response has already started (for example while streaming), you
    cannot send a new status. Calling next(err) lets Express's default
    handler close the connection.

Q3: How do you handle 404 for unknown routes?
A3: Add a normal middleware after all routes that creates a 404 AppError
    and calls next(err), so it goes through the same error handler.
*/
