/*
==========================================================================================
QUESTION 2: Capture vs bubble order
Topic: DOM Events and Browser   |   Difficulty: Medium
==========================================================================================
HTML:
  <div id="grand">
    <div id="parent">
      <button id="child">Click</button>
    </div>
  </div>

Assume the user clicks the button.
What will be the output of the following code?
*/

const grand = document.getElementById('grand');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

grand.addEventListener('click', () => console.log('grand bubble'));
parent.addEventListener('click', () => console.log('parent bubble'));
child.addEventListener('click', () => console.log('child capture'), true);
child.addEventListener('click', () => console.log('child bubble'));

grand.addEventListener('click', () => console.log('grand capture'), true);
parent.addEventListener('click', () => console.log('parent capture'), { capture: true });

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
grand capture
parent capture
child capture
child bubble
parent bubble
grand bubble

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Third argument `true` or { capture: true } registers a CAPTURE-phase listener.
2. Capture phase goes TOP-DOWN from window to the target's parent:
   grand capture -> parent capture.
3. Target phase (the button itself): its capture listener runs, then its bubble listener.
4. Bubble phase goes BOTTOM-UP: parent bubble -> grand bubble.
5. Registration order across elements is irrelevant; capture listeners on grand were
   added last, but they still run first because grand is reached first in capture phase.

KEY RULE: Order = capture (outer -> inner), target, bubble (inner -> outer).
COMMON MISTAKE: Thinking capture listeners run in registration order, or that every
element's capture AND bubble listeners run together before moving to the next element.
FOLLOW-UP: At the target element itself, what if the child's bubble listener were
registered BEFORE its capture listener (swap the two child lines)? Modern browsers (current DOM spec; Chrome 89+, Firefox,
Safari) run the target's capture listeners first, then its non-capture listeners ->
'child capture' before 'child bubble'. Very old Chrome versions ran target listeners in
pure registration order.
*/
