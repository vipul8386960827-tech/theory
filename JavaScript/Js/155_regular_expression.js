/* 155_regular_expression.js

=====================================================
Regular Expressions in JavaScript
=====================================================

Definition:
- A **Regular Expression (RegEx)** is a sequence of characters that defines a search pattern.
- Used for matching, searching, and replacing strings based on patterns.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Syntax
   - Literal: `/pattern/flags`
   - Constructor: `new RegExp("pattern", "flags")`
   - Flags:
     - `g` → global search
     - `i` → case-insensitive
     - `m` → multiline

2. Common Methods
   - `test()` → returns boolean if pattern matches string
   - `exec()` → returns matched result
   - `match()` → returns array of matches
   - `replace()` → replaces matched substrings
   - `split()` → splits string using pattern as delimiter

3. Special Characters
   - `.` → any character except newline
   - `\d` → digit
   - `\w` → word character
   - `\s` → whitespace
   - `^` → start of string
   - `$` → end of string
   - `*` → zero or more
   - `+` → one or more
   - `?` → zero or one
   - `{n,m}` → repeat between n and m times
   - `[abc]` → character set

-----------------------------------------------------
Example:
-----------------------------------------------------
const regex = /^[A-Z]\w+$/; // starts with uppercase, followed by word characters
console.log(regex.test("Hello")); // true
console.log(regex.test("hello")); // false

const str = "Email me at test@example.com";
const emailRegex = /\b\w+@\w+\.\w+\b/;
console.log(str.match(emailRegex)); // ["test@example.com"]

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Regular expressions are like search filters in an email inbox:
  - You define patterns (like sender, subject keywords) and the system matches emails accordingly.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What are some common use cases of regex in web development?  
A1: Validation (emails, phone numbers), search & replace, string parsing, input sanitization.

Q2: Difference between `test` and `match`?  
A2: `test` returns boolean, `match` returns matched array.

Q3: Are regex patterns case-sensitive by default?  
A3: Yes, use `i` flag to ignore case.

Q4: How to match all occurrences of a pattern?  
A4: Use the `g` (global) flag in the regex.
*/
