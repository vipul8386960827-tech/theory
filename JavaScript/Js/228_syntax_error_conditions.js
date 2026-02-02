/* 228_syntax_error_conditions.js

=====================================================
SyntaxError in JavaScript – Conditions & Explanation
=====================================================

Definition:
- "A SyntaxError occurs when the JavaScript engine encounters 
   invalid code that breaks the language rules during parsing, 
   before execution starts."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Happens at **parse time**, not runtime.  
2. Indicates that the code is not valid JavaScript.  
3. Execution does not start until syntax issues are fixed.  
4. Common reasons include:  
   - Missing parentheses, brackets, or braces.  
   - Using reserved keywords improperly.  
   - Incorrect or unexpected tokens.  
   - Invalid JSON or template literals.  
5. Unlike runtime errors, syntax errors must be fixed 
   before code can run at all.  

-----------------------------------------------------
Examples of Syntax Errors:

// Example 1: Missing closing parenthesis
console.log("Hello";  
// ❌ SyntaxError: missing ) after argument list

// Example 2: Invalid identifier
let 1x = 10;  
// ❌ SyntaxError: Invalid or unexpected token

// Example 3: Using reserved keyword as variable
let class = "test";  
// ❌ SyntaxError: Unexpected strict mode reserved word

// Example 4: Unterminated string
let str = "Hello;  
// ❌ SyntaxError: Unterminated string constant

// Example 5: Invalid JSON.parse
JSON.parse("{name: 'John'}");  
// ❌ SyntaxError: Unexpected token n in JSON

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- JavaScript parser checks code before execution.  
- If any illegal token or structure is found, it throws a `SyntaxError`.  
- Fixing the syntax is the only way to proceed.  

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like bad grammar in a sentence:  
  "He go school yesterday." → invalid grammar, cannot be accepted.  
  Similarly, wrong syntax makes JS code unreadable to the engine.  

-----------------------------------------------------
Example / Usage:

try {
  eval("let x = ;"); // invalid code
} catch (e) {
  console.log(e.name);    // SyntaxError
  console.log(e.message); // Unexpected token ';'
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: At what stage do syntax errors occur?  
A1: During parsing/compilation, before runtime.  

Q2: Can `try...catch` handle syntax errors?  
A2: Only if the invalid code is inside `eval()`. Otherwise, 
    code won’t run until the syntax is corrected.  

Q3: Difference between `SyntaxError` and `ReferenceError`?  
A3: `SyntaxError` → invalid code structure;  
    `ReferenceError` → code is valid but refers to an undefined variable.  

Q4: How can syntax errors be prevented?  
A4: Use linters (ESLint), IDE syntax highlighting, and unit tests.  

Q5: Why does `JSON.parse("{name: 'John'}")` throw a SyntaxError?  
A5: JSON requires keys and string values to be wrapped in double quotes.  
*/
