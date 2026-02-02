/*
123_get_current_url.js – Interview-Ready Answer

"In JavaScript, you can get the current URL of the page using the 
window.location object. This is useful for navigation, analytics, or 
conditional behavior based on the URL."

Key Points:

1️⃣ Definition:
- window.location.href returns the full URL of the current page.
- Other properties:
  - protocol: 'http:' or 'https:'
  - host: domain + port
  - hostname: domain only
  - pathname: path after domain
  - search: query string
  - hash: anchor part

2️⃣ Syntax Example:

console.log(window.location.href);      // Full URL
console.log(window.location.protocol);  // e.g., 'https:'
console.log(window.location.host);      // e.g., 'www.example.com'
console.log(window.location.pathname);  // e.g., '/page1'
console.log(window.location.search);    // e.g., '?id=123'
console.log(window.location.hash);      // e.g., '#section2'

3️⃣ Real-Life Analogies:

Global Analogy: Reading the address of the current house before sending mail.
India-specific Analogy: Checking URL of an online government portal before submitting a form.
Web Analogy: Using URL to determine which page content to load dynamically.

4️⃣ Code Explanation:

- window.location is a built-in browser object with properties giving details 
  of current page URL.
- Can be used to analyze, log, or manipulate the URL.

5️⃣ Example / Usage:

// Log full URL
console.log('Current URL:', window.location.href);

// Conditional logic based on URL
if (window.location.pathname === '/dashboard') {
    console.log('User is on dashboard page');
}

// Extract query parameters
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
console.log('ID parameter:', id);

6️⃣ Follow-Up Interview Questions:

Q1: Difference between window.location.href and window.location.toString()?  
A1: Both return full URL; href is a property, toString() is method.

Q2: How to navigate to another page using window.location?  
A2: Assign new URL to window.location.href or use window.location.assign().

Q3: Can you change the URL without reloading the page?  
A3: Yes, use history.pushState() or history.replaceState().

Q4: How to get only the domain of current page?  
A4: Use window.location.hostname.

Q5: Difference between pathname, search, and hash?  
A5: pathname = path, search = query string, hash = anchor fragment.
*/
