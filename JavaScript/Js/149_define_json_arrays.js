/* 149_define_json_arrays.js

=====================================================
Defining JSON Arrays in JavaScript
=====================================================

Definition:
- JSON (JavaScript Object Notation) arrays are ordered lists of values.
- Useful for sending structured data in APIs or storing collections.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Simple JSON Array
   - Example:
     const fruits = ["Apple", "Banana", "Cherry"];
     console.log(fruits[0]); // "Apple"

2. Array of Objects
   - Example:
     const users = [
         { id: 1, name: "Alice" },
         { id: 2, name: "Bob" }
     ];
     console.log(users[1].name); // "Bob"

3. Nested JSON Arrays
   - Example:
     const data = [
         [1, 2, 3],
         ["a", "b", "c"]
     ];
     console.log(data[0][2]); // 3

4. Converting to JSON String
   - Example:
     const jsonString = JSON.stringify(users);
     console.log(jsonString);
     // '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]'

5. Parsing JSON String to Array
   - Example:
     const parsed = JSON.parse(jsonString);
     console.log(parsed[0].name); // "Alice"

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- JSON arrays are like **ordered boxes on a shelf**:
  - Each box can contain values or objects, and you can access them by index.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between JavaScript array and JSON array?
A1: JS array is a native object; JSON array is a string representation of array.

Q2: Can JSON arrays contain objects?
A2: Yes, JSON arrays can contain objects, numbers, strings, booleans, or other arrays.

Q3: How to safely parse unknown JSON?
A3: Use `try { JSON.parse(str) } catch(e) {}` to handle errors.

Q4: Can JSON arrays have mixed types?
A4: Yes, they can include numbers, strings, booleans, objects, or arrays.

Q5: How to send a JSON array to a server?
A5: Convert to string with `JSON.stringify()` and send via fetch or AJAX.
*/
