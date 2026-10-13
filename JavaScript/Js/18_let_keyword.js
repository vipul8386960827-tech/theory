/*
18_let_keyword.js – Interview-Ready Answer:

"The `let` keyword was introduced in ES6 (ES2015) to declare block-scoped variables.
Unlike `var`, it prevents redeclaration within the same scope and introduces a Temporal Dead Zone (TDZ), which helps avoid accessing variables before initialization."

1. DEFINITION:

- `let` is used to declare variables whose scope is limited to the enclosing block.
- It supports reassignment but does not allow redeclaration in the same scope.
- It is commonly used when a variable's value needs to change.
- For variables that should not be reassigned, `const` is generally preferred.

2. KEY FEATURES:

1) Block Scope:
- A `let` variable is accessible only within the block in which it is declared.
- Blocks include `{}` used in `if`, `for`, `while`, and standalone code blocks.
- Unlike `var`, `let` is not function-scoped.

Example:

{
  let x = 10;
  console.log(x); // 10
}

// console.log(x); // ReferenceError

2) Hoisting and Temporal Dead Zone (TDZ):
- `let` declarations are hoisted, but they are not initialized until execution reaches the declaration.
- The period from entering the scope until initialization is called the Temporal Dead Zone.
- Accessing the variable during this period throws a ReferenceError.

Example:

// console.log(value); // ReferenceError
let value = 100;

console.log(value); // 100

Interview note:
- Saying "`let` is not hoisted" is incorrect.
- A more accurate answer is: "`let` is hoisted but remains inaccessible in the Temporal Dead Zone until initialization."

3) No Redeclaration in the Same Scope:
- You cannot declare the same `let` variable twice in the same scope.
- Redeclaration results in a SyntaxError.

Example:

let count = 1;

// let count = 2; // SyntaxError

count = 3; // Allowed: reassignment
console.log(count); // 3

However, a nested block can declare another variable with the same name.

Example:

let number = 10;

{
  let number = 20;
  console.log(number); // 20
}

console.log(number); // 10

4) Reassignment Is Allowed:
- `let` allows the variable to be assigned a new value.
- It does not make the assigned value immutable.

Example:

let counter = 0;
counter += 1;

console.log(counter); // 1

5) Special Behavior in Loops:
- A `let` declaration in a `for` loop creates a separate binding for each iteration when the loop's per-iteration binding rules apply.
- This is especially useful when callbacks execute later.

Example:

const functions = [];

for (let i = 0; i < 3; i++) {
  functions.push(() => i);
}

console.log(functions[0]()); // 0
console.log(functions[1]()); // 1
console.log(functions[2]()); // 2

With `var`, these callbacks would share the same function-scoped `i`, producing 3, 3, 3 after the loop finishes.

6) Global Scope and the Global Object:
- In a browser's classic script, a top-level `var` declaration creates a property on `window`.
- A top-level `let` declaration does not create a property on `window`.
- Both declarations can still be accessible to code in their appropriate global scope.

Example (browser classic script):

var globalVar = 10;
let globalLet = 20;

console.log(window.globalVar); // 10
console.log(window.globalLet); // undefined

Note:
This example assumes a browser classic script. JavaScript modules have different top-level scoping behavior.

7) `let` Does Not Prevent Object Mutation:
- `let` controls whether the variable can be reassigned, not whether an object can be modified.
- The object referenced by a `let` variable can still be mutated.

Example:

let user = { name: "Alex" };

user.name = "Sam"; // Allowed
user = { name: "John" }; // Also allowed

Both object mutation and variable reassignment are allowed with `let`.

3. DIFFERENCE BETWEEN `var`, `let`, AND `const`:

- `var`:
  Function-scoped, can be redeclared and reassigned, and is initialized to `undefined` when its declaration is processed.

- `let`:
  Block-scoped, cannot be redeclared in the same scope, can be reassigned, and has a Temporal Dead Zone.

- `const`:
  Block-scoped, cannot be redeclared or reassigned, and has a Temporal Dead Zone. Its referenced object can still be mutated.

4. REAL-WORLD USE CASES:

- Use `let` for counters and variables whose values change.
- Use `let` inside loops when each iteration needs its own variable binding.
- Use `let` for temporary values that should remain inside a particular block.
- Prefer `const` when reassignment is unnecessary.
- Avoid `var` in most modern JavaScript code unless there is a specific reason to use it.

5. COMMON INTERVIEW MISTAKES:

- Incorrect: "`let` is not hoisted."
  Correct: "`let` is hoisted but cannot be accessed before initialization because of the TDZ."

- Incorrect: "`let` makes a variable immutable."
  Correct: "`let` allows reassignment; `const` prevents reassignment."

- Incorrect: "`let` prevents all duplicate variable names."
  Correct: "`let` prevents redeclaration within the same scope, but a nested scope can declare a variable with the same name."

- Incorrect: "`let` is always local to a function."
  Correct: "`let` is block-scoped, including inside functions."

- Incorrect: "`let` is never available globally."
  Correct: "A top-level `let` in a browser classic script is globally scoped but does not create a property on `window`."

6. FOLLOW-UP INTERVIEW QUESTIONS:

Q1: What is the difference between `var` and `let`?

Answer:
"`var` is function-scoped and allows redeclaration, whereas `let` is block-scoped and does not allow redeclaration in the same scope. Both can be reassigned, but `let` has a Temporal Dead Zone before initialization."

Q2: What is the Temporal Dead Zone?

Answer:
"The Temporal Dead Zone is the period between entering a scope and initializing a `let` or `const` binding. Accessing that binding before initialization throws a ReferenceError."

Q3: Can we declare a `let` variable without initializing it?

Answer:
"Yes. We can declare a `let` variable without assigning a value. It is initialized to `undefined` when execution reaches the declaration."

Example:

let result;
console.log(result); // undefined

Q4: Can we use `let` and `var` with the same name?

Answer:
"Not in the same scope when the declarations conflict. Such combinations can result in a SyntaxError. A nested scope may declare a shadowing variable."

Q5: Why is `let` useful with closures in loops?

Answer:
"`let` provides a separate binding for each loop iteration, so callbacks can retain the correct iteration value instead of sharing one function-scoped variable as they would with `var`."

7. INTERVIEW-READY SUMMARY:

"`let` is an ES6 keyword used to declare block-scoped variables. It allows reassignment but prevents redeclaration within the same scope. Although `let` declarations are hoisted, they remain inaccessible during the Temporal Dead Zone until initialization. In loops, `let` provides per-iteration bindings that work well with closures. In modern JavaScript, I generally prefer `const` by default and use `let` whenever reassignment is required."
*/