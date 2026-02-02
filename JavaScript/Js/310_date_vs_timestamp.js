/* 310_date_vs_timestamp.js

=====================================================
Date vs Timestamp in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "A Date object represents a specific point in time with methods 
  for getting and setting components, while a timestamp is the numeric 
  representation of that date in milliseconds since Epoch (Jan 1, 1970 UTC)."

Key Points to Highlight:
- Date object:
  - `new Date()` → creates a Date instance
  - Has methods like getFullYear(), getMonth(), toISOString(), etc.
- Timestamp:
  - Numeric value representing milliseconds since 1970-01-01 UTC
  - Obtained using Date.now() or date.getTime()
- Conversion:
  - Date → timestamp: date.getTime()
  - Timestamp → date: new Date(timestamp)
- Useful for calculations, comparisons, or storage

Examples:

const now = new Date();
console.log(now);               // Mon Sep 22 2025 16:00:00 GMT+0530
console.log(now.getTime());     // 1769163600000 (example timestamp)
console.log(Date.now());        // Current timestamp in ms

// Converting timestamp to Date
const ts = 1769163600000;
const dateFromTs = new Date(ts);
console.log(dateFromTs.toDateString()); // Mon Sep 22 2025

Code Explanation:
- Date object provides rich methods for human-readable operations
- Timestamp is numeric; good for math operations like difference or sorting
- Conversion is straightforward using getTime() and new Date()

Real-Life Analogy:
- Date object = wall calendar showing exact date & time
- Timestamp = digital counter of milliseconds since 1970

Example / Usage:

const start = new Date('2025-01-01');
const end = new Date('2025-12-31');
const diffMs = end.getTime() - start.getTime();
const diffDays = diffMs / (1000 * 60 * 60 * 24);
console.log(diffDays); // Number of days between dates

Follow-Up Interview Questions:
- Q1: Why use timestamps instead of Date objects?
  A1: Easier for calculations, comparisons, storage, and sorting.
- Q2: Are timestamps affected by timezone?
  A2: No, timestamp is always UTC-based milliseconds.
- Q3: How to get Unix timestamp in seconds?
  A3: Math.floor(Date.now()/1000)
- Q4: Difference between Date.now() and new Date().getTime()?
  A4: Functionally same; Date.now() is static and faster.
- Q5: Can you directly compare Date objects?
  A5: Yes, using getTime() or comparison operators.
*/
