/* 98_js_compiled_or_interpreted.js

=====================================================
Is JavaScript Compiled or Interpreted?
=====================================================

Definition:
JavaScript is traditionally known as an *interpreted language*, but modern 
JavaScript engines (V8, SpiderMonkey, JavaScriptCore) use a mix of 
**interpretation + Just-In-Time (JIT) compilation**.
So the correct answer is:
👉 **JavaScript is both interpreted and compiled (JIT-compiled).**

=====================================================
What is an Interpreted Language?
=====================================================

Definition:
- Code is executed **line-by-line** at runtime by an interpreter.
- No machine-code binary is created before execution.
- Slower because translation happens while the program is running.

Key Points:
- Errors show up only when the problematic line is executed.
- Very flexible (great for dynamic languages).
- Examples: old JS, Python (CPython), Ruby.

=====================================================
What is a Compiled Language?
=====================================================

Definition:
- Source code is converted into machine code **before** running the program.
- A compiler produces an executable binary (.exe, .out).
- Runs fast because translation is done beforehand.

Key Points:
- Errors caught early (compile time).
- Very fast and optimized.
- Examples: C, C++, Go, Rust.

=====================================================
Why JavaScript Is Both (Modern View)
=====================================================

JavaScript is not compiled ahead-of-time (AOT) like C/C++, and not fully 
interpreted like early scripting languages. Modern engines:

- Parse JavaScript → AST (Abstract Syntax Tree)
- AST → Bytecode (run by interpreter)
- Frequently executed code → optimized into Machine Code by JIT compiler

So it behaves as:
- **Interpreted at first**
- **Compiled later where needed**

Correct description:
👉 JavaScript is a **JIT-compiled language**.

=====================================================
How JIT Compilation Works (Detailed)
=====================================================

JIT = *Just-In-Time Compilation*.  
It compiles code **during execution**, not before.

Here’s the step-by-step process:

1. **Start with Interpreter (initial run)**
   - JS code is turned into bytecode.
   - The interpreter (“Ignition” in V8) runs this bytecode immediately.
   - Fast startup, no waiting for compilation.

2. **Profiler watches the code**
   - The engine observes which functions or loops run repeatedly.
   - These are called **hot paths** or **hot functions**.

3. **Send hot code to JIT Compiler**
   - JIT (“TurboFan” in V8) takes these hot functions.
   - It assumes some patterns (e.g., `x` is always a number).
   - It generates **optimized machine code** for those functions.

4. **Machine Code replaces Bytecode**
   - Now the function runs *much faster* because it’s running native code.

5. **De-optimization if assumptions fail**
   - If suddenly `x` becomes a string, the machine code becomes invalid.
   - The engine “bails out” and returns to slower bytecode execution.

This dynamic process is why JS engines get faster as the code runs.

=====================================================
Analogy for JIT (Simple)
=====================================================

Imagine translating a speech:

- At first, you translate sentence-by-sentence (slow, like interpretation).
- You notice the speaker repeats some sentences often.
- You memorize those sentences and say them instantly next time (JIT).
- If the speaker suddenly changes the wording, you fallback to translating normally (de-optimization).

=====================================================
Execution Steps Inside V8 Engine
=====================================================

1. JavaScript Source → Parsed to AST
2. AST → Bytecode (Interpreter: Ignition)
3. Profiler marks hot code
4. Hot code → JIT Compiler (TurboFan) → Machine Code
5. If assumptions break → De-optimization → back to bytecode

=====================================================
Simple Example (Conceptual)
=====================================================

let x = 10;
let y = 20;
console.log(x + y);

Flow inside engine:
1. source → AST  
2. AST → bytecode  
3. bytecode executed  
4. function becomes hot → JIT compiles to machine code  
5. future calls run faster  

=====================================================
Follow-Up Interview Questions
=====================================================

Q1: Is JavaScript compiled before execution?
A1: No, it is compiled *during* execution using JIT.

Q2: What is JIT compilation?
A2: A runtime optimization technique that converts frequently-used code 
    into optimized machine code while the program is running.

Q3: Why doesn't JS compile ahead-of-time like C?
A3: Because JS is dynamic (types change). The engine needs runtime 
    information to optimize code.

Q4: What are V8 components?
A4:
- Ignition → Interpreter (creates and runs bytecode)
- TurboFan → JIT compiler (creates optimized machine code)

Q5: Why is JS not purely interpreted anymore?
A5: Pure interpretation is too slow for modern web applications. JIT 
    drastically improves performance.

=====================================================
End of File
=====================================================
*/
