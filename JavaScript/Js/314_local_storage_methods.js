/* 314_local_storage_methods.js

=====================================================
Local Storage Methods in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Local Storage is a web storage API that allows storing key-value pairs in the 
  browser persistently (data persists even after page reloads or browser restart)."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Store small amounts of data (strings only) on client-side.  
   - Useful for caching, user preferences, session data, or theme settings.

2. **Storage Limit**  
   - Usually around 5-10 MB per origin.  
   - Larger than cookies and doesn’t send data with every HTTP request.

3. **Data Type**  
   - Only stores strings.  
   - Objects/arrays must be converted using `JSON.stringify()` and `JSON.parse()`.

-----------------------------------------------------
Methods:

1. **setItem(key, value)**  
   - Stores a value with the specified key.
   - Example: `localStorage.setItem('username', 'Alice');`

2. **getItem(key)**  
   - Retrieves the value for the specified key.
   - Example: `localStorage.getItem('username'); // "Alice"`

3. **removeItem(key)**  
   - Deletes the value associated with the key.
   - Example: `localStorage.removeItem('username');`

4. **clear()**  
   - Removes all key-value pairs in local storage.
   - Example: `localStorage.clear();`

5. **key(index)**  
   - Returns the key at the given index.
   - Example: `localStorage.key(0);`

6. **length**  
   - Returns the number of stored items.
   - Example: `localStorage.length;`

-----------------------------------------------------
Examples:

// Storing data
localStorage.setItem('theme', 'dark');
localStorage.setItem('fontSize', '16px');

// Retrieving data
console.log(localStorage.getItem('theme')); // "dark"

// Removing a single item
localStorage.removeItem('fontSize');

// Checking length
console.log(localStorage.length); // 1

// Clearing all data
localStorage.clear();
console.log(localStorage.length); // 0

// Storing objects
const user = {name: 'Alice', age: 25};
localStorage.setItem('user', JSON.stringify(user));
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // "Alice"

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like a small persistent notebook in your browser: you can write notes, read them later, and erase them when needed.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between localStorage and sessionStorage?  
A1: localStorage persists until explicitly cleared; sessionStorage lasts only for the session.

Q2: Can localStorage store objects?  
A2: Yes, but must convert them to strings with `JSON.stringify()`.

Q3: Is localStorage synchronous or asynchronous?  
A3: Synchronous; can block the main thread if storing large data.

Q4: Are localStorage values shared across tabs?  
A4: Yes, same origin shares the same localStorage.

Q5: Is localStorage secure?  
A5: Not fully; data is accessible via JavaScript in the browser and can be manipulated by users.
*/
