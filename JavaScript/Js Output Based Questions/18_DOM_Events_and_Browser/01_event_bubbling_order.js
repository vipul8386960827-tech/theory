/*
==========================================================================================
QUESTION 1: Event bubbling order
Topic: DOM Events and Browser   |   Difficulty: Easy
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

document.getElementById('grand').addEventListener('click', () => console.log('grand'));
document.getElementById('parent').addEventListener('click', () => console.log('parent'));
document.getElementById('child').addEventListener('click', () => console.log('child'));
document.body.addEventListener('click', () => console.log('body'));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
child
parent
grand
body

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. A click event travels in 3 phases:
   capture (window -> document -> ... -> parent), target (the button), then
   bubble (parent -> ... -> document -> window).
2. addEventListener(type, fn) without a third argument registers a BUBBLE-phase
   listener (capture = false).
3. No capture listeners exist, so the first listener to run is on the target (child).
4. The event then bubbles up the tree: parent -> grand -> body (-> html -> document ->
   window, which have no listeners here).
5. The order in which we REGISTERED the listeners (grand first) does not matter across
   different elements - only the DOM position does.

KEY RULE: Bubbling goes from the innermost (target) element outwards to the root.
COMMON MISTAKE: Answering in registration order (grand, parent, child, body).
FOLLOW-UP: Which events do NOT bubble? -> e.g. focus/blur, mouseenter/mouseleave,
load. (focusin/focusout are the bubbling versions of focus/blur.)
*/
