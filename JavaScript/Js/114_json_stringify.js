/*
114_json_stringify.js – Interview-Ready Answer

"In JavaScript, JSON.stringify() is used to convert a JavaScript object 
or value into a JSON string. It is often used to send data over the network 
or store it."

Key Points:

1️⃣ Definition:
- Converts JavaScript objects, arrays, numbers, strings, booleans, or null to JSON string.
- Functions, undefined, and symbols are ignored (omitted in objects or replaced with null in arrays).
- Accepts optional `replacer` and `space` arguments for customization.

2️⃣ Syntax Example:

// Example object
const obj = {
    name: "Alice",
    age: 25,
    active: true,
    greet: () => "Hello"
};

// Convert to JSON string
const jsonString = JSON.stringify(obj);
console.log(jsonString); 
// Output: {"name":"Alice","age":25,"active":true} 
// 'greet' function is omitted

// Pretty print with spacing
const prettyJSON = JSON.stringify(obj, null, 2);
console.log(prettyJSON);

3️⃣ Real-Life Analogies:
- Global Analogy: JSON.stringify = converting a paper form into a PDF.
- India-specific Analogy: JSON.stringify = turning tax data into e-filing JSON format.
- Web Analogy: Sending JS objects from frontend to backend as JSON string.

4️⃣ Code Explanation:
- Ensures data is in text format for transfer or storage.
- Replacer (optional) allows including only selected properties.
- Space (optional) makes JSON human-readable.

5️⃣ Example / Usage:

// Example: Exclude sensitive property using replacer
const user = {
    id: 101,
    name: "Bob",
    password: "secret"
};

/*
const safeJSON = JSON.stringify(user, ["id", "name"], 2);
console.log(safeJSON);
Output:
{
  "id": 101,
  "name": "Bob"
}
*/

// Example: Convert array
/*
const arr = [1, 2, 3];
console.log(JSON.stringify(arr)); // [1,2,3]

6️⃣ Follow-Up Interview Questions:

Q1: Can JSON.stringify handle circular references?  
A1: No, it throws TypeError; libraries like 'flatted' can handle circular structures.

Q2: What happens to functions, undefined, or symbols?  
A2: They are ignored in objects; replaced with null in arrays.

Q3: Difference between JSON.stringify and toString()?  
A3: stringify converts to JSON format; toString gives generic string representation.

Q4: Can JSON.stringify be customized?  
A4: Yes, with replacer array/function and space parameter.

Q5: Why use JSON.stringify?  
A5: To serialize data for storage, network transfer, or inter-system communication.
*/
