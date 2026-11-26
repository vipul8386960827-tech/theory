/* 41_eventemitter_methods_and_max_listeners.js

=====================================================
EventEmitter Methods and Max Listeners
=====================================================

Definition (What I should say in the interview):
- "Besides on and emit, the methods I use most are **once** for one-time listeners, **off** or
   removeListener to unsubscribe, **prependListener** to run a listener first, and
   **listenerCount** to debug. By default an emitter allows **10 listeners per event**; adding
   more does not throw, but Node prints a **MaxListenersExceededWarning**, because it is usually
   a memory leak - like adding a listener on every request and never removing it. If many
   listeners are genuinely needed, I raise the limit with setMaxListeners."

-----------------------------------------------------
Common Methods
-----------------------------------------------------
| Method                          | What it does                                     |
|---------------------------------|--------------------------------------------------|
| on(name, fn) / addListener      | add listener (end of the list)                   |
| once(name, fn)                  | listener removed after first call                |
| prependListener / prependOnce   | add to the beginning of the list                 |
| off(name, fn) / removeListener  | remove that exact function reference             |
| removeAllListeners([name])      | remove all (careful with shared emitters)        |
| emit(name, ...args)             | call listeners, returns true if any existed      |
| listenerCount(name)             | number of listeners                              |
| eventNames(), listeners(name)   | inspection / debugging                           |
| setMaxListeners(n)              | change limit for this emitter (0 = unlimited)    |
| events.once(emitter, name)      | Promise that resolves on next event              |

-----------------------------------------------------
Example
-----------------------------------------------------
const EventEmitter = require('events');
const bus = new EventEmitter();

const onPay = (amt) => console.log('paid', amt);
bus.on('pay', onPay);
bus.once('pay', () => console.log('first payment bonus'));
bus.prependListener('pay', () => console.log('audit log'));

bus.emit('pay', 100);   // audit log, paid 100, first payment bonus
bus.emit('pay', 200);   // audit log, paid 200
bus.off('pay', onPay);
console.log(bus.listenerCount('pay'));   // 1

// Max listeners warning
for (let i = 0; i < 11; i++) bus.on('leak', () => {});
// (node) MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
// 11 leak listeners added to [EventEmitter]...

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- off() with a new arrow function - it is a different reference, so nothing is removed.
- Fixing the warning with setMaxListeners(0) without checking for the real leak.
- EventEmitter.defaultMaxListeners changes the limit for ALL emitters - avoid in libraries.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does exceeding max listeners stop new listeners from being added?
A1: No, they are still added; it is only a warning.

Q2: Typical leak scenario?
A2: Calling socket.on or process.on inside a request handler or loop without removing the listener.

Q3: How do you find who added the listeners?
A3: Run with node --trace-warnings to get a stack trace of where the warning was triggered.
*/
