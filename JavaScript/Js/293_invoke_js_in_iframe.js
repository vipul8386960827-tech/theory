/* 293_invoke_js_in_iframe.js

=====================================================
Invoking JavaScript in an iframe – Interview-Ready Answer
=====================================================

Definition:
- "You can access and execute JavaScript inside an iframe from the parent page 
  using the iframe's contentWindow or contentDocument, provided same-origin policy allows it."

Key Points to Highlight:
- Must obey same-origin policy; cross-origin frames cannot be accessed directly
- contentWindow → reference to iframe’s window object
- contentDocument → reference to iframe’s document
- Can call functions defined inside iframe or manipulate DOM

Examples:

// HTML
// <iframe id="myFrame" src="frame.html"></iframe>

const iframe = document.getElementById('myFrame');

// Invoke a function defined in iframe
iframe.onload = () => {
  const iframeWindow = iframe.contentWindow;
  if (iframeWindow && typeof iframeWindow.someFunction === 'function') {
    iframeWindow.someFunction();
  }
};

// Access iframe DOM
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
const iframeBody = iframeDoc.body;
console.log('Iframe body:', iframeBody);

Code Explanation:
- contentWindow gives access to window context inside iframe
- contentDocument gives access to DOM inside iframe
- onload ensures iframe is fully loaded before accessing

Real-Life Analogy:
- Like talking to someone in a separate room through a glass window; you can see and talk, but only if allowed

Example / Usage:

// Suppose frame.html has:
// function greet() { console.log('Hello from iframe'); }

iframe.onload = () => {
  iframe.contentWindow.greet(); // logs: Hello from iframe
};

Follow-Up Interview Questions:
- Q1: What happens if iframe is cross-origin?
  A1: Browser throws a security error; cannot access contentWindow/contentDocument.
- Q2: Can you listen to events from iframe?
  A2: Yes, using postMessage API for cross-origin communication.
- Q3: How to modify DOM inside iframe safely?
  A3: Only if same-origin, use contentDocument to query and update elements.
- Q4: Can you inject scripts into iframe?
  A4: Only for same-origin; otherwise restricted.
- Q5: Why use iframes?
  A5: To embed external content, isolate scripts, or sandbox third-party code.
*/
