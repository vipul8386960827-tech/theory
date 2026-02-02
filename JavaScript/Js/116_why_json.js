/*
116_why_json.js – Interview-Ready Answer

"In JavaScript, JSON (JavaScript Object Notation) is a lightweight 
data-interchange format used to transmit data between a server and 
a client or between systems. It is language-independent and easy 
for humans to read and write."

Key Points:

1️⃣ Definition:
// JSON = text format for representing structured data
// Consists of key-value pairs (objects) and ordered lists (arrays)
// Supports strings, numbers, booleans, null, arrays, and objects
// Functions, undefined, and symbols are not supported

2️⃣ Syntax Example:

// JavaScript object
const user = {
    id: 101,
    name: "Alice",
    active: true
};

// Convert to JSON string for transmission
const jsonString = JSON.stringify(user);
console.log(jsonString); // {"id":101,"name":"Alice","active":true}

// Parse JSON string back to object
const parsedUser = JSON.parse(jsonString);
console.log(parsedUser.name); // Alice

3️⃣ Real-Life Analogies:

// Global Analogy: JSON = standardized form to send letters/data across countries
// India-specific Analogy: JSON = e-filing data format for tax returns
// Web Analogy: Frontend sends JSON payload to backend API; backend responds with JSON

4️⃣ Code Explanation:

// JSON allows safe data transfer between systems or applications
// Easy to serialize/deserialize objects
// Language-independent, so JS, Python, Java, etc., can parse JSON

5️⃣ Example / Usage:

// Sending data via fetch API
// fetch('/api/user', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ id: 101, name: "Alice" })
// })
// .then(response => response.json())
// .then(data => console.log(data));

6️⃣ Follow-Up Interview Questions:

// Q1: Why not use JavaScript objects directly instead of JSON?  
// A1: Objects cannot be sent over the network; JSON is text-based and standardized

// Q2: Can JSON include functions?  
// A2: No, functions and undefined are not supported in JSON

// Q3: Difference between JSON and XML?  
// A3: JSON is lighter, easier to read/write, and widely used in modern web APIs

// Q4: How to handle circular references in JSON?  
// A4: JSON.stringify fails; use libraries like 'flatted' to serialize circular structures

// Q5: Why is JSON preferred for APIs?  
// A5: Lightweight, language-independent, human-readable, and easy to parse
*/
