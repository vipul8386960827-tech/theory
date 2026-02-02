/* 
73_undefined_property.js – Interview-Ready Answer

"In JavaScript, accessing a property that does not exist on an object 
returns `undefined`. This is different from the property being defined 
as `null`."

1️⃣ Key Points to Highlight

1. Definition:
- When a property is missing from an object, JS returns `undefined` instead of throwing an error.
- Helps safely check existence of properties without breaking code.

2. Syntax Example

const obj = { name: "Alice", age: 25 };

console.log(obj.name); // "Alice"
console.log(obj.gender); // undefined (property does not exist)
console.log(obj.age); // 25

3. Difference from null:
- `undefined` = property not present or value not assigned.
- `null` = property exists but intentionally empty.

const obj2 = { name: null };
console.log(obj2.name); // null
console.log(obj2.age);  // undefined

4. Real-Life Analogies

- Global Analogy: undefined = checking a mailbox that doesn't exist returns nothing; null = mailbox exists but empty.
- India-specific Analogy: undefined = checking a file in the registry that doesn't exist; null = file exists but empty.
- Web Analogy: Missing form fields in JSON data return undefined; empty fields may return null.

5. Code Explanation

- Accessing missing properties safely returns undefined.
- Can use conditional checks to handle undefined properties.
- Prevents runtime errors in object access.

6. Example / Usage

const user = { username: "john_doe", email: null };

if (user.phone === undefined) {
    console.log("Phone number not provided"); // Executed
}

if (user.email === null) {
    console.log("Email is intentionally empty"); // Executed
}

7️⃣ Follow-Up Interview Questions

Q1: What happens if you try to access a nested undefined property?  
A1: Throws TypeError; use optional chaining: obj?.prop?.subprop

Q2: Can undefined be assigned explicitly?  
A2: Yes, e.g., let x = undefined;

Q3: Difference between undefined and undeclared?  
A3: undefined = declared but not assigned; undeclared = variable not defined in scope.

Q4: How to check if property exists in object?  
A4: Use `in` operator or `hasOwnProperty` method.

Q5: Can undefined properties exist in arrays?  
A5: Yes, e.g., uninitialized array elements are undefined.
*/
