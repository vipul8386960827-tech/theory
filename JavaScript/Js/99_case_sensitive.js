/* 
99_case_sensitive.js – Interview-Ready Answer

"In JavaScript, identifiers such as variable names, function names, 
and object properties are case-sensitive, meaning 'myVar' and 'myvar' 
are considered different entities."

1️⃣ Key Points to Highlight

1. Definition:
- JavaScript treats uppercase and lowercase letters differently.
- Applies to variables, functions, objects, and keywords.

2. Examples

let myVar = 10;
let myvar = 20;

console.log(myVar); // 10
console.log(myvar); // 20 (different from myVar)

// Functions
function greet() {
    console.log("Hello");
}

function Greet() {
    console.log("Hi");
}

greet(); // Hello
Greet(); // Hi (different function)

// Object properties
const obj = { Name: "Alice", name: "Bob" };
console.log(obj.Name); // Alice
console.log(obj.name); // Bob

3. Real-Life Analogies

- Global Analogy: Case-sensitive = passwords are case-sensitive; "Pass" ≠ "pass".
- India-specific Analogy: Case-sensitive = PIN code "123456" ≠ "123456" in a form (numbers same but conceptually consider letter-sensitive).
- Web Analogy: HTML attribute names are generally case-insensitive, but JS variables referencing them are case-sensitive.

4. Code Explanation

- JS engine distinguishes identifiers based on exact character casing.
- Mistyping case can lead to ReferenceError or unexpected behavior.
- Ensures clarity and avoids accidental overwriting of variables.

5. Best Practices

- Use consistent casing conventions (camelCase for variables/functions, PascalCase for classes).
- Avoid reusing similar names with different cases.
- Be cautious when interacting with APIs or DOM elements.

6. Example / Usage

let userName = "Alice";
let username = "Bob"; // different variable

console.log(userName); // Alice
console.log(username); // Bob

function sayHello() { console.log("Hello"); }
function sayhello() { console.log("Hi"); }

sayHello(); // Hello
sayhello(); // Hi

7️⃣ Follow-Up Interview Questions

Q1: Are keywords case-sensitive?  
A1: Yes, e.g., 'var' is valid, 'Var' is invalid.

Q2: Are object properties case-sensitive?  
A2: Yes, 'obj.name' and 'obj.Name' refer to different properties.

Q3: Are function names case-sensitive?  
A3: Yes, 'myFunc()' ≠ 'myfunc()'.

Q4: Is JavaScript file name case-sensitive?  
A4: Depends on OS; case-sensitive on Linux/macOS by default.

Q5: How to avoid issues with case sensitivity?  
A5: Follow naming conventions consistently, use linting tools.
*/
