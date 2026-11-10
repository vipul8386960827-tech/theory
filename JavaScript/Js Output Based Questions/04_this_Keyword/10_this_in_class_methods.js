/*
==========================================================================================
QUESTION 10: Extracted class methods vs arrow class fields
Topic: this Keyword   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

class Button {
  label = "Save";

  handleArrow = () => {
    return this.label;
  };

  handleClick() {
    return this.label;
  }
}

const btn = new Button();
const { handleArrow, handleClick } = btn;

console.log(btn.handleClick());
console.log(handleArrow());
console.log(handleClick.call({ label: "Other" }));
console.log(handleClick());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Save
Save
Other
TypeError: Cannot read properties of undefined (reading 'label')

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. btn.handleClick() -> normal method call, this = btn -> "Save".
2. handleArrow is a class FIELD holding an arrow function. Fields are initialized per
   instance while the constructor runs, where this = the new instance. The arrow
   captures that this permanently. Even after destructuring, handleArrow() -> "Save".
3. handleClick.call({label: "Other"}) -> explicit binding -> "Other".
4. handleClick() - a detached method called as a plain function. All code inside a
   class body is automatically in STRICT mode, so default binding gives
   this = undefined (not the global object). undefined.label -> TypeError.

KEY RULE: Class bodies are always strict: a detached class method gets this = undefined. Arrow-function class fields are bound to the instance.
COMMON MISTAKE: Answering "undefined" for the last line (that would be the sloppy-mode behavior of a normal function).
FOLLOW-UP: Fix without arrow fields? In the constructor: `this.handleClick = this.handleClick.bind(this);` (the classic React class-component pattern).
*/
