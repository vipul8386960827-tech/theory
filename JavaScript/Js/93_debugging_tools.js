/*
93_debugging_tools.js – Interview-Ready Answer

"In JavaScript, debugging tools help developers identify, trace, and fix 
errors efficiently in both browser and Node.js environments."

Key Points:

1️⃣ Browser Debugging Tools:
- Chrome DevTools, Firefox Developer Tools, Edge DevTools.
- Features:
  - Console: log and inspect values.
  - Sources: set breakpoints and step through code.
  - Network: monitor API requests.
  - Elements: inspect DOM and CSS.
  - Performance: analyze runtime and memory usage.

2️⃣ Node.js Debugging Tools:
- Built-in debugger: node inspect file.js
- Chrome DevTools integration: node --inspect file.js
- VS Code debugger: attach debugger to Node process.

3️⃣ Common Debugging Methods:
- console.log(): simple inspection.
- console.error(), console.warn(): log different severity levels.
- debugger statement: pauses execution when DevTools open.
- try-catch blocks: handle exceptions.

4️⃣ Real-Life Analogies:

Global Analogy: Mechanics using diagnostic tools to fix a car.
India-specific Analogy: Electrician using a multimeter to find faults in wiring.
Web Analogy: DevTools like a microscope to inspect JavaScript execution and DOM changes.

5️⃣ Code Explanation:

// Example using console and debugger
function sum(a, b) {
    debugger; // pauses execution here
    console.log('a:', a, 'b:', b);
    return a + b;
}

console.log(sum(5, 7)); // 12

6️⃣ Example / Usage:

// Inspect API response
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error fetching data:', err));

7️⃣ Follow-Up Interview Questions:

Q1: Difference between console.log and debugger?  
A1: console.log prints info; debugger pauses execution allowing step-by-step inspection.

Q2: How to debug asynchronous code?  
A2: Use async/await with try-catch or set breakpoints in async functions.

Q3: Can we debug minified production code?  
A3: Yes, source maps allow debugging original source code in browser.

Q4: What are breakpoints and watch expressions?  
A4: Breakpoints pause execution; watch expressions monitor variable values.

Q5: Tools for memory leak detection?  
A5: Chrome DevTools Performance & Memory panels, Node.js heap snapshots.
*/
