/* 
24_url_encode_decode.js – Interview-Ready Answer:

"In JavaScript, encoding and decoding URLs is essential when transmitting data via URLs, 
to ensure that special characters are handled safely."

1️⃣ Key Points to Highlight:

1. Encoding:
- `encodeURI()` → Encodes a complete URI.
  - Does not encode characters like `:`, `/`, `?`, `#`, `&`, `=` because they are part of URI syntax.
- `encodeURIComponent()` → Encodes individual components of a URI.
  - Encodes almost all special characters.

2. Decoding:
- `decodeURI()` → Decodes a URI encoded with `encodeURI()`.
- `decodeURIComponent()` → Decodes components encoded with `encodeURIComponent()`.

3. Differences Between encodeURI and encodeURIComponent:

| Feature                   | encodeURI               | encodeURIComponent          |
|----------------------------|------------------------|----------------------------|
| Purpose                    | Complete URI           | Single URI component       |
| Encodes special chars       | Mostly no              | Yes                        |
| Example                    | `:` `/` `?` `#` `&`   | Encodes all above           |

4. Examples:

// Using encodeURI
const uri = "https://example.com/page?name=John Doe&age=30";
const encodedURI = encodeURI(uri);
console.log(encodedURI);
// "https://example.com/page?name=John%20Doe&age=30"

// Using encodeURIComponent
const param = "John Doe&30";
const encodedParam = encodeURIComponent(param);
console.log(encodedParam);
// "John%20Doe%2630"

// Decoding
const decodedParam = decodeURIComponent(encodedParam);
console.log(decodedParam); // "John Doe&30"

5. Real-Life Analogies:

- Global Analogy:
  - Encoding = converting a message into a safe format for transport.
  - Decoding = converting it back to original readable form.
- India-specific Analogy:
  - Encoding = writing address in pincode format to ensure delivery.
  - Decoding = recipient reads and understands the actual address.
- Web Analogy:
  - Encoding ensures spaces, `&`, `?`, `#` in URLs don’t break links.
  - Decoding restores the original user data from URL.

6. Code Explanation:
- `encodeURI()` → for whole URL, preserves URI special chars.
- `encodeURIComponent()` → for query parameters, encodes everything unsafe.
- `decodeURI()` and `decodeURIComponent()` → reverse the respective encoding.

7. Example / Usage:

// Encode full URL
const url = "https://example.com/search?query=JavaScript & React";
const encodedURL = encodeURI(url);
console.log(encodedURL); 
// "https://example.com/search?query=JavaScript%20&%20React"

// Encode component
const queryParam = "JavaScript & React";
const encodedQuery = encodeURIComponent(queryParam);
console.log(encodedQuery); 
// "JavaScript%20%26%20React"

// Decode component
const decodedQuery = decodeURIComponent(encodedQuery);
console.log(decodedQuery); // "JavaScript & React"

8️⃣ Follow-Up Interview Questions:

Q1: When should you use encodeURIComponent instead of encodeURI?  
A1: When encoding individual query parameters, because it encodes all special characters.

Q2: Can decodeURIComponent decode a string encoded with encodeURI?  
A2: Yes, but decodeURIComponent is safer for components, decodeURI for full URLs.

Q3: What happens if you don’t encode URLs?  
A3: Spaces and special characters may break the URL or lead to incorrect parsing.

Q4: Which characters are not encoded by encodeURI?  
A4: `:`, `/`, `?`, `#`, `&`, `=` and other URI reserved characters.

Q5: Can encoding help prevent XSS attacks?  
A5: Yes, encoding data in URLs can help prevent injection of malicious scripts.
*/
