/* 16_dev_vs_prod_errors.js

=====================================================
Development vs Production Error Responses
=====================================================

Definition (What I should say in the interview):
- "In **development** I want as much detail as possible in the response - the full error, stack
   trace and message - so I can debug quickly. In **production** I must not leak internals like
   stack traces, file paths or SQL queries, because that is a security risk. So the error handler
   checks NODE_ENV: in production, operational errors get their real message, and unknown or
   programmer errors get a generic 'Something went wrong' with status 500, while the full details
   go only to the logs."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect        | Development                 | Production                          |
|---------------|-----------------------------|-------------------------------------|
| Stack trace   | Sent in response            | Logged only                         |
| Message       | Real message always         | Real only if operational            |
| Error object  | Full object                 | Never                               |
| Logging       | Console, pretty             | Structured JSON logs (pino/winston) |

-----------------------------------------------------
Example
-----------------------------------------------------
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({ status: 'fail', message: err.message });
  }
  console.error('ERROR:', err); // full details only in logs
  res.status(500).json({ status: 'error', message: 'Something went wrong' });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'production') {
    // convert known library errors into operational ones
    if (err.name === 'CastError') err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    if (err.code === 11000) err = new AppError('Duplicate field value', 400);
    if (err.name === 'JsonWebTokenError') err = new AppError('Invalid token', 401);
    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Set NODE_ENV=production in deployment - Express also hides stack traces in its default handler then.
- Return a request/correlation id in the response so support can find the matching log.
- Do not mutate the original err in a way that loses details - creating a new AppError is fine
  because the original is already logged or can be passed as cause.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why convert Mongoose CastError or duplicate key errors?
A1: They are operational (bad input) but look like unknown errors; converting gives the user a 400
    with a clear message instead of a generic 500.

Q2: What is the risk of sending stack traces in production?
A2: It reveals file structure, library versions and logic, which helps attackers.
*/
