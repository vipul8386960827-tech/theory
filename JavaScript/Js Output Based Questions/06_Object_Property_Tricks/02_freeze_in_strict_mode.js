/*
==========================================================================================
QUESTION 2: Frozen object in strict mode
Topic: Object Property Tricks   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

"use strict";

const config = Object.freeze({ debug: false, nested: { level: 1 } });

try {
  config.debug = true;
} catch (e) {
  console.log("1:", e.name);
}

config.nested.level = 2;
console.log("2:", config.nested.level);

try {
  config.newProp = "hello";
} catch (e) {
  console.log("3:", e.name);
}

try {
  delete config.debug;
} catch (e) {
  console.log("4:", e.name);
}

console.log("5:", config.debug);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1: TypeError
2: 2
3: TypeError
4: TypeError
5: false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The rules of a frozen object are the same in strict and non-strict mode. What changes is how
a FAILED operation is reported:
  - non-strict mode: the failed write/add/delete is silently ignored
  - strict mode:     the failed write/add/delete throws a TypeError

  1. config.debug = true        -> write to a non-writable property -> TypeError
  2. config.nested.level = 2    -> nested object is NOT frozen (freeze is shallow) -> works
  3. config.newProp = "hello"   -> adding to a non-extensible object -> TypeError
  4. delete config.debug        -> deleting a non-configurable property -> TypeError
  5. config.debug               -> unchanged -> false

(Chrome's messages are e.g. "Cannot assign to read only property 'debug' of object",
 "Cannot add property newProp, object is not extensible", "Cannot delete property 'debug'".)

KEY RULE: "use strict" turns silent failures on frozen/sealed/non-writable properties into
          TypeErrors. The nested object is still writable either way.
COMMON MISTAKE: Thinking `const` + freeze makes everything immutable, or expecting line 2 to
          throw too.
FOLLOW-UP: What does `const` protect then? Only the binding: `config = {}` would throw
          "TypeError: Assignment to constant variable." - it says nothing about the contents.
*/
