/* 
112_json.js – Interview-Ready Answer

"JSON (JavaScript Object Notation) is a lightweight data-interchange format 
used for storing and exchanging data. It is easy for humans to read and 
write, and easy for machines to parse and generate."

1️⃣ Key Points to Highlight

1. Definition:
- JSON is a text format for representing structured data.
- Supports objects, arrays, strings, numbers, booleans, and null.
- Commonly used in APIs and configuration files.

2. Syntax Example

// JSON object (as JS object)
const obj = {
    name: "Alice",
    age: 25,
    skills: ["JS", "React"]
};

// Convert JS object to JSON string
const jsonString = JSON.stringify(obj);
console.log(jsonString); 
// {"name":"Alice","age":25,"skills":["JS","React"]}

// Convert JSON string back to JS object
const parsedObj = JSON.parse(jsonString);
console.log(parsedObj.name); // Alice

3. Real-Life Analogies

- Global Analogy: JSON = structured form of a report; easy to share and understand.
- India-specific Analogy: JSON = standard format for government forms, easily read by multiple departments.
- Web Analogy: JSON = format used to send/receive data between frontend and backend.

4. Code Explanation

- JSON.stringify() converts JS objects/arrays to JSON string.
- JSON.parse() converts JSON string back to JS object/array.
- JSON is language-independent; other languages can parse and generate JSON.

5. Example / Usage

const user = {
    id: 101,
    name: "Bob",
    isAdmin: false
};

// Convert to JSON
const userJson = JSON.stringify(user);
console.log(userJson); // {"id":101,"name":"Bob","isAdmin":false}

// Convert back to JS object
const userObj = JSON.parse(userJson);
console.log(userObj.name); // Bob

// Nested example
const data = {
    users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ]
};
console.log(JSON.stringify(data, null, 2)); // Pretty print

6️⃣ Follow-Up Interview Questions

Q1: Difference between JS object and JSON?  
A1: JS object can have functions and undefined; JSON is string format and supports only data.

Q2: Can JSON have comments?  
A2: No, JSON does not support comments.

Q3: Why use JSON over XML?  
A3: JSON is lighter, easier to parse, and more readable.

Q4: Can JSON contain functions or undefined?  
A4: No, only serializable data types.

Q5: How to safely parse JSON?  
A5: Use JSON.parse() with try-catch to handle invalid JSON strings.
*/
