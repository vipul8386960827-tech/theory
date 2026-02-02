/* 
4_json_operations.js – Interview-Ready Answer:

"In JavaScript, JSON (JavaScript Object Notation) is a lightweight data format 
used to exchange data between a server and client. 
JSON operations typically involve converting between objects and JSON strings."

Key Points:

1️⃣ JSON.stringify():
- Converts a JavaScript object into a JSON string.
- Useful for sending data over the network (e.g., API calls).
- Syntax: JSON.stringify(obj)

2️⃣ JSON.parse():
- Converts a JSON string back into a JavaScript object.
- Useful for reading data received from a server.
- Syntax: JSON.parse(string)

3️⃣ Restrictions:
- JSON supports only string, number, boolean, null, array, and object values.
- Functions, undefined, and symbols are not valid in JSON.

4️⃣ Use Cases:
- Storing structured data in localStorage/sessionStorage.
- Sending/receiving data via REST APIs.
- Config files and server responses.

5️⃣ Real-life Analogies:
- Global Analogy: JSON.stringify = packing your clothes in a suitcase, JSON.parse = unpacking them.
- India-specific Analogy: JSON.stringify = sealing pickles in a jar to send to another city, JSON.parse = opening the jar and using them.
- Web Analogy: JSON.stringify = converting a JavaScript object into a network-friendly format, JSON.parse = reconstructing it back into an object.

6️⃣ Coding Examples:

// 1. Converting object to JSON string
let user = { name: "Rahul", age: 25, city: "Delhi" };
let jsonString = JSON.stringify(user);
console.log(jsonString);
// Output: {"name":"Rahul","age":25,"city":"Delhi"}

// 2. Converting JSON string back to object
let parsedUser = JSON.parse(jsonString);
console.log(parsedUser.name); 
// Output: Rahul

// 3. Handling arrays
let arr = [1, 2, 3, 4];
let arrString = JSON.stringify(arr);
console.log(arrString); 
// Output: [1,2,3,4]
console.log(JSON.parse(arrString)); 
// Output: [1, 2, 3, 4]

// 4. Invalid JSON example
let invalid = "{name: 'Rahul'}"; // keys must be in double quotes
try {
    JSON.parse(invalid);
} catch (e) {
    console.log("Invalid JSON format"); 
}

7️⃣ Possible Follow-Up Questions & Answers:

Q1: What is the difference between JavaScript object and JSON?  
A1: JavaScript object is an in-memory structure; JSON is a text-based format for data exchange.

Q2: Why are keys in JSON required to be in double quotes?  
A2: To maintain consistency across languages and ensure proper parsing.

Q3: Can you stringify functions or undefined values?  
A3: No, they are skipped during JSON.stringify.

Q4: What happens if you parse an invalid JSON string?  
A4: It throws a SyntaxError, so we should wrap it in try-catch.

Q5: Can JSON.stringify take additional arguments?  
A5: Yes, it accepts replacer (to filter/transform values) and space (for pretty printing).
*/
