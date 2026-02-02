/* 134_starts_with_string.js

=====================================================
Checking if a String Starts with Another String in JavaScript
=====================================================

Definition:
- The `startsWith()` method determines whether a string begins with the characters of a specified string.
- Returns a **boolean**: `true` if it starts with the given substring, otherwise `false`.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Syntax
   - `str.startsWith(searchString, position)`
   - `searchString`: The characters to search for.
   - `position` (optional): The position in the string to start searching (default is 0).

2. Case-Sensitive
   - `startsWith` is case-sensitive. `"Hello".startsWith("h")` → `false`.

3. Alternative (Pre-ES6)
   - Use `str.indexOf(searchString) === 0` to check the beginning.

-----------------------------------------------------
Example:
-----------------------------------------------------
const str = "JavaScript";

console.log(str.startsWith("Java")); // true
console.log(str.startsWith("Script")); // false
console.log(str.startsWith("Script", 4)); // true (start checking from index 4)

// Pre-ES6 alternative
console.log(str.indexOf("Java") === 0); // true

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Like checking the first word in a sentence to see if it matches what you expect.
- Example: "Is the first word 'Java'? Yes → true, No → false."

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Is `startsWith` case-sensitive?  
A1: Yes, it is case-sensitive.

Q2: How to check if a string starts with a substring in older browsers?  
A2: Use `str.indexOf(substring) === 0`.

Q3: Can `startsWith` accept a starting position other than 0?  
A3: Yes, the optional `position` parameter allows checking from a different index.

Q4: Difference between `startsWith` and `includes`?  
A4: `startsWith` only checks the beginning; `includes` checks anywhere in the string.
*/
