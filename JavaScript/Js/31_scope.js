/* 
31_scope.js – Interview-Ready Answer:

"Scope in JavaScript refers to the accessibility or visibility of variables and functions 
in different parts of the code. It determines where a variable can be accessed or modified."

1️⃣ Key Points to Highlight:

1. Types of Scope:

- Global Scope:
  - Variables declared outside any function or block.
  - Accessible anywhere in the code.

- Function Scope:
  - Variables declared inside a function with `var`, `let`, or `const`.
  - Accessible only within that function.

- Block Scope:
  - Variables declared with `let` or `const` inside `{}`.
  - Accessible only within that block.
  - `var` does NOT have block scope.

- Lexical (Static) Scope:
  - Inner functions can access variables from outer functions.
  - Determined by the structure of the code at write time.

2. Examples:

// Global scope
var globalVar = "I am global";
function showGlobal() {
  console.log(globalVar); // "I am global"
}
showGlobal();

// Function scope
function functionScopeExample() {
  var funcVar = "I am function scoped";
  console.log(funcVar); // accessible here
}
// console.log(funcVar); // ReferenceError

// Block scope
{
  let blockVar = "I am block scoped";
  const blockConst = 10;
  console.log(blockVar); // accessible here
}
// console.log(blockVar); // ReferenceError
// console.log(blockConst); // ReferenceError

// Lexical scope / Closure
function outer() {
  const outerVar = "Accessible inside inner";
  function inner() {
    console.log(outerVar);
  }
  inner();
}
outer(); // "Accessible inside inner"

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Global scope = a public park accessible by everyone.
- India-specific Analogy:
  - Function scope = a room in your house; only people inside the room can access objects.
  - Block scope = a drawer in the room; only accessible when you open that drawer.
- Web Analogy:
  - Variables in modules or functions are encapsulated and cannot be accessed globally unless exported.

4️⃣ Code Explanation:

- `var` → function scoped or global if declared outside a function; ignores block.
- `let` / `const` → block scoped; safer for modern JS.
- Lexical scope allows inner functions to access outer variables even after outer function execution (closure).

5️⃣ Example / Usage:

function counter() {
  let count = 0; // function scoped
  return function increment() { // closure uses lexical scope
    count++;
    return count;
  };
}
const incrementCounter = counter();
console.log(incrementCounter()); // 1
console.log(incrementCounter()); // 2

6️⃣ Follow-Up Interview Questions:

Q1: What is scope in JavaScript?  
A1: Scope determines the accessibility or visibility of variables and functions.

Q2: Difference between global, function, and block scope?  
A2: Global → accessible everywhere; Function → inside function; Block → inside `{}` for let/const.

Q3: Can `var` be block scoped?  
A3: No, `var` ignores block scope and is function scoped.

Q4: What is lexical scope?  
A4: Inner functions can access variables from outer functions based on code structure.

Q5: Why is understanding scope important?  
A5: Helps prevent variable conflicts, bugs, and ensures proper encapsulation.
*/
