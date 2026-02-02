/*
124_location_properties.js – Interview-Ready Answer

"In JavaScript, the window.location object provides various properties to 
access and manipulate different parts of the current URL."

Key Points:

1️⃣ Common Properties:
- href: Full URL as string.
- protocol: 'http:' or 'https:'
- host: Domain name + port.
- hostname: Domain name only.
- port: Port number if specified.
- pathname: Path after domain.
- search: Query string including '?'.
- hash: Fragment identifier including '#'.

2️⃣ Syntax Example:

console.log(window.location.href);      // Full URL
console.log(window.location.protocol);  // e.g., 'https:'
console.log(window.location.host);      // e.g., 'www.example.com'
console.log(window.location.hostname);  // e.g., 'www.example.com'
console.log(window.location.port);      // e.g., '8080'
console.log(window.location.pathname);  // e.g., '/about'
console.log(window.location.search);    // e.g., '?id=123'
console.log(window.location.hash);      // e.g., '#section2'

3️⃣ Real-Life Analogies:

Global Analogy: Address breakdown – country, state, city, street, zip code.
India-specific Analogy: URL like “https://gov.in/pan?id=123#details” – protocol, host, path, query, hash.
Web Analogy: Splitting a URL into domain, path, query parameters, and anchor for navigation or routing.

4️⃣ Code Explanation:

- window.location provides granular access to parts of the URL.
- Useful for analytics, conditional navigation, and reading query/hash values.
- Can modify properties like href or hash to navigate.

5️⃣ Example / Usage:

// Read current page details
console.log(`Protocol: ${window.location.protocol}`);
console.log(`Path: ${window.location.pathname}`);
console.log(`Query: ${window.location.search}`);
console.log(`Anchor: ${window.location.hash}`);

// Navigate by changing hash
window.location.hash = 'section2'; // jumps to #section2 without reload

6️⃣ Follow-Up Interview Questions:

Q1: Difference between href and pathname?  
A1: href = full URL; pathname = path after domain.

Q2: Can changing location.hash reload the page?  
A2: No, hash change updates URL and triggers hashchange event, but does not reload page.

Q3: How to extract query parameters?  
A3: Use URLSearchParams(window.location.search).get('paramName').

Q4: Difference between host and hostname?  
A4: host = domain + port; hostname = domain only.

Q5: How to redirect to a new URL using location properties?  
A5: Assign new value to window.location.href or use location.assign().
*/
