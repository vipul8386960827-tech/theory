/*
==========================================================================================
QUESTION 6: typeof on an undeclared variable vs a variable in the TDZ
Topic: Hoisting and TDZ   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(typeof notDeclaredAnywhere);
console.log(typeof myLet);

let myLet = 1;

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
ReferenceError: Cannot access 'myLet' before initialization

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. `typeof notDeclaredAnywhere`: the identifier does not exist in any scope.
   `typeof` is special-cased for unresolvable references - it returns the string
   "undefined" instead of throwing. -> prints "undefined".

2. `typeof myLet`: here the identifier DOES resolve - `let myLet` was hoisted into this
   scope during the creation phase - but the binding is still uninitialized (TDZ).
   Reading an uninitialized binding always throws, and typeof gets no exception
   for this case. -> ReferenceError.

So typeof is "safe" only for variables that are totally undeclared, not for
let/const/class variables in their TDZ.

KEY RULE: typeof never throws for undeclared identifiers, but it DOES throw for let/const/class bindings in the TDZ.
COMMON MISTAKE: Assuming typeof is always safe and answering "undefined" twice.
FOLLOW-UP: If `let myLet = 1` were `var myLet = 1`? -> "undefined" twice.
*/
