/* 
35_indexeddb.js – Interview-Ready Answer:

"IndexedDB is a low-level, client-side storage API in JavaScript that allows you to store 
large amounts of structured data, including files/blobs. It is asynchronous and supports transactions."

1️⃣ Key Points to Highlight:

1. Nature:
- Client-side database in the browser.
- Stores key-value pairs or complex structured data.
- Asynchronous API; avoids blocking the main thread.
- Persistent storage (data remains after page reload).

2. Key Features:
- Indexed for faster lookups.
- Supports transactions for data integrity.
- Can store large data including images or files.
- Works offline.

3. Basic Workflow:
- Open database (`indexedDB.open`).
- Create object stores (like tables in SQL).
- Perform CRUD operations in transactions.
- Handle success/error events.

2️⃣ Examples:

// Open or create a database
const request = indexedDB.open("MyDatabase", 1);

request.onupgradeneeded = event => {
  const db = event.target.result;
  // Create object store with key
  const store = db.createObjectStore("users", { keyPath: "id" });
  store.createIndex("name", "name", { unique: false });
};

request.onsuccess = event => {
  const db = event.target.result;

  // Add data
  const transaction = db.transaction("users", "readwrite");
  const store = transaction.objectStore("users");
  store.add({ id: 1, name: "Kaizer", age: 28 });

  // Read data
  const getRequest = store.get(1);
  getRequest.onsuccess = () => console.log(getRequest.result); // {id:1, name:"Kaizer", age:28}
};

request.onerror = event => console.error("IndexedDB error:", event.target.error);

3️⃣ Real-Life Analogies:

- Global Analogy:
  - IndexedDB = personal library with cataloged books; you can store, retrieve, and search efficiently.
- India-specific Analogy:
  - IndexedDB = a locker with sections for each type of item, each having unique labels.
- Web Analogy:
  - IndexedDB = local database in browser to store offline app data, like notes or cached API results.

4️⃣ Code Explanation:

- `indexedDB.open` → opens or creates a database.
- `onupgradeneeded` → triggers when DB version changes; create object stores here.
- Object stores act like tables.
- Transactions ensure atomic operations.
- `add`, `get`, `put`, `delete` → basic CRUD operations.
- IndexedDB is asynchronous; events handle success/error.

5️⃣ Example / Usage:

// Open DB
const dbRequest = indexedDB.open("AppDB", 1);

dbRequest.onupgradeneeded = e => {
  const db = e.target.result;
  const userStore = db.createObjectStore("users", { keyPath: "id" });
  userStore.createIndex("email", "email", { unique: true });
};

dbRequest.onsuccess = e => {
  const db = e.target.result;

  // Add a user
  const tx = db.transaction("users", "readwrite");
  const store = tx.objectStore("users");
  store.add({ id: 101, name: "Amit", email: "amit@example.com" });

  // Retrieve a user
  const getUser = store.get(101);
  getUser.onsuccess = () => console.log(getUser.result); 
};

6️⃣ Follow-Up Interview Questions:

Q1: What is IndexedDB?  
A1: Browser-based client-side database for storing structured data, including large files.

Q2: Difference between localStorage and IndexedDB?  
A2: localStorage is synchronous, small (5-10MB), stores strings. IndexedDB is asynchronous, large storage, stores structured objects and blobs.

Q3: Why use transactions?  
A3: Ensure data integrity; all operations in a transaction either succeed or fail.

Q4: Can IndexedDB work offline?  
A4: Yes, it's ideal for offline applications.

Q5: How do you query data in IndexedDB?  
A5: Using object stores and indexes within transactions with methods like `get`, `getAll`, or cursors.
*/
