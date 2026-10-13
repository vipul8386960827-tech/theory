/*
Difference Between var, let, and const – Interview-Ready Notes

| Feature                          | var                                      | let                                      | const                                    |
|----------------------------------|------------------------------------------|------------------------------------------|------------------------------------------|
| Introduced                       | ES5 and earlier                          | ES6 (ES2015)                             | ES6 (ES2015)                             |
| Scope                            | Function-scoped                          | Block-scoped                             | Block-scoped                             |
| Hoisting                         | Yes                                      | Yes                                      | Yes                                      |
| Initialization during hoisting   | Initialized to undefined                 | Uninitialized (TDZ)                      | Uninitialized (TDZ)                      |
| Temporal Dead Zone (TDZ)         | No                                       | Yes                                      | Yes                                      |
| Redeclaration in the same scope  | Allowed                                  | Not allowed                              | Not allowed                              |
| Reassignment                     | Allowed                                  | Allowed                                  | Not allowed                              |
| Initialization required          | No                                       | No                                       | Yes                                      |
| Top-level window property        | Yes, in browser classic scripts          | No                                       | No                                       |
| Loop behavior                    | Shares function-scoped binding           | Per-iteration bindings when applicable  | Per-iteration bindings when applicable   |
| Object mutation                  | Allowed                                  | Allowed                                  | Allowed                                  |
| Recommended usage                | Legacy code                              | When reassignment is needed              | Default when reassignment isn't needed  |

1. var EXAMPLE:

var a = 10;

var a = 20; // Redeclaration is allowed
a = 30;     // Reassignment is allowed

console.log(a); // 30

2. let EXAMPLE:

let b = 10;

// let b = 20; // SyntaxError: Cannot redeclare in the same scope

b = 30; // Reassignment is allowed

console.log(b); // 30

3. const EXAMPLE:

const c = 10;

// const c = 20; // SyntaxError: Cannot redeclare in the same scope
// c = 30;       // TypeError: Assignment to constant variable

console.log(c); // 10

// const must be initialized when declared.
// const d; // SyntaxError

4. SCOPE DIFFERENCE:

if (true) {
  var x = 10;
  let y = 20;
  const z = 30;
}

console.log(x); // 10
// console.log(y); // ReferenceError
// console.log(z); // ReferenceError

// var is not block-scoped.
// let and const are block-scoped.

5. HOISTING AND TDZ:

console.log(a); // undefined
var a = 10;

// console.log(b); // ReferenceError
let b = 20;

// console.log(c); // ReferenceError
const c = 30;

// var is hoisted and initialized to undefined.
// let and const are hoisted but remain uninitialized
// until execution reaches their declarations.
// Accessing them before initialization causes a ReferenceError.

6. CONST DOES NOT MAKE OBJECTS IMMUTABLE:

const user = {
  name: "Alex"
};

user.name = "Sam"; // Allowed: object mutation

// user = {}; // TypeError: reassignment is not allowed

// const prevents reassignment of the variable binding,
// but it does not prevent changes to the referenced object.

7. INTERVIEW-READY SUMMARY:

"var is function-scoped and allows redeclaration and reassignment.
let is block-scoped, allows reassignment, but does not allow
redeclaration in the same scope.
const is block-scoped and does not allow reassignment, so it
must be initialized at declaration.

All three are hoisted. However, let and const remain in the
Temporal Dead Zone until initialization.

In modern JavaScript, I prefer const by default and use let
when reassignment is required. I generally avoid var."
*/