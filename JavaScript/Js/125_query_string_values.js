/*
125_query_string_values.js – Interview-Ready Answer

"In JavaScript, query string values in a URL can be accessed and parsed using 
the URLSearchParams API. This allows extracting specific parameters from the URL."

Key Points:

1️⃣ Definition:
- Query string: part of URL after '?' containing key=value pairs.
- URLSearchParams provides methods to read, iterate, and manipulate query params.

2️⃣ Syntax Example:

// Example URL: https://example.com/page?id=123&name=John
const params = new URLSearchParams(window.location.search);

console.log(params.get('id'));   // "123"
console.log(params.get('name')); // "John"

3️⃣ Real-Life Analogies:

Global Analogy: Reading key-value pairs from a mailing form to extract information.
India-specific Analogy: Extracting Aadhaar ID or PAN number from a URL query during online form submission.
Web Analogy: Retrieving product ID or search keyword from URL for dynamic content.

4️⃣ Code Explanation:

- window.location.search returns query string including '?'
- URLSearchParams parses it into iterable object.
- get(key) retrieves value for specific key.
- has(key) checks if key exists; forEach iterates over all key-value pairs.

5️⃣ Example / Usage:

// Suppose current URL: https://example.com/page?id=456&category=books
const queryParams = new URLSearchParams(window.location.search);

if (queryParams.has('id')) {
    console.log('ID:', queryParams.get('id')); // "456"
}

queryParams.forEach((value, key) => {
    console.log(`${key} = ${value}`);
});

// Output:
// id = 456
// category = books

6️⃣ Follow-Up Interview Questions:

Q1: What if a parameter appears multiple times?  
A1: Use params.getAll('key') to retrieve all values as an array.

Q2: How to add or delete query parameters dynamically?  
A2: Use params.append('key', 'value') or params.delete('key') and update window.location.search if needed.

Q3: Is URLSearchParams supported in all browsers?  
A3: Modern browsers support it; for older browsers, parsing manually or using libraries is required.

Q4: Difference between encodeURIComponent and URLSearchParams?  
A4: encodeURIComponent encodes individual values; URLSearchParams handles parsing and serialization.

Q5: Can query parameters contain special characters?  
A5: Yes, they must be URL-encoded to avoid issues with parsing.
*/
