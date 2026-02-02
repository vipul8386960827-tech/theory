/* 438_domain_module.js

=====================================================
Domain Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `domain` module in Node.js provides a way to **handle multiple I/O operations and their errors as a single group**. 
   It allows grouping of related callbacks, timers, and event handlers so that errors can be caught and managed in one place. 
   Note: This module is **deprecated** in favor of modern error-handling patterns like `async/await` and `Promise.catch`."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Domains catch asynchronous errors** across callbacks, timers, and events.
2. **domain.create()** → Creates a new domain object.
3. **domain.run(fn)** → Executes a function within the context of the domain.
4. **domain.add(emitter)** → Adds an EventEmitter to the domain for error handling.
5. **domain.remove(emitter)** → Removes an EventEmitter from the domain.
6. **domain.on('error', handler)** → Handles errors occurring in the domain.
7. Can be used to **prevent the process from crashing** on unhandled asynchronous errors.

-----------------------------------------------------
Basic Example (Catching Async Errors)
-----------------------------------------------------
const domain = require('domain');
const d = domain.create();

d.on('error', (err) => {
  console.log('Caught by domain:', err.message);
});

d.run(() => {
  setTimeout(() => {
    throw new Error('Async error in domain');
  }, 1000);
});

-----------------------------------------------------
Example (Using EventEmitter)
-----------------------------------------------------
const EventEmitter = require('events');
const d = domain.create();

d.on('error', (err) => console.log('Domain caught:', err.message));

const emitter = new EventEmitter();
d.add(emitter);

emitter.emit('error', new Error('Emitter error caught by domain'));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Handling multiple asynchronous operations together.
- Catching errors from timers, callbacks, or EventEmitters.
- Preventing process crashes due to unhandled async errors.
- Grouping related async tasks for centralized error handling.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. **Deprecated** in Node.js; modern code should use Promises, `async/await`, or proper try/catch.
2. Domains can catch errors that regular try/catch cannot because try/catch only works synchronously.
3. Overuse or misuse may lead to unexpected behavior; use carefully.
4. Can be useful in legacy applications for centralized error management.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a domain as a **safety net**:
  - All async operations under the net are monitored, and any error that falls into it is caught and handled safely.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is the domain module recommended for modern Node.js applications?  
A1: No, it is deprecated. Use Promises, `async/await`, or proper error-handling techniques.

Q2: How does a domain differ from a try/catch block?  
A2: Try/catch works synchronously; domains can catch errors in asynchronous operations like timers and callbacks.

Q3: Can a domain catch errors from EventEmitters?  
A3: Yes, by using `domain.add(emitter)`.

Q4: What method runs code within a domain?  
A4: `domain.run(fn)`.

Q5: What happens if an error is not caught by a domain?  
A5: If uncaught, the process may crash unless handled by process-level error handlers.
*/
