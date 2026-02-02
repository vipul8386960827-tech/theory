/* 
80_isnan.js – Interview-Ready Answer

"In JavaScript, `isNaN()` is a function used to check whether a value is 
NaN (Not-a-Number). However, it has quirks and a better alternative is 
`Number.isNaN()`."

1️⃣ Key Points to Highlight

1. Definition:
- isNaN(value): returns true if the value cannot be converted to a number.
- Number.isNaN(value): returns true only if the value is exactly NaN.

2. Syntax Example

console.log(isNaN("abc")); // true (string can't be converted)
console.log(isNaN("123")); // false (string converts to number 123)
console.log(isNaN(NaN));   // true

console.log(Number.isNaN("abc")); // false
console.log(Number.isNaN(NaN));   // true

3. Real-Life Analogies

- Global Analogy: isNaN = checking if input is invalid for number operations.
- India-specific Analogy: isNaN = verifying if a bank account number is valid.
- Web Analogy: Used to validate numeric inputs from forms.

4. Code Explanation

- isNaN coerces non-number values to number before checking, may give unexpected results.
- Number.isNaN is stricter and does not coerce values.
- Useful in input validation and calculations to prevent errors.

5. Example / Usage

function checkNumber(value) {
    if (Number.isNaN(value)) {
        console.log("Value is NaN");
    } else {
        console.log("Value is a number:", value);
    }
}

checkNumber(NaN);        // Value is NaN
checkNumber("abc");      // Value is a number: abc
checkNumber(123);        // Value is a number: 123

6️⃣ Follow-Up Interview Questions

Q1: Difference between isNaN and Number.isNaN?  
A1: isNaN coerces values; Number.isNaN checks exact NaN.

Q2: What does NaN represent?  
A2: Not-a-Number, result of invalid numeric operations.

Q3: Can NaN be equal to itself?  
A3: No, NaN === NaN is false.

Q4: How to reliably check if a value is NaN?  
A4: Use Number.isNaN(value).

Q5: Is NaN a falsy value?  
A5: Yes, it is falsy in boolean context.
*/
