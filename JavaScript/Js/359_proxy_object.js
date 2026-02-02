/* 359_proxy_object.js

=====================================================
Proxy Object in JavaScript
=====================================================

Definition (What I should say in the interview):
- "A Proxy in JavaScript is an object that **wraps another object** (target) and allows you 
   to intercept and customize fundamental operations like property access, assignment, 
   function calls, and more. Proxies are powerful for creating reactive frameworks, 
   validation, logging, or controlling object behavior without modifying the original object."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Allows intercepting operations such as `get`, `set`, `deleteProperty`, `has`, `apply`, `construct`.
2. Can be used to **modify default behavior** of objects dynamically.
3. Supports a **target object** and **handler** object for customization.
4. Enables **reactivity systems**, validation, logging, and security wrappers.
5. Transparent – the target object can still be accessed normally if desired.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const target = { name: "Kaizer", age: 25 };

const handler = {
  get(obj, prop) {
    console.log(`Property ${prop} accessed`);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log(`Property ${prop} changed to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

// Accessing property
console.log(proxy.name); // Logs: Property name accessed -> Kaizer

// Setting property
proxy.age = 26; // Logs: Property age changed to 26

// Original object is also updated
console.log(target.age); // 26

-----------------------------------------------------
Advanced Example (Validation)
-----------------------------------------------------
const user = { name: "Alex", age: 20 };

const validator = {
  set(obj, prop, value) {
    if (prop === "age") {
      if (typeof value !== "number" || value < 0) {
        throw new Error("Invalid age");
      }
    }
    obj[prop] = value;
    return true;
  }
};

const validatedUser = new Proxy(user, validator);

validatedUser.age = 30; // Works
// validatedUser.age = -5; // Throws error

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Data validation on property assignment.
- Logging property access or changes.
- Implementing reactivity in frameworks (like Vue.js or MobX).
- Virtualizing objects or API wrappers.
- Security checks before accessing/modifying objects.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Proxies do not change the target object directly but intercept operations.
2. Can wrap functions to intercept `apply` (calls) or `construct` (new operator).
3. Proxies can affect performance if overused due to interception overhead.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a Proxy as a **bodyguard for an object**:
  - Every time someone tries to access or modify the object, the bodyguard (handler) 
    checks, logs, or modifies the action before allowing it.
  - The target object remains safe, and behavior can be customized dynamically.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can Proxy intercept array operations?  
A1: Yes, operations like index access, push, pop, etc., can be intercepted using `get` and `set`.

Q2: Can Proxy be used with functions?  
A2: Yes, functions can be proxied to intercept calls with the `apply` trap or construction with `construct`.

Q3: Is the original object modified when using a Proxy?  
A3: The target object can be modified if the handler forwards changes, but Proxy itself only intercepts operations.

Q4: What are common use cases of Proxy in frameworks?  
A4: Reactivity systems (Vue 3), validation, logging, and virtual objects.
*/
