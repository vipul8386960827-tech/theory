/* 360_reflect_object.js

=====================================================
Reflect Object in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Reflect is a built-in JavaScript object that provides methods for **interacting with objects** 
   at a lower level, mirroring the behavior of internal object operations. It allows you to 
   perform operations like property access, assignment, deletion, and function invocation 
   in a more functional and consistent way. Reflect is often used with Proxies to handle 
   default behaviors and can make code more readable and maintainable."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides methods corresponding to JavaScript internal operations:
   - `Reflect.get()`, `Reflect.set()`, `Reflect.has()`, `Reflect.deleteProperty()`, etc.
2. Works well with **Proxies** to forward default behavior.
3. Returns **boolean** indicating success/failure for many operations instead of throwing errors.
4. Not a constructor; all methods are **static functions**.
5. Helps standardize object manipulation in functional style.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const obj = { name: "Kaizer", age: 25 };

// Get property
console.log(Reflect.get(obj, "name")); // Kaizer

// Set property
Reflect.set(obj, "age", 26);
console.log(obj.age); // 26

// Check property existence
console.log(Reflect.has(obj, "name")); // true

// Delete property
Reflect.deleteProperty(obj, "name");
console.log(obj.name); // undefined

-----------------------------------------------------
Using Reflect with Proxy
-----------------------------------------------------
const target = { message: "Hello" };

const handler = {
  get(obj, prop, receiver) {
    console.log(`Accessing ${prop}`);
    return Reflect.get(obj, prop, receiver); // forward default behavior
  },
  set(obj, prop, value, receiver) {
    console.log(`Setting ${prop} to ${value}`);
    return Reflect.set(obj, prop, value, receiver); // forward default behavior
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.message); // Logs: Accessing message -> Hello
proxy.message = "Hi";       // Logs: Setting message to Hi

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Forwarding default operations in Proxies.
- Functional-style object manipulations.
- Safely performing object operations with predictable return values.
- Meta-programming scenarios where default behavior needs to be intercepted.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Reflect methods correspond to internal JavaScript operations (like [[Get]], [[Set]]).
2. Methods like `Reflect.set()` return **true/false** instead of throwing errors.
3. Makes Proxy handling cleaner and more predictable.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Reflect like a **control panel**:
  - You can inspect, modify, or delete object properties in a standardized way.
  - Proxies can use Reflect to forward actions to the original object without reinventing behavior.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can Reflect be used to replace direct property access?  
A1: Yes, but it is usually more useful for meta-programming or Proxy handling rather than replacing normal access.

Q2: Why use Reflect.set instead of obj[prop] = value?  
A2: Reflect.set returns a boolean indicating success and allows forwarding in Proxy handlers consistently.

Q3: What is the relationship between Reflect and Proxy?  
A3: Reflect methods allow Proxies to forward default operations safely and predictably, reducing boilerplate code.

Q4: Is Reflect a constructor?  
A4: No, Reflect is a static object with only static methods.
*/
