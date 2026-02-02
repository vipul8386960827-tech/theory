/* 135_trim_string.js

=====================================================
Trimming Strings in JavaScript
=====================================================

Definition:
- **Trimming a string** means removing whitespace characters from the beginning and/or end of a string.
- Useful for cleaning user input or removing unwanted spaces in data processing.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Methods
   - `trim()` → removes whitespace from both ends
   - `trimStart()` or `trimLeft()` → removes whitespace from the start
   - `trimEnd()` or `trimRight()` → removes whitespace from the end

2. Whitespace characters include:
   - Space, tab (`\t`), newline (`\n`), carriage return (`\r`), and other Unicode whitespace.

3. Non-mutating:
   - These methods **do not modify the original string**, they return a new trimmed string.

-----------------------------------------------------
Example:
-----------------------------------------------------
const str = "   Hello World!   ";
console.log(str.trim());      // "Hello World!"
console.log(str.trimStart()); // "Hello World!   "
console.log(str.trimEnd());   // "   Hello World!"

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Trimming a string is like **shaving off the extra edges of a photo** to focus on the main content.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Does `trim()` remove spaces in the middle of the string?  
A1: No, it only removes whitespace at the start and end.

Q2: Are `trimStart()` and `trimLeft()` equivalent?  
A2: Yes, both remove leading whitespace. Similarly, `trimEnd()` and `trimRight()` remove trailing whitespace.

Q3: Can trimming affect string comparison?  
A3: Yes, leading/trailing spaces can cause equality checks to fail if not trimmed.

Q4: Why is trimming important in user input handling?  
A4: Prevents errors due to unintended spaces and improves data consistency.
*/
