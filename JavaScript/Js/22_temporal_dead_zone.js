/* 
22_temporal_dead_zone.js – Interview-Ready Answer:

"The Temporal Dead Zone (TDZ) is a behavior in JavaScript where variables declared 
with `let` or `const` cannot be accessed before their declaration within the block. 
Accessing them in this zone results in a ReferenceError."

1️⃣ Key Points to Highlight:

1. TDZ Definition:
- TDZ exists from the start of a block until the variable is initialized.
- Only applies to `let` and `const` (not `var`).

2. Hoisting Behavior:
- `let` and `const` are hoisted to the top of their block but remain uninitialized.
- Accessing them before declaration triggers `ReferenceError`.

3. No Initialization in TDZ:
- Variables in TDZ are in a "dead" state until explicitly initialized.

4. Helps Avoid Bugs:
- Prevents using variables before they are declared, unlike `var`, which is initialized to `undefined`.

2️⃣ Examples:

// TDZ with let
{
  // console.log(a); // ReferenceError
  let a = 10;
  console.log(a); // 10
}

// TDZ with const
{
  // console.log(b); // ReferenceError
  const b = 20;
  console.log(b); // 20
}

// No TDZ with var
{
  console.log(c); // undefined
  var c = 30;
  console.log(c); // 30
}

// TDZ in loops
for (let i = 0; i < 3; i++) {
  // console.log(i); // ReferenceError before initialization
  console.log(i); // prints 0,1,2 correctly after initialization
}

3️⃣ Real-Life Analogies:

- Global Analogy:
  - TDZ = period when a new product is in the factory but not yet available in the shop.
  - Accessing it prematurely is like asking for it before it exists.
- India-specific Analogy:
  - TDZ = booking a train ticket before the booking window opens.
  - Trying to access it early results in error.
- Web Analogy:
  - TDZ = trying to access a JavaScript variable before its `let` or `const` declaration.

4️⃣ Code Explanation:

- TDZ ensures variables are not used before declaration, 
  making code safer and preventing subtle bugs.
- `var` behaves differently because it is initialized with `undefined` on hoisting.

5️⃣ Example / Usage:

// Safe TDZ usage
{
  let name = "Kaizer";
  console.log(name); // "Kaizer"
}

// Using const safely
{
  const PI = 3.14;
  console.log(PI); // 3.14
}

// Avoid TDZ errors
function exampleTDZ() {
  let temp;
  temp = "Initialized";
  console.log(temp); // "Initialized"
}
exampleTDZ();

6️⃣ Lesser-Known Facts / Interview Nuggets:

- TDZ exists even if the variable is declared but not yet initialized.
- Functions declared with `let` or `const` in a block also have TDZ.
- TDZ can help catch errors early in code and prevent unintended behavior.
- Variables in TDZ are not accessible via `typeof` safely:
  - `typeof x` before declaration with `let` or `const` will throw ReferenceError,
    unlike `var`.

7️⃣ Follow-Up Interview Questions:

Q1: What is the Temporal Dead Zone (TDZ)?  
A1: The period between the start of a block and the variable's initialization, where accessing
   `let` or `const` causes a ReferenceError.

Q2: Does TDZ apply to `var`?  
A2: No, `var` is initialized with `undefined` during hoisting.

Q3: Why is TDZ useful?  
A3: Prevents using variables before declaration, reducing bugs and making code safer.

Q4: Can you access a `let` variable inside its block before declaration?  
A4: No, it will throw a ReferenceError due to TDZ.

Q5: How does TDZ affect function declarations in blocks?  
A5: Functions declared with `let` or `const` in a block are also in TDZ until initialized.
*/
