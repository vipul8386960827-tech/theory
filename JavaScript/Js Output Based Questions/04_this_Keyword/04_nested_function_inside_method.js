/*
==========================================================================================
QUESTION 4: Nested regular function vs nested arrow inside a method
Topic: this Keyword   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

const account = {
  balance: 500,
  report() {
    function inner() {
      return this.balance;
    }
    const innerArrow = () => this.balance;
    const self = this;
    function innerSelf() {
      return self.balance;
    }

    console.log(inner());
    console.log(innerArrow());
    console.log(innerSelf());
    console.log(inner.call(this));
  },
};

account.report();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
500
500
500

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
account.report() -> inside report, this = account.

1. inner() is a regular function called with NO object in front -> default binding.
   It does NOT inherit report's this. In sloppy mode this = global object, which has
   no balance -> undefined.
2. innerArrow() -> arrows capture `this` from the enclosing function (report), so
   this = account -> 500.
3. innerSelf() -> uses the classic pre-ES6 `var self = this` trick: self is an
   ordinary variable captured by closure -> 500.
4. inner.call(this) -> explicitly passes account as this -> 500.

KEY RULE: Every regular function call gets its own `this` based on the call; nested regular functions don't inherit the outer method's `this`, arrows do.
COMMON MISTAKE: Answering 500 for inner(), assuming nested functions inherit `this` like they inherit variables.
FOLLOW-UP: In strict mode inner() throws "TypeError: Cannot read properties of undefined (reading 'balance')".
*/
