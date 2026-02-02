/* 212_decode_url.js

=====================================================
Decode URL in JavaScript
=====================================================

Definition (Interview-friendly):
- "URL decoding converts encoded URL components back to their 
  original representation. JavaScript provides decodeURI() and 
  decodeURIComponent() for this purpose."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using decodeURI()
   - Decodes a full URI without altering reserved characters
   - Example:
     const encodedURL = "https://example.com/page?name=John%20Doe&age=30";
     const decoded = decodeURI(encodedURL);
     console.log(decoded); 
     // "https://example.com/page?name=John Doe&age=30"

2. Using decodeURIComponent()
   - Decodes individual URI components completely
   - Example:
     const encodedParam = "John%20Doe%26age%3D30";
     const decodedParam = decodeURIComponent(encodedParam);
     console.log(decodedParam); 
     // "John Doe&age=30"

3. Difference from Encoding
   - Encoded URL contains %20, %3D, etc.
   - Decoding converts them back to normal characters

4. Use Case
   - Retrieve original query strings or parameters from encoded URLs

5. Edge Cases
   - Using decodeURIComponent() on a full URI is safe, but decodeURI() is better for full URLs

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Decoding a URL is like **reading a coded message and converting it back to plain text**.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between decodeURI() and decodeURIComponent()?
A1: decodeURI() decodes full URI but leaves reserved characters; decodeURIComponent() decodes all characters.

Q2: What happens if you decode an already decoded URL?
A2: It may throw an error or produce incorrect results.

Q3: Can decoding handle spaces and special characters?
A3: Yes, it converts %20 to space, %26 to &, etc.

Q4: Why use decodeURIComponent() for query parameters?
A4: To correctly decode special characters within individual parameters.

Q5: Are decode functions standard?
A5: Yes, supported in all modern browsers.
*/
