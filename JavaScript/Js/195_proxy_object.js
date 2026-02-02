/* 195_proxy_object.js

=====================================================
Proxy Objects in JavaScript
=====================================================

Definition:
- A Proxy object wraps another object (target) and allows
  custom behavior for fundamental operations like get, set, etc.
- Useful for validation, logging, and reactive programming.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Proxy Usage
   - Example:
     const target = { name: "Alice", age: 25 };
     const handler = {
         get(obj, prop) {
             console.log(`Accessing property: ${prop}`);
             return obj[prop];
         },
         set(obj, prop, value) {
             console.log(`Setting ${prop} to ${value}`);
             obj[prop] = value;
             return true;
         }
     };
     const proxy = new Proxy(target, handler);
     console.log(proxy.name); // Logs: Accessing property: name
     proxy.age = 30;          // Logs: Setting age to 30

2. Validation Example
   - Example:
     const validator = {
         set(obj, prop, value) {
             if (prop === "age" && typeof value !== "number") {
                 throw new TypeError("Age must be a number");
             }
             obj[prop] = value;
             return true;
         }
     };
     const person = new Proxy({}, validator);
     person.age = 20; // ✅ works
     // person.age = "20"; // ❌ throws error

3. Advantages
   - Logging or auditing property access.
   - Validation and constraints on object properties.
   - Implementing reactive data-binding systems.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Proxy is like a **security guard at a building**:
  - Intercepts every access and modification, and can allow or block actions.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between Proxy and Object.defineProperty?
A1: Proxy can intercept multiple operations on an object dynamically; defineProperty is per-property.

Q2: Can Proxy be used to watch array changes?
A2: Yes, can intercept methods like push, pop, etc., via `get` and `set`.

Q3: What traps can be used in Proxy?
A3: get, set, has, deleteProperty, ownKeys, apply, construct, etc.

Q4: Can you revoke a Proxy?
A4: Yes, using `Proxy.revocable()` which returns a proxy and a revoke function.

Q5: Does Proxy affect performance?
A5: Slightly, due to interception; use only where necessary.
*/
