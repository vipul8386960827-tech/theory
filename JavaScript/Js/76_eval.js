/* 
76_eval.js – Interview-Ready Answer

"In JavaScript, `eval()` is a function that evaluates a string as 
JavaScript code and executes it. It can be powerful but is generally 
discouraged due to security and performance risks."

1️⃣ Key Points to Highlight

1. Definition:
- Accepts a string as input.
- Executes the string as JavaScript code.
- Returns the result of the evaluated code.

2. Syntax Example

let code = "2 + 3";
console.log(eval(code)); // 5

let x = 10;
console.log(eval("x * 2")); // 20

// Using eval to define a variable dynamically
eval("var y = 100");
console.log(y); // 100

3. Risks and Considerations:
- Security: executing user input can lead to XSS attacks.
- Performance: parsing and evaluating strings is slower.
- Debugging: code executed via eval is harder to trace.
- Modern alternatives: JSON.parse, dynamic function creation, or proper logic.

4. Real-Life Analogies

- Global Analogy: eval = giving someone a blank check and letting them write any instructions.
- India-specific Analogy: eval = allowing anyone to execute code on government system without validation.
- Web Analogy: Dynamically executing string-based code from user input is risky.

5. Code Explanation

- eval can execute expressions, statements, or even create variables in the current scope.
- Should never be used with untrusted input.
- Primarily used for legacy code or dynamic expression evaluation.

6. Example / Usage

let expression = "3 * (4 + 5)";
let result = eval(expression); // evaluates to 27
console.log(result);

const userInput = "alert('Hacked!')";
// eval(userInput); // Dangerous: executes arbitrary code

// Safe alternative
let safeResult = Function('"use strict"; return (' + expression + ')')();
console.log(safeResult); // 27

7️⃣ Follow-Up Interview Questions

Q1: Is eval safe to use with user input?  
A1: No, it can execute malicious code.

Q2: Can eval access local variables?  
A2: Yes, eval executes code in the current scope.

Q3: What are safer alternatives to eval?  
A3: JSON.parse, Function constructor, or direct logic implementation.

Q4: Does eval affect performance?  
A4: Yes, parsing and executing strings is slower than normal code.

Q5: Can eval be used in strict mode?  
A5: Yes, but behavior differs slightly; use strict mode for safer execution.
*/
