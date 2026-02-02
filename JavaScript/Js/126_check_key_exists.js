/* 126_check_key_exists.js

=====================================================
Check if a Key Exists in JavaScript Objects
=====================================================

Definition:
In JavaScript, objects are collections of key-value pairs. Sometimes we need to 
check if a specific key exists before accessing or modifying its value to avoid 
errors or unexpected behavior.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Ways to Check if a Key Exists:
   - **in operator**:
     - "key" in obj → returns true if the key exists (even if value is undefined).
   - **hasOwnProperty()**:
     - obj.hasOwnProperty("key") → checks if the key is the object’s own property 
       (not inherited from prototype).
   - **Object.keys() / Object.hasOwn() (ES2022)**:
     - Object.hasOwn(obj, "key") → safer alternative to hasOwnProperty.
   - **Undefined check**:
     - obj.key !== undefined → works but may fail if value is actually undefined.

2. Best Practice:
   - Prefer **Object.hasOwn()** (modern) or **hasOwnProperty()** (legacy-safe) 
     for accurate checks.

-----------------------------------------------------
Examples:
-----------------------------------------------------
const user = { name: "Alice", age: 25 };

"name" in user;                     // true
"email" in user;                    // false

user.hasOwnProperty("age");         // true
user.hasOwnProperty("toString");    // false (inherited)

Object.hasOwn(user, "name");        // true (modern approach)

if (user.email !== undefined) {
  console.log("Email key exists but may be undefined");
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Checking if a key exists in an object is like checking if a person has a 
  "room number" in a hotel:
  - "in operator" = checking if the room number exists in the hotel registry.
  - "hasOwnProperty" = checking if that specific room belongs to the guest 
    (not borrowed/shared).
  - "undefined check" = looking inside the room; may be empty, but the room still exists.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What’s the difference between "in" and hasOwnProperty()?  
A1: "in" checks both own and inherited properties, while hasOwnProperty() 
    checks only own properties.

Q2: Why use Object.hasOwn() over hasOwnProperty()?  
A2: It avoids edge cases where hasOwnProperty may be shadowed by object keys.

Q3: Can you check for nested keys directly?  
A3: No, you’d need optional chaining (obj?.nested?.key) or manual checks.

Q4: What happens if the key exists but its value is undefined?  
A4: "in" will still return true, but direct comparison with undefined 
    may suggest it doesn’t exist.
*/
