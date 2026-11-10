/*
==========================================================================================
QUESTION 4: Scope of the catch parameter (with var inside catch)
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

(function () {
  try {
    throw new Error('fail');
  } catch (x) {
    var x = 1, y = 2;
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();

try {
  throw new Error('fail');
} catch (err) {
  // err only exists in here
}
console.log(typeof err);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
undefined
2
undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. `var x` and `var y` are hoisted to the TOP OF THE FUNCTION and initialised to
   undefined. So the function has its own x = undefined and y = undefined.
2. The catch clause creates a NEW block scope with its own parameter x (the Error).
3. Inside catch, `x = 1` assigns to the NEAREST x - the catch parameter, NOT the
   function-level var x. `y = 2` assigns to the function-level y (no catch-level y).
4. console.log(x) inside catch -> 1 (the catch parameter).
5. After catch, the catch scope is gone. The function-level x was never assigned
   -> undefined. y was assigned -> 2.
6. The catch parameter `err` is block-scoped to the catch clause, so outside it is not
   defined -> typeof err is 'undefined' (typeof does not throw for undeclared names).

KEY RULE: The catch parameter is scoped to the catch block and shadows outer variables
of the same name, even a `var` declared inside the catch itself.
COMMON MISTAKE: Answering 1, 1, 2 (thinking `var x = 1` sets the function-level x).
*/
