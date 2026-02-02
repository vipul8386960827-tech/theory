/* 426_vm_module.js

=====================================================
VM Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `vm` module in Node.js allows you to **run JavaScript code in a virtual machine-like context**. 
   It provides APIs to compile and execute code within **sandboxed environments**, 
   isolating it from the main application for security and controlled execution."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides the `vm.Script` class for compiling and running JavaScript code.
2. `vm.createContext()` creates a sandbox environment for execution.
3. `vm.runInContext()` executes code inside a sandbox.
4. Allows creating multiple isolated execution environments.
5. Helps run untrusted or dynamic code safely.
6. Useful for meta-programming, testing, and embedding interpreters.

-----------------------------------------------------
Basic Example (Running Code in Sandbox)
-----------------------------------------------------
const vm = require('vm');

const sandbox = { x: 10, y: 20 };
vm.createContext(sandbox); // turns object into a context

const code = 'result = x + y';
vm.runInContext(code, sandbox);

console.log(sandbox.result); // 30

-----------------------------------------------------
Example with vm.Script
-----------------------------------------------------
const script = new vm.Script(`Math.sqrt(16)`);
const context = vm.createContext({});
const result = script.runInContext(context);

console.log(result); // 4

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Running untrusted code securely in a sandbox.
- Testing dynamic code execution.
- Creating customizable templates or DSLs.
- Simulating multiple isolated JS environments.
- Meta-programming and serverless-like functions.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. VM contexts are **isolated**, but objects can still be passed in and out.
2. Not 100% secure — sandbox escapes are possible if not handled carefully.
3. Good for **controlled code execution**, not for heavy isolation.
4. Code runs synchronously, unless wrapped in async logic.
5. Heavily used in tools like **templating engines** or code evaluators.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the `vm` module as a **safe box**:
  - You put code inside the box (sandbox) and run it without affecting your main application directly.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the purpose of the `vm` module?  
A1: To run JavaScript code inside sandboxed environments, isolated from the main app.

Q2: Difference between `eval()` and `vm.runInContext()`?  
A2: `eval()` runs in the current scope (unsafe), while `vm.runInContext()` executes inside a controlled, sandboxed environment.

Q3: Is the `vm` module completely secure for untrusted code?  
A3: No, while it provides isolation, certain sandbox escapes are possible. Extra security measures are required.

Q4: When would you use `vm.Script` over `runInContext()`?  
A4: `vm.Script` allows compiling code once and running it multiple times in different contexts.

Q5: Can VM contexts share data?  
A5: Yes, if you explicitly pass objects into the sandbox, but by default each context is isolated.
*/
