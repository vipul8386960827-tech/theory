```javascript
/*
6_js_compiled_or_interpreted.js

=====================================================
Is JavaScript Compiled or Interpreted?
=====================================================

Definition:
JavaScript uses both interpretation and compilation techniques
in modern engines.

Modern JavaScript engines such as V8, SpiderMonkey, and
JavaScriptCore use different execution strategies, including
Just-In-Time (JIT) compilation.

Interview Answer:
"JavaScript is traditionally classified as an interpreted
language, but modern JavaScript engines combine interpretation
with JIT compilation to improve performance."

=====================================================
What Is a Compiled Language?
=====================================================

Definition:
A compiled language is traditionally associated with translating
source code into machine code before the program executes.

The compiler may produce a native executable or another form
of compiled output.

How It Works:
1. Write source code.
2. The compiler translates the code.
3. Compilation produces machine code or another compiled output.
4. The program executes.

Key Points:
- Compilation generally happens before execution.
- Some errors are detected during compilation.
- Native machine code can execute without interpreting the
  original source code each time.
- Performance depends on the compiler, program, and workload.

Examples:
- C
- C++
- Go
- Rust

=====================================================
What Is an Interpreted Language?
=====================================================

Definition:
An interpreted language is traditionally associated with executing
program instructions through an interpreter at runtime rather
than requiring a separately generated native executable first.

How It Works:
1. Write source code.
2. The runtime processes the code.
3. An interpreter executes the program.
4. Errors can occur during execution.

Key Points:
- Execution depends on a runtime interpreter.
- Errors may appear when the relevant code executes.
- A separate native executable is not necessarily required.
- Interpretation does not automatically mean slow execution.

Examples:
- Python (commonly interpreted through CPython's bytecode VM)
- Ruby
- Traditional JavaScript implementations

Important:
These categories are not absolute. Some interpreted-language
implementations compile source code into bytecode first.

For example, CPython compiles Python source into bytecode and
executes it using its virtual machine.

=====================================================
Compiled vs Interpreted Languages
=====================================================

Compiled (Traditional Model):
- Source code is translated before execution.
- Often produces native machine code.
- Compilation can detect certain errors before execution.
- The executable can run without compiling the source again.

Interpreted (Traditional Model):
- An interpreter executes instructions at runtime.
- A separate native executable is not normally required.
- Many errors are detected when the relevant code executes.
- The runtime manages execution.

Important:
Modern language implementations can combine compilation and
interpretation, so this distinction is a simplified model.

=====================================================
Why Is Modern JavaScript Both?
=====================================================

Modern JavaScript engines do not simply interpret every line
of source code independently.

They typically use a combination of parsing, bytecode execution,
runtime profiling, and compilation.

A simplified process:

1. JavaScript source code is parsed.
2. The engine generates an internal representation.
3. Bytecode may be generated and executed by an interpreter.
4. The engine observes runtime behavior.
5. Frequently executed code may be compiled into optimized
   machine code using JIT compilation.
6. If optimization assumptions fail, the engine may de-optimize
   the code and use a less optimized execution path.

Therefore:
JavaScript can be interpreted and compiled during execution.

=====================================================
What Is JIT Compilation?
=====================================================

Definition:
JIT stands for Just-In-Time compilation.

It is a technique in which code is compiled during program
execution, often using runtime information to optimize it.

Why Is It Useful?
- The engine can optimize frequently executed code.
- Runtime type information can help generate efficient code.
- It balances startup performance with execution speed.

=====================================================
How JIT Compilation Works in V8
=====================================================

V8 is the JavaScript engine used by Chrome and Node.js.

A simplified execution process:

1. Parsing:
   JavaScript source code is parsed into an Abstract Syntax Tree
   (AST) and other internal representations.

2. Bytecode generation:
   V8 commonly generates bytecode for execution.

3. Interpretation:
   Ignition, V8's interpreter, executes the bytecode.

4. Runtime profiling:
   The engine gathers information about frequently executed code
   and the values it processes.

5. Optimization:
   TurboFan, V8's optimizing compiler, can compile suitable
   code into optimized machine code.

6. De-optimization:
   If runtime assumptions become invalid, the engine may discard
   optimized code and return to a less optimized execution path.

Important:
This is a simplified model. Modern V8 uses multiple execution
tiers and optimization mechanisms, so every function does not
necessarily follow exactly the same path.

=====================================================
Example of Runtime Optimization
=====================================================

function add(a, b) {
    return a + b;
}

console.log(add(10, 20));
console.log(add(30, 40));
console.log(add(50, 60));

Initially, the engine executes the function through its normal
execution pipeline.

If the function becomes sufficiently hot, the engine may
optimize it using runtime observations.

For example, if the function repeatedly receives numbers,
the engine may generate optimized machine code based on
that observed behavior.

If later calls use strings, the engine may need to handle
the different behavior or de-optimize the optimized code.

Important:
This example illustrates the concept. Calling a function a few
times does not guarantee that the engine will optimize it.

=====================================================
Simple Analogy for JIT Compilation
=====================================================

Imagine translating a speech.

- Initially, you translate what is being said.
- You notice that certain phrases are repeated frequently.
- You prepare a faster way to process those phrases.
- If the situation changes, you adjust your approach.

Similarly, a JIT compiler can use runtime observations to
optimize frequently executed code.

=====================================================
Follow-Up Interview Questions
=====================================================

Q1: Is JavaScript compiled before execution?

Answer:
JavaScript engines parse and process the source code before
executing it. Modern engines may generate bytecode and compile
frequently executed code into machine code at runtime.
JavaScript does not generally require a separate native
executable to be produced ahead of time.

Q2: What is JIT compilation?

Answer:
JIT compilation converts code into machine code during
execution, often using runtime information to optimize
frequently executed code.

Q3: What is the difference between compiled and interpreted
languages?

Answer:
Traditionally, compiled languages translate source code into
compiled output before execution, whereas interpreted languages
execute instructions through a runtime interpreter. Modern
implementations can combine both techniques.

Q4: Why can JIT compilation improve JavaScript performance?

Answer:
The engine can use runtime information, such as the types of
values a function commonly receives, to generate optimized
machine code for frequently executed paths.

Q5: Why can JavaScript de-optimize code?

Answer:
An optimization may rely on assumptions about runtime behavior.
If those assumptions become invalid, the engine may discard
the optimized version and use a less optimized execution path.

Q6: What are Ignition and TurboFan?

Answer:
- Ignition: V8's interpreter, which executes bytecode.
- TurboFan: V8's optimizing compiler, which can generate
  optimized machine code.

Q7: Is Python a purely interpreted language?

Answer:
Not exactly. CPython compiles Python source code into bytecode
and executes that bytecode using its virtual machine.
This demonstrates why the distinction between compiled and
interpreted languages is not absolute.

Q8: Does JavaScript always become machine code?

Answer:
No. The engine decides which execution strategies and
optimizations are appropriate. Not every function is
necessarily compiled into optimized machine code.

=====================================================
Final Interview Summary
=====================================================

"A compiled language traditionally translates source code into
compiled output before execution, whereas an interpreted language
uses a runtime interpreter to execute instructions.

Modern JavaScript engines combine both approaches. For example,
V8 uses the Ignition interpreter to execute bytecode and can use
TurboFan to compile suitable, frequently executed code into
optimized machine code. This runtime compilation technique is
called Just-In-Time compilation."

=====================================================
End of File
=====================================================
*/
```