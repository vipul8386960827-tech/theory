/*
==========================================================================================
QUESTION 5: `this` inside event handlers - regular function vs arrow vs method
Topic: DOM Events and Browser   |   Difficulty: Medium
==========================================================================================
HTML:
  <button id="btn">Click</button>

This is a classic (non-module) <script>. Assume the user clicks the button.
What will be the output of the following code?
*/

const btn = document.getElementById('btn');

btn.addEventListener('click', function () {
  console.log('1:', this.id);
});

btn.addEventListener('click', () => {
  console.log('2:', this === window);
});

const controller = {
  label: 'controller',
  handle() {
    console.log('3:', this.id, this.label);
  },
};
btn.addEventListener('click', controller.handle);

btn.addEventListener('click', controller.handle.bind(controller));

btn.addEventListener('click', () => controller.handle());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1: btn
2: true
3: btn undefined
3: undefined controller
3: undefined controller

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Listeners on the same element run in registration order.

1. A regular function passed to addEventListener is called with this = the element the
   listener is attached to (currentTarget) -> 'btn'.
2. An arrow function has no own `this`; it uses the `this` of the surrounding code. At
   the top level of a classic script that is window -> true.
3. Passing controller.handle passes just the FUNCTION - the link to `controller` is lost.
   The browser calls it with this = the button -> this.id is 'btn', but the button has
   no `label` property -> undefined.
4. bind(controller) fixes this = controller -> controller has no id -> undefined, and
   label is 'controller'.
5. The arrow wrapper calls controller.handle() as a method call -> same as 4.

KEY RULE: In a regular-function handler, this = currentTarget. Arrow functions take
`this` from where they are defined. Passing obj.method loses obj - use bind or a wrapper.
COMMON MISTAKE: Expecting '3: undefined controller' for the plain controller.handle
listener, or expecting the arrow function's this to be the button.
FOLLOW-UP: In a <script type="module">, top-level `this` is undefined, so the arrow
listener would print '2: false'.
*/
