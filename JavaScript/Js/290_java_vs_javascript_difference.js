/* 290_java_vs_javascript_difference.js

=====================================================
Java vs JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Java is a statically typed, compiled, object-oriented programming language 
  mainly used for backend, desktop, and Android development. 
  JavaScript is a dynamically typed, interpreted scripting language primarily 
  used for web development to create interactive frontend applications."

Key Points to Highlight:
- Typing:
  - Java → static typing, variables must declare type
  - JavaScript → dynamic typing, variables can hold any type
- Execution:
  - Java → compiled to bytecode, runs on JVM
  - JavaScript → interpreted, runs in browser or Node.js
- Object-Oriented:
  - Java → class-based OOP
  - JavaScript → prototype-based OOP (ES6 introduced class syntax)
- Use Cases:
  - Java → backend services, Android apps, large enterprise systems
  - JavaScript → frontend web apps, Node.js backend, serverless functions
- Syntax similarities are superficial; they are distinct languages

Examples:

// Java (conceptual, not actual JS code)
console.log("Java code example: public class Hello { public static void main(String[] args) { System.out.println('Hello, Java'); } }");

// JavaScript
console.log("Hello, JavaScript");

Code Explanation:
- Java requires explicit types and compilation
- JavaScript runs directly in browser or Node.js
- Both can be object-oriented, but with different paradigms

Real-Life Analogy:
- Java → building a large office building (structured, planned)
- JavaScript → decorating and adding interactivity inside the building (flexible, dynamic)

Example / Usage:

// Frontend example
document.querySelector('#btn').addEventListener('click', () => {
  console.log('Button clicked!');
});

// Backend example in Node.js
const http = require('http');
http.createServer((req, res) => {
  res.end('Hello from Node.js');
}).listen(3000);

Follow-Up Interview Questions:
- Q1: Can JavaScript run outside the browser?
  A1: Yes, using Node.js or other JS engines.
- Q2: Can JavaScript be used for mobile apps?
  A2: Yes, with frameworks like React Native.
- Q3: Can Java run in the browser?
  A3: Not directly; previously via applets, now obsolete.
- Q4: Which language is faster?
  A4: Java (compiled) generally faster; JS engines have optimized JIT compilation.
- Q5: Are Java and JavaScript related?
  A5: No, only name is similar; design, runtime, and usage differ completely.
*/
