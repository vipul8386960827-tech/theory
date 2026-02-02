/* 
84_nan_property.js – Interview-Ready Answer

"In JavaScript, NaN (Not-a-Number) is a special value that represents 
an invalid number operation. It is a property of the global object and has 
some unique characteristics."

1️⃣ Key Points to Highlight

1. Definition:
- NaN is a numeric value representing an invalid number result.
- Usually occurs in arithmetic operations on non-numeric values.
- Type of NaN is "number".

2. Syntax Example

console.log(typeof NaN); // "number"

console.log(0 / 0);       // NaN
console.log("abc" * 2);   // NaN
console.log(Math.sqrt(-1)); // NaN

3. Key Characteristics:

- NaN !== NaN // true, only value in JS that is not equal to itself
- Use Number.isNaN(value) for reliable checking
- isNaN(value) converts value to number first, then checks

4. Real-Life Analogies

- Global Analogy: NaN = invalid calculation like dividing apples by oranges.
- India-specific Analogy: NaN = undefined result when trying to calculate tax on missing data.
- Web Analogy: Used in JS to signal invalid numeric computations.

5. Code Explanation

- NaN indicates failed numeric operations.
- Cannot be detected reliably with equality operator; must use Number.isNaN().
- Part of the global object, so accessible anywhere.

6. Example / Usage

console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN("abc"));     // false
console.log(isNaN("abc"));            // true (due to coercion)
console.log(NaN === NaN);             // false

// Handling NaN safely
function safeDivide(a, b) {
    const result = a / b;
    return Number.isNaN(result) ? 0 : result;
}

console.log(safeDivide(10, 0)); // 0

7️⃣ Follow-Up Interview Questions

Q1: What is the type of NaN?  
A1: number

Q2: How to reliably check for NaN?  
A2: Use Number.isNaN(value)

Q3: Why NaN !== NaN?  
A3: By design, to indicate invalid number is not equal to any value, including itself.

Q4: Difference between isNaN and Number.isNaN?  
A4: isNaN coerces input; Number.isNaN is strict.

Q5: Can NaN appear in arrays or objects?  
A5: Yes, it can be stored and propagated in computations.
*/
