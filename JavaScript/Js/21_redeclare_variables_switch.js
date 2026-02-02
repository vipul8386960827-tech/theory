/* 
21_redeclare_variables_switch.js – Interview-Ready Answer:

"This topic covers how variable redeclaration behaves with `var`, `let`, and `const`, 
and a brief note on the `switch` statement behavior related to variable scoping."

1️⃣ Variable Redeclaration Rules:

1. `var`:
- Can be redeclared and updated in the same scope.
- Function-scoped.
- Can lead to unexpected overwrites or bugs.

Example:
var x = 10;
var x = 20; // Allowed
x = 30; // Allowed
console.log(x); // 30

2. `let`:
- Cannot be redeclared in the same scope.
- Block-scoped.
- Can be updated (reassigned) but not redeclared.

Example:
let y = 5;
// let y = 10; // SyntaxError
y = 15; // Allowed
console.log(y); // 15

3. `const`:
- Cannot be redeclared or reassigned in the same scope.
- Block-scoped.
- Must be initialized during declaration.

Example:
const z = 100;
// const z = 200; // SyntaxError
// z = 300; // SyntaxError
console.log(z); // 100

2️⃣ Switch Statement and Variable Scope:

- Variables declared with `var` inside `switch` are function-scoped,
  not block-scoped.
- Variables declared with `let` or `const` are block-scoped to the case.
- Each `case` in `switch` does not create a separate block unless explicitly wrapped in `{}`.

Example:

switch (1) {
  case 1:
    var a = "var inside switch";
    let b = "let inside switch";
    const c = "const inside switch";
    console.log(a); // Accessible
    console.log(b); // Accessible
    console.log(c); // Accessible
    break;
  case 2:
    // console.log(b); // ReferenceError
    // console.log(c); // ReferenceError
    console.log(a); // Accessible (var is function-scoped)
    break;
}

3️⃣ Real-Life Analogies:

- Global Analogy:
  - `var` = public announcement, everyone in the function hears it.
  - `let` = private memo visible only inside the room.
  - `const` = sealed notice, cannot be changed.
- India-specific Analogy:
  - `var` = street loudspeaker everyone in the area hears.
  - `let` = personal WhatsApp group message.
  - `const` = legal contract, cannot be modified.
- Web Analogy:
  - `var` = attaches to window if global.
  - `let`/`const` = block-scoped, TDZ applies.

4️⃣ Code Explanation:

- Use `let` for mutable block-scoped variables.
- Use `const` for immutable references.
- Avoid `var` in modern JS due to scoping and redeclaration issues.
- In `switch` statements, wrap `case` blocks with `{}` when using `let` or `const`
  to avoid TDZ and redeclaration issues.

5️⃣ Example / Usage:

// Safe switch with let/const
switch (2) {
  case 1: {
    let x = "first";
    const y = "first const";
    console.log(x, y);
    break;
  }
  case 2: {
    let x = "second";
    const y = "second const";
    console.log(x, y);
    break;
  }
}

// Redeclaration rules
var v = 1;
var v = 2; // Allowed

let l = 1;
// let l = 2; // SyntaxError

const c = 3;
// const c = 4; // SyntaxError

6️⃣ Follow-Up Interview Questions:

Q1: Can you redeclare `var`, `let`, and `const`?  
A1: `var` → Yes, `let` → No, `const` → No.

Q2: Can `let` and `const` be accessed before declaration?  
A2: No, they are in the Temporal Dead Zone (TDZ).

Q3: Why wrap `switch` cases in `{}` with `let`/`const`?  
A3: To create block scope per case and avoid redeclaration/TDZ issues.

Q4: Is `var` inside a `switch` block scoped to the case?  
A4: No, `var` is function-scoped; it is accessible outside the case within the function.

Q5: When should we prefer `let` or `const` over `var`?  
A5: Always prefer `let` for mutable block-scoped variables, `const` for constants, to prevent
   scoping bugs and redeclaration issues.
*/
