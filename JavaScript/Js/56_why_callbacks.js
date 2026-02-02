/* 
56_why_callbacks.js – Interview-Ready Answer

"Callbacks are used in JavaScript to handle asynchronous operations and 
to execute code after a specific task completes, enabling non-blocking 
programming."

1️⃣ Key Points to Highlight

1. Purpose of Callbacks:
- Manage async operations like timers, API calls, and events.
- Ensure code executes in the correct sequence.
- Allow modular and reusable functions by passing behavior as arguments.

2. Advantages:
- Non-blocking execution.
- Enables event-driven programming.
- Provides flexibility for function customization.

3. Examples

// Without callback (blocking)
function printNumbers() {
    for(let i=1;i<=3;i++) {
        console.log(i);
    }
}
printNumbers();
console.log("Done"); // Executes after numbers are printed

// With asynchronous callback
function fetchData(callback) {
    setTimeout(() => {
        callback("Data loaded");
    }, 1000);
}

fetchData((data) => console.log(data)); // "Data loaded" after 1s
console.log("Fetching..."); // Prints first, non-blocking

4️⃣ Real-Life Analogies

- Global Analogy: Callback = giving your friend a message to deliver when a task is done.
- India-specific Analogy: Callback = telling the barber to notify you when haircut is ready.
- Web Analogy: Event listeners like click or input rely on callbacks to execute code after event occurs.

5️⃣ Code Explanation

- Callback ensures certain code runs after async tasks complete.
- Provides flexibility to define behavior externally.
- Supports non-blocking and sequential programming patterns.

6️⃣ Example / Usage

function compute(a, b, callback) {
    const sum = a + b;
    callback(sum);
}

compute(10, 20, function(result) {
    console.log("Sum is:", result); // Sum is: 30
});

7️⃣ Follow-Up Interview Questions

Q1: Why are callbacks important in JS?  
A1: They enable asynchronous, non-blocking execution and sequential task handling.

Q2: How do callbacks differ from Promises?  
A2: Promises provide chaining and centralized error handling; callbacks may lead to nested "callback hell".

Q3: Can a callback be optional?  
A3: Yes, functions can check if a callback is provided before executing it.

Q4: Can arrow functions be used as callbacks?  
A4: Yes, they are concise and commonly used for callbacks.

Q5: Are callbacks always asynchronous?  
A5: No, callbacks can be synchronous or asynchronous depending on how they are used.
*/
