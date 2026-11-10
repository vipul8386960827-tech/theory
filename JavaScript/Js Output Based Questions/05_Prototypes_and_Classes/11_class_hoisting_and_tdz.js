/*
==========================================================================================
QUESTION 11: Class declarations, class expressions and the TDZ
Topic: Prototypes and Classes   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const makeShape = () => new Shape("circle");

class Shape {
  constructor(type) {
    this.type = type;
  }
}

console.log(makeShape().type);
console.log(typeof Shape);

const Named = class Inner {
  whoAmI() {
    return Inner.name;
  }
};
console.log(new Named().whoAmI());
console.log(typeof Inner);

const sq = new Square();
class Square extends Shape {}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
circle
function
Inner
undefined
ReferenceError: Cannot access 'Square' before initialization

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. makeShape references Shape, but the reference is only resolved when makeShape is
   CALLED. It is called after the class declaration ran -> works -> "circle".
2. Classes are just special functions -> typeof Shape -> "function".
3. A named class expression (`class Inner {...}`) binds its name only INSIDE the class
   body (like a named function expression). whoAmI reads Inner.name -> "Inner".
4. Outside, Inner is not declared -> typeof Inner -> "undefined".
5. `new Square()` runs before `class Square` has been evaluated. Class declarations
   are hoisted like let/const - in the TDZ until their line executes -> ReferenceError.

KEY RULE: Class declarations are not usable before their definition line runs (TDZ), but functions that merely reference them can be defined earlier and called later.
COMMON MISTAKE: Treating classes like function declarations (fully hoisted), or expecting the class expression's inner name to be available outside.
*/
