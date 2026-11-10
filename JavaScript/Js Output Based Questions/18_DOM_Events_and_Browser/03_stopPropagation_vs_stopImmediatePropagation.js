/*
==========================================================================================
QUESTION 3: stopPropagation vs stopImmediatePropagation
Topic: DOM Events and Browser   |   Difficulty: Medium
==========================================================================================
HTML:
  <div id="parent">
    <button id="btn">Click</button>
  </div>

Assume the user clicks the button.
What will be the output of the following code?
*/

const parent = document.getElementById('parent');
const btn = document.getElementById('btn');

btn.addEventListener('click', (e) => {
  console.log('btn listener 1');
  e.stopPropagation();
});

btn.addEventListener('click', () => {
  console.log('btn listener 2');
});

parent.addEventListener('click', () => {
  console.log('parent');
});

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
btn listener 1
btn listener 2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. The button is the target; its two listeners run in registration order.
2. Listener 1 logs and calls e.stopPropagation(). This stops the event from moving on to
   OTHER elements (no further bubbling to parent), but it does NOT stop the remaining
   listeners on the CURRENT element.
3. Listener 2 is on the same element, so it still runs -> 'btn listener 2'.
4. The event never reaches parent -> 'parent' is not logged.

KEY RULE: stopPropagation() = don't go to the next element.
stopImmediatePropagation() = don't go to the next element AND skip the remaining
listeners on this element.
COMMON MISTAKE: Thinking stopPropagation also prevents 'btn listener 2'.
FOLLOW-UP: Replace e.stopPropagation() with e.stopImmediatePropagation().
-> Output is only: btn listener 1
*/
