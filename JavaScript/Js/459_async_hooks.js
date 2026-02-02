/* 459_async_hooks.js

=====================================================
Async Hooks in Node.js
=====================================================

Definition (What I should say in the interview):
- "Async Hooks is a Node.js API that provides a mechanism to **track asynchronous resources** and their lifecycle events. 
   It allows developers to monitor async operations like timers, Promises, and I/O callbacks, making it easier to debug, profile, and maintain context across asynchronous calls."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **async_hooks.createHook(callbacks)**
   - `callbacks` is an object with functions:
     - `init(asyncId, type, triggerAsyncId, resource)` → Called when an async resource is created.
     - `before(asyncId)` → Called just before the callback of the async resource executes.
     - `after(asyncId)` → Called just after the callback executes.
     - `destroy(asyncId)` → Called when the async resource is destroyed.
     - `promiseResolve(asyncId)` → Called when a Promise is resolved (optional).

2. **enable() / disable()**
   - `hook.enable()` → Starts listening to async events.
   - `hook.disable()` → Stops listening.

3. **Tracking Async Context**
   - Can track Promises, setTimeout, setImmediate, process.nextTick, TCP/HTTP requests, and other async resources.
   - Useful for debugging context propagation or performance bottlenecks.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const async_hooks = require('async_hooks');

const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    console.log(`Init async resource: ${type}, ID: ${asyncId}, triggered by: ${triggerAsyncId}`);
  },
  before(asyncId) {
    console.log(`Before async ID: ${asyncId}`);
  },
  after(asyncId) {
    console.log(`After async ID: ${asyncId}`);
  },
  destroy(asyncId) {
    console.log(`Destroy async ID: ${asyncId}`);
  }
});

hook.enable();

// Example async operation
setTimeout(() => {
  console.log('Timeout executed');
}, 100);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Profiling asynchronous operations for performance analysis.
- Debugging context loss in complex async applications.
- Logging async lifecycle events for monitoring or tracing.
- Implementing async-local storage (e.g., maintaining request context in web servers).
- Detecting memory leaks in asynchronous resources.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Async Hooks can introduce performance overhead; use it primarily for debugging/profiling.
2. Useful in backend frameworks like Express, Fastify, or NestJS for tracing async operations.
3. Async IDs help uniquely identify async resources and maintain relationships.
4. Enables understanding of event loop behavior and async task ordering.
5. Can be combined with `AsyncLocalStorage` for context propagation across async calls.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Async Hooks as a **surveillance camera for asynchronous operations**:
  - It watches when async tasks are created, executed, and destroyed, giving full visibility into the async flow.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between init, before, after, and destroy hooks?  
A1: `init` → creation; `before` → before callback execution; `after` → after callback execution; `destroy` → when resource is cleaned up.

Q2: Can Async Hooks track Promises?  
A2: Yes, Promises are tracked along with other async resources.

Q3: Is Async Hooks synchronous or asynchronous?  
A3: The callbacks are called synchronously during the lifecycle events of async resources.

Q4: How is Async Hooks useful in web servers?  
A4: Maintains request context across async operations and aids in debugging.

Q5: What is the performance impact of using Async Hooks?  
A5: It introduces overhead; best used for debugging or profiling, not in high-performance production loops.
*/
