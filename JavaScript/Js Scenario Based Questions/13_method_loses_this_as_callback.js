/* 13_method_loses_this_as_callback.js

=====================================================
Scenario: A method works when called directly but breaks as a callback
=====================================================

The Question (how the interviewer asks it):
- "user.greet() prints 'Hi, Vipul'. But setTimeout(user.greet, 1000) prints
   'Hi, undefined'. Passing it to a button click handler also fails. Why, and how
   do you fix it?"

What the interviewer is checking:
- Do you know "this" depends on HOW a function is called, not where it is defined?
- Can you name the binding rules (default, implicit, explicit, new, arrow)?
- Do you know the fixes: bind, arrow wrapper, class field arrow?
- Do you know this is common with class methods in React and DOM events?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain that user.greet() is an implicit binding: the object before the dot
   becomes "this".
2. When I pass user.greet, I pass only the function. The link to user is lost.
   Later setTimeout calls it as a plain function.
3. A plain call has default binding: "this" is undefined in strict mode (classes,
   modules) or the global object in sloppy mode. So this.name is undefined, or it
   throws a TypeError.
4. Fix A: bind it: setTimeout(user.greet.bind(user), 1000). bind returns a new
   function with "this" fixed forever.
5. Fix B: wrap it in an arrow: setTimeout(() => user.greet(), 1000). Now it is
   called with the dot again.
6. Fix C for classes: bind in the constructor, or define the method as a class
   field arrow function.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const user = {
  name: "Vipul",
  greet() {
    console.log(`Hi, ${this.name}`);
  },
};

user.greet();                 // Hi, Vipul  (this = user)
setTimeout(user.greet, 0);    // Hi, undefined  (this lost)

// Fix A: bind
setTimeout(user.greet.bind(user), 0);   // Hi, Vipul

// Fix B: arrow wrapper (also reads the latest user.greet)
setTimeout(() => user.greet(), 0);      // Hi, Vipul

// Class + event handler
class Counter {
  count = 0;
  constructor(button) {
    // Bug: button.addEventListener("click", this.increment);
    // inside increment, "this" would be the button, not the Counter
    button.addEventListener("click", this.increment);
  }
  // Fix C: class field arrow, "this" is always the instance
  increment = () => {
    this.count++;
  };
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "'this' is decided at call time. user.greet() works because user is before the
   dot. When I pass user.greet as a callback, only the function is passed, and
   setTimeout calls it without an object, so 'this' is undefined or the global
   object. I fix it with bind(user), with an arrow wrapper like () => user.greet(),
   or in classes with a class field arrow method or binding in the constructor."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Saying "this" refers to the object where the function was written.
- Writing setTimeout(user.greet(), 1000). This calls greet immediately and passes
  its return value (undefined) to setTimeout.
- Calling bind inside render or a loop every time, creating new functions and
  breaking removeEventListener (it needs the same function reference).
- Trying to fix it by making greet itself an arrow function in an object literal.
  Then "this" is the outer scope, not user.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between call, apply and bind?
A1: call and apply run the function now with a given "this"; call takes arguments
    one by one, apply takes an array. bind does not run it; it returns a new
    function with "this" (and optional arguments) fixed.

Q2: Can you re-bind a function that is already bound?
A2: No. A second bind does not change "this". Only new can override a bound
    function's "this".

Q3: In a DOM listener written as a normal function, what is "this"?
A3: The element the listener is attached to (event.currentTarget). With an arrow
    function, "this" comes from the outer scope instead.
*/
