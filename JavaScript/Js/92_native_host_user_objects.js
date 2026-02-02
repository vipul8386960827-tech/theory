/*
92_native_host_user_objects.js – Interview-Ready Answer

"In JavaScript, objects can be categorized as native, host, or user-defined: 
understanding their differences is important for debugging and working with the environment."

Key Points:

1️⃣ Native Objects:
- Built-in objects provided by JavaScript engine.
- Examples: Object, Array, Function, Date, RegExp, Map, Set.
- Always available in JS environment.

2️⃣ Host Objects:
- Provided by the environment (browser, Node.js) to interact with host features.
- Examples: window, document, navigator, console, XMLHttpRequest (browser); process, require (Node.js).
- Availability depends on environment.

3️⃣ User-Defined Objects:
- Created by developers using object literals, constructors, or classes.
- Example:
const person = { name: "Alice", age: 25 };
class Car { constructor(model) { this.model = model; } }

4️⃣ Real-Life Analogies:

Global Analogy:
- Native = Standard tools in toolbox.
- Host = Tools provided by workplace/environment.
- User = Tools you create yourself for a specific purpose.

India-specific Analogy:
- Native = Standard government forms.
- Host = State-specific forms or apps.
- User = Personalized documents you create.

Web Analogy:
- Native = JavaScript arrays, strings, numbers.
- Host = DOM elements, Browser APIs like fetch().
- User = Custom objects you define for app logic.

5️⃣ Code Explanation:

// Native object
const arr = [1, 2, 3]; // Array is native

// Host object (browser)
const body = document.body; // document is host object

// User-defined object
const user = { name: "John", age: 30 }; // user-created

6️⃣ Example / Usage:

console.log(Array.isArray(arr)); // true (native)
console.log(body.tagName);       // "BODY" (host)
console.log(user.name);          // "John" (user-defined)

7️⃣ Follow-Up Interview Questions:

Q1: Can host objects behave differently in different environments?  
A1: Yes, browser host objects differ from Node.js host objects.

Q2: Are native objects immutable?  
A2: Native object references can be reassigned; methods may be overridden.

Q3: Can we extend host objects?  
A3: It's possible but generally discouraged; may lead to inconsistent behavior.

Q4: How to identify if an object is native, host, or user-defined?  
A4: Using typeof, instanceof, or checking documentation for environment-provided features.

Q5: Examples of host objects in Node.js?  
A5: process, require, __dirname, Buffer.
*/
