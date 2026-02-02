/* 464_inspect_custom.js

=====================================================
Custom Inspection in Node.js
=====================================================

Definition (What I should say in the interview):
- "Custom inspection in Node.js allows developers to **control how objects are represented** when logged using `console.log()` or inspected in the REPL. 
   This is achieved by defining a `[util.inspect.custom]` method on the object, enabling readable and meaningful output for complex objects."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **util.inspect.custom Symbol**
   - `const util = require('util');`
   - Objects can implement `[util.inspect.custom](depth, options)` method.
   - This method returns a string or object representation that will appear when logged.

2. **Control Depth and Formatting**
   - The `depth` parameter indicates recursion depth.
   - `options` provide styling and color info.

3. **Default Inspection**
   - Without custom inspection, `console.log()` uses default formatting which may not be readable for complex objects.

4. **Integration**
   - Works with `console.log`, `util.inspect()`, and Node.js REPL.
   - Useful for debugging or creating developer-friendly object representations.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const util = require('util');

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  [util.inspect.custom](depth, options) {
    return `User { Name: ${this.name}, Age: ${this.age} }`;
  }
}

const user = new User('Kaizer', 25);
console.log(user); 
// Output: User { Name: Kaizer, Age: 25 }

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Making complex objects more readable in logs and REPL.
- Customizing debug output for libraries or frameworks.
- Hiding sensitive or internal properties from console output.
- Improving developer experience when inspecting objects.
- Creating meaningful string representations for custom data structures.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Custom inspection only affects `console.log()` and `util.inspect()`, not serialization (JSON.stringify).
2. Useful for debugging large objects or complex classes.
3. Works well in combination with debugging tools and REPL.
4. Allows conditional output based on `depth` or `options`.
5. Helps make logs consistent and easier to understand.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of custom inspection as **putting a label on a complex box**:
  - Instead of seeing a confusing mass of contents, you get a clear, meaningful description.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you implement custom inspection in Node.js?  
A1: By defining a `[util.inspect.custom]` method on the object.

Q2: Does custom inspection affect JSON.stringify()?  
A2: No, it only affects `console.log()` and `util.inspect()`.

Q3: Can you control recursion depth?  
A3: Yes, the `depth` parameter in `[util.inspect.custom]` allows controlling how deeply nested properties are inspected.

Q4: Why is custom inspection useful?  
A4: It improves readability of logs and helps developers debug complex objects efficiently.

Q5: Can you hide private properties using custom inspection?  
A5: Yes, you can selectively omit or mask properties when returning the string representation.
*/
