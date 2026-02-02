/* 163_1_2_3_output.js

=====================================================
Understanding 1, 2, 3 Output in JavaScript
=====================================================

Definition:
- This problem usually refers to understanding how JavaScript interprets numbers
  or expressions like `1 + "2" + "3"`, `1 + 2 + "3"`, and `"1" + 2 + 3`.
- Involves type coercion between numbers and strings.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Example 1: 1 + "2" + "3"
   - JavaScript converts number to string when concatenated with a string.
   - Calculation:
       1 + "2" => "12"
       "12" + "3" => "123"
   - Output:
       console.log(1 + "2" + "3"); // "123"

2. Example 2: 1 + 2 + "3"
   - Left-to-right evaluation.
   - Calculation:
       1 + 2 => 3 (number)
       3 + "3" => "33" (string)
   - Output:
       console.log(1 + 2 + "3"); // "33"

3. Example 3: "1" + 2 + 3
   - Left-to-right evaluation.
   - Calculation:
       "1" + 2 => "12" (string)
       "12" + 3 => "123" (string)
   - Output:
       console.log("1" + 2 + 3); // "123"

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Type coercion is like **mixing liquids of different types**:
  - Once you mix a number with a string, the result becomes a string for subsequent operations.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why does 1 + "2" produce a string instead of a number?
A1: JavaScript performs type coercion; when adding a number to a string, the number converts to a string.

Q2: Does operator precedence affect these outputs?
A2: Yes, but `+` is left-associative, so evaluation happens left-to-right.

Q3: How to force numeric addition in mixed expressions?
A3: Use `Number()` or unary `+` to convert strings to numbers.
   Example:
     console.log(1 + 2 + +"3"); // 6

Q4: Are there other operators that coerce types automatically?
A4: Yes, `-`, `*`, `/` coerce strings to numbers, unlike `+`.

Q5: Why is understanding this important?
A5: Avoids unexpected bugs in string concatenation and numeric calculations.
*/
