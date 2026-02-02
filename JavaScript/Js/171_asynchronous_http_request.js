/* 171_asynchronous_http_request.js

=====================================================
Asynchronous HTTP Requests in JavaScript
=====================================================

Definition:
- Asynchronous requests allow JavaScript to fetch data
  without blocking the main thread.
- Commonly used for API calls, AJAX, or dynamic content loading.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using XMLHttpRequest Asynchronously
   - Example:
     const xhr = new XMLHttpRequest();
     xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true); // true = async
     xhr.onload = function() {
         if (xhr.status === 200) {
             console.log(xhr.responseText);
         }
     };
     xhr.send();

2. Using Fetch API (Modern and Recommended)
   - Example with Promises:
     fetch("https://jsonplaceholder.typicode.com/todos/1")
         .then(response => response.json())
         .then(data => console.log(data))
         .catch(error => console.error(error));

   - Example with async/await:
     async function getData() {
         try {
             const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
             const data = await response.json();
             console.log(data);
         } catch (error) {
             console.error(error);
         }
     }
     getData();

3. Advantages of Asynchronous Requests
   - UI remains responsive.
   - Can handle multiple requests concurrently.
   - Avoids freezing the browser during long network calls.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Asynchronous HTTP requests are like **placing an order online**:
  - You continue browsing while the order is processed in the background.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between synchronous and asynchronous requests?
A1: Synchronous blocks execution until complete; asynchronous does not block.

Q2: Why prefer Fetch API over XMLHttpRequest?
A2: Fetch provides cleaner syntax, promises, and easier error handling.

Q3: Can you cancel an asynchronous request?
A3: Yes, using `AbortController` in modern browsers.

Q4: How to handle multiple async requests together?
A4: Use `Promise.all()` to wait for multiple promises concurrently.

Q5: Can async/await be used with XMLHttpRequest?
A5: No, async/await works with Promises; you can wrap XHR in a Promise.
*/
