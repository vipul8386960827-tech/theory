/*
==========================================================================================
QUESTION 9: addEventListener with { once: true }
Topic: DOM Events and Browser   |   Difficulty: Easy
==========================================================================================
HTML:
  <button id="btn">Click</button>

Assume the user clicks the button THREE times.
What will be the output of the following code?
*/

const btn = document.getElementById('btn');
let count = 0;

btn.addEventListener('click', () => console.log('once handler'), { once: true });

btn.addEventListener('click', () => {
  count++;
  console.log('click #' + count);
});

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
once handler
click #1
click #2
click #3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. { once: true } means the browser automatically removes the listener right after it
   runs for the first time.
2. Click 1: both listeners run in registration order -> 'once handler', 'click #1'.
   The once listener is now removed.
3. Clicks 2 and 3: only the normal listener remains -> 'click #2', 'click #3'.

KEY RULE: { once: true } = run at most one time, then auto-remove (equivalent to calling
removeEventListener inside the handler).
COMMON MISTAKE: Thinking `once` applies to the whole element (so the second listener
also stops), or that 'once handler' runs on every click.
FOLLOW-UP: Other options: { capture: true }, { passive: true } (promise not to call
preventDefault - good for scroll/touch performance), { signal } (remove via
AbortController.abort()).
*/
