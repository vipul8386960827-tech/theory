/* 
81_undeclared_vs_undefined.js – Interview-Ready Answer

"In JavaScript, `undeclared` variables are those that do not exist in any scope, 
while `undefined` variables are declared but have no assigned value."

1️⃣ Key Points to Highlight

1. Definition:
- Undeclared: Variable has never been declared using `var`, `let`, or `const`.
- Undefined: Variable is declared but not assigned a value.

2. Syntax Example

// Undeclared variable
// console.log(a); // ReferenceError: a is not defined

// Undefined variable
let b;
console.log(b); // undefined

// Object property
const obj = { name: "Alice" };
console.log(obj.age); // undefined (property exists in access but not set)

3. Key Differences:

| Feature           | Undeclared                   | Undefined                     |
|------------------|-----------------------------|--------------------------------|
| Declaration       | Never declared               | Declared but not assigned     |
| Access            | ReferenceError               | Returns undefined             |
| Scope             | Not in any scope             | Exists in declared scope      |
| Assignable        | Must be declared first       | Can assign value anytime      |

4. Real-Life Analogies

- Global Analogy: undeclared = person not registered anywhere; undefined = person registered but no info filled.
- India-specific Analogy: undeclared = PAN not issued; undefined = PAN exists but no name entered.
- Web Analogy: accessing undeclared variable throws error; accessing declared variable without value returns undefined.

5. Code Explanation

- Undeclared variables cannot be used until declared; causes runtime error.
- Undefined variables exist in scope but have no value; safe to check and assign.
- Helps differentiate between uninitialized and non-existent variables.

6. Example / Usage

// Undeclared
try {
    console.log(x);
} catch (err) {
    console.log("Error:", err.message); // Error: x is not defined
}

// Undefined
let y;
console.log(y); // undefined

let obj2 = { prop: null };
console.log(obj2.missingProp); // undefined
console.log(obj2.prop); // null

7️⃣ Follow-Up Interview Questions

Q1: Can you assign value to undeclared variable in strict mode?  
A1: No, causes ReferenceError.

Q2: Can undefined be reassigned?  
A2: Yes, variable can be assigned any value.

Q3: Difference between null and undefined?  
A3: null = intentionally empty; undefined = declared but not assigned.

Q4: Difference between undeclared and null?  
A4: undeclared = variable does not exist; null = variable exists with empty value.

Q5: How to check if variable is undefined?  
A5: Use typeof variable === "undefined" or variable === undefined.
*/
