/*
85_isfinite_function.js – Interview-Ready Answer

"In JavaScript, the isFinite() function determines whether a value is a 
finite number. It returns true if the value is a number and finite; otherwise, false."

Key Points:

1️⃣ Definition:
- Global function: isFinite(value)
- Returns false for NaN, Infinity, -Infinity, or non-numeric values (after coercion).
- Coerces non-numbers to numbers before checking.

2️⃣ Syntax Example:

// Finite numbers
console.log(isFinite(10));        // true
console.log(isFinite(-5.5));      // true

// Infinity and -Infinity
console.log(isFinite(Infinity));  // false
console.log(isFinite(-Infinity)); // false

// Non-numeric values
console.log(isFinite("123"));     // true (coerced to number)
console.log(isFinite("abc"));     // false (NaN after coercion)
console.log(isFinite(true));      // true (true coerces to 1)
console.log(isFinite(null));      // true (null coerces to 0)
console.log(isFinite(undefined)); // false (NaN after coercion)

3️⃣ Real-Life Analogies:

- Global Analogy: isFinite = checking if a bank account balance is a valid finite number.
- India-specific Analogy: isFinite = checking if a student’s marks entry is a valid number, not missing or infinite.
- Web Analogy: Validating user input for numbers before performing calculations.

4️⃣ Code Explanation:

- Helps prevent invalid number operations (like dividing by Infinity).
- Coercion can be tricky: strings and booleans may return true if convertible to finite numbers.
- Use Number.isFinite() for stricter check (does not coerce).

5️⃣ Example / Usage:

// Using Number.isFinite (strict version)
console.log(Number.isFinite(10));        // true
console.log(Number.isFinite("123"));     // false
console.log(Number.isFinite(NaN));       // false
console.log(Number.isFinite(Infinity));  // false

6️⃣ Follow-Up Interview Questions:

Q1: Difference between isFinite() and Number.isFinite()?  
A1: isFinite() coerces non-number values; Number.isFinite() checks strictly without coercion.

Q2: Can isFinite() be used to check NaN?  
A2: Yes, it returns false for NaN.

Q3: Why use Number.isFinite()?  
A3: To avoid unwanted type coercion and ensure value is a number.

Q4: How does isFinite() handle null and true?  
A4: null → 0, true → 1 (both considered finite, returns true with isFinite()).

Q5: Does isFinite() detect Infinity?  
A5: Yes, returns false for Infinity and -Infinity.
*/
