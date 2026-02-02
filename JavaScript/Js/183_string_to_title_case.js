/* 183_string_to_title_case.js

=====================================================
Convert String to Title Case in JavaScript
=====================================================

Definition (Interview-friendly):
- "Title case means capitalizing the first letter of each word in a string. 
  This is commonly used for headings, names, and titles."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Conversion
   - Example:
     const str = "hello world from js";
     const titleCase = str
         .split(" ")
         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
         .join(" ");
     console.log(titleCase); // "Hello World From Js"

2. Handling Extra Spaces
   - Example:
     const str = "  multiple   spaces  ";
     const titleCase = str
         .trim()
         .split(/\s+/)
         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
         .join(" ");
     console.log(titleCase); // "Multiple Spaces"

3. Function Version
   - Example:
     function toTitleCase(str) {
         return str
             .split(" ")
             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
             .join(" ");
     }
     console.log(toTitleCase("javascript is fun")); // "Javascript Is Fun"

4. Edge Cases
   - Empty string → returns empty string.
   - Single word → capitalizes first letter.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Title case is like **capitalizing the first letters in a book title** 
  to make it look properly formatted.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How to handle punctuation when converting to title case?
A1: Use regex to split words or strip punctuation as needed.

Q2: Can you make it locale-aware?
A2: Yes, using String.prototype.toLocaleUpperCase().

Q3: Difference between toUpperCase() and toLocaleUpperCase()?
A3: toLocaleUpperCase considers locale-specific rules for capitalization.

Q4: How to avoid capitalizing small words like 'of', 'and'?
A4: Maintain a list of exceptions and skip them during mapping.

Q5: Is there a built-in JavaScript method for title case?
A5: No, must implement manually using split/map/join.
*/
