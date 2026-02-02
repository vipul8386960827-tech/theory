/* 
55_callback_function.js – Interview-Ready Answer

"A callback function in JavaScript is a function passed as an argument 
to another function, to be executed after some operation completes."

1️⃣ Key Points to Highlight

1. Definition:
- A function passed into another function as an argument.
- Called (executed) after a certain task or event.
- Essential for asynchronous programming in JS.

2. Types:
- Synchronous callback: executed immediately.
- Asynchronous callback: executed later, often after async operation.

3. Examples

// Synchronous callback
function greet(name, callback) {
    callback(name);
}

function sayHello(name) {
    console.log("Hello, " + name);
}

greet("Kaizer", sayHello); // Hello, Kaizer

// Asynchronous callback
function fetchData(callback) {
    setTimeout(() => {
        callback("Data loaded");
    }, 1000);
}

fetchData((data) => console.log(data)); // "Data loaded" after 1s

4️⃣ Real-Life Analogies

- Global Analogy: Callback = giving your friend a message to deliver when an event occurs.
- India-specific Analogy: Callback = telling a chaiwala to call you when tea is ready.
- Web Analogy: Event listeners in JS use callbacks; e.g., button click executes callback function.

5️⃣ Code Explanation

- Functions can accept other functions as arguments.
- Callback executes at specific point defined by the parent function.
- Asynchronous callbacks allow non-blocking operations (like timers, API calls).

6️⃣ Example / Usage

function processNumbers(a, b, callback) {
    const result = a + b;
    callback(result);
}

processNumbers(5, 10, function(res) {
    console.log("Sum is:", res); // Sum is: 15
});

7️⃣ Follow-Up Interview Questions

Q1: Difference between callback and Promise?  
A1: Promise provides better chaining, readability, and error handling than callbacks.

Q2: What is callback hell?  
A2: Nested callbacks leading to unreadable and hard-to-maintain code.

Q3: How do you avoid callback hell?  
A3: Using Promises, async/await, or modular functions.

Q4: Can arrow functions be used as callbacks?  
A4: Yes, arrow functions are commonly used as concise callbacks.

Q5: Are callbacks always asynchronous?  
A5: No, callbacks can be synchronous or asynchronous depending on usage.
*/
