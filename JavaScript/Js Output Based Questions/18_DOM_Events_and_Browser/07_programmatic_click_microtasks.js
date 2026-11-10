/*
==========================================================================================
QUESTION 7: Same listeners, but the click is triggered with btn.click()
Topic: DOM Events and Browser   |   Difficulty: Hard
==========================================================================================
HTML:
  <div id="parent">
    <button id="btn">Click</button>
  </div>

No user interaction - the click is fired from the script itself.
What will be the output of the following code?
*/

const btn = document.getElementById('btn');
const parent = document.getElementById('parent');

btn.addEventListener('click', () => {
  console.log('btn listener');
  Promise.resolve().then(() => console.log('btn microtask'));
  setTimeout(() => console.log('btn timeout'), 0);
});

parent.addEventListener('click', () => {
  console.log('parent listener');
  queueMicrotask(() => console.log('parent microtask'));
});

console.log('before click()');
btn.click();
console.log('after click()');

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
before click()
btn listener
parent listener
after click()
btn microtask
parent microtask
btn timeout

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. btn.click() (like dispatchEvent) dispatches the event SYNCHRONOUSLY: all listeners
   run inside the btn.click() call, before it returns.
2. While the listeners run, the call stack is NOT empty - our script is still below them
   on the stack (script -> btn.click() -> listener). So no microtask checkpoint happens
   between listeners.
3. Order: 'before click()', 'btn listener' (queues microtask + timeout),
   'parent listener' (queues microtask), then btn.click() returns -> 'after click()'.
4. The script finishes, the stack is empty -> microtasks drain in FIFO order:
   'btn microtask', 'parent microtask'.
5. Then the next task: the timeout -> 'btn timeout'.

KEY RULE: Programmatic dispatch (el.click(), dispatchEvent) is synchronous; microtasks
queued by the listeners wait until the whole calling script finishes.
COMMON MISTAKE: Using the user-click order (microtask right after each listener), or
putting 'after click()' before the listeners.
*/
