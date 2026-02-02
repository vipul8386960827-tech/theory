/* 138_assign_default_values.js

=====================================================
Assigning Default Values in JavaScript
=====================================================

Definition:
- Default values in JavaScript allow variables, function parameters, or destructured objects/arrays 
  to have a fallback value if undefined or not provided.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Function Parameters
   - You can assign a default value directly in the function signature.
   - Example:
     function greet(name = "Guest") {
       console.log("Hello " + name);
     }
     greet();           // Hello Guest
     greet("Alice");    // Hello Alice

2. Destructuring Objects
   - Provide default values while extracting properties.
   - Example:
     const options = { timeout: 1000 };
     const { timeout = 5000, verbose = true } = options;
     console.log(timeout); // 1000
     console.log(verbose); // true

3. Destructuring Arrays
   - Default values for array elements during destructuring.
   - Example:
     const arr = [10];
     const [a = 1, b = 2] = arr;
     console.log(a); // 10
     console.log(b); // 2

4. Logical OR (||) Fallback
   - Older pattern using || to assign defaults.
   - Example:
     let port = config.port || 3000;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Default values are like **backup plans**:
  - If the primary value is missing, the backup is used automatically.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between default parameters and || fallback?
A1: Default parameters only apply if value is undefined; || triggers for falsy values (0, "", null, undefined, false).

Q2: Can you use expressions as default values?
A2: Yes, e.g., function add(a, b = a * 2) { ... }

Q3: What happens if null is passed to a default parameter?
A3: Null does not trigger the default; only undefined does.

Q4: Can default values be functions?
A4: Yes, you can assign a function as a default value.
*/
