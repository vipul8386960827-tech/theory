/* 139_multiline_strings.js

=====================================================
Multiline Strings in JavaScript
=====================================================

Definition:
- Multiline strings allow a string to span across multiple lines in your code.
- Useful for readability and formatting long text blocks.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using Backticks (Template Literals)
   - Modern approach using ES6 template literals.
   - Example:
     const message = `Hello,
This is a multiline
string example.`;
     console.log(message);
     Output:
        Hello,
        This is a multiline
        string example.

2. Using Escape Character \n
   - Older approach using newline character.
   - Example:
     const message = "Hello,\nThis is a multiline\nstring example.";
     console.log(message);
     Output:
        Hello,
        This is a multiline
        string example.

3. Concatenation of Strings
   - Combine multiple strings with +.
   - Example:
     const message = "Hello,\n" + 
                     "This is a multiline\n" + 
                     "string example.";
     console.log(message);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Multiline strings are like writing paragraphs on paper:
  - Each line can naturally continue onto the next without breaking the text.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between using backticks and \n?
A1: Backticks preserve line breaks in code naturally; \n requires explicit newline characters.

Q2: Can you use expressions inside multiline strings?
A2: Yes, using ${expression} syntax with template literals.
   Example:
     const name = "Alice";
     const message = `Hello ${name},
Welcome!`;

Q3: Are multiline strings supported in all browsers?
A3: Template literals are supported in modern browsers (ES6+). Older browsers may require transpilation.

Q4: Can you use quotes inside multiline strings?
A4: Yes, template literals allow both single and double quotes without escaping.
   Example:
     const str = `She said "Hello"`; // Works fine
*/
