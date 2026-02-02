/* 
75_null_vs_undefined.js – Interview-Ready Answer

"In JavaScript, `null` and `undefined` both represent absence of value, 
but they have different meanings and use-cases."

1️⃣ Key Points to Highlight

1. Definition:
- `undefined`: Variable declared but not assigned, or property does not exist.
- `null`: Explicitly assigned to indicate "no value" or intentional emptiness.

2. Syntax Example

let a;
console.log(a); // undefined

let b = null;
console.log(b); // null

const obj = { name: "Alice" };
console.log(obj.age); // undefined
obj.age = null;
console.log(obj.age); // null

3. Type Differences:
- typeof undefined → "undefined"
- typeof null → "object" (historical JS quirk)

4. Comparison:

console.log(null == undefined); // true (loose equality)
console.log(null === undefined); // false (strict equality)

5. Real-Life Analogies

- Global Analogy: undefined = mailbox that never existed; null = mailbox exists but empty.
- India-specific Analogy: undefined = account never created; null = account exists but no balance.
- Web Analogy: undefined = missing API field; null = field exists but intentionally empty.

6. Code Explanation

- Use undefined to check if a variable/property is uninitialized.
- Use null to explicitly reset a variable or property.
- Important in data handling, default values, and API responses.

7. Example / Usage

let user;
if (user === undefined) {
    console.log("User not initialized"); // Executed
}

let user2 = null;
if (user2 === null) {
    console.log("User intentionally empty"); // Executed
}

7️⃣ Follow-Up Interview Questions

Q1: Can undefined be assigned explicitly?  
A1: Yes, but generally let JS assign it automatically.

Q2: Can null be used for variables of any type?  
A2: Yes, null can be assigned to any variable type.

Q3: Why typeof null returns "object"?  
A3: Historical JS bug.

Q4: Difference between == and === for null and undefined?  
A4: == considers them equal; === distinguishes type and value.

Q5: When to prefer null over undefined?  
A5: Prefer null when intentionally clearing a variable or signaling absence.
*/
