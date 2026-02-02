/* 266_mean_stack.js

=====================================================
MEAN Stack – Interview-Ready Answer
=====================================================

Definition:
- "MEAN is a full-stack JavaScript framework used to build dynamic web applications. 
  MEAN stands for MongoDB, Express.js, Angular, and Node.js."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Allows development of end-to-end JavaScript applications.  
   - Single language (JS) across client-side, server-side, and database operations.

2. **Components**  
   - **MongoDB** → NoSQL database for storing data as JSON-like documents.  
   - **Express.js** → Web application framework for Node.js; handles routing, middleware.  
   - **Angular** → Frontend framework for building dynamic client-side apps.  
   - **Node.js** → Server-side JavaScript runtime, handles backend logic and API endpoints.

3. **Advantages**  
   - Full-stack JS → same language for frontend and backend.  
   - JSON everywhere → seamless data flow.  
   - Large community and many ready-to-use modules.  
   - Suitable for single-page applications (SPAs).

-----------------------------------------------------
Example Architecture:

// Client Side
Angular App → Sends HTTP requests to Express.js server

// Server Side
Express.js + Node.js → Handles API requests, business logic

// Database
MongoDB → Stores and retrieves JSON-like data

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Angular handles UI and sends API calls.  
- Express.js defines routes, handles requests, interacts with MongoDB.  
- Node.js runs backend server.  
- MongoDB stores application data in collections.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- MEAN stack = restaurant system:  
  - Angular = waiters (UI/UX),  
  - Express/Node = kitchen (process orders, logic),  
  - MongoDB = pantry (store ingredients).

-----------------------------------------------------
Example / Usage:

// Example API route with Express.js
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.get('/users', async (req, res) => {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('mydb');
  const users = await db.collection('users').find().toArray();
  res.json(users);
});

app.listen(3000, () => console.log("Server running on port 3000"));

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between MEAN and MERN stack?  
A1: MEAN uses Angular for frontend; MERN uses React.

Q2: Why use MongoDB in MEAN stack?  
A2: JSON-like documents integrate seamlessly with JavaScript.

Q3: Can MEAN stack handle real-time applications?  
A3: Yes, with libraries like Socket.io.

Q4: Is MEAN suitable for small projects?  
A4: Yes, but may be overkill for very simple static sites.

Q5: Advantages of full-stack JS?  
A5: Easier context switching, reusability, and faster development.
*/
