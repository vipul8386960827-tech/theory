/*
==========================================================================================
QUESTION 11: Assigning when the prototype has a read-only property or a setter
Topic: Object Property Tricks   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const proto = {};

Object.defineProperty(proto, "id", { value: 1, writable: false });

Object.defineProperty(proto, "label", {
  get() {
    return this._label;
  },
  set(value) {
    console.log("proto setter:", value);
    this._label = value;
  },
});

const obj = Object.create(proto);

obj.id = 99;
console.log(obj.id);
console.log(obj.hasOwnProperty("id"));

obj.label = "hello";
console.log(obj.hasOwnProperty("label"));
console.log(obj.hasOwnProperty("_label"));

Object.defineProperty(obj, "id", { value: 99 });
console.log(obj.id);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
false
proto setter: hello
false
true
99

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Normally `obj.x = value` creates an OWN property on obj that "shadows" any x on the prototype.
But before doing so, assignment looks up the prototype chain, and two cases are special:

1. obj.id = 99
   The inherited "id" is NON-WRITABLE. A read-only inherited property also blocks creating an
   own property with the same name through assignment. In non-strict mode the assignment is
   silently ignored (strict mode -> TypeError).
     obj.id                  -> 1 (still the prototype's value)
     obj.hasOwnProperty("id") -> false

2. obj.label = "hello"
   The inherited "label" is an ACCESSOR with a setter, so assignment CALLS the prototype's
   setter (with `this` = obj) instead of creating an own "label" property.
     logs "proto setter: hello"
     the setter does this._label = value -> creates own "_label" on obj
     obj.hasOwnProperty("label")  -> false
     obj.hasOwnProperty("_label") -> true

3. Object.defineProperty(obj, "id", { value: 99 })
   defineProperty does NOT go through the assignment rules; it defines the own property
   directly on obj, which shadows the prototype's "id" -> 99.

KEY RULE: Assignment respects inherited read-only properties and inherited setters;
          Object.defineProperty bypasses both and always defines an own property.
COMMON MISTAKE: Saying obj.id becomes 99 after the assignment because "assignment always
          creates an own property".
*/
