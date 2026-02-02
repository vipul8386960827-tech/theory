/* 447_abort_controller.js

=====================================================
AbortController in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The `AbortController` is a built-in JavaScript API that allows you to **abort or cancel asynchronous operations** such as 
   fetch requests, streams, or any promise-based task. It provides a `signal` that can be passed to these operations 
   and an `abort()` method to trigger cancellation, improving control over resource management and preventing unnecessary work."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **AbortController**
   - `new AbortController()` → Creates a new controller with an associated signal.
   - `controller.signal` → Provides an `AbortSignal` to be passed to asynchronous operations.
   - `controller.abort()` → Triggers the abort event, signaling any listening operations to stop.

2. **AbortSignal**
   - Can be used with fetch, streams, or custom async tasks.
   - Emits `'abort'` event when `abort()` is called.
   - Provides `signal.aborted` boolean to check abort status.

-----------------------------------------------------
Basic Example (Aborting Fetch)
-----------------------------------------------------
const controller = new AbortController();
const signal = controller.signal;

fetch('https://jsonplaceholder.typicode.com/todos/1', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') console.log('Fetch aborted!');
    else console.error(err);
  });

// Abort after 1 second
setTimeout(() => controller.abort(), 1000);

-----------------------------------------------------
Example (Listening to Abort Event)
-----------------------------------------------------
signal.addEventListener('abort', () => {
  console.log('Abort signal received!');
});

controller.abort(); // Logs: Abort signal received!

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Cancelling slow or unnecessary fetch requests.
- Aborting file reads/writes or streams in Node.js or browser.
- Preventing memory leaks by stopping long-running async tasks.
- Implementing timeout logic for asynchronous operations.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Not all async operations support AbortController; fetch, streams, and custom promise wrappers do.
2. Calling `abort()` triggers the `'abort'` event and sets `signal.aborted = true`.
3. Useful in React/Next.js to cancel async operations during component unmounting.
4. Multiple listeners can be added to a single signal.
5. Improves performance and avoids unnecessary network or computation overhead.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of AbortController as a **remote stop button**:
  - You start an operation, and if you decide to cancel it, you press the button (`abort()`), and everyone listening stops immediately.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can AbortController be reused?  
A1: No, each AbortController instance is for a single abort signal; create a new controller for each operation.

Q2: How do you handle aborted fetch errors?  
A2: Catch the error and check `err.name === 'AbortError'`.

Q3: Can you use AbortController with custom promises?  
A3: Yes, by checking `signal.aborted` inside the promise or adding `'abort'` event listeners.

Q4: Is AbortController synchronous or asynchronous?  
A4: Calling `abort()` is synchronous, but the effects are observed asynchronously by listeners.

Q5: How is AbortController useful in React or Next.js?  
A5: It can cancel ongoing API requests when a component unmounts, preventing state updates on unmounted components.
*/
