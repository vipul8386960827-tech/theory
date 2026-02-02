/* 
18_let_keyword.js – Interview-Ready Answer:

"The `let` keyword (introduced in ES6) is used to declare block-scoped variables in JavaScript, 
providing advantages over `var` and addressing some of its issues."

1️⃣ Definition:
- `let` declares a variable that is scoped to the block, statement, or expression in which it is used.
- Unlike `var`, `let` does not allow redeclaration in the same scope and avoids hoisting-related pitfalls.

2️⃣ Key Points to Highlight (including lesser-known details):

1. Block Scope:
- `let` variables exist only within the block they are defined in (loops, if-statements, functions).

2. Temporal Dead Zone (TDZ):
- Variables declared with `let` are hoisted but cannot be accessed before initialization.
- Accessing them early causes a `ReferenceError`.

3. No Redeclaration:
- You cannot redeclare a `let` variable in the same scope (prevents accidental overwrites).

4. Can be Updated:
- `let` allows reassignment but not redeclaration in the same scope.

5. Loop Pitfalls:
- `let` inside `for` loops creates a new binding for each iteration (important for closures).

6. Not Added to Global Object:
- Unlike `var` in global scope, `let` does not create a property on the `window` object in browsers.

7. Not Immutable:
- `let` is mutable. Use `const` for immutable references.

3️⃣ Examples:

// Block scope
{
  let x = 10;
  console.log(x); // 10
}
// console.log(x); // ReferenceError

// Temporal Dead Zone (TDZ)
{
  // console.log(y); // ReferenceError
  let y = 5;
  console.log(y); // 5
}

// No redeclaration
let a = 1;
// let a = 2; // SyntaxError
a = 3; // allowed
console.log(a); // 3

// Loop with closures
const funcs = [];
for (let i = 0; i < 3; i++) {
  funcs.push(() => i);
}
console.log(funcs[0]()); // 0
console.log(funcs[1]()); // 1
console.log(funcs[2]()); // 2

// Global scope difference
var globalVar = 1;
let globalLet = 2;
console.log(window.globalVar); // 1
console.log(window.globalLet); // undefined

4️⃣ Real-Life Analogies:
- Global Analogy:
  - `var` = public notice board (visible everywhere).
  - `let` = personal diary (only visible in the block you write in).
- India-specific Analogy:
  - `var` = a public loudspeaker announcement everyone hears.
  - `let` = private WhatsApp message in a group (only accessible to specific members).
- Web Analogy:
  - `var` = variable attached to global `window`.
  - `let` = variable confined to its block, like function-local variables.

5️⃣ Code Explanation:
- `let` is safer and more predictable than `var`.
- Temporal Dead Zone and block scoping reduce subtle bugs in loops and closures.
- Not attached to `window` avoids accidental global pollution.

6️⃣ Example / Usage:

// Using `let` in loops
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 (each iteration has separate `i` binding)

// TDZ demonstration
{
  // console.log(tempVar); // ReferenceError
  let tempVar = "Initialized";
  console.log(tempVar); // "Initialized"
}

// Updating value
let counter = 0;
counter += 1;
console.log(counter); // 1

7️⃣ Lesser-Known Facts / Interview Nuggets:

- `let` variables are hoisted but cannot be accessed before declaration (TDZ).
- `let` inside loops helps fix classic closure problems common with `var`.
- `let` variables are not enumerable in the global object (`window`) unlike `var`.
- Using `let` in `for-in` and `for-of` loops creates a new block binding for each iteration automatically.
- `let` allows mutation but not redeclaration; `const` disallows both redeclaration and reassignment.

8️⃣ Follow-Up Interview Questions:

Q1: Difference between `var`, `let`, and `const`?  
A1: `var` → function-scoped, hoisted, attaches to global object; `let` → block-scoped, hoisted but TDZ, not global; `const` → block-scoped, TDZ, immutable reference.

Q2: What is the Temporal Dead Zone?  
A2: Period from the start of the block until the `let` variable is initialized, during which accessing it causes `ReferenceError`.

Q3: Can you redeclare a `let` variable in the same scope?  
A3: No, redeclaration causes a syntax error.

Q4: Does `let` create a property on `window` in global scope?  
A4: No, unlike `var`, `let` does not attach to the global object.

Q5: Why is `let` preferred over `var` in modern JavaScript?  
A5: It avoids hoisting-related bugs, provides block scope, and prevents accidental global pollution.
*/
