/* 166_reserved_words_identifiers.js

=====================================================
Reserved Words and Identifiers in JavaScript
=====================================================

Definition:
- Reserved words are keywords that have special meaning in JavaScript.
- Identifiers are names you give to variables, functions, or objects.
- You cannot use reserved words as identifiers.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Examples of Reserved Words
   - `break`, `case`, `catch`, `class`, `const`, `continue`,
     `debugger`, `default`, `delete`, `do`, `else`, `export`,
     `extends`, `finally`, `for`, `function`, `if`, `import`,
     `in`, `instanceof`, `new`, `return`, `super`, `switch`,
     `this`, `throw`, `try`, `typeof`, `var`, `void`, `while`, `with`, `yield`

2. Valid Identifiers
   - Can start with letters, `$`, or `_`.
   - Cannot start with a number.
   - Example:
     let name;
     const $value = 10;
     var _count = 5;

3. Invalid Identifiers
   - Using reserved words or starting with a number.
   - Example:
     // let for = 5; // ❌ invalid
     // const 1name = "test"; // ❌ invalid

4. Unicode in Identifiers
   - ES6 allows Unicode letters in variable names.
   - Example:
     let café = "coffee";

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Reserved words are like **traffic signals**:
  - You cannot ignore them or assign your own meaning.
- Identifiers are like **street names**:
  - You can choose them freely as long as rules are followed.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can reserved words be used as object property names?
A1: Yes, but often need quotes: obj["for"] = 1;

Q2: Are identifiers case-sensitive?
A2: Yes, `myVar` and `MyVar` are different.

Q3: Can identifiers include numbers?
A3: Yes, but not at the start. Example: `var a1 = 5;` is valid.

Q4: Are `_` and `$` valid in identifiers?
A4: Yes, both are allowed at the beginning or within identifiers.

Q5: Can future reserved words be used as identifiers?
A5: No, words like `enum`, `await`, `implements` are reserved for future use.
*/
