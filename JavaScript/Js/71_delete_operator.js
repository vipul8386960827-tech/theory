/* 
71_delete_operator.js – Interview-Ready Answer

"The `delete` operator in JavaScript is used to remove a property from 
an object. It does not delete variables declared with `var`, `let`, or `const`."

1️⃣ Key Points to Highlight

1. Definition:
- Deletes object properties.
- Returns `true` if deletion is successful or the property does not exist.
- Returns `false` for non-configurable properties (e.g., some built-in properties).

2. Syntax Example

const obj = { name: "Alice", age: 25 };
delete obj.age; 
console.log(obj); // { name: "Alice" }

var x = 10;
delete x; 
console.log(x); // 10 (cannot delete variables declared with var)

3. Real-Life Analogies

- Global Analogy: delete = removing an item from a folder; the folder remains intact.
- India-specific Analogy: delete = removing a file from a register, not deleting the register itself.
- Web Analogy: Removing a key from a JSON object before sending to server.

4. Code Explanation

- Works only on object properties.
- Does not affect variables declared in the scope.
- Useful for dynamic property removal, especially in objects received from APIs.

5. Example / Usage

const user = {
    username: "john_doe",
    password: "secret",
    email: "john@example.com"
};

// Remove password before sending user object
delete user.password;
console.log(user); 
// Output: { username: "john_doe", email: "john@example.com" }

// Attempt to delete variable
let age = 30;
delete age; // false
console.log(age); // 30

6️⃣ Follow-Up Interview Questions

Q1: Can delete remove array elements?  
A1: Yes, but it leaves `undefined` holes; better to use splice().

Q2: Can delete remove functions declared with function keyword?  
A2: No, function declarations are non-configurable.

Q3: Can delete remove variables declared with var, let, const?  
A3: No, only object properties.

Q4: Does delete affect prototype chain properties?  
A4: No, only own properties of the object.

Q5: What is the return value of delete for non-existent property?  
A5: true
*/
