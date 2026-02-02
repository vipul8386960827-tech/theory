/* 
74_null_value.js – Interview-Ready Answer

"In JavaScript, `null` is a primitive value that represents the intentional 
absence of any object value. It is different from `undefined`."

1️⃣ Key Points to Highlight

1. Definition:
- `null` explicitly indicates "no value".
- Type of `null` is an object (historical quirk).

2. Syntax Example

let emptyVar = null;
console.log(emptyVar); // null
console.log(typeof emptyVar); // "object"

3. Difference from undefined:
- undefined: variable declared but not assigned.
- null: variable intentionally assigned as empty.

let x; // undefined
let y = null; // null

4. Real-Life Analogies

- Global Analogy: null = empty box purposely left blank; undefined = box never created.
- India-specific Analogy: null = bank account exists but has no balance; undefined = account does not exist.
- Web Analogy: Setting API response field to null to indicate no data.

5. Code Explanation

- Use null to explicitly reset or empty variables.
- Useful for default values, placeholders, or signaling absence of value.

6. Example / Usage

let user = {
    name: "Alice",
    phone: null // intentionally no phone number
};

console.log(user.phone); // null

// Check for null
if(user.phone === null) {
    console.log("Phone not provided"); // Executed
}

7️⃣ Follow-Up Interview Questions

Q1: What is the type of null?  
A1: "object" (historical JavaScript quirk).

Q2: How is null different from undefined?  
A2: null is explicitly assigned; undefined is uninitialized.

Q3: Can null be used in arithmetic?  
A3: Yes, null is coerced to 0 in numeric operations.

Q4: Should you use null or undefined for defaults?  
A4: Prefer null for intentional absence, undefined for uninitialized variables.

Q5: Can object properties be set to null?  
A5: Yes, commonly used to indicate empty or missing data.
*/
