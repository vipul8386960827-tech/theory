/* 309_date_methods.js

=====================================================
Date Methods in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "JavaScript Date object provides methods to handle dates and times, 
  including getting, setting, and formatting dates."

Key Points to Highlight:
- Create a date: `new Date()`, `new Date(milliseconds)`, `new Date(dateString)`
- Getting values:
  - getFullYear(), getMonth(), getDate(), getDay()
  - getHours(), getMinutes(), getSeconds(), getMilliseconds()
  - getTime() → milliseconds since Epoch
- Setting values:
  - setFullYear(), setMonth(), setDate(), setHours(), etc.
- Formatting:
  - toDateString(), toTimeString(), toISOString(), toLocaleString()

Examples:

const now = new Date();
console.log(now.getFullYear()); // e.g., 2025
console.log(now.getMonth());    // 0-11
console.log(now.getDate());     // 1-31

// Setting date
const birthday = new Date();
birthday.setFullYear(1990);
birthday.setMonth(0); // January
birthday.setDate(1);
console.log(birthday.toDateString()); // Tue Jan 01 1990

// Formatting
console.log(now.toISOString());   // 2025-09-22T10:00:00.000Z
console.log(now.toLocaleString()); // 22/9/2025, 3:30:00 pm

Code Explanation:
- Date object represents a specific point in time
- Getter and setter methods allow reading and modifying dates
- Formatting methods convert date to string in different representations

Real-Life Analogy:
- Like a calendar and clock combined in one object; you can read or set any component

Example / Usage:

function formatDate(date) {
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

const myDate = new Date();
console.log(formatDate(myDate)); // e.g., 22/9/2025

Follow-Up Interview Questions:
- Q1: Difference between getMonth() and getUTCMonth()?
  A1: getMonth() → local month, getUTCMonth() → month in UTC
- Q2: What does getTime() return?
  A2: Milliseconds since 1970-01-01 UTC
- Q3: Can Date object handle timezones?
  A3: By default, local timezone; can use toUTCString() or libraries for advanced handling
- Q4: How to compare two dates?
  A4: Use getTime() or direct subtraction
- Q5: Difference between Date.now() and new Date().getTime()?
  A5: Both return milliseconds; Date.now() is static method, getTime() is instance method
*/
