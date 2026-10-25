/*
WHAT IS JIT (JUST-IN-TIME) COMPILATION?

JIT means compiling code into machine code WHILE the program runs,
instead of compiling the entire program before execution.


EXAMPLE:

function add(a, b) {
    return a + b;
}

add(10, 20);
add(30, 40);
add(50, 60);

// If this function is called many times, a JavaScript engine
// may optimize it and compile it into machine code.
// The optimized code can execute faster.


HOW IT WORKS:

1. JavaScript code is given to the JavaScript engine.
2. The engine starts executing the code.
3. It observes which parts of the code run frequently.
4. It may compile those parts into optimized machine code.
5. Future executions can be faster.


WHY DO WE USE JIT?

- Improves performance for frequently executed code.
- Combines techniques from interpretation and compilation.
- Helps modern JavaScript engines execute code efficiently.


EXAMPLE OF A JAVASCRIPT ENGINE:

V8 is used by Chrome and Node.js.
It uses interpretation and JIT compilation techniques.


INTERVIEW ANSWER:

"JIT stands for Just-In-Time compilation. It is a technique
where code is compiled into machine code during program
execution. JavaScript engines such as V8 use JIT compilation
to optimize frequently executed code and improve performance."
*/