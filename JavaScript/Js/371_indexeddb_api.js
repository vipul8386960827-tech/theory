/* 371_indexeddb_api.js

=====================================================
IndexedDB API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "IndexedDB is a **low-level, client-side database** in the browser that allows you to store 
   large amounts of structured data, including files and blobs. It is asynchronous, supports 
   transactions, and is ideal for offline web applications or storing persistent data."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Stores **key-value pairs** and **complex objects**.
2. Supports **transactions** to ensure data integrity.
3. Allows **indexes** for efficient querying.
4. Can store **large binary data** like images, audio, and videos.
5. Asynchronous operations prevent **blocking the main thread**.
6. Works in modern browsers and is persistent across sessions.

-----------------------------------------------------
Basic Example (Creating Database and Object Store)
-----------------------------------------------------
const request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex('name', 'name', { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;

  // Add data
  const transaction = db.transaction('users', 'readwrite');
  const store = transaction.objectStore('users');
  store.add({ name: 'Kaizer', age: 25 });

  transaction.oncomplete = () => {
    console.log('Data added successfully');
  };
};

request.onerror = (event) => {
  console.error('Database error:', event.target.errorCode);
};

-----------------------------------------------------
CRUD Operations Example
-----------------------------------------------------
// Reading data
const transaction = db.transaction('users', 'readonly');
const store = transaction.objectStore('users');
const getRequest = store.get(1);

getRequest.onsuccess = (event) => {
  console.log('User:', event.target.result);
};

// Updating data
store.put({ id: 1, name: 'Kaizer Updated', age: 26 });

// Deleting data
store.delete(1);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Offline web applications storing user data.
- Storing large datasets for analytics or caching.
- Persisting files, images, and other binary data.
- Complex applications needing **indexed querying** and transactions.
- Progressive Web Apps (PWA) requiring **offline storage and sync**.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. IndexedDB operations are **asynchronous**; never block the UI thread.
2. Transactions are required for all read/write operations.
3. Use **indexes** for faster lookups on specific fields.
4. Versioning of the database allows for **schema upgrades**.
5. Not suitable for simple key-value storage; localStorage or Cache API is simpler for small data.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of IndexedDB as a **browser-based warehouse**:
  - You have different storage rooms (object stores) for types of items.
  - You can add, retrieve, update, or delete items efficiently.
  - Indexes are like catalog systems that make searching fast.
  - Transactions ensure that all changes in a batch succeed or fail together.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can IndexedDB store files or images?  
A1: Yes, it can store blobs, images, videos, and other binary data.

Q2: How does IndexedDB differ from localStorage?  
A2: IndexedDB is asynchronous, supports transactions and indexes, and can store large structured data. localStorage is synchronous and stores small string key-value pairs.

Q3: What is the purpose of onupgradeneeded event?  
A3: It is triggered when creating a new database or upgrading the version, allowing you to create or modify object stores and indexes.

Q4: Are IndexedDB operations synchronous or asynchronous?  
A4: They are **asynchronous** to avoid blocking the main thread.
*/
