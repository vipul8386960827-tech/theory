/* 323_fetch_api.js

=====================================================
Fetch API in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Fetch API provides a modern interface for making HTTP requests 
  asynchronously in JavaScript, returning promises for easier handling."

Key Points to Highlight:
- Purpose: Replace older XMLHttpRequest for network requests.
- Returns a Promise that resolves to a Response object.
- Supports GET, POST, PUT, DELETE, and custom requests.
- Can handle JSON, text, Blob, or other response types.
- Provides methods for headers, credentials, and caching.

Examples:

// Simple GET request
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST request with JSON body
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', age: 30 })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

Code Explanation:
- fetch() initiates a network request.
- Returns a Promise that resolves to a Response object.
- Use response.json(), response.text(), or response.blob() to extract data.
- Error handling done via .catch().

Real-Life Analogy:
- Like placing an order online and getting a promise that it will be delivered; you can handle success or failure once it arrives.

Example / Usage:

// Async/Await version
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch(err) {
    console.error('Fetch error:', err);
  }
}
getData();

Follow-Up Interview Questions:
- Q1: Difference between fetch() and XMLHttpRequest?
  A1: fetch() uses Promises, cleaner syntax, better streaming support.
- Q2: How to handle HTTP errors with fetch()?
  A2: Check response.ok property and throw error if false.
- Q3: Can fetch() send credentials/cookies?
  A3: Yes, with credentials: 'include' option.
- Q4: Does fetch() reject on HTTP error status?
  A4: No, only network errors reject the Promise.
- Q5: How to cancel a fetch request?
  A5: Use AbortController and pass signal to fetch().
*/
