/* 157_regex_modifiers.js

=====================================================
Regular Expression Modifiers in JavaScript
=====================================================

Definition:
- Modifiers (also called flags) change the behavior of a regular expression.
- They are placed after the closing `/` in a regex literal or as the second argument in `RegExp()` constructor.

-----------------------------------------------------
Common Modifiers:
-----------------------------------------------------
1. g (global)
   - Finds all matches rather than stopping at the first.
   - Example: `/a/g` matches all "a"s in a string.

2. i (ignore case)
   - Makes matching case-insensitive.
   - Example: `/hello/i` matches "Hello", "HELLO", "hello".

3. m (multiline)
   - `^` and `$` match start/end of lines instead of start/end of the string.
   - Example: `/^abc/m` matches "abc" at the start of any line.

4. s (dotall)
   - Allows `.` to match newline characters.
   - Example: `/a.b/s` matches "a\nb".

5. u (unicode)
   - Treats pattern as a sequence of Unicode code points.
   - Example: `/\u{1F600}/u` matches 😀 emoji.

6. y (sticky)
   - Matches from the last index (`lastIndex`) and does not search forward.
   - Example: `/abc/y` starting at index 0 only matches if "abc" is exactly at that position.

-----------------------------------------------------
Example:
-----------------------------------------------------
const str = "Hello hello HELLO";

// Global + Ignore Case
const regex = /hello/gi;
const matches = str.match(regex); // ["Hello", "hello", "HELLO"]

// Multiline
const multiStr = "abc\nabc";
const multiRegex = /^abc/m;
const multiMatches = multiStr.match(multiRegex); // ["abc", "abc"]

// Unicode
const emojiRegex = /\u{1F600}/u;
console.log(emojiRegex.test("😀")); // true

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Modifiers are like **glasses or lenses** on your eyes:  
  - They change how you perceive the pattern (case, position, all occurrences, etc.) without changing the object itself.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if you combine g and i flags?  
A1: Regex becomes global and case-insensitive, matching all occurrences ignoring case.

Q2: When would you use the y (sticky) flag?  
A2: When you need matches to occur exactly at the current index, useful in parsers.

Q3: Why use the u (unicode) flag?  
A3: To correctly match characters beyond the BMP (e.g., emojis) and handle Unicode code points.

Q4: Difference between m and s flags?  
A4: m affects ^ and $ for line boundaries; s allows . to match newline characters.
*/
