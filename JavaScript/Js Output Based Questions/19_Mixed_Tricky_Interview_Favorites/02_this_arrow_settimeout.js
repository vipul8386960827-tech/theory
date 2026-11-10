/*
==========================================================================================
QUESTION 2: this + arrow functions + setTimeout
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const obj = {
  name: 'obj',
  regular() {
    setTimeout(function () {
      console.log('1:', this === obj);
    }, 0);
  },
  arrow() {
    setTimeout(() => {
      console.log('2:', this === obj, this.name === 'obj');
    }, 0);
  },
  arrowProp: () => {
    console.log('3:', this === obj);
  },
  check() {
    console.log('4:', this === obj);
  },
};

obj.regular();
obj.arrow();
obj.arrowProp();
setTimeout(obj.check, 0);
setTimeout(() => obj.check(), 0);

const detached = obj.arrow;
detached();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3: false
1: false
2: true true
4: false
4: true
2: false false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Only one log is synchronous: obj.arrowProp(). Everything else runs later from timers, in
the order the timers were scheduled.

- arrowProp (sync, logged first): an arrow function defined in an object literal does
  NOT get the object as this. It takes `this` from the surrounding scope (the top level
  of the script), which is not obj -> '3: false'.
- Timer 1 (regular): the callback is a regular function called by the timer, not as
  obj.something(), so its this is NOT obj (window in browsers) -> '1: false'.
- Timer 2 (arrow): the arrow inherits this from arrow(), which was called as
  obj.arrow() -> this === obj -> '2: true true'.
- Timer 3 setTimeout(obj.check): only the function is passed; the link to obj is lost
  -> '4: false'.
- Timer 4 wraps it: () => obj.check() is a real method call -> '4: true'.
- Timer 5 (detached): detached() is a plain call, so inside arrow() this is the global
  object (sloppy mode) - and the arrow inside setTimeout inherits that. It's not obj, and
  its name is not 'obj' -> '2: false false'.

KEY RULE: `this` is decided by HOW a regular function is called; arrow functions inherit
`this` from where they are DEFINED (the enclosing function's this at that moment).
COMMON MISTAKE: Thinking arrowProp's this is obj, or that obj.check passed to setTimeout
keeps its object.
*/
