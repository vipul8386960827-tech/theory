/*
115_parse_json.js – Interview-Ready Answer

"In JavaScript, JSON.parse() is used to convert a JSON string into a 
JavaScript object. It is commonly used to retrieve data sent from a server."

Key Points:

1️⃣ Definition:
- JSON.parse(jsonString)
- Converts a valid JSON string into the corresponding JavaScript object, array, number, boolean, or null.
- Throws SyntaxError if the JSON string is invalid.
- Can accept an optional reviver function to transform values during parsing.

2️⃣ Syntax Example:

// Correct JSON string
const jsonString = '{"name":"Alice","age":25,"skills":["JS","React"]}';

// Parse JSON string
const obj = JSON.parse(jsonString);
console.log(obj.name);       // Alice
console.log(obj.skills[1]);  // React

// Using reviver function
const objWithReviver = JSON.parse(jsonString, (key, value) => {
    if (key === "age") return value + 1; // increment age
    return value;
});
console.log(objWithReviver.age); // 26

// Invalid JSON example
// const invalidJson = "{name: 'Alice'}"; 
// JSON.parse(invalidJson) will throw SyntaxError

3️⃣ Real-Life Analogies:
- Global Analogy: JSON.parse = opening a PDF and reading structured information.
- India-specific Analogy: JSON.parse = taking e-filing JSON and converting it to usable tax data.
- Web Analogy: Frontend receives JSON string from backend API, parses it into JS object to access properties.

4️⃣ Code Explanation:
- Converts text-based JSON into native JavaScript structures.
- Use try-catch to handle errors when parsing potentially invalid JSON.
- Optional reviver allows transforming data during parsing.

5️⃣ Example / Usage:

// const jsonString = '{"id":101,"name":"Bob"}';
// const user = JSON.parse(jsonString);
// console.log(user.id);   // 101
// console.log(user.name); // Bob

6️⃣ Follow-Up Interview Questions:

Q1: What happens if the JSON string is invalid?  
A1: JSON.parse throws SyntaxError; use try-catch to handle it.

Q2: Difference between JSON.parse and eval()?  
A2: JSON.parse safely parses JSON; eval executes code and can be unsafe.

Q3: Can JSON.parse handle functions?  
A3: No, JSON does not support functions; they will be lost during parsing.

Q4: What is the reviver function?  
A4: Optional callback in JSON.parse that can modify values during parsing.

Q5: Can JSON.parse handle circular references?  
A5: No, circular references are invalid in JSON.
*/
