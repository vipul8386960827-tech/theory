/* 14_arrow_vs_normal_function_in_handler_or_class.js

=====================================================
Scenario: An arrow function was used as a method or handler and "this" is wrong
=====================================================

The Question (how the interviewer asks it):
- "A teammate wrote an object method as an arrow function, and this.name is
   undefined. In another place a DOM handler uses an arrow and this is not the
   button. When should we use arrow functions and when normal functions?"

What the interviewer is checking:
- Do you know arrow functions have no own "this" (lexical this)?
- Can you choose the right function type for methods, handlers and callbacks?
- Do you know class field arrow methods and their trade-off?
- Do you know other arrow differences (no arguments, cannot be used with new)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain lexical this: an arrow function takes "this" from the scope where it
   is created. call, apply and bind cannot change it.
2. In an object literal, the surrounding scope is the module or global scope, not
   the object. So an arrow method sees the wrong "this".
3. Fix for object methods: use method shorthand greet() { }, which gets "this"
   from the call (obj.greet()).
4. For DOM handlers: if I need the element, I use a normal function (this is the
   element) or simply event.currentTarget, which works with both types.
5. Arrows are the right choice for callbacks inside methods (map, setTimeout,
   promise then), because they keep the method's "this".
6. In classes, a class field arrow (handleClick = () => {}) is good for methods
   passed as callbacks. Trade-off: each instance gets its own copy, it is not on
   the prototype, so it uses more memory and cannot be called with super.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// Bug: arrow as object method
const user = {
  name: "Vipul",
  greet: () => console.log(this.name), // "this" is outer scope -> undefined
};

// Fix: method shorthand
const user2 = {
  name: "Vipul",
  greet() { console.log(this.name); },  // Vipul
};

// Good use of arrow: callback inside a method keeps "this"
const team = {
  name: "Core",
  members: ["A", "B"],
  print() {
    this.members.forEach(m => console.log(`${m} is in ${this.name}`));
  },
};

// DOM handler
// button.addEventListener("click", () => this.classList.add("on"));  // wrong this
// button.addEventListener("click", function () { this.classList.add("on"); }); // ok
// button.addEventListener("click", e => e.currentTarget.classList.add("on")); // ok

// Class: prototype method vs class field arrow
class Form {
  submit() {}              // on prototype, shared, "this" depends on call
  onChange = (e) => {};    // per instance, "this" always the instance
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Arrow functions do not have their own 'this'; they use 'this' from where they
   are written. So an arrow as an object method gets the outer 'this', not the
   object. I use normal method syntax for object and class methods, and arrows
   for callbacks inside those methods. For DOM handlers I use event.currentTarget,
   and in classes I use class field arrows only for methods passed as callbacks."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using arrows everywhere "because they are modern".
- Trying to fix an arrow method with bind. bind has no effect on arrow functions.
- Using an arrow as a constructor or prototype method (new on an arrow throws
  TypeError; arrows have no prototype property).
- Expecting the arguments object inside an arrow. Use rest parameters (...args).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What other differences do arrow functions have?
A1: No own this, arguments, super or new.target; cannot be called with new; no
    prototype property; cannot be generators.

Q2: Why are class field arrows popular in React class components?
A2: Handlers like onClick={this.handleClick} lose "this". A class field arrow
    keeps "this" bound to the instance, so no bind in the constructor is needed.

Q3: What is "this" at the top level of an ES module?
A3: undefined. In a classic browser script it is window, and in a CommonJS
    module it is module.exports.
*/
