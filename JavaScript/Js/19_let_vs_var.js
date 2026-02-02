/* 
19_let_vs_var.js – Interview-Ready Answer:

"`let` and `var` are both used to declare variables in JavaScript, but they differ in scope, hoisting, 
redeclaration, and global behavior."

1️⃣ Key Points to Highlight:

1. Scope:
- `var` → function-scoped.
- `let` → block-scoped (within `{}` braces).

2. Hoisting:
- Both are hoisted, but:
  - `var` → initialized with `undefined`.
  - `let` → hoisted but in Temporal Dead Zone (TDZ); accessing before declaration throws `ReferenceError`.

3. Redeclaration:
- `var` → can be redeclared in the same scope.
- `let` → cannot be redeclared in the same scope; will throw `SyntaxError`.

4. Global Object:
- `var` → declared globally, attaches to `window` in browsers.
- `let` → declared globally, does NOT attach to `window`.

5. Loops & Closures:
- `var` in loops → single binding for all iterations; can cause closure issues in callbacks.
- `let` in loops → creates a new binding per iteration; fixes closure problems.

6. Reassignment:
- Both `var` and `let` can be reassigned.

2️⃣ Examples:

// Scope
function testScope() {
  if (true) {
    var x = 10;
    let y = 20;
  }
  console.log(x); // 10 (function-scoped)
  // console.log(y); // ReferenceError (block-scoped)
}

// Hoisting
console.log(aVar); // undefined
var aVar = 5;

// console.log(aLet); // ReferenceError
let aLet = 5;

// Redeclaration
var v = 1;
var v = 2; // allowed

let l = 1;
// let l = 2; // SyntaxError

// Global object
var globalVar = "I am var";
let globalLet = "I am let";
console.log(window.globalVar); // "I am var"
console.log(window.globalLet); // undefined

// Loop & closures
const funcsVar = [];
for (var i = 0; i < 3; i++) {
  funcsVar.push(() => i);
}
console.log(funcsVar[0]()); // 3
console.log(funcsVar[1]()); // 3

const funcsLet = [];
for (let j = 0; j < 3; j++) {
  funcsLet.push(() => j);
}
console.log(funcsLet[0]()); // 0
console.log(funcsLet[1]()); // 1

3️⃣ Real-Life Analogies:
- Global Analogy:
  - `var` = public notice board (visible everywhere in the function scope).
  - `let` = private diary (visible only in the block you declare it).
- India-specific Analogy:
  - `var` = loudspeaker announcement heard by all in the function.
  - `let` = personal WhatsApp message for a specific group.
- Web Analogy:
  - `var` = global window property.
  - `let` = block-local variable in DOM script.

4️⃣ Code Explanation:
- `let` provides better scoping and avoids redeclaration issues.
- `var` can cause unexpected behavior due to hoisting and function scope.

5️⃣ Example / Usage:

// Fixing closure problem
const funcs = [];
for (let k = 0; k < 3; k++) {
  funcs.push(() => k);
}
console.log(funcs.map(fn => fn())); // [0, 1, 2]

// Hoisting example with TDZ
// console.log(tdVar); // ReferenceError
let tdVar = "Initialized";
console.log(tdVar); // "Initialized"

6️⃣ Lesser-Known Facts / Interview Nuggets:

- `var` variables are initialized with `undefined` during hoisting; `let` variables exist in TDZ until initialization.
- `let` in `for` loops automatically creates a new binding per iteration (fixing classic closure issues).
- `let` does not create a property on the global object (`window`) in browsers.
- Redeclaring a `var` inside a block is allowed, but `let` will throw an error.

7️⃣ Follow-Up Interview Questions:

Q1: Difference between `let` and `var`?  
A1: `let` → block-scoped, TDZ, no redeclaration, not attached to window; `var` → function-scoped, initialized with undefined, can redeclare, attached to window globally.

Q2: Why is `let` preferred over `var`?  
A2: Safer scoping, avoids hoisting pitfalls, prevents accidental global pollution, fixes closure issues.

Q3: Can `var` cause unexpected behavior in loops with closures?  
A3: Yes, because `var` creates a single binding shared across iterations.

Q4: Does `let` allow reassignment?  
A4: Yes, but redeclaration in the same scope is not allowed.

Q5: How does TDZ affect `let` usage?  
A5: Accessing a `let` variable before initialization in its block throws a `ReferenceError`.
*/
