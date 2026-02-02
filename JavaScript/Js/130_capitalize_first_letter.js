/* 130_capitalize_first_letter.js

=====================================================
Capitalize the First Letter of a String in JavaScript
=====================================================

Definition:
Capitalizing the first letter of a string means converting the first 
character to uppercase while leaving the rest of the string unchanged.  
Commonly used for formatting names, titles, and labels.

-----------------------------------------------------
Methods:
-----------------------------------------------------

1. **Using charAt() and slice()**
   function capitalize(str) {
     return str.charAt(0).toUpperCase() + str.slice(1);
   }

2. **Using array destructuring**
   function capitalize(str) {
     const [first, ...rest] = str;
     return first.toUpperCase() + rest.join("");
   }

3. **Using substring()**
   function capitalize(str) {
     return str.substring(0, 1).toUpperCase() + str.substring(1);
   }

4. **With Regex**
   function capitalize(str) {
     return str.replace(/^./, c => c.toUpperCase());
   }

-----------------------------------------------------
Examples:
-----------------------------------------------------
console.log(capitalize("hello"));   // "Hello"
console.log(capitalize("world"));   // "World"
console.log(capitalize("javaScript")); // "JavaScript"

-----------------------------------------------------
Edge Cases:
-----------------------------------------------------
- Empty string `""` → should return `""`.
- Strings starting with numbers → first "letter" may be a digit, so unchanged.
- Strings with whitespace at start → space remains, not capitalized.
- Non-alphabetic characters → unaffected.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of a sentence: the first word’s first letter is like 
  the "face of the sentence." Capitalizing it is like putting a 
  capital on someone’s name.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How would you capitalize every word in a string?  
A1: Split by space and apply `capitalize` to each word, then join.

Q2: How does this differ from `toUpperCase()`?  
A2: `toUpperCase()` changes the whole string, while `capitalize` only 
    changes the first letter.

Q3: How do you handle internationalization (like accented characters)?  
A3: Use libraries like **Lodash** or **Intl** API for better locale support.

Q4: How can you make a reusable utility for capitalizing strings?  
A4: Put the function in a utility/helper file and import wherever needed.
*/
