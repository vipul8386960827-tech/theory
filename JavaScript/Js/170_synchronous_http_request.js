/* 170_synchronous_http_request.js

=====================================================
Synchronous HTTP Requests in JavaScript
=====================================================

Definition:
- Synchronous HTTP requests block JavaScript execution until
  the response is received.
- Modern practice prefers asynchronous requests to avoid freezing UI.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using XMLHttpRequest Synchronously
   - Example:
     const xhr = new XMLHttpRequest();
     xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", false); // false = synchronous
     xhr.send();
     if (xhr.status === 200) {
         console.log(xhr.responseText);
     }

2. Important Notes
   - Blocks the main thread until the request completes.
   - Not recommended in browser environments due to UI freezing.
   - Deprecated in modern browsers in some contexts.

3. Alternative: Asynchronous Requests (Recommended)
   - Using `fetch` or `XMLHttpRequest` asynchronously.
   - Example:
     fetch("https://jsonplaceholder.typicode.com/todos/1")
         .then(res => res.json())
         .then(data => console.log(data));

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Synchronous HTTP request is like **waiting in line at a counter**:
  - Nothing else can happen until your turn is complete.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between synchronous and asynchronous requests?
A1: Synchronous blocks execution; asynchronous does not block.

Q2: Can synchronous requests be used in Node.js?
A2: Node.js prefers asynchronous; synchronous HTTP requires third-party libraries.

Q3: Why avoid synchronous requests in browsers?
A3: They freeze UI and harm user experience.

Q4: Are synchronous XHRs deprecated?
A4: Yes, they are discouraged and may trigger warnings in modern browsers.

Q5: When might synchronous requests be acceptable?
A5: Rare cases like short scripts or during startup before UI is rendered.
*/
