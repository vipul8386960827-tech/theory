/* 160_search_string_pattern.js

=====================================================
Searching String Patterns in JavaScript
=====================================================

Definition:
- Searching string patterns involves finding specific sequences of characters within a string.
- Can be done using built-in string methods or Regular Expressions (RegExp).

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `includes()`
   - Checks if a substring exists in a string.
   - Example:
     const text = "Hello world";
     console.log(text.includes("world")); // true
     console.log(text.includes("World")); // false (case-sensitive)

2. Using `indexOf()`
   - Returns the index of the first occurrence of a substring, or -1 if not found.
   - Example:
     const text = "Hello world";
     console.log(text.indexOf("world")); // 6
     console.log(text.indexOf("World")); // -1

3. Using `startsWith()` / `endsWith()`
   - Checks if a string starts or ends with a specific substring.
   - Example:
     const text = "Hello world";
     console.log(text.startsWith("Hello")); // true
     console.log(text.endsWith("world"));   // true

4. Using Regular Expressions
   - More powerful pattern matching.
   - Example:
     const text = "The rain in Spain";
     const regex = /ain/g;
     console.log(text.match(regex)); // ["ain", "ain"]

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Searching string patterns is like using a **magnifying glass**:
  - You can look for exact words, partial matches, or even complex patterns using regex.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `includes()` and `indexOf()`?
A1: `includes()` returns true/false; `indexOf()` returns the index or -1.

Q2: Are string search methods case-sensitive?
A2: Yes, by default. Use `.toLowerCase()` or regex with `i` flag for case-insensitive search.

Q3: Can regular expressions find multiple matches?
A3: Yes, use the `g` (global) flag to find all matches.

Q4: Difference between regex search methods and string methods?
A4: Regex allows complex patterns, wildcards, and character sets; string methods are simple substring checks.

Q5: How to find the position of a pattern using regex?
A5: Use `.exec()` or `string.search(regex)` which returns the index of the first match.
*/
