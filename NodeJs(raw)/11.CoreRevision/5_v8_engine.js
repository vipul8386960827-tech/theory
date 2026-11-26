/* 9_v8_engine.js

=====================================================
V8 Engine
=====================================================

Definition (What I should say in the interview):
- "V8 is Google's open-source, high-performance **JavaScript and WebAssembly engine**, written
   in C++. It is used in Chrome and Node.js. It compiles JavaScript directly to **native machine
   code** using **JIT compilation**, and it also handles memory allocation and **garbage collection**."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Written in **C++**, developed by Google.
2. **JIT compilation**:
   - **Ignition** (interpreter) -> turns JS into bytecode and runs it quickly.
   - **TurboFan** (optimizing compiler) -> compiles "hot" code into optimized machine code.
3. **Garbage collection** -> generational GC (young generation / old generation).
4. Provides the **call stack and heap** for JS execution.
5. V8 does NOT provide setTimeout, fs, or DOM - those come from the runtime (Node / browser).

-----------------------------------------------------
Pipeline (simplified)
-----------------------------------------------------
JS source -> Parser -> AST -> Ignition (bytecode) -> runs
                                     |
                         hot code -> TurboFan -> optimized machine code
                                     (deoptimizes back if assumptions break)

-----------------------------------------------------
Performance Tip (bonus point in interviews)
-----------------------------------------------------
- Keep object shapes consistent (same properties, same order) -> V8 uses "hidden classes"
  and inline caches to optimize property access.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is JavaScript compiled or interpreted?
A1: Both - modern engines like V8 interpret first and JIT-compile hot code to machine code.

Q2: Can you check V8 heap usage in Node?
A2: Yes - process.memoryUsage() or the v8 module (v8.getHeapStatistics()).

Q3: Why is V8 fast?
A3: JIT compilation, hidden classes, inline caching, and an efficient garbage collector.
*/
