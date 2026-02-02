/* 421_querystring_module.js */
/* 420_url_module.js

=====================================================
URL Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `url` module in Node.js provides utilities to **parse, construct, normalize, and resolve URLs**. 
   It allows developers to easily work with URL strings, query parameters, and paths in a structured way, 
   which is essential for building web servers, HTTP clients, and routing mechanisms."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Can **parse URLs** into components like protocol, host, pathname, query, hash, etc.
2. Can **format objects** into URL strings using `url.format()`.
3. Supports **query string parsing and stringifying** using `URLSearchParams`.
4. Can **resolve relative URLs** using `url.resolve()`.
5. Compatible with **both traditional and WHATWG URL standards**.

-----------------------------------------------------
Basic Example (Parsing URL)
-----------------------------------------------------
const url = require('url');

const myURL = new URL('https://example.com:8080/path/page.html?name=kaizer&age=25#section1');
console.log('Href:', myURL.href);          // https://example.com:8080/path/page.html?name=kaizer&age=25#section1
console.log('Protocol:', myURL.protocol);  // https:
console.log('Host:', myURL.host);          // example.com:8080
console.log('Hostname:', myURL.hostname);  // example.com
console.log('Port:', myURL.port);          // 8080
console.log('Pathname:', myURL.pathname);  // /path/page.html
console.log('Search:', myURL.search);      // ?name=kaizer&age=25
console.log('Hash:', myURL.hash);          // #section1

-----------------------------------------------------
Working with Query Parameters
-----------------------------------------------------
const params = new URLSearchParams(myURL.search);
console.log(params.get('name')); // kaizer
console.log(params.get('age'));  // 25

params.append('city', 'Jaipur');
console.log(params.toString());  // name=kaizer&age=25&city=Jaipur

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Parsing URLs in HTTP requests.
- Constructing dynamic URLs for API calls.
- Extracting query parameters and hashes.
- Resolving relative URLs to absolute ones.
- Working with URLs in routing, redirects, and link generation.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `URL` is **WHATWG-compliant**, recommended for modern usage.
2. `url.parse()` and `url.format()` exist for legacy support but `new URL()` is preferred.
3. `URLSearchParams` provides convenient methods for query manipulation.
4. Helps avoid **manual string manipulation**, reducing errors.
5. Works in combination with `http` and `https` modules for server-side URL handling.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the `url` module as a **URL dissecting tool**:
  - It breaks down a URL into understandable parts and allows you to rebuild or modify it easily.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you parse a URL in Node.js?  
A1: Using `new URL(urlString)`.

Q2: How do you extract query parameters?  
A2: Using `URLSearchParams` with `get()`, `append()`, `delete()`, etc.

Q3: How do you convert a URL object back to string?  
A3: Using `myURL.href` or `url.format()`.

Q4: What is the difference between `url.parse()` and `new URL()`?  
A4: `url.parse()` is legacy and Node.js-specific, while `new URL()` is WHATWG-compliant and modern.

Q5: How can you resolve relative URLs to absolute URLs?  
A5: Using `url.resolve(base, relative)` (legacy) or by creating a new `URL(relative, base)`.
*/
