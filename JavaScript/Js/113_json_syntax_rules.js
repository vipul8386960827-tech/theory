/* 
113_json_syntax_rules.js – Interview-Ready Answer

"JSON (JavaScript Object Notation) has strict syntax rules that must be 
followed for parsing and data exchange. Understanding these rules prevents 
errors when working with JSON."

1️⃣ Key Points to Highlight

1. JSON Syntax Rules:

1. Data is in key/value pairs:
- Keys must be strings enclosed in double quotes.
- Values can be: string, number, object, array, boolean, or null.

2. Objects are enclosed in braces `{}`:
- Example: { "name": "Alice", "age": 25 }

3. Arrays are enclosed in brackets `[]`:
- Example: [1, 2, 3, 4]

4. Strings must use double quotes `""`:
- Single quotes `' '` are invalid in JSON.

5. No trailing commas:
- Commas cannot appear after the last item in objects or arrays.

6. No functions, undefined, or comments:
- Only data; functions, undefined, and comments are invalid in JSON.

2. Syntax Example

// Correct JSON
const jsonString = `{
    "name": "Alice",
    "age": 25,
    "skills": ["JS", "React"],
    "isAdmin": false,
    "address": null
}`;

// Incorrect JSON examples
// { name: "Alice" } // Error: keys must be double-quoted
// { "age": 25, }    // Error: trailing comma
// { "func": function(){} } // Error: functions not allowed
// { "note": 'Hello' }       // Error: single quotes not allowed

3. Real-Life Analogies

- Global Analogy: JSON = standardized form, like official government forms.
- India-specific Analogy: JSON = PAN card format; strict rules must be followed.
- Web Analogy: Backend sends JSON to frontend; strict syntax ensures correct parsing.

4. Code Explanation

- JSON.stringify() automatically formats JS objects into valid JSON string.
- JSON.parse() parses valid JSON string into JS object.
- Following rules prevents runtime errors and ensures cross-language compatibility.

5. Example / Usage

const user = {
    name: "Bob",
    age: 30,
    active: true
};

// Convert to JSON string
const userJSON = JSON.stringify(user);
console.log(userJSON); // {"name":"Bob","age":30,"active":true}

// Parse JSON back to object
const parsedUser = JSON.parse(userJSON);
console.log(parsedUser.name); // Bob

6️⃣ Follow-Up Interview Questions

Q1: Can JSON contain comments?  
A1: No, comments are not allowed.

Q2: Difference between JS object and JSON?  
A2: JSON is a string format, strictly following syntax rules; JS object can contain functions and single-quoted strings.

Q3: Are trailing commas allowed in JSON?  
A3: No, trailing commas are invalid.

Q4: Can JSON contain undefined or functions?  
A4: No, only valid data types: string, number, object, array, boolean, null.

Q5: How to validate JSON syntax?  
A5: Use JSON.parse() with try-catch or online JSON validators.
*/
