/* 6_logging.js

=====================================================
Logging in Node.js
=====================================================

Definition (What I should say in the interview):
- "Logging is how we record what the application is doing so we can debug problems, especially
   in production where we can't attach a debugger. console.log is fine locally, but in real
   apps I use a logging library like **pino** or **winston**, which give log levels, timestamps,
   JSON output and transports. Logs go to stdout and a platform like ELK, Datadog or CloudWatch
   collects and searches them."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. What to log: incoming requests, errors with stack, important business events, external calls.
2. What NOT to log: passwords, tokens, card numbers, full personal data.
3. Use levels (error, warn, info, debug) so production can run at "info" and hide noise.
4. HTTP request logging: morgan or pino-http middleware.
5. Write to stdout; let Docker/Kubernetes/the log agent ship the logs (12-factor style).

-----------------------------------------------------
Example (winston)
-----------------------------------------------------
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

logger.info('Server started', { port: 3000 });
logger.error('Payment failed', { orderId: 42, err });

// Express request logging
const morgan = require('morgan');
app.use(morgan('combined'));

-----------------------------------------------------
console.log vs logging library
-----------------------------------------------------
| Feature           | console.log      | pino / winston              |
|-------------------|------------------|-----------------------------|
| Levels            | no (basic)       | yes, configurable           |
| Format            | plain text       | JSON / custom               |
| Timestamps/meta   | manual           | built in                    |
| Redaction         | no               | yes (pino redact option)    |
| Transports        | stdout only      | console, file, HTTP, etc.   |

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Logging inside hot loops or logging huge objects -> slows the app and increases log cost.
- Swallowing errors: catch (e) {} with no log at all.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is console.log considered bad in production?
A1: No levels or structure, hard to search, and writing to a TTY/file can be synchronous,
    which can block the event loop under heavy logging.

Q2: pino vs winston?
A2: pino is focused on speed and JSON with very low overhead; winston is more flexible with
    many formats and transports. Both are fine; pino is popular for high-throughput APIs.
*/
