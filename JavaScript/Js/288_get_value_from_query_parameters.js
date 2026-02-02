/* 288_get_value_from_query_parameters.js

=====================================================
Get Value from Query Parameters – Interview-Ready Answer
=====================================================

Definition:
- "Query parameters are key-value pairs in the URL after the `?`. 
  You can extract their values using URLSearchParams or manual parsing."

Key Points to Highlight:
- Example URL: `https://example.com/page?user=alice&id=123`
- URLSearchParams provides easy API:
  - get(key) → returns value of key
  - has(key) → checks if key exists
  - forEach → iterate all params
- Works in modern browsers

Examples:

const url = 'https://example.com/page?user=alice&id=123';
const params = new URLSearchParams(url.split('?')[1]);

console.log(params.get('user')); // "alice"
console.log(params.get('id'));   // "123"
console.log(params.has('age'));  // false

// Iterate over all parameters
params.forEach((value, key) => {
  console.log(key, value);
});

Code Explanation:
- URLSearchParams parses query string into key-value pairs
- get() retrieves specific parameter
- has() checks existence

Real-Life Analogy:
- Like looking for a value in a labeled box of items; each label corresponds to a key.

Example / Usage:

// Get query parameter from current page
const queryParams = new URLSearchParams(window.location.search);
const user = queryParams.get('user');
if(user) console.log(`User is ${user}`);

Follow-Up Interview Questions:
- Q1: How to handle multiple values for same key?
  A1: Use params.getAll('key') to get an array of all values.
- Q2: How to set or append a new parameter?
  A2: params.set('newKey', 'value'); params.append('newKey', 'value');
- Q3: Can URLSearchParams be used on relative URLs?
  A3: Yes, but need to pass only query string part.
- Q4: Alternative to URLSearchParams in older browsers?
  A4: Manual string parsing using split() or regex.
- Q5: How to convert params back to string?
  A5: Use params.toString()
*/
