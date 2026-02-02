/* 225_access_object_properties.js

=====================================================
Accessing Object Properties in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Object properties in JavaScript can be accessed in two main ways: dot notation and bracket notation."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Dot Notation (`obj.key`)
   - Simple and most commonly used.
   - Property name must be a valid identifier (no spaces, no special chars, not starting with a number).
   
2. Bracket Notation (`obj["key"]`)
   - Used when property names are dynamic, contain special characters, or are stored in variables.
   - Useful when property names are not known at coding time.

3. Both notations can read and update property values.

-----------------------------------------------------
Examples:

// Object
const user = {
  name: "Kaizer",
  age: 25,
  "user-role": "admin"
};

// 1. Dot notation
console.log(user.name); // "Kaizer"
console.log(user.age);  // 25

// 2. Bracket notation
console.log(user["user-role"]); // "admin"

// 3. Using variables with bracket notation
let key = "age";
console.log(user[key]); // 25

// 4. Updating values
user.name = "John";
user["age"] = 30;
console.log(user); // { name: "John", age: 30, "user-role": "admin" }

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Dot notation = calling someone by their official name (direct and clear).
- Bracket notation = calling someone using a label you wrote on a slip (flexible, can change).

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Dot notation is concise but only works with fixed identifiers.
- Bracket notation is powerful for dynamic property access or unusual keys.
- Both are essential for working with objects effectively.

-----------------------------------------------------
Example / Usage:

const settings = {
  theme: "dark",
  "font-size": "16px"
};

console.log(settings.theme);        // "dark"
console.log(settings["font-size"]); // "16px"

let prop = "theme";
console.log(settings[prop]); // "dark"

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: When would you prefer bracket notation over dot notation?
A1: When property names are dynamic, have special characters, or come from user input.

Q2: What happens if you access a property that doesn’t exist?
A2: JavaScript returns `undefined`.

Q3: Can you use expressions inside bracket notation?
A3: Yes, `obj["a" + "b"]` works, but dot notation doesn’t allow expressions.

Q4: What’s the difference between `obj.key` and `obj["key"]`?
A4: Functionally same for valid identifiers, but bracket notation is more flexible.

Q5: Are object property keys always strings?
A5: Yes, even numeric keys are internally converted to strings.
*/
