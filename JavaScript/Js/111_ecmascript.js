/* 
111_ecmascript.js – Interview-Ready Answer

"ECMAScript (ES) is the standard specification for scripting languages like 
JavaScript. JavaScript is an implementation of the ECMAScript standard."

1️⃣ Key Points to Highlight

1. Definition:
- ECMAScript = standardized scripting language specification.
- JavaScript, JScript, and ActionScript are implementations of ECMAScript.
- Standard maintained by ECMA International (ECMA-262).

2. Syntax Example / Version Example

// ES5
var x = 10;
function sum(a, b) {
    return a + b;
}

// ES6 / ES2015
let y = 20;
const add = (a, b) => a + b;
class Person {
    constructor(name) {
        this.name = name;
    }
}

// Modules (ES6 feature)
export const PI = 3.14;
import { PI } from "./constants.js";

3. Real-Life Analogies

- Global Analogy: ECMAScript = blueprint, JavaScript = building constructed from blueprint.
- India-specific Analogy: ECMAScript = RBI guideline, JavaScript = commercial banks implementing it.
- Web Analogy: ECMAScript defines standard syntax and behavior; browsers implement it as JavaScript engines.

4. Code Explanation

- ECMAScript versions introduce new features (ES5, ES6, ES7...ES12).
- ES6 introduced: let/const, arrow functions, classes, modules, template literals.
- ES5 focused on standardizing functions, JSON, array methods.

5. Example / Usage

// Using ES6 features
const greet = (name) => `Hello ${name}`;
console.log(greet("Alice")); // Hello Alice

class Animal {
    constructor(type) {
        this.type = type;
    }
}

const dog = new Animal("Dog");
console.log(dog.type); // Dog

6️⃣ Follow-Up Interview Questions

Q1: Difference between ES5 and ES6?  
A1: ES6 introduces let/const, arrow functions, classes, modules, template literals, default parameters, etc.

Q2: Is JavaScript same as ECMAScript?  
A2: No, JS is implementation of ECMAScript standard.

Q3: What is the latest ECMAScript version?  
A3: ES2025 (as of 2025, subject to updates by ECMA).

Q4: Are all JS engines ES compliant?  
A4: Modern browsers mostly comply with ES5/ES6+.

Q5: Why ECMAScript is important?  
A5: Provides standardization for consistent JavaScript behavior across browsers and platforms.
*/
