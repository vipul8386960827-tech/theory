/*
==========================================================================================
QUESTION 9: const objects and Object.freeze
Topic: Objects and References   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const config = { debug: false };
config.debug = true;
config.level = 3;
console.log(JSON.stringify(config));

try {
  config = { debug: false };
} catch (e) {
  console.log(e.name + ": " + e.message);
}

const frozen = Object.freeze({ a: 1, inner: { b: 1 } });
frozen.a = 2;
frozen.c = 3;
delete frozen.a;
frozen.inner.b = 2;
console.log(JSON.stringify(frozen));
console.log(Object.isFrozen(frozen), Object.isFrozen(frozen.inner));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
{"debug":true,"level":3}
TypeError: Assignment to constant variable.
{"a":1,"inner":{"b":2}}
true false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
const makes the BINDING (the variable) immutable, NOT the object it points to.

config.debug = true; config.level = 3;
  Mutating the object is allowed -> {"debug":true,"level":3}

config = { ... }
  Reassigning the const variable -> TypeError: Assignment to constant variable.
  (Note: it's a runtime TypeError, not a SyntaxError.)

Object.freeze(obj)
  Makes the object's own properties read-only and non-configurable, and prevents adding
  new ones. In sloppy (non-strict) mode, attempts to change it FAIL SILENTLY:
    frozen.a = 2    -> ignored
    frozen.c = 3    -> ignored
    delete frozen.a -> ignored (returns false)
  In strict mode each of these would throw a TypeError.

frozen.inner.b = 2
  freeze is SHALLOW: frozen.inner is still a normal, unfrozen object -> b becomes 2.

Object.isFrozen(frozen) -> true, Object.isFrozen(frozen.inner) -> false

KEY RULE: const = can't reassign the variable. Object.freeze = can't change the object's own properties (one level only). Neither gives deep immutability.
COMMON MISTAKE: Thinking const objects can't be modified, or that Object.freeze is deep.
FOLLOW-UP: How do you deep-freeze?  Recursively call Object.freeze on every nested object (a small "deepFreeze" helper). Also compare: Object.seal allows changing existing values but not adding/removing keys.
*/
