/* 158_regex_patterns.js

=====================================================
Regular Expression Patterns in JavaScript
=====================================================

Definition:
- Regular expressions (regex) are patterns used to match character combinations in strings.
- In JavaScript, regex is represented by the RegExp object or literal syntax: /pattern/flags.

-----------------------------------------------------
Common Regex Patterns:
-----------------------------------------------------
1. Matching Digits
   - Pattern: /\d/ matches any digit (0-9)
   - Example: "123".match(/\d/g) → ["1", "2", "3"]

2. Matching Non-Digits
   - Pattern: /\D/ matches any non-digit character
   - Example: "abc123".match(/\D/g) → ["a", "b", "c"]

3. Matching Word Characters
   - Pattern: /\w/ matches letters, digits, or underscores
   - Example: "var_name".match(/\w/g) → ["v","a","r","_","n","a","m","e"]

4. Matching Non-Word Characters
   - Pattern: /\W/ matches any character not a letter, digit, or underscore
   - Example: "!@#".match(/\W/g) → ["!", "@", "#"]

5. Matching Whitespace
   - Pattern: /\s/ matches spaces, tabs, newlines
   - Example: "Hello World".match(/\s/g) → [" "]

6. Matching Non-Whitespace
   - Pattern: /\S/ matches any character except spaces, tabs, newlines
   - Example: "Hello World".match(/\S/g) → ["H","e","l","l","o","W","o","r","l","d"]

7. Anchors
   - ^ → start of string, $ → end of string
   - Example: /^Hello/.test("Hello World") → true

8. Quantifiers
   - * → 0 or more, + → 1 or more, ? → 0 or 1
   - {n} → exactly n times, {n, m} → between n and m times

9. Character Sets
   - [abc] → matches a, b, or c
   - [^abc] → matches anything except a, b, or c

10. Groups and Capture
    - (abc) → captures group, (?:abc) → non-capturing group

-----------------------------------------------------
Example:
-----------------------------------------------------
let str = "Hello123 World456";

// Match all digits
console.log(str.match(/\d+/g)); // ["123", "456"]

// Match words
console.log(str.match(/\w+/g)); // ["Hello123", "World456"]

// Check if string starts with Hello
console.log(/^Hello/.test(str)); // true

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Regex is like a **search filter with advanced criteria**:
  - You specify a pattern, and it finds all matches in text efficiently.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between match() and test()?
A1: match() returns array of matches, test() returns true/false.

Q2: What are greedy and lazy quantifiers?
A2: Greedy (*) tries to match as much as possible, lazy (*?) matches as little as possible.

Q3: Difference between capturing and non-capturing groups?
A3: Capturing groups store the match in memory for later use, non-capturing groups do not.

Q4: How do you match a literal dot in regex?
A4: Use \. because . matches any character by default.
*/
