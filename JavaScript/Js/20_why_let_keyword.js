/* 
20_why_let_keyword.js – Interview-Ready Answer:

"The `let` keyword was introduced in ES6 to solve several problems associated with `var`, 
primarily related to scoping, hoisting, and accidental redeclarations."

1️⃣ Key Points to Highlight:

1. Block Scoping:
- Unlike `var`, which is function-scoped, `let` is block-scoped.
- Ensures variables exist only within the `{}` block, reducing unexpected access.

2. Temporal Dead Zone (TDZ):
- `let` variables are hoisted but cannot be accessed before initialization.
- Prevents errors caused by using variables before they are declared.

3. Prevents Redeclaration:
- `let` disallows redeclaring a variable in the same scope.
- Helps avoid accidental overwrites and bugs.

4. Fixes Loop Closure Problems:
- Using `let` in `for` loops creates a new binding for each iteration.
- Prevents classic closure issues often encountered with `var`.

5. Does Not Attach to Global Object:
- `let` declared in the global scope does not become a property of `window`.
- Reduces global pollution in browser environments.

6. Reassignment Allowed:
- `let` allows updating the variable value but not redeclaring it in the same scope.

2️⃣ Examples:

// Block scope
{
  let x = 10;
  console.log(x); // 10
}
// console.log(x); // ReferenceError

// Temporal Dead Zone
// console.log(y); // ReferenceError
let y = 5;
console.log(y); // 5

// No redeclaration
let a = 1;
// let a = 2; // SyntaxError
a = 3; // Allowed
console.log(a); // 3

// Loop closure fix
const funcs = [];
for (let i = 0; i < 3; i++) {
  funcs.push(() => i);
}
console.log(funcs.map(fn => fn())); // [0, 1, 2]

// Global object
var globalVar = "I am var";
let globalLet = "I am let";
console.log(window.globalVar); // "I am var"
console.log(window.globalLet); // undefined

3️⃣ Real-Life Analogies:

- Global Analogy:
  - `var` = public notice board (accessible everywhere in the function scope)
  - `let` = personal diary (visible only in the block it is written)
- India-specific Analogy:
  - `var` = loudspeaker announcement heard by all
  - `let` = private WhatsApp message
- Web Analogy:
  - `var` = attaches to `window` globally
  - `let` = confined to the block

4️⃣ Code Explanation:

- `let` fixes common issues caused by `var`.
- It ensures safer scoping, avoids redeclaration, fixes loop closure issues,
  and reduces global pollution.
- Modern JavaScript prefers `let` over `var` for mutable variables.

5️⃣ Example / Usage:

// Updating a value
let counter = 0;
counter += 1;
console.log(counter); // 1

// Using in loops safely
for (let k = 0; k < 3; k++) {
  setTimeout(() => console.log(k), 100);
}
// Output: 0, 1, 2 (each iteration has its own binding)

6️⃣ Follow-Up Interview Questions:

Q1: Why use `let` instead of `var`?  
A1: Safer scoping, prevents redeclaration, fixes hoisting issues (TDZ), avoids global pollution, and solves loop closure problems.

Q2: What is the Temporal Dead Zone?  
A2: The period between the start of the block and the variable initialization, where accessing it throws `ReferenceError`.

Q3: Can `let` be redeclared in the same scope?  
A3: No, redeclaration is not allowed.

Q4: Does `let` attach to `window` in global scope?  
A4: No, unlike `var`, it does not create a global property.

Q5: How does `let` help in for-loops with closures?  
A5: Each iteration gets a new block-scoped binding, preventing closure issues that occur with `var`.
*/
