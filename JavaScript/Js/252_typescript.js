/* 252_typescript.js

=====================================================
TypeScript – Interview-Ready Answer
=====================================================

Definition:
- "TypeScript is a strongly typed superset of JavaScript that 
   compiles to plain JavaScript, adding static typing, interfaces, 
   and other features for better code quality and maintainability."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Superset of JavaScript  
   - Any valid JavaScript is valid TypeScript.  

2. Static Typing  
   - Type annotations help catch errors at compile time.  
   - Example: `let num: number = 10;`  

3. Interfaces & Types  
   - Define object shapes and enforce contracts.  
   - Example:  
     ```ts
     interface User { name: string; age: number; }
     const user: User = { name: "Kaizer", age: 25 };
     ```

4. Optional & Default Parameters  
   - Supports optional `?` and default values.  

5. Supports Modern JavaScript Features  
   - Classes, async/await, modules, decorators, etc.  

6. Compilation to JavaScript  
   - TypeScript code is compiled to standard JS to run in any environment.  

7. Tooling Benefits  
   - Better IDE support, autocomplete, refactoring, and error detection.  

-----------------------------------------------------
Examples:

// Example 1: Basic type annotation
let count: number = 5;
let message: string = "Hello TypeScript";

// Example 2: Function with typed parameters and return
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(2, 3)); // 5

// Example 3: Interface usage
interface Person {
  name: string;
  age: number;
  isAdmin?: boolean; // optional
}

const user: Person = { name: "John", age: 30 };

// Example 4: Class with types
class Employee {
  constructor(public name: string, private salary: number) {}
  getSalary(): number {
    return this.salary;
  }
}

const emp = new Employee("Kaizer", 5000);
console.log(emp.getSalary()); // 5000

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- TypeScript adds type safety to JavaScript.  
- Helps detect errors before runtime.  
- Improves code readability, maintainability, and collaboration.  
- Compiles to plain JavaScript, so it works anywhere JS runs.  

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- JavaScript = handwritten notes (fast, flexible, but error-prone)  
- TypeScript = typed forms with validations (slightly more work upfront 
  but fewer mistakes and easier to maintain)  

-----------------------------------------------------
Example / Usage:

function greet(person: string, age?: number): string {
  return `Hello ${person}, age: ${age ?? "unknown"}`;
}
console.log(greet("Kaizer", 25)); // Hello Kaizer, age: 25
console.log(greet("Alice"));      // Hello Alice, age: unknown

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Is TypeScript a separate language from JavaScript?  
A1: No, it’s a superset; all JS code is valid TS.  

Q2: What are the main advantages of TypeScript?  
A2: Static typing, better tooling, early error detection, maintainable code.  

Q3: Can TypeScript code run directly in the browser?  
A3: No, it must be compiled to JavaScript first.  

Q4: What is the difference between `interface` and `type` in TS?  
A4: Both define object shapes; interfaces can be extended, types are more flexible.  

Q5: How does TypeScript improve team collaboration?  
A5: Provides type contracts, better IDE support, and reduces runtime errors.  
*/
