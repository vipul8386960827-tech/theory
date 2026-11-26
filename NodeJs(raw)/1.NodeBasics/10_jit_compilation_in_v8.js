/* 10_jit_compilation_in_v8.js

=====================================================
JIT (Just-In-Time) Compilation in V8
=====================================================

Definition (What I should say in the interview):
- "JIT compilation means the code is compiled to machine code **at runtime, while the program
   is running**, instead of ahead of time. V8 first interprets JS into bytecode for a fast
   start, watches which functions run often (hot code), and then compiles those into highly
   optimized machine code. This gives both fast startup and fast execution."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Interpreter (Ignition)** -> quick startup, generates bytecode, collects type feedback.
2. **Optimizing compiler (TurboFan)** -> compiles hot functions using that feedback.
3. **Deoptimization** -> if assumptions break (e.g. a function suddenly gets a string instead
   of a number), V8 throws away the optimized code and falls back to bytecode.
4. JIT = best of interpreters (fast start) + compilers (fast execution).

-----------------------------------------------------
Example (why consistent types help)
-----------------------------------------------------
function add(a, b) { return a + b; }

for (let i = 0; i < 1e6; i++) add(i, 1);  // hot + always numbers -> optimized
add('a', 'b');                            // type changes -> may trigger deoptimization

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: AOT vs JIT?
A1: AOT compiles before running (C, Go); JIT compiles during execution (V8, JVM).

Q2: How can developers help the JIT?
A2: Keep function argument types and object shapes consistent; avoid changing object
    structure after creation (e.g. using delete on properties).
*/
