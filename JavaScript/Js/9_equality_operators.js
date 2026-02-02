/* 
9_equality_operators.js – Interview-Ready Answer:

"In JavaScript, equality operators are used to compare values. 
There are two main types: loose equality (==) and strict equality (===)."

1️⃣ Definition:
- `==` (Loose Equality) → Compares two values after type coercion.
- `===` (Strict Equality) → Compares two values without type coercion (both value and type must match).

2️⃣ Key Points to Highlight:
- `==` allows type conversion (e.g., "5" == 5 → true).
- `===` avoids implicit type conversion (e.g., "5" === 5 → false).
- Always prefer `===` in modern JavaScript for reliability and predictability.
- Special cases: `NaN === NaN → false`, but `Object.is(NaN, NaN) → true`.

3️⃣ Examples:

console.log(5 == "5");    // true  (loose equality → type coercion)
console.log(5 === "5");   // false (strict equality → type mismatch)
console.log(null == undefined);  // true
console.log(null === undefined); // false null is type of object and undefined is type of undefined
console.log(NaN == NaN);  // false it js treats that nan is not equal to anything including itself
console.log(Object.is(NaN, NaN)); // true object is considered equal to nan and than is equal to nan

4️⃣ Real-Life Analogies:
- Global Analogy: 
  - `==` is like accepting both a passport copy or original (loose check).
  - `===` is like verifying only the original passport with exact details.
- India-specific Analogy:
  - `==` is like Indian shops accepting ₹500 note whether new design or old design.
  - `===` is like ATM machines that only accept the exact new design ₹500 note.
- Web Analogy:
  - `==` is like loose form validation that accepts "25" as number 25.
  - `===` is like strict form validation that rejects "25" if expecting a number.

5️⃣ Code Explanation:
- Loose equality may cause bugs due to implicit type conversions.
- Strict equality is more predictable and should be the default choice.

6️⃣ Example / Usage:

let x = 0;
let y = false;

console.log(x == y);   // true → because 0 is coerced to false
console.log(x === y);  // false → because 0 (number) !== false (boolean)

console.log(null == undefined);  // true (special loose equality case)
console.log(null === undefined); // false (strict check)

7️⃣ Follow-Up Interview Questions:

Q1: Why does `null == undefined` return true?  
A1: Loose equality has special rules that consider null and undefined equal.

Q2: Why is `NaN == NaN` false?  
A2: By IEEE 754 standard, NaN is not equal to itself. Use `Number.isNaN()` or `Object.is()`.

Q3: When should you use `==`?  
A3: Rarely. Only if intentional type coercion is desired, otherwise use `===`.

Q4: Difference between `Object.is()` and `===`?  
A4: `Object.is()` is like strict equality but handles special cases like `NaN` and `-0` correctly.

Q5: What is the difference between `==` and `===` in terms of performance?  
A5: `===` is slightly faster since it skips type coercion, though the difference is negligible in practice.
*/
