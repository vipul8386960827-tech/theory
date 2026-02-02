/* 253_js_vs_typescript.js

=====================================================
JavaScript vs TypeScript – Interview-Ready Answer
=====================================================

Definition:
- "JavaScript is a dynamic, interpreted scripting language for web and server-side development.  
   TypeScript is a statically-typed superset of JavaScript that compiles to plain JavaScript,
    adding type safety and other features."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Typing System**  
   - JavaScript → dynamic typing (types checked at runtime)  
   - TypeScript → static typing (types checked at compile time)  

2. **Compilation**  
   - JS → interpreted directly by the browser/Node.js  
   - TS → compiled/transpiled to JS before execution  

3. **Error Detection**  
   - JS → errors appear at runtime  
   - TS → many errors caught during development  

4. **Features**  
   - JS → ES6+ features (classes, modules, arrow functions, etc.)  
   - TS → all JS features + interfaces, enums, generics, decorators  

5. **Tooling Support**  
   - TS → better autocomplete, refactoring, and IDE integration  

6. **Learning Curve**  
   - JS → easier to start, more flexible  
   - TS → slightly steeper learning curve, more structure  

7. **Use Cases**  
   - JS → small scripts, rapid prototyping  
   - TS → large-scale applications, maintainable codebases  

-----------------------------------------------------
Examples:

// JavaScript (dynamic typing)
let x = 10;
x = "hello"; // allowed

// TypeScript (static typing)
let y: number = 10;
// y = "hello"; // ❌ Error: Type 'string' is not assignable to type 'number'

// JavaScript Function
function add(a, b) {
  return a + b;
}

// TypeScript Function with type annotations
function addTS(a: number, b: number): number {
  return a + b;
}

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- JavaScript is flexible and forgiving but can lead to runtime errors.  
- TypeScript adds type safety and development-time checks, improving maintainability.  
- TS code is always compiled to JS before running, ensuring compatibility with JS environments.  

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- JS → free-form drawing on paper: fast, flexible, but errors are harder to spot  
- TS → drawing with a ruler and grid: more structured, mistakes caught early  

-----------------------------------------------------
Example / Usage:

// TypeScript interface example
interface Person {
  name: string;
  age: number;
}

const user: Person = { name: "Kaizer", age: 25 };
// const wrongUser: Person = { name: "Alice" }; // ❌ Error: age missing

//-----------------------------------------------------
// Follow-Up Interview Questions
//-----------------------------------------------------
Q1: Can TypeScript code run in browsers directly?  
A1: No, it must first be compiled to JavaScript.  

Q2: Can JavaScript code be used in TypeScript?  
A2: Yes, all valid JS is valid TS.  

Q3: Why prefer TypeScript over JavaScript for large projects?  
A3: Type safety, better tooling, maintainability, fewer runtime errors.  

Q4: Difference between static and dynamic typing?  
A4: Static typing checks types at compile time; dynamic typing at runtime.  

Q5: Can TypeScript enforce types in runtime?  
A5: No, TypeScript types are erased after compilation; runtime checks require extra code.  
*/
