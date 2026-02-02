/* 240_decorator.js

=====================================================
JavaScript Decorators – Interview-Ready Answer
=====================================================

Definition:
- "A decorator is a special kind of declaration in JavaScript (ESNext/TypeScript) 
  that can modify classes, methods, or properties at design time by wrapping or enhancing them."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Add functionality to classes, methods, or properties without modifying original code.  
   - Common in frameworks like Angular and TypeScript for metadata and behavior enhancement.

2. **Syntax**  
   - Decorators are prefixed with `@` and placed above a class, method, or property.  
   - Example: `@decoratorName`

3. **Types of Decorators**  
   - **Class Decorators** → modify/replace entire class.  
   - **Method Decorators** → modify method behavior.  
   - **Property Decorators** → modify or add metadata to a property.  
   - **Parameter Decorators** → modify metadata for method parameters.

-----------------------------------------------------
Examples:

// Example 1: Simple method decorator (TypeScript/ESNext)
function log(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Example {
  @log
  sum(a, b) {
    return a + b;
  }
}

const ex = new Example();
ex.sum(2, 3); 
// Output: Calling sum with [2, 3]
// 5

// Example 2: Class decorator
function sealed(constructor) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Person {
  constructor(name) {
    this.name = name;
  }
}

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Decorators wrap classes or methods to add extra behavior.  
- Method decorators can intercept arguments and return values.  
- Class decorators can enforce constraints or add metadata.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of a decorator as a gift wrapper: you don’t change the gift inside, but you enhance its presentation or add instructions.

-----------------------------------------------------
Example / Usage:

function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Demo {
  @readonly
  name() { return "Kaizer"; }
}

const d = new Demo();
try {
  d.name = function() { return "Changed"; }; // Error in strict mode
} catch (e) {
  console.log(e.message);
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Are decorators part of standard JavaScript?  
A1: Currently experimental (ESNext); widely used in TypeScript.

Q2: Can decorators return a new function or class?  
A2: Yes, decorators can replace the original class/method/property.

Q3: Difference between class and method decorators?  
A3: Class decorators modify or enhance the whole class; method decorators wrap specific methods.

Q4: Can decorators access private properties?  
A4: Not directly; typically they operate on descriptors and public APIs.

Q5: Why are decorators useful in frameworks?  
A5: For metadata, dependency injection, logging, validation, and enhancing behavior declaratively.
*/
