/*
=====================================
Looping Inside JSX in React
=====================================

Definition:
Looping inside JSX refers to rendering lists of elements by iterating 
over arrays or collections directly in JSX.  
React uses JavaScript expressions (like map) to generate multiple elements.

-------------------------------------
Key Points:
-------------------------------------
- Cannot use traditional for loops directly inside JSX (needs expression).  
- Use Array.map() for rendering arrays.  
- Always provide a unique "key" prop for each element to help React 
  identify and efficiently update items.  
- Can also use Array.filter() + map() for conditional rendering.  

-------------------------------------
Example 1: Basic Loop with map()
-------------------------------------
function NumbersList() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <ul>
      {numbers.map((num) => (
        <li key={num}>{num}</li>
      ))}
    </ul>
  );
}

-------------------------------------
Example 2: Conditional Rendering in Loop
-------------------------------------
function UsersList() {
  const users = [
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
  ];

  return (
    <ul>
      {users
        .filter((user) => user.active)
        .map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
    </ul>
  );
}

-------------------------------------
Example 3: Using index as key (not recommended if list changes)
-------------------------------------
function ItemsList() {
  const items = ["a", "b", "c"];
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Looping inside JSX is like having a list of groceries 🛒 
and writing each item on the shopping list dynamically instead 
of writing them manually.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you use for loop inside JSX?
A1: No, JSX expects expressions. Use map(), filter(), or for loops outside JSX.

Q2: Why is the key prop important?
A2: It helps React efficiently update or reorder elements without re-rendering all items.

Q3: When is it okay to use index as key?
A3: Only if the list is static and items do not change order or get removed/added.

Q4: Can you combine multiple loops in JSX?
A4: Yes, using nested map() calls or chaining filter() + map().

Q5: What happens if key is missing?
A5: React will warn, and list re-renders may behave inefficiently or incorrectly.
*/
