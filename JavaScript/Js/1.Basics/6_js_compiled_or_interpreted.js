/*### Is JavaScript compiled or interpreted?

JavaScript uses both compilation and interpretation in modern engines. For example, the V8 engine first processes the code and generates bytecode, which is executed by its interpreter. It can also optimize frequently executed code by compiling it into machine code at runtime. This is called JIT compilation.

### What is JIT compilation?

JIT stands for Just-In-Time compilation. It means the engine can compile code into machine code while the program is running to improve performance.

### How does JavaScript execute in V8?

First, V8 parses the JavaScript code and generates bytecode. The Ignition interpreter executes that bytecode. If some code runs frequently, V8 may optimize it using TurboFan, which can generate machine code for faster execution.

### What is de-optimization?

Sometimes, the engine optimizes code based on assumptions about how it behaves. If those assumptions become invalid, the engine may discard the optimized code and use a different execution path.

### Does every JavaScript function get optimized?

No. The engine decides which code to optimize based on runtime behavior. Not every function needs to be compiled into optimized machine code.*/

/*
Compiled vs Interpreted Languages

1. Compiled Languages:
   - Source code is translated into machine code or an executable
     before the program runs.
   - Compilation happens before execution.
   - Example: C and C++.

2. Interpreted Languages:
   - A runtime executes the source code, traditionally by interpreting
     it during execution.
   - Example: Python.

3. JavaScript:
   - JavaScript is traditionally classified as an interpreted language.
   - Modern JavaScript engines, such as V8, use both interpretation
     and JIT (Just-In-Time) compilation.
   - JIT compilation converts frequently executed code into machine
     code to improve performance.

4. Main Difference:
   - Compiled: Code is compiled before execution.
   - Interpreted: Code is traditionally interpreted during execution.

5. Interview Answer:
   - Compiled languages translate code into an executable before
     running, whereas interpreted languages execute code through
     a runtime.
   - Modern languages can use a combination of both approaches.
*/