/* 20_structured_logging_and_log_levels.js

=====================================================
Structured Logging and Log Levels
=====================================================

Definition (What I should say in the interview):
- "Structured logging means writing logs as **JSON objects with fields** instead of free text,
   for example level, time, message, requestId, userId. Log tools like ELK or Datadog can then
   filter and search on those fields, like 'all errors for orderId 42'. **Log levels** set the
   severity - fatal, error, warn, info, debug, trace - and the configured level decides what
   actually gets written, so production can run at info while local dev runs at debug."

-----------------------------------------------------
Log Levels (pino numbers)
-----------------------------------------------------
| Level | Num | When to use                                         |
|-------|-----|-----------------------------------------------------|
| fatal | 60  | app is about to crash / cannot continue             |
| error | 50  | request or operation failed                         |
| warn  | 40  | unexpected but handled (retry, deprecated usage)    |
| info  | 30  | normal important events (server start, order placed)|
| debug | 20  | detailed info for developers                        |
| trace | 10  | very fine-grained, rarely enabled                   |
Setting level 'info' -> logs info, warn, error, fatal; skips debug and trace.

-----------------------------------------------------
Example (pino + pino-http)
-----------------------------------------------------
const pino = require('pino');
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.authorization', 'password'],
});

// Unstructured (hard to query):
// console.log('User ' + userId + ' failed payment for order ' + orderId);

// Structured:
logger.error({ userId, orderId, err }, 'payment failed');
// {"level":50,"time":1700000000000,"userId":7,"orderId":42,"err":{...},"msg":"payment failed"}

// Per-request child logger with correlation id
const pinoHttp = require('pino-http');
const { randomUUID } = require('crypto');
app.use(pinoHttp({ logger, genReqId: (req) => req.headers['x-request-id'] || randomUUID() }));
app.get('/orders/:id', (req, res) => {
  req.log.info({ orderId: req.params.id }, 'fetching order');  // includes reqId automatically
  res.json({});
});

// Pretty logs only in development:  node app.js | npx pino-pretty

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Correlation / request IDs let you follow one request across services.
- Use child loggers (logger.child({ module: 'payments' })) to add context once.
- Keep the message constant and put variable data in fields -> easy grouping.
- Change level at runtime or via env without redeploying code changes.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is pino fast?
A1: It does minimal work on the main thread - fast JSON serialisation, no formatting - and
    pushes pretty-printing and shipping to separate processes or worker-thread transports.

Q2: What level would you log a 404 vs a 500?
A2: 404 is usually info or warn (client issue); 500 is error with the stack trace.
*/
