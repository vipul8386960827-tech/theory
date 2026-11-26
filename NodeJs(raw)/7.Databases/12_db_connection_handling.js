/* 12_db_connection_handling.js

=====================================================
Database Connection Handling
=====================================================

Definition (What I should say in the interview):
- "In a Node app I connect to the database **once at startup, before the server starts
   listening**, reuse that connection everywhere, listen to **connection events** for errors and
   disconnects, and **close it gracefully** on SIGINT/SIGTERM. If the initial connection fails, I
   log it and exit so the process manager or Kubernetes restarts the app."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Keep connection logic in one module (config/db.js) and import it.
2. Connection string from environment variables, never hardcoded.
3. The driver auto-reconnects after a dropped connection; you mainly log events.
4. Mongoose buffers model calls until connected (bufferCommands, 10s timeout by default).
5. Graceful shutdown: stop accepting HTTP requests -> finish in-flight -> close DB -> exit.

-----------------------------------------------------
Example
-----------------------------------------------------
// config/db.js
const mongoose = require('mongoose');

async function connectDB() {
  mongoose.connection.on('connected', () => console.log('MongoDB connected'));
  mongoose.connection.on('error', err => console.error('MongoDB error', err));
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));

  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
}
module.exports = connectDB;

// server.js
connectDB()
  .then(() => {
    const server = app.listen(3000);
    const shutdown = async () => {
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  })
  .catch(err => { console.error('DB connection failed', err); process.exit(1); });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Health check endpoint can return mongoose.connection.readyState (1 = connected).
- Serverless: cache the connection promise globally to reuse across warm invocations.
- Multiple databases: mongoose.createConnection(uri) returns a separate connection with its
  own models (conn.model('User', schema)).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens if a query runs before connect finishes?
A1: Mongoose buffers it and runs it once connected; if not connected within
    bufferTimeoutMS (10s) it throws "buffering timed out".

Q2: Why exit on initial connection failure?
A2: The app cannot serve requests without the DB; failing fast lets the orchestrator restart
    and alerts us, instead of a half-working server.
*/
