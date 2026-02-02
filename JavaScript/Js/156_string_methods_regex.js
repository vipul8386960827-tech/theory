/* 156_string_methods_regex.js

=====================================================
String Methods and Regular Expressions in JavaScript
=====================================================

Definition:
- JavaScript strings have built-in methods that support **regular expressions (regex)** for searching, matching, replacing, and splitting text.
- Regular expressions provide a powerful way to describe patterns in strings.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. String Methods Supporting Regex:
   - `match(regex)` → returns array of matches or null
   - `replace(regex, replacement)` → replaces matching substrings
   - `search(regex)` → returns index of first match or -1
   - `split(regex)` → splits string based on pattern

2. Regex Basics:
   - `/pattern/flags` syntax
   - Flags: `g` (global), `i` (ignore case), `m` (multiline)
   - Can match characters, digits, word boundaries, etc.

3. Use Cases:
   - Input validation (emails, phone numbers)
   - Text parsing and extraction
   - Replacing or formatting strings

-----------------------------------------------------
Example:
-----------------------------------------------------
const text = "Hello 123, welcome to 456!";
const numbers = text.match(/\d+/g);      // ["123", "456"]
const newText = text.replace(/\d+/g, "#"); // "Hello #, welcome to #"
const index = text.search(/\d+/);        // 6
const parts = text.split(/\s+/);         // ["Hello", "123,", "welcome", "to", "456!"]

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Regex is like a **text pattern detector or filter**, allowing you to find or replace matching patterns quickly, like using a metal detector on a beach to find coins.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the difference between `match` and `search`?  
A1: `match` returns an array of all matches (or null), while `search` returns the index of the first match.

Q2: Can you use regex with `split`?  
A2: Yes, regex can define complex delimiters for splitting strings.

Q3: What does the `g` flag do?  
A3: `g` (global) flag finds all matches instead of stopping at the first one.

Q4: Why prefer regex over simple string methods?  
A4: Regex is more flexible for pattern-based searching, matching, and replacing, especially with complex rules.
*/
