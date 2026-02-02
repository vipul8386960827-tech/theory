/* 211_encode_url.js

=====================================================
Encode URL in JavaScript
=====================================================

Definition (Interview-friendly):
- "URL encoding converts characters into a format that can be transmitted 
  over the Internet. JavaScript provides encodeURI() and encodeURIComponent() 
  for this purpose."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using encodeURI()
   - Encodes a full URI, leaving characters like :, /, ?, & intact
   - Example:
     const url = "https://example.com/page?name=John Doe&age=30";
     const encoded = encodeURI(url);
     console.log(encoded); 
     // "https://example.com/page?name=John%20Doe&age=30"

2. Using encodeURIComponent()
   - Encodes individual components, encoding special characters
   - Example:
     const param = "John Doe&age=30";
     const encodedParam = encodeURIComponent(param);
     console.log(encodedParam); 
     // "John%20Doe%26age%3D30"

3. Decoding URLs
   - decodeURI() and decodeURIComponent() reverse the encoding
   - Example:
     console.log(decodeURIComponent(encodedParam)); // "John Doe&age=30"

4. Use Case
   - Prevent issues with spaces, special characters, or reserved symbols in URLs
   - Safe transmission of query strings

5. Edge Cases
   - encodeURI() should not be used on individual query parameters
   - encodeURIComponent() is safe for all parameter values

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- URL encoding is like **translating special characters into safe codes**:
  - Spaces and symbols are converted so URLs work correctly.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between encodeURI() and encodeURIComponent()?
A1: encodeURI() encodes a complete URI; encodeURIComponent() encodes individual components fully.

Q2: Can encoding break the URL?
A2: Yes, using encodeURIComponent() on the full URL can break it.

Q3: Why do we need URL encoding?
A3: To ensure special characters like spaces, &, ?, = do not break URLs.

Q4: Can you decode a URL safely?
A4: Yes, using decodeURI() or decodeURIComponent() accordingly.

Q5: Is there a standard for URL encoding?
A5: Yes, based on RFC 3986.
*/
