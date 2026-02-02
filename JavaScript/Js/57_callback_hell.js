/* 
57_callback_hell.js – Interview-Ready Answer

"Callback hell occurs when multiple nested callbacks are used in JavaScript, 
making the code hard to read, maintain, and debug."

1️⃣ Key Points to Highlight

1. Definition:
- Deeply nested callbacks, often seen in asynchronous code.
- Leads to "pyramid of doom" structure.
- Hard to understand and prone to errors.

2. Causes:
- Multiple sequential async operations using callbacks.
- Lack of modularity or abstraction in async code.

3. Examples

// Callback hell example
setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
        console.log("Step 2");
        setTimeout(() => {
            console.log("Step 3");
            setTimeout(() => {
                console.log("Step 4");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

4️⃣ Real-Life Analogies

- Global Analogy: Callback hell = giving instructions to multiple helpers one after another without any coordination, leading to confusion.
- India-specific Analogy: Callback hell = asking multiple people to complete tasks sequentially in nested manner without proper planning.
- Web Analogy: Multiple nested AJAX calls with callbacks creating a pyramid-like structure in code.

5️⃣ Problems:
- Difficult to read and debug.
- Increases chance of errors.
- Hard to maintain or scale.

6️⃣ Solutions:
- Use Promises to flatten nested callbacks.
- Use async/await for sequential async operations.
- Modularize functions and break nested callbacks into smaller named functions.

7️⃣ Example / Usage (Refactored with Promises)

function step1() {
    return new Promise(resolve => setTimeout(() => resolve("Step 1"), 1000));
}

function step2() {
    return new Promise(resolve => setTimeout(() => resolve("Step 2"), 1000));
}

function step3() {
    return new Promise(resolve => setTimeout(() => resolve("Step 3"), 1000));
}

step1()
  .then(msg => { console.log(msg); return step2(); })
  .then(msg => { console.log(msg); return step3(); })
  .then(msg => console.log(msg));

8️⃣ Follow-Up Interview Questions

Q1: What is callback hell?  
A1: Multiple nested callbacks that make code unreadable and hard to maintain.

Q2: How can you avoid callback hell?  
A2: Using Promises, async/await, and modular functions.

Q3: Is callback hell a syntax error?  
A3: No, it’s a code structure problem, not a syntax error.

Q4: Can arrow functions help avoid callback hell?  
A4: Only slightly; structure still matters; Promises/async-await are better solutions.

Q5: Why is callback hell a problem in large applications?  
A5: It reduces maintainability, readability, and increases the risk of bugs.
*/
