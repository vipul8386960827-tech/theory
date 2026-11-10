/*
==========================================================================================
QUESTION 6: Microtasks vs setTimeout between listeners (real user click)
Topic: DOM Events and Browser   |   Difficulty: Hard
==========================================================================================
HTML:
  <div id="parent">
    <button id="btn">Click</button>
  </div>

Assume the user clicks the button (a REAL mouse click, not btn.click()).
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

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
btn listener
btn microtask
parent listener
parent microtask
btn timeout

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. A real user click is dispatched by the browser itself. Each listener is invoked as a
   separate callback, and after each callback returns the JavaScript call stack is EMPTY.
2. Whenever the stack becomes empty, the browser performs a "microtask checkpoint" -
   it drains the microtask queue (promise callbacks, queueMicrotask).
3. So:
   - btn listener runs -> logs, queues a microtask, schedules a timeout.
   - Stack empty -> microtask runs -> 'btn microtask'.
   - Event bubbles to parent -> 'parent listener', queues a microtask.
   - Stack empty -> 'parent microtask'.
4. The setTimeout callback is a macrotask (a new task), so it runs only after the whole
   click event task is finished -> 'btn timeout' last.

KEY RULE: Microtasks run whenever the call stack empties - for user-initiated events
that means BETWEEN listeners. setTimeout always waits for a future task.
COMMON MISTAKE: Answering btn listener, parent listener, btn microtask, parent microtask
- that is the order only when the click is triggered from script (see next question).
*/
