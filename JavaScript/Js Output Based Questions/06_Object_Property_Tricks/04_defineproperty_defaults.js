/*
==========================================================================================
QUESTION 4: Object.defineProperty default flags
Topic: Object Property Tricks   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const person = { name: "Alice" };

Object.defineProperty(person, "age", { value: 25 });

person.age = 40;
console.log(person.age);
console.log(JSON.stringify(Object.keys(person)));
console.log(JSON.stringify(person));

for (const key in person) {
  console.log("for...in:", key);
}

console.log(delete person.age);
console.log("age" in person);
console.log(JSON.stringify(Object.getOwnPropertyDescriptor(person, "age")));

try {
  Object.defineProperty(person, "age", { value: 30 });
} catch (e) {
  console.log(e.name);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
25
["name"]
{"name":"Alice"}
for...in: name
false
true
{"value":25,"writable":false,"enumerable":false,"configurable":false}
TypeError

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A property created by normal assignment (person.name = ...) or an object literal gets:
    writable: true, enumerable: true, configurable: true
A property created with Object.defineProperty gets FALSE for every flag you do not pass:
    writable: false, enumerable: false, configurable: false

So "age" is read-only, hidden and permanent:
  1. person.age = 40          -> silently ignored (non-writable) -> 25
  2. Object.keys(person)      -> only enumerable own keys -> ["name"]
  3. JSON.stringify(person)   -> also skips non-enumerable props -> {"name":"Alice"}
  4. for...in                 -> skips non-enumerable -> only "name"
  5. delete person.age        -> non-configurable -> returns false
  6. "age" in person          -> `in` does not care about enumerability -> true
  7. The descriptor shows all three flags are false.
  8. Re-defining a non-configurable, non-writable property with a different value throws
     "TypeError: Cannot redefine property: age" - even in non-strict mode (defineProperty
     always throws on failure, unlike plain assignment).

KEY RULE: defineProperty flags default to false; object-literal/assignment flags default to true.
COMMON MISTAKE: Expecting 40, or expecting "age" to show up in Object.keys / JSON.stringify.
FOLLOW-UP: Object.defineProperty(person, "age", { value: 25 }) (same value) does NOT throw -
          redefining with an identical value is allowed.
*/
