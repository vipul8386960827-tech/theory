/*
==========================================================================================
QUESTION 1: Object.freeze is shallow
Topic: Object Property Tricks   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const user = {
  name: "Alice",
  address: { city: "Paris" },
  hobbies: ["chess"],
};

Object.freeze(user);

user.name = "Bob";
user.age = 30;
delete user.name;
user.address.city = "London";
user.hobbies.push("golf");

console.log(user.name);
console.log(user.age);
console.log(user.address.city);
console.log(JSON.stringify(user.hobbies));
console.log(Object.isFrozen(user));
console.log(Object.isFrozen(user.address));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Alice
undefined
London
["chess","golf"]
true
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Object.freeze(user) does three things to the TOP-LEVEL properties of `user` only:
  - makes every own property non-writable   (cannot change values)
  - makes every own property non-configurable (cannot delete / redefine)
  - makes the object non-extensible          (cannot add new properties)

Step by step (non-strict mode, so failures are SILENT, no error is thrown):
  1. user.name = "Bob"            -> ignored, name is non-writable   -> still "Alice"
  2. user.age = 30                -> ignored, object not extensible  -> age is undefined
  3. delete user.name             -> returns false, nothing deleted
  4. user.address.city = "London" -> WORKS. `user.address` is a reference to another
                                     object, and THAT object was never frozen. Freeze only
                                     locked the reference stored in user.address, not the
                                     object it points to.
  5. user.hobbies.push("golf")    -> WORKS for the same reason (the array is not frozen).

Object.isFrozen(user) is true, Object.isFrozen(user.address) is false.

KEY RULE: Object.freeze is SHALLOW. Nested objects/arrays stay mutable unless you freeze them
          too (a recursive "deepFreeze").
COMMON MISTAKE: Answering "Paris" and ["chess"] because "the object is frozen". Only the first
          level is frozen.
FOLLOW-UP: How do you deep freeze?
          function deepFreeze(obj) {
            Object.values(obj).forEach(v => {
              if (typeof v === "object" && v !== null) deepFreeze(v);
            });
            return Object.freeze(obj);
          }
*/
