/*
==========================================================================================
QUESTION 9: Getters, setters and private fields
Topic: Prototypes and Classes   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

class Temperature {
  #celsius = 0;

  get fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }

  set fahrenheit(value) {
    this.#celsius = ((value - 32) * 5) / 9;
  }

  get celsius() {
    return this.#celsius;
  }
}

const t = new Temperature();
console.log(t.fahrenheit);

t.fahrenheit = 212;
console.log(t.celsius);

t.celsius = 50;
console.log(t.celsius);

console.log(t.hasOwnProperty("fahrenheit"));
console.log(Object.keys(t).length);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
32
100
100
false
0

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. `#celsius` is a private field: stored on each instance but accessible only from code
   inside the class body. It starts at 0.
2. t.fahrenheit is read like a property but runs the getter -> 0 * 9/5 + 32 = 32.
3. `t.fahrenheit = 212` runs the setter -> #celsius = (212 - 32) * 5/9 = 100.
   t.celsius (getter) -> 100.
4. `t.celsius = 50`: celsius has a getter but NO setter. The assignment is happening
   in non-strict top-level code, so it fails SILENTLY (nothing changes, no own property
   is created because the inherited accessor blocks it) -> still 100.
5. Getters/setters defined in a class live on Temperature.prototype, not on the
   instance -> hasOwnProperty -> false.
6. Private fields are not regular properties, so Object.keys(t) is empty -> 0.

KEY RULE: Accessors run code on property access; an accessor without a setter makes the property read-only (silent failure in sloppy mode, TypeError in strict mode). Private #fields are invisible to Object.keys/JSON/etc.
COMMON MISTAKE: Answering 50 for the last celsius read, or expecting an error in sloppy mode.
FOLLOW-UP: With "use strict" at the top, `t.celsius = 50` throws "TypeError: Cannot set property celsius of #<Temperature> which has only a getter".
*/
