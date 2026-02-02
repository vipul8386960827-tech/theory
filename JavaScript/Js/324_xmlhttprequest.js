/* 324_xmlhttprequest.js

=====================================================
XMLHttpRequest in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "XMLHttpRequest (XHR) is a legacy API to make HTTP requests 
  asynchronously or synchronously in JavaScript. It allows fetching 
  data from a server without reloading the page."

Key Points to Highlight:
- Purpose: Send and receive data from a server dynamically.
- Supports GET, POST, PUT, DELETE requests.
- Can work synchronously or asynchronously (async recommended).
- Replaced largely by Fetch API but still used in legacy code.
- Provides event handlers like onreadystatechange, onload, onerror.

Examples:

// Create XHR object
const xhr = new XMLHttpRequest();

// Configure GET request
xhr.open('GET', 'https://api.example.com/data', true);

// Handle response
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};

// Send request
xhr.send();

Code Explanation:
- open(method, url, async) → configure request
- readyState → tracks request state (0-4)
- status → HTTP response code
- responseText / responseXML → access response data
- send() → sends the request

Real-Life Analogy:
- Like sending a letter and waiting for the reply while doing other tasks.

Example / Usage:

// POST request
const xhrPost = new XMLHttpRequest();
xhrPost.open('POST', 'https://api.example.com/data', true);
xhrPost.setRequestHeader('Content-Type', 'application/json');
xhrPost.onload = function() {
  if(xhrPost.status === 200) console.log('Success:', xhrPost.responseText);
};
xhrPost.send(JSON.stringify({name: 'Alice', age: 30}));

Follow-Up Interview Questions:
- Q1: Difference between XHR and Fetch API?
  A1: Fetch uses Promises, simpler syntax; XHR uses events and callbacks.
- Q2: Can XHR be used synchronously?
  A2: Yes, but it blocks the main thread; async recommended.
- Q3: How to handle errors in XHR?
  A3: Use onerror or check status codes.
- Q4: How to set request headers in XHR?
  A4: Use xhr.setRequestHeader().
- Q5: How to cancel an XHR request?
  A5: Use xhr.abort().
*/
