/* 315_session_storage_methods.js

=====================================================
Session Storage Methods in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Session Storage is a web storage API that allows storing key-value pairs 
  in the browser for the duration of a page session. Data is cleared when the 
  tab or browser is closed."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Store temporary data for a specific tab or session.  
   - Useful for session-specific preferences, temporary state, or caching.

2. **Data Persistence**  
   - Data persists across page reloads but **not across tabs or browser restarts**.

3. **Data Type**  
   - Only stores strings.  
   - Objects/arrays must be converted using `JSON.stringify()` and `JSON.parse()`.

-----------------------------------------------------
Methods:

1. **setItem(key, value)**  
   - Stores a value with the specified key.  
   - Example: `sessionStorage.setItem('username', 'Alice');`

2. **getItem(key)**  
   - Retrieves the value for the specified key.  
   - Example: `sessionStorage.getItem('username'); // "Alice"`

3. **removeItem(key)**  
   - Deletes the value associated with the key.  
   - Example: `sessionStorage.removeItem('username');`

4. **clear()**  
   - Removes all key-value pairs in session storage.  
   - Example: `sessionStorage.clear();`

5. **key(index)**  
   - Returns the key at the given index.  
   - Example: `sessionStorage.key(0);`

6. **length**  
   - Returns the number of stored items.  
   - Example: `sessionStorage.length;`

-----------------------------------------------------
Examples:

// Storing data
sessionStorage.setItem('theme', 'dark');
sessionStorage.setItem('fontSize', '16px');

// Retrieving data
console.log(sessionStorage.getItem('theme')); // "dark"

// Removing a single item
sessionStorage.removeItem('fontSize');

// Checking length
console.log(sessionStorage.length); // 1

// Clearing all data
sessionStorage.clear();
console.log(sessionStorage.length); // 0

// Storing objects
const user = {name: 'Alice', age: 25};
sessionStorage.setItem('user', JSON.stringify(user));
const storedUser = JSON.parse(sessionStorage.getItem('user'));
console.log(storedUser.name); // "Alice"

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like a temporary notebook for a browser tab: you can write, read, and erase notes, but everything is cleared when the tab is closed.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between sessionStorage and localStorage?  
A1: sessionStorage lasts only for the tab session; localStorage persists until explicitly cleared.

Q2: Can sessionStorage store objects?  
A2: Yes, must use `JSON.stringify()` and `JSON.parse()`.

Q3: Is sessionStorage synchronous or asynchronous?  
A3: Synchronous; large data can block the main thread.

Q4: Are sessionStorage values shared across tabs?  
A4: No, each tab has its own sessionStorage.

Q5: Is sessionStorage secure?  
A5: Not fully; data is accessible via JavaScript in the browser.
*/
