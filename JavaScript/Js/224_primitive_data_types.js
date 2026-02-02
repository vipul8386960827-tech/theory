/* 224_primitive_data_types.js

=====================================================
Primitive Data Types in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Primitive data types are the most basic, immutable data types in JavaScript. 
  They represent single values rather than collections or objects."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. JavaScript has 7 primitive data types:
   - string
   - number
   - boolean
   - null
   - undefined
   - symbol (ES6)
   - bigint (ES11 / ES2020)
2. Primitives are immutable – their actual values cannot be changed.
3. Stored directly in memory by value (not by reference).
4. Comparisons of primitives use value comparison, not reference.
5. Operations on primitives return new values without altering the original.

-----------------------------------------------------
Examples:

// String
let name = "Kaizer";
console.log(typeof name); // "string"

// Number
let age = 25;
console.log(typeof age); // "number"

// Boolean
let isLoggedIn = true;
console.log(typeof isLoggedIn); // "boolean"

// Null
let emptyValue = null;
console.log(typeof emptyValue); // "object" (JS quirk)

// Undefined
let notAssigned;
console.log(typeof notAssigned); // "undefined"

// Symbol
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2); // false (unique values)

// BigInt
let big = 1234567890123456789012345678901234567890n;
console.log(typeof big); // "bigint"

-----------------------------------------------------
Real-Life Analogies:
-----------------------------------------------------
- Primitive values are like coins: 
  once minted, their denomination (value) cannot be changed.
- If you want a new value, you mint a new coin (create a new primitive).

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Primitives represent the simplest form of data.
- Each has its own purpose: text, numbers, flags, absence of value, uniqueness, or very large numbers.
- Operations don’t mutate primitives but instead create new ones.

-----------------------------------------------------
Example / Usage:

let str = "Hello";
let newStr = str.toUpperCase();
console.log(str);    // "Hello" (unchanged, original string is immutable)
console.log(newStr); // "HELLO" (new string created)

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why is `typeof null` equal to "object"?
A1: It's a legacy bug in JavaScript from its first version, kept for compatibility.

Q2: Difference between `undefined` and `null`?
A2: `undefined` means a variable has been declared but not assigned; 
    `null` is an intentional assignment of "no value".

Q3: Can primitives have properties or methods?
A3: Temporarily, yes. JavaScript wraps them in objects (autoboxing), 
    but the primitive itself remains immutable.

Q4: Why use BigInt instead of Number?
A4: BigInt can represent integers larger than Number.MAX_SAFE_INTEGER (2^53 - 1).

Q5: How do Symbols ensure uniqueness?
A5: Each Symbol, even with the same description, is guaranteed to be unique.
*/
