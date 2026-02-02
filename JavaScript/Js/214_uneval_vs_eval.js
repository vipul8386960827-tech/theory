/* 214_uneval_vs_eval.js

=====================================================
uneval() vs eval() in JavaScript
=====================================================

Definition (Interview-friendly):
- "eval() executes a string of JavaScript code, whereas uneval() 
  returns a string representation of an object, function, or expression 
  without executing it. eval() is standard but risky; uneval() is non-standard."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using eval()
   - Executes JS code from a string
   - Example:
     const code = "2 + 3";
     console.log(eval(code)); // 5

2. Using uneval()
   - Returns string representation of objects/functions
   - Example:
     const obj = { name: "Alice" };
     const str = uneval(obj);
     console.log(str); // "({name:"Alice"})"

3. Reversing uneval()
   - You can execute uneval output using eval (risky)
   - Example:
     const restored = eval(str);
     console.log(restored.name); // "Alice"

4. Differences
   - eval() executes code; uneval() only converts code to string
   - eval() is standard and widely supported; uneval() is non-standard, mainly Firefox

5. Use Cases
   - eval(): Dynamic code execution (rare, security risk)
   - uneval(): Debugging, temporary code serialization (non-standard)

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- eval() is like **reading instructions and performing them immediately**.
- uneval() is like **writing down the instructions as text** without acting.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Is eval() safe to use?
A1: No, it can execute malicious code if input is untrusted.

Q2: Can uneval() be used in all browsers?
A2: No, it is non-standard; mostly works in Firefox.

Q3: Difference between JSON.stringify() and uneval()?
A3: JSON.stringify() returns JSON; uneval() returns executable code representation.

Q4: Can you restore objects from uneval() output?
A4: Yes, using eval(), but it’s unsafe.

Q5: Alternatives to eval() for dynamic execution?
A5: Function constructor, safer parsing, or sandboxed environments.
*/
