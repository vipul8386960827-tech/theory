/* 242_unary_operator.js

=====================================================
Unary Operators in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Unary operators are operators that operate on a single operand to produce a new value."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Perform operations like negation, type conversion, increment/decrement on a single value.

2. **Common Unary Operators**  
   - `+` → Converts operand to number.  
   - `-` → Negates operand.  
   - `++` → Increment (prefix/postfix).  
   - `--` → Decrement (prefix/postfix).  
   - `typeof` → Returns type of operand.  
   - `delete` → Deletes a property from an object.  
   - `void` → Evaluates expression and returns undefined.  
   - `!` → Logical NOT.

-----------------------------------------------------
Examples:

// Unary plus converts string to number
let a = "5";
console.log(+a); // 5

// Unary minus
let b = 10;
console.log(-b); // -10

// Increment / Decrement
let c = 1;
console.log(++c); // 2 (prefix)
console.log(c--); // 2 (postfix), then c = 1

// typeof
console.log(typeof 123); // "number"
console.log(typeof "hello"); // "string"

// delete
const obj = { prop: 1 };
delete obj.prop;
console.log(obj.prop); // undefined

// Logical NOT
console.log(!true); // false

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Unary operators take one operand.  
- Can be used for arithmetic, type checking, property deletion, or logical negation.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Unary operator = action on a single item:  
  - e.g., pressing a button to reverse a light (negate), or checking a card’s type (typeof).

-----------------------------------------------------
Example / Usage:

let x = "100";
console.log(+x); // 100
console.log(-x); // -100
x++;
console.log(x); // 101
console.log(typeof x); // "number"

const obj2 = { key: "value" };
delete obj2.key;
console.log(obj2.key); // undefined

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between prefix and postfix increment?  
A1: Prefix returns incremented value immediately; postfix returns original value, then increments.

Q2: What does unary `+` do with non-numeric strings?  
A2: Converts to `NaN`.

Q3: Can `delete` remove variables declared with `var`?  
A3: No, only object properties.

Q4: Difference between `typeof null` and `typeof undefined`?  
A4: `typeof null` → "object"; `typeof undefined` → "undefined".

Q5: How does unary `!` differ from `!!`?  
A5: `!` negates boolean value; `!!` converts any value to boolean.
*/
