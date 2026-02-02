/* 159_regexp_object.js

=====================================================
Regular Expressions (RegExp) in JavaScript
=====================================================

Definition:
- A Regular Expression (RegExp) is an object in JavaScript used to match patterns in strings.
- Useful for searching, validating, and replacing text.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Creating a RegExp
   - Using literal syntax:
     const regex = /abc/;
   - Using constructor syntax:
     const regex = new RegExp("abc");

2. Testing a Pattern
   - Use `.test()` to check if a pattern exists in a string.
   - Example:
     const regex = /hello/;
     console.log(regex.test("hello world")); // true
     console.log(regex.test("Hi there"));    // false

3. Matching Patterns
   - Use `.exec()` to get matched result(s).
   - Example:
     const regex = /a(b)c/;
     const result = regex.exec("abc");
     console.log(result[0]); // "abc"
     console.log(result[1]); // "b"

4. String Methods with RegExp
   - `match()`, `replace()`, `split()`, `search()` can all take regex.
   - Example:
     const str = "cat, bat, rat";
     console.log(str.match(/.at/g)); // ["cat", "bat", "rat"]
     console.log(str.replace(/.at/g, "dog")); // "dog, dog, dog"

5. Flags
   - `g` → global (match all occurrences)
   - `i` → case-insensitive
   - `m` → multiline
   - Example:
     const regex = /hello/gi;
     console.log("Hello hello".match(regex)); // ["Hello", "hello"]

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- RegExp is like a **search tool with advanced filters**:
  - Instead of looking for exact words, you define patterns to find, validate, or transform text.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `.test()` and `.exec()`?
A1: `.test()` returns true/false if pattern exists; `.exec()` returns detailed match info (array or null).

Q2: What does the `g` flag do?
A2: `g` allows multiple matches across the entire string, not just the first match.

Q3: Difference between string methods and RegExp methods?
A3: String methods like `match()` can take regex; RegExp methods like `test()` or `exec()` are called on the regex itself.

Q4: How to match a literal dot `.` in a string?
A4: Escape it with `\\.` in regex, e.g., /a\\.b/ matches "a.b".

Q5: Can regex capture groups be named?
A5: Yes, using `(?<name>pattern)` syntax in modern JavaScript.
*/
