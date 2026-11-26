/* 19_two_users_book_last_seat.js

=====================================================
Scenario: Two Users Book The Last Seat At The Same Time
=====================================================

The Question (how the interviewer asks it):
- "There is one seat left for a concert. Two users click Book at the same
  moment and both get a success message. How did this happen and how do
  you prevent it?"

What the interviewer is checking:
- Do you understand race conditions (read-then-write / check-then-act)?
- Do you know atomic conditional updates in MongoDB?
- Do you know SQL options: SELECT ... FOR UPDATE, constraints?
- Do you know that a lock in Node memory does not work with many instances?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Explain the bug: the code READS seatsLeft (1), checks it in Node, then
   WRITES seatsLeft - 1. Both requests read 1 before either writes, so both
   pass the check. Node is single-threaded, but the "await" between read and
   write lets the other request run in between.
2. Fix: move the check INTO the database write, so check + update is one
   atomic operation: findOneAndUpdate({ _id, seatsLeft: { $gt: 0 } },
   { $inc: { seatsLeft: -1 } }). A single-document update in MongoDB is
   atomic, so only one request matches the filter.
3. If the result is null, the seat is gone - return 409 Conflict.
4. For a specific seat (seat A12), add a unique index on { eventId, seatNo }
   in the bookings collection. The second insert fails with error E11000,
   so double booking is impossible even if code has a bug.
5. If I must update more than one document (decrement seats AND create a
   booking), I wrap it in a transaction (see file 20).
6. In SQL: UPDATE events SET seats_left = seats_left - 1 WHERE id = $1 AND
   seats_left > 0 (check affected rows), or SELECT ... FOR UPDATE inside a
   transaction, plus a UNIQUE constraint.
7. For high traffic flash sales, consider a Redis counter (DECR is atomic)
   or a queue, and a "hold seat for 10 minutes" status.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: check-then-act race condition
const event = await Event.findById(eventId);
if (event.seatsLeft > 0) {                // both requests see 1
  event.seatsLeft -= 1;
  await event.save();                     // both save -> overbooked
}

// GOOD: atomic conditional update (check + write in one operation)
const updated = await Event.findOneAndUpdate(
  { _id: eventId, seatsLeft: { $gt: 0 } },   // condition
  { $inc: { seatsLeft: -1 } },               // atomic change
  { new: true }
);
if (!updated) return res.status(409).json({ error: "Sold out" });

// GOOD: unique index for named seats - DB rejects the second booking
bookingSchema.index({ eventId: 1, seatNo: 1 }, { unique: true });
try {
  await Booking.create({ eventId, seatNo: "A12", userId });
} catch (err) {
  if (err.code === 11000) return res.status(409).json({ error: "Seat taken" });
  throw err;
}

// SQL equivalent
// BEGIN;
// SELECT seats_left FROM events WHERE id = $1 FOR UPDATE;  -- row lock
// UPDATE events SET seats_left = seats_left - 1 WHERE id = $1;
// COMMIT;

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "It is a race condition: both requests read 'one seat left' before
  either one writes. I fix it by making the check and the update one atomic
  database operation: findOneAndUpdate with seatsLeft greater than 0 in the
  filter and $inc minus 1. Only one request matches; the other gets null
  and I return 409. For specific seats I add a unique index as a safety net,
  and in SQL I would use a conditional UPDATE or SELECT FOR UPDATE."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Node is single-threaded, so there is no race condition" - wrong; await
  lets other requests run, and you usually have many instances.
- Using an in-memory lock or a JS variable - it does not work across
  multiple servers / PM2 cluster workers.
- Fixing it only on the frontend (disable the button).
- Reading the document, then calling save() - not atomic.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is optimistic locking?
A1: You keep a version field. Update with filter { _id, __v: oldVersion }
    and $inc the version. If 0 docs match, someone else changed it; retry.
    Mongoose has optimisticConcurrency: true in schema options for save().

Q2: Pessimistic vs optimistic locking?
A2: Pessimistic locks the row first (SELECT FOR UPDATE) - safe but others
    wait. Optimistic does not lock and detects conflicts at write time -
    better when conflicts are rare.

Q3: How would you handle 100,000 users for 1,000 tickets?
A3: Do not hit the main DB for every click. Use an atomic Redis DECR to
    reserve, push to a queue, confirm payment async, and release held
    tickets after a timeout. Add rate limiting.
*/
