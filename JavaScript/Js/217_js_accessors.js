/* 217_js_accessors.js

=====================================================
JavaScript Accessors (getters and setters)
=====================================================

Definition (Interview-friendly):
- "Accessors are methods that get or set the value of an object property 
  using get and set keywords, allowing controlled access."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Getter Example
   - Example:
     const obj = {
         firstName: "Alice",
         lastName: "Smith",
         get fullName() {
             return `${this.firstName} ${this.lastName}`;
         }
     };
     console.log(obj.fullName); // "Alice Smith"

2. Setter Example
   - Example:
     const person = {
         firstName: "",
         lastName: "",
         set fullName(name) {
             const parts = name.split(" ");
             this.firstName = parts[0];
             this.lastName = parts[1];
         }
     };
     person.fullName = "Bob Johnson";
     console.log(person.firstName); // "Bob"
     console.log(person.lastName);  // "Johnson"

3. Combining Getter and Setter
   - Example:
     const user = {
         _age: 0,
         get age() { return this._age; },
         set age(value) {
             if(value > 0) this._age = value;
         }
     };
     user.age = 25;
     console.log(user.age); // 25

4. Edge Cases
   - Getters cannot take arguments
   - Setters must have exactly one parameter
   - Useful for validation or computed properties

5. Use Cases
   - Computed properties
   - Validation before setting values
   - Encapsulation of object state

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Getters and setters are like **doors to a room**:
  - Getter: peek inside
  - Setter: set something inside with control

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between accessor and normal property?
A1: Accessor uses functions to get/set; normal property stores value directly.

Q2: Can you define multiple getters/setters for the same property?
A2: No, only one getter and one setter per property.

Q3: Are accessors enumerable?
A3: Yes, by default, but configurable using Object.defineProperty.

Q4: Can setters perform validation?
A4: Yes, you can check values before assigning.

Q5: Do accessors store values?
A5: Not directly; they often manipulate internal properties.
*/
