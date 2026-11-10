/*
==========================================================================================
QUESTION 8: new vs a bound function
Topic: this Keyword   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function Point(x, y) {
  this.x = x;
  this.y = y;
}

const fixedThis = { x: 100, y: 100 };
const BoundPoint = Point.bind(fixedThis, 1);

const p = new BoundPoint(2);

console.log(p.x, p.y);
console.log(fixedThis.x);
console.log(p instanceof Point);
console.log(p instanceof BoundPoint);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1 2
100
true
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Point.bind(fixedThis, 1) creates a bound function with this = fixedThis and the
   first argument preset to 1.
2. `new BoundPoint(2)` - when a bound function is used with `new`, the bound `this`
   is IGNORED. A brand-new object is created (with prototype Point.prototype) and
   used as this. The preset arguments are still applied: Point(1, 2).
     -> p.x = 1, p.y = 2
3. fixedThis was never touched -> 100.
4. p was created from Point.prototype -> p instanceof Point -> true.
5. instanceof with a bound function delegates to the target function (Point)
   -> also true.

KEY RULE: `new` has higher priority than bind: the bound this is discarded, but bound arguments still apply.
COMMON MISTAKE: Answering "100 100" or expecting fixedThis to be mutated to {x:1, y:2}.
*/
