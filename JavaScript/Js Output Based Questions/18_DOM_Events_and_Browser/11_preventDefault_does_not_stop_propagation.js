/*
==========================================================================================
QUESTION 11: preventDefault does not stop propagation
Topic: DOM Events and Browser   |   Difficulty: Easy
==========================================================================================
HTML:
  <div id="box">
    <a id="link" href="https://example.com">Go</a>
  </div>

Assume the user clicks the link.
What will be the output of the following code? Does the page navigate?
*/

const box = document.getElementById('box');
const link = document.getElementById('link');

link.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('link', e.defaultPrevented);
});

box.addEventListener('click', (e) => {
  console.log('box', e.defaultPrevented);
});

document.addEventListener('click', () => {
  console.log('document');
  return false;
});

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
link true
box true
document

(The browser does NOT navigate to example.com.)

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. e.preventDefault() cancels the browser's DEFAULT ACTION for the event (for a link
   click: following the href). It sets e.defaultPrevented = true.
2. It has nothing to do with propagation - the event still bubbles normally:
   link -> box -> ... -> document.
3. box sees the same event object, so e.defaultPrevented is also true there.
4. document's listener runs too. `return false` from an addEventListener callback does
   NOTHING special (it neither prevents the default nor stops propagation). Only in an
   inline/property handler (onclick = ...) does return false prevent the default.

KEY RULE: preventDefault() = cancel default browser behaviour; stopPropagation() = stop
the event travelling to other elements. They are independent.
COMMON MISTAKE: Thinking preventDefault stops box/document listeners, or that
`return false` stops propagation (that's jQuery behaviour, not the DOM).
*/
