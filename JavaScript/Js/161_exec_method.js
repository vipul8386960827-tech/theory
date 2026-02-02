/* 161_exec_method.js

=====================================================
RegExp exec() Method in JavaScript
=====================================================

Definition:
- The `exec()` method executes a regular expression on a string.
- Returns an array containing the matched text and capture groups.
- Returns `null` if no match is found.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   const regex = /hello/;
   const result = regex.exec("hello world");
   console.log(result[0]); // "hello"

2. Using Capture Groups
   const regex = /(\d+)-(\w+)/;
   const result = regex.exec("123-abc");
   console.log(result[0]); // "123-abc"
   console.log(result[1]); // "123"
   console.log(result[2]); // "abc"

3. Global Matches with `g` Flag
   const regex = /a/g;
   const str = "banana";
   let match;
   while ((match = regex.exec(str)) !== null) {
       console.log(`Found '${match[0]}' at index ${match.index}`);
   }
   // Found 'a' at index 1
   // Found 'a' at index 3
   // Found 'a' at index 5

4. No Match Scenario
   const regex = /xyz/;
   console.log(regex.exec("abc")); // null

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- `exec()` is like a **scanner**:
  - It goes through a string to find a match and provides details about it.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `exec()` and `test()`?
A1: `exec()` returns match details or null; `test()` returns true/false.

Q2: How does `exec()` behave with the `g` flag?
A2: Each call continues from the last match using `regex.lastIndex`.

Q3: Can `exec()` return capture groups?
A3: Yes, all groups in parentheses are returned as elements in the array.

Q4: What happens if no match is found?
A4: `exec()` returns `null`.

Q5: Can `exec()` be used without regex literal?
A5: Yes, works with `RegExp` objects created via `new RegExp()`.
*/
